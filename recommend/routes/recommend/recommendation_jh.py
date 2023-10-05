from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import desc, asc, func

from models.users import User
from models.hdd import HDD
from models.cpu import CPU
from models.mainboard import Mainboard, MainboardPCI
from models.ram import RAM
from models.gpu import GPU
from models.case import Case
from models.cooler import Cooler
from models.ssd import SSD
from models.quotation import Quotation
from models.programs import Program
from models.power import Power
from models.programs import Program, Requirements

from db.connection import engineconn
from schemas.quotation import QuotationSchema, QuotationOutput
from schemas.recommend_input import Recommend_input
from schemas.cpu import CPUSchema
from schemas.quo_serialize import serialize_quotation_output

from core.recommend.priority import *
from core import cpu, gpu, ram, case, ssd, power, mainboard, hdd
from core.recommend.compatibility_dfs import com_dfs
from core.com_data import *
from core.common import decimal_to_name

import sklearn
import numpy as np
import pickle
import os

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommends_"
)


@router.post("/quotation", response_model=List[QuotationOutput])
async def recommend(state: Recommend_input):
    # 시작

    try:
        raw_budget = state.budget
        budget = state.budget
        total_budget = budget

        quotation_list = []

        dfs_input = []

        having_state = 0  # 보유 상태 비트마스킹
        # 보유 중이거나 희망하는 부품 처리
        if state.case["id"] != -1:
            selected_case = session.query(Case).filter(Case.id == state.case["id"]).first()
            if selected_case.price == None or selected_case.price == 0:
                pass
            elif state.case["is_have"] == False:
                budget -= selected_case.price
            else:
                having_state |= 1 << 7
                total_budget += selected_case.price

        selected_cpu = None
        selected_gpu = None
        selected_case = None
        selected_hdd = None
        selected_ssd = None
        selected_ram = None
        selected_power = None
        selected_cooler = None
        selected_mainboard = None

        if state.cooler["id"] != -1:
            selected_cooler = session.query(Cooler).filter(Cooler.id == state.cooler["id"]).first()
            if selected_cooler.price == None or selected_cooler.price == 0:
                pass
            elif state.cooler["is_have"] == False:
                budget -= selected_cooler.price
            else:
                having_state |= 1 << 8
                total_budget += selected_cooler.price

        if state.cpu["id"] != -1:
            selected_cpu = session.query(CPU).filter(CPU.id == state.cpu["id"]).first()
            if selected_cpu.price == None or selected_cpu.price == 0:
                pass
            elif state.cpu["is_have"] == False:
                budget -= selected_cpu.price
            else:
                having_state |= 1 << 0
                total_budget += selected_cpu.price

        if state.gpu["id"] != -1:
            selected_gpu = session.query(GPU).filter(GPU.id == state.gpu["id"]).first()
            if selected_gpu.price == None or selected_gpu.price == 0:
                pass
            elif state.gpu["is_have"] == False:
                budget -= selected_gpu.price
            else:
                having_state |= 1 << 4
                total_budget += selected_gpu.price

        if state.hdd["id"] != -1:
            selected_hdd = session.query(HDD).filter(HDD.id == state.hdd["id"]).first()
            if selected_hdd.price == None or selected_hdd.price == 0:
                pass
            elif state.hdd["is_have"] == False:
                budget -= selected_hdd.price
            else:
                having_state |= 1 << 5
                total_budget += selected_hdd.price

        if state.mainboard["id"] != -1:
            selected_mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard["id"]).first()
            if selected_mainboard.price == None or selected_mainboard.price == 0:
                pass
            elif state.case["is_have"] == False:
                budget -= selected_mainboard.price
            else:
                having_state |= 1 << 2
                total_budget += selected_mainboard.price

        if state.power["id"] != -1:
            selected_power = session.query(Power).filter(Power.id == state.power["id"]).first()
            if selected_power.price == None or selected_power.price == 0:
                pass
            elif state.power["is_have"] == False:
                budget -= selected_power.price
            else:
                having_state |= 1 << 1
                total_budget += selected_power.price

        if state.ram["id"] != -1:
            selected_ram = session.query(RAM).filter(RAM.id == state.ram["id"]).first()
            if selected_ram.price == None or selected_ram.price == 0:
                pass
            elif state.ram["is_have"] == False:
                budget -= selected_ram.price
            else:
                having_state |= 1 << 3
                total_budget += selected_ram.price * state.ram_num

        if state.ssd["id"] != -1:
            selected_ssd = session.query(SSD).filter(SSD.id == state.ssd["id"]).first()
            if selected_ssd.price == None or selected_ssd.price == 0:
                pass
            elif state.ssd["is_have"] == False:
                budget -= selected_ssd.price
            else:
                having_state |= 1 << 6
                total_budget += selected_ssd.price

        # 예산이 희망 부품 구입에 부족한 경우 메세지 리턴
        if budget < 0:
            return JSONResponse(content={"message": "Not enough budget"}, status_code=200)

        # 용도 기반 최소 사양 저장
        min_cpu_bench = 0
        min_gpu_bench = 0
        min_ram_capa = 0

        for pid in state.programs:
            reqs = session.query(Requirements).filter(Requirements.program_id == pid).all()
            if reqs is None: continue
            for req in reqs:
                req_cpu = session.query(CPU).filter(CPU.id == req.cpu_id).first()
                req_gpu = session.query(GPU).filter(GPU.id == req.gpu_id).first()
                min_ram_capa = req.ram if min_ram_capa < req.ram else min_ram_capa
                min_cpu_bench = req_cpu.bench_mark if min_cpu_bench < req_cpu.bench_mark else min_cpu_bench
                if req_gpu is not None:
                    min_gpu_bench = req_gpu.bench_mark if min_gpu_bench < req_gpu.bench_mark else min_gpu_bench

        # 예산 비율 측정 (CPU:GPU:RAM:나머지)
        min_cpu_bench = max(min_cpu_bench, 2000)
        min_gpu_bench = max(min_gpu_bench, 1000)
        min_ram_capa = max(min_ram_capa, 4)

        # 예산 비율 측정 (CPU:GPU:RAM:나머지)
        model_file = os.path.join(os.path.dirname(__file__), 'rate_by_bench.pkl')
        group_file = os.path.join(os.path.dirname(__file__), 'rate_group.pkl')

        load_model = pickle.load(open(model_file, 'rb'))
        load_group = pickle.load(open(group_file, 'rb'))
        maxcb = session.query(func.max(CPU.bench_mark)).scalar()
        maxgb = session.query(func.max(GPU.bench_mark)).scalar()
        maxrc = session.query(func.max(RAM.capacity)).scalar()
        mincb = session.query(func.min(CPU.bench_mark)).scalar()
        mingb = session.query(func.min(GPU.bench_mark)).scalar()
        minrc = session.query(func.min(RAM.capacity)).scalar()

        clog = np.log((min_cpu_bench - mincb) / (maxcb - mincb) + 1)
        glog = np.log((min_gpu_bench - mingb) / (maxgb - mingb) + 1)
        rlog = np.log((min_ram_capa - minrc) / (maxrc - minrc) + 1)
        tlog = np.log(total_budget / 10000000 + 2)
        total_log = clog + glog + rlog

        bench_data = np.array([clog / total_log, glog / total_log, rlog / total_log, tlog / total_log])

        res_i = load_model.predict([bench_data])
        cpu_rate = load_group[int(res_i[0]), 0]
        gpu_rate = load_group[int(res_i[0]), 1]
        ram_rate = load_group[int(res_i[0]), 2]
        mb_rate = load_group[int(res_i[0]), 3]
        ca_rate = load_group[int(res_i[0]), 4]
        co_rate = load_group[int(res_i[0]), 5]
        ss_rate = load_group[int(res_i[0]), 6]
        po_rate = load_group[int(res_i[0]), 7]
        tot_rate = cpu_rate + gpu_rate + ram_rate + mb_rate + ca_rate + co_rate + ss_rate + po_rate

        # 그룹 선택하는 코드

        budget_ratio = {
            "group1": [cpu_rate / 100, gpu_rate / 100, ram_rate / 100, mb_rate / 100, ca_rate / 100,
                       co_rate / 100, ss_rate / 100, po_rate / 100, tot_rate / 100]
        }

        s_group = budget_ratio["group1"]

        bench_factor = 0.5
        perform_pri_value = 0.5
        ce_factor = 0
        ce_pri_value = 0
        as_factor = -1
        sense_factor = 0
        noise_factor = -1
        storage_factor = 0

        storage_list = [500, 1000, 1000, 2000]
        as_list = [1, 1, 3]
        noise_list = [0.5, 0.25, 0.1]
        # 우선순위 각 부품 가중치 설정
        for idx, pri in enumerate(state.priority):
            if pri == "성능":
                bench_factor = perform_pri(idx)
                perform_pri_value = 3 - idx
            elif pri == "가성비":
                ce_factor = ce_pri(idx)
                ce_pri_value = 3 - idx
            elif pri == "A/S":
                as_factor = idx
            elif pri == "저장공간":
                storage_factor = 3 - idx
            elif pri == "감성":
                sense_factor = 3 - idx
            elif pri == "소음":
                noise_factor = 3 - idx

        # 부품 8개 전부 기준을 만족하는 부품 리스트 가져오기
        maxcce = session.query(func.max(CPU.bench_mark / CPU.price)).scalar()
        maxgce = session.query(func.max(GPU.bench_mark / GPU.price)).scalar()

        # CPU
        if selected_cpu is None:
            cpu_list = (session.query(CPU).filter(CPU.price is not None, CPU.bench_mark >= min_cpu_bench,
                                                  CPU.price < s_group[0] * 1.05 * raw_budget,
                                                  CPU.price >= s_group[0] * 0.95 * raw_budget)
                        .order_by(desc(CPU.bench_mark / maxcb * bench_factor + CPU.bench_mark / CPU.price / maxcce * ce_factor)).all())
            acceptable = 0.1
            while True:
                cpu_list.extend(session.query(CPU).filter(CPU.price is not None, CPU.bench_mark >= min_cpu_bench,
                                                          CPU.price < s_group[0] * (1 + acceptable) * raw_budget,
                                                          CPU.price >= s_group[0] * (0.95 + acceptable) * raw_budget)
                                .order_by(desc(CPU.bench_mark / maxcb * bench_factor + CPU.bench_mark / CPU.price / maxcce * ce_factor)).all())
                cpu_list.extend(session.query(CPU).filter(CPU.price is not None, CPU.bench_mark >= min_cpu_bench,
                                                          CPU.price >= s_group[0] * (1 - acceptable) * raw_budget,
                                                          CPU.price < s_group[0] * (1.05 - acceptable) * raw_budget)
                                .order_by(desc(CPU.bench_mark / maxcb * bench_factor + CPU.bench_mark / CPU.price / maxcce * ce_factor)).all())
                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            cpu_list = [selected_cpu]

        # GPU
        if selected_gpu is None:
            gpu_list = (session.query(GPU).filter(GPU.price is not None, GPU.bench_mark >= min_gpu_bench,
                                                  GPU.price < s_group[1] * 1.05 * raw_budget,
                                                  GPU.price >= s_group[1] * 0.95 * raw_budget,
                                                  GPU.feature.op('&')(4) != 0 if sense_factor >= 1 else True)
                        .order_by(desc(GPU.bench_mark / maxgb * bench_factor + GPU.bench_mark / GPU.price / maxgce * ce_factor)).all())
            acceptable = 0.1
            while True:
                gpu_list.extend(session.query(GPU).filter(GPU.price is not None, GPU.bench_mark >= min_gpu_bench,
                                                          GPU.price < s_group[1] * (1 + acceptable) * raw_budget,
                                                          GPU.price >= s_group[1] * (0.95 + acceptable) * raw_budget,
                                                          GPU.feature.op('&')(4) != 0 if sense_factor >= 1 else True)
                                .order_by(desc(GPU.bench_mark / maxgb * bench_factor + GPU.bench_mark / GPU.price / maxgce * ce_factor)).all())
                gpu_list.extend(session.query(GPU).filter(GPU.price is not None, GPU.bench_mark >= min_gpu_bench,
                                                          GPU.price >= s_group[1] * (1 - acceptable) * raw_budget,
                                                          GPU.price < s_group[1] * (1.05 - acceptable) * raw_budget,
                                                          GPU.feature.op('&')(4) != 0 if sense_factor >= 1 else True)
                                .order_by(desc(GPU.bench_mark / maxgb * bench_factor + GPU.bench_mark / GPU.price / maxgce * ce_factor)).all())
                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            gpu_list = [selected_gpu]

        # RAM
        if selected_ram is None:
            ram_list = (session.query(RAM).filter(RAM.price is not None,
                                                  RAM.capacity >= min_ram_capa,
                                                  RAM.price < s_group[2] * 1.05 * raw_budget,
                                                  RAM.price >= s_group[2] * 0.95 * raw_budget,
                                                  RAM.led == 1 if sense_factor >= 2 else True,
                                                  RAM.generation == 'DDR5' if perform_pri_value >= 2 else True).all())
            if perform_pri_value > ce_pri_value:
                ram_list = sorted(ram_list, key=lambda ram_:(ram_.clock / ram_.capacity * ram_.number, ram_.capacity * ram_.number), reverse=True)
            elif ce_pri_value > perform_pri_value:
                ram_list = sorted(ram_list, key=lambda ram_:(ram_.capacity * ram_.number / ram_.price, ram_.clock / ram_.price), reverse=True)

            acceptable = 0.1
            while True:
                ram_ext_list = []
                ram_ext_list.extend(session.query(RAM).filter(RAM.price is not None,
                                                              RAM.capacity >= min_ram_capa,
                                                              RAM.price < s_group[2] * (1 + acceptable) * raw_budget,
                                                              RAM.price >= s_group[2] * (0.95 + acceptable) * raw_budget,
                                                              RAM.led == 1 if sense_factor >= 2 else True,
                                                              RAM.generation == 'DDR5' if perform_pri_value >= 2 else True).all())
                ram_ext_list.extend(session.query(RAM).filter(RAM.price is not None,
                                                              RAM.capacity >= min_ram_capa,
                                                              RAM.price >= s_group[2] * (1 - acceptable) * raw_budget,
                                                              RAM.price < s_group[2] * (1.05 - acceptable) * raw_budget,
                                                              RAM.led == 1 if sense_factor >= 2 else True,
                                                              RAM.generation == 'DDR5' if perform_pri_value >= 2 else True).all())
                if perform_pri_value > ce_pri_value:
                    ram_ext_list = sorted(ram_ext_list, key=lambda ram_:(ram_.clock / ram_.capacity * ram_.number, ram_.capacity * ram_.number), reverse=True)
                elif ce_pri_value > perform_pri_value:
                    ram_ext_list = sorted(ram_ext_list, key=lambda ram_:(ram_.capacity * ram_.number / ram_.price, ram_.clock / ram_.price), reverse=True)
                ram_list.extend(ram_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break

            if len(ram_list) <= 10 and perform_pri_value >= 2:
                ram_list = (session.query(RAM).filter(RAM.price is not None,
                                                      RAM.capacity >= min_ram_capa,
                                                      RAM.price < s_group[2] * 1.05 * raw_budget,
                                                      RAM.price >= s_group[2] * 0.95 * raw_budget,
                                                      RAM.led == 1 if sense_factor >= 2 else True,
                                                      RAM.generation != 'DDR5').all())
                if perform_pri_value > ce_pri_value:
                    ram_list = sorted(ram_list, key=lambda ram_:(ram_.clock / ram_.capacity * ram_.number, ram_.capacity * ram_.number), reverse=True)
                elif ce_pri_value > perform_pri_value:
                    ram_list = sorted(ram_list, key=lambda ram_:(ram_.capacity * ram_.number / ram_.price, ram_.clock / ram_.price), reverse=True)

                acceptable = 0.1
                while True:
                    ram_ext_list = []
                    ram_ext_list.extend(session.query(RAM).filter(RAM.price is not None,
                                                                  RAM.capacity >= min_ram_capa,
                                                                  RAM.price < s_group[2] * (1 + acceptable) * raw_budget,
                                                                  RAM.price >= s_group[2] * (0.95 + acceptable) * raw_budget,
                                                                  RAM.led == 1 if sense_factor >= 2 else True,
                                                                  RAM.generation != 'DDR5' if perform_pri_value >= 2 else True).all())
                    ram_ext_list.extend(session.query(RAM).filter(RAM.price is not None,
                                                                  RAM.capacity >= min_ram_capa,
                                                                  RAM.price >= s_group[2] * (1 - acceptable) * raw_budget,
                                                                  RAM.price < s_group[2] * (1.05 - acceptable) * raw_budget,
                                                                  RAM.led == 1 if sense_factor >= 2 else True,
                                                                  RAM.generation != 'DDR5' if perform_pri_value >= 2 else True).all())
                    if perform_pri_value > ce_pri_value:
                        ram_ext_list = sorted(ram_ext_list, key=lambda ram_:(ram_.clock / ram_.capacity * ram_.number, ram_.capacity * ram_.number), reverse=True)
                    elif ce_pri_value > perform_pri_value:
                        ram_ext_list = sorted(ram_ext_list, key=lambda ram_:(ram_.capacity * ram_.number / ram_.price, ram_.clock / ram_.price), reverse=True)
                    ram_list.extend(ram_ext_list)

                    acceptable += 0.05
                    if acceptable > 0.49:
                        break
        else:
            ram_list = [selected_ram]

        # SSD
        if selected_ssd is None:
            ssd_list = session.query(SSD).filter(SSD.price is not None,
                                                 SSD.as_year >= as_list[as_factor] if as_factor != -1 else True,
                                                 SSD.price < s_group[6] * 1.05 * raw_budget,
                                                 SSD.price >= s_group[6] * 0.95 * raw_budget,
                                                 SSD.volume >= storage_list[storage_factor],
                                                 SSD.volume <= storage_list[storage_factor] * 1.1,
                                                 SSD.rgbled == 1 if sense_factor >= 3 else True).all()
            if sense_factor >= 3:
                ssd_list.extend(session.query(SSD).filter(SSD.price is not None,
                                                          SSD.as_year >= as_list[as_factor] if as_factor != -1 else True,
                                                          SSD.price < s_group[6] * 1.05 * raw_budget,
                                                          SSD.price >= s_group[6] * 0.95 * raw_budget,
                                                          SSD.volume > storage_list[storage_factor],
                                                          SSD.volume <= storage_list[storage_factor] * 1.1,
                                                          SSD.rgbled != 1).all())
            acceptable = 0.1
            while True:
                ss_ext_list = []
                ss_ext_list.extend(session.query(SSD).filter(SSD.price is not None,
                                                             SSD.price < s_group[6] * (1 + acceptable) * raw_budget,
                                                             SSD.price >= s_group[6] * (0.95 + acceptable) * raw_budget,
                                                             SSD.volume > storage_list[storage_factor],
                                                             SSD.volume <= storage_list[storage_factor] * 1.1).all())
                ss_ext_list.extend(session.query(SSD).filter(SSD.price is not None,
                                                             SSD.price >= s_group[6] * (1 - acceptable) * raw_budget,
                                                             SSD.price < s_group[6] * (1.05 - acceptable) * raw_budget,
                                                             SSD.volume > storage_list[storage_factor],
                                                             SSD.volume <= storage_list[storage_factor] * 1.1).all())
                ssd_list.extend(ss_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            ssd_list = [selected_ssd]

        # cooler
        max_cooler_noise = session.query(func.max(Cooler.noise)).scalar()

        if selected_cooler is None:
            cooler_list = session.query(Cooler).filter(Cooler.price is not None,
                                                       Cooler.price < s_group[5] * 1.05 * raw_budget,
                                                       Cooler.price >= s_group[5] * 0.95 * raw_budget,
                                                       Cooler.as_years >= as_list[as_factor] if as_factor != -1 else True,
                                                       Cooler.feature.op('&')(1) != 0 if sense_factor >= 1 else True,
                                                       Cooler.noise <= max_cooler_noise * noise_list[noise_factor] if noise_factor != -1 else True).all()

            acceptable = 0.1
            while True:
                co_ext_list = []
                co_ext_list.extend(session.query(Cooler).filter(Cooler.price is not None,
                                                                Cooler.price < s_group[5] * (1 + acceptable) * raw_budget,
                                                                Cooler.price >= s_group[5] * (0.95 + acceptable) * raw_budget,
                                                                Cooler.feature.op('&')(1) != 0 if sense_factor >= 1 else True,
                                                                Cooler.noise <= max_cooler_noise * noise_list[noise_factor] if noise_factor != -1 else True).all())
                co_ext_list.extend(session.query(Cooler).filter(Cooler.price is not None,
                                                                Cooler.price >= s_group[5] * (1 - acceptable) * raw_budget,
                                                                Cooler.price < s_group[5] * (1.05 - acceptable) * raw_budget,
                                                                Cooler.feature.op('&')(1) != 0 if sense_factor >= 1 else True,
                                                                Cooler.noise <= max_cooler_noise * noise_list[noise_factor] if noise_factor != -1 else True).all())
                cooler_list.extend(co_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            cooler_list = [selected_cooler]

        # power
        if selected_power is None:
            power_list = (session.query(Power).filter(Power.price is not None, Power.depth is not None,
                                                      Power.price < s_group[7] * 1.05 * raw_budget,
                                                      Power.price >= s_group[7] * 0.95 * raw_budget,
                                                      Power.as_years >= as_list[as_factor] + 2 if as_factor != -1 else True)
                          .order_by(desc(Power.rated_power / Power.price)).all())

            acceptable = 0.1
            while True:
                po_ext_list = []
                po_ext_list.extend(session.query(Power).filter(Power.price is not None, Power.depth is not None,
                                                               Power.price < s_group[7] * (1 + acceptable) * raw_budget,
                                                               Power.price >= s_group[7] * (0.95 + acceptable) * raw_budget,
                                                               Power.as_years >= as_list[as_factor] + 2 if as_factor != -1 else True).all())
                po_ext_list.extend(session.query(Power).filter(Power.price is not None, Power.depth is not None,
                                                               Power.price >= s_group[7] * (1 - acceptable) * raw_budget,
                                                               Power.price < s_group[7] * (1.05 - acceptable) * raw_budget,
                                                               Power.as_years >= as_list[as_factor] + 2 if as_factor != -1 else True).all())
                power_list.extend(po_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            power_list = [selected_power]

        # mainboard
        if selected_mainboard is None:
            mainboard_list = session.query(Mainboard).filter(Mainboard.price is not None,
                                                             Mainboard.price < s_group[3] * 1.05 * raw_budget,
                                                             Mainboard.price >= s_group[3] * 0.95 * raw_budget,
                                                             Mainboard.feature.op('&')(1 << 4) != 0 if sense_factor >= 3 else True).all()
            acceptable = 0.1
            while True:
                mb_ext_list = []
                mb_ext_list.extend(session.query(Mainboard).filter(Mainboard.price is not None,
                                                                   Mainboard.price < s_group[3] * (1 + acceptable) * raw_budget,
                                                                   Mainboard.price >= s_group[3] * (0.95 + acceptable) * raw_budget,
                                                                   Mainboard.feature.op('&')(1 << 4) != 0 if sense_factor >= 3 else True).all())
                mb_ext_list.extend(session.query(Mainboard).filter(Mainboard.price is not None,
                                                                   Mainboard.price >= s_group[3] * (1 - acceptable) * raw_budget,
                                                                   Mainboard.price < s_group[3] * (1.05 - acceptable) * raw_budget,
                                                                   Mainboard.feature.op('&')(1 << 4) != 0 if sense_factor >= 3 else True).all())
                mainboard_list.extend(mb_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            mainboard_list = [selected_mainboard]

        # hdd
        if selected_hdd is None and storage_factor == 1:
            hdd_list = (session.query(HDD).filter(HDD.price is not None, HDD.capacity is not None,
                                                  HDD.capacity >= 500, HDD.capacity <= 4096)
                        .order_by(HDD.price).all())
        else:
            hdd_list = [selected_hdd]

        # case
        if selected_case is None:
            case_list = session.query(Case).filter(Case.price is not None,
                                                   Case.price < s_group[4] * 1.05 * raw_budget,
                                                   Case.price >= s_group[4] * 0.95 * raw_budget).all()
            acceptable = 0.1
            while True:
                ca_ext_list = []
                ca_ext_list.extend(session.query(Case).filter(Case.price is not None,
                                                              Case.price < s_group[4] * (1 + acceptable) * raw_budget,
                                                              Case.price >= s_group[4] * (0.95 + acceptable) * raw_budget).all())
                ca_ext_list.extend(session.query(Case).filter(Case.price is not None,
                                                              Case.price >= s_group[4] * (1 - acceptable) * raw_budget,
                                                              Case.price < s_group[4] * (1.05 - acceptable) * raw_budget).all())
                case_list.extend(ca_ext_list)

                acceptable += 0.05
                if acceptable > 0.99:
                    break
        else:
            case_list = [selected_case]

        # 기준: 최소 사양, 예산(오차 10%), 가중치 + 추가적인 우선순위(감성, 소음, 용량, A/S)

        # 부품 고르면서 호환성 검사 계속 (QutationSchema List)
        result = []
        dfs_input = [cpu_list, power_list, mainboard_list, ram_list, gpu_list, hdd_list, ssd_list, case_list,
                     cooler_list]

        cpu_idx = 0
        while True:
            cpu_ = cpu_list[cpu_idx % len(cpu_list)]
            quo_input = [None] * 9
            quo_input[0] = cpu_
            quo_result = com_dfs(quo_input, 1, dfs_input, cpu_.price, budget)
            if quo_result:
                result.append(quo_result)
            if len(result) == 10 or cpu_idx > 400:
                break
            cpu_idx += 1

        # for res in result:
        #     total = 0
        #     for item in res:
        #         if item is None: continue
        #         total += item.price
        #     print(f'price: {total}')
        # print(f'len: {len(result)}')

        for idx, item in enumerate(result):
            item[0].memory_type = decimal_to_name(item[0].memory_type, len(cpu_com['memory_type']),
                                                  cpu_com['memory_type'])
            item[0].pcie_version = decimal_to_name(item[0].pcie_version, len(cpu_com['pcie_version']),
                                                   cpu_com['pcie_version'])
            item[2].m2_interface = decimal_to_name(item[2].m2_interface, len(mainboard_com['m2_interface']),
                                                   mainboard_com['m2_interface'])
            item[2].m2_formfactor = decimal_to_name(item[2].m2_formfactor, len(mainboard_com['m2_formfactor']),
                                                    mainboard_com['m2_formfactor'])
            item[2].wireless_lan = decimal_to_name(item[2].wireless_lan, len(mainboard_com['wireless_lan']),
                                                   mainboard_com['wireless_lan'])
            item[2].graphic_output = decimal_to_name(item[2].graphic_output, len(mainboard_com['graphic_output']),
                                                     mainboard_com['graphic_output'])
            item[2].pcie_version = decimal_to_name(item[2].pcie_version, len(mainboard_com['pcie_version']),
                                                   mainboard_com['pcie_version'])
            item[2].io_header = decimal_to_name(item[2].io_header, len(mainboard_com['io_header']),
                                                mainboard_com['io_header'])
            item[2].feature = decimal_to_name(item[2].feature, len(mainboard_com['feature']), mainboard_com['feature'])
            item[4].port = decimal_to_name(item[4].port, len(gpu_com['port']), gpu_com['port'])
            item[4].additional_function = decimal_to_name(item[4].additional_function,
                                                          len(gpu_com['additional_function']),
                                                          gpu_com['additional_function'])
            item[4].cooling_type = decimal_to_name(item[4].cooling_type, len(gpu_com['cooling_type']),
                                                   gpu_com['cooling_type'])
            item[4].feature = decimal_to_name(item[4].feature, len(gpu_com['feature']), gpu_com['feature'])
            item[7].board_support = decimal_to_name(item[7].board_support, len(case_com['board_support']),
                                                    case_com['board_support'])
            item[7].external_port = decimal_to_name(item[7].external_port, len(case_com['external_port']),
                                                    case_com['external_port'])
            item[7].feature = decimal_to_name(item[7].feature, len(case_com['feature']), case_com['feature'])
            item[1].feature = decimal_to_name(item[1].feature, len(power_com['feature']), power_com['feature'])
            item[1].inside = decimal_to_name(item[1].inside, len(power_com['inside']), power_com['inside'])
            item[1].protection = decimal_to_name(item[1].protection, len(power_com['protection']),
                                                 power_com['protection'])
            item[8].intel_socket = decimal_to_name(item[8].intel_socket, len(cooler_com['intel_socket']),
                                                   cooler_com['intel_socket'])
            item[8].amd_socket = decimal_to_name(item[8].amd_socket, len(cooler_com['amd_socket']),
                                                 cooler_com['amd_socket'])
            item[8].feature = decimal_to_name(item[8].feature, len(cooler_com['feature']), cooler_com['feature'])
            result[idx] = serialize_quotation_output(item)
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "bad request", "message": f'{e}'})
    finally:
        session.close()
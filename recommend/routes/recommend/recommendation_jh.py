from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import func

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

@router.post("/quotation", response_model=QuotationOutput)
async def recommend(state: Recommend_input):
    # 시작
    budget = state.budget
    total_budget = budget
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

    test_list = []
    for pid in state.programs:
        req = session.query(Requirements).filter(Requirements.program_id == pid).first()
        if req is None: continue
        req_cpu = session.query(CPU).filter(CPU.id == req.cpu_id).first()
        req_gpu = session.query(GPU).filter(GPU.id == req.gpu_id).first()
        min_ram_capa = req.ram if min_ram_capa < req.ram else min_ram_capa
        min_cpu_bench = req_cpu.bench_mark if min_cpu_bench < req_cpu.bench_mark else min_cpu_bench
        if req_gpu is not None:
            min_gpu_bench = req_gpu.bench_mark if min_gpu_bench < req_gpu.bench_mark else min_gpu_bench

    min_cpu_bench = max(min_cpu_bench, 3000)
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
    
    # 부품 8개 전부 기준을 만족하는 부품 리스트 가져오기
    # 기준: 최소 사양, 예산(오차 10%), 가중치 + 추가적인 우선순위(감성, 소음, 용량, A/S)
    # 부품 고르면서 호환성 검사 계속 (QutationSchema List)

    print(cpu_rate, gpu_rate, ram_rate)
    print(res_i)
    print(bench_data)
    print(total_budget)
    test_list.append(cpu_rate)
    test_list.append(gpu_rate)
    test_list.append(ram_rate)

    session.close()
    return JSONResponse(content={"test": test_list}, status_code=200)
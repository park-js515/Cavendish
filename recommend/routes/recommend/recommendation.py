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

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommends"
)

@router.post("/quotation", response_model=List[QuotationOutput])
async def recommend(state: Recommend_input):
    # 시작

    try:
        raw_budget = state.budget
        budget = state.budget

        quotation_list = []

        dfs_input = []

        having_state = 0  # 보유 상태 비트마스킹
        # 보유 중이거나 희망하는 부품 처리
        if state.case["id"] != -1:
            if state.case["is_have"] == False:
                selected_case = session.query(Case).filter(Case.id == state.case["id"]).first()
                if selected_case.price == None or selected_case.price == 0:
                    pass
                else:
                    budget -= selected_case.price
            else:
                having_state |= 1 << 7

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
            if state.cooler["is_have"] == False:
                selected_cooler = session.query(Cooler).filter(Cooler.id == state.cooler["id"]).first()
                if selected_cooler.price == None or selected_cooler.price == 0:
                    pass
                else:
                    budget -= selected_cooler.price
            else:
                having_state |= 1 << 8

        if state.cpu["id"] != -1:
            if state.cpu["is_have"] == False:
                selected_cpu = session.query(CPU).filter(CPU.id == state.cpu["id"]).first()
                if selected_cpu.price == None or selected_cpu.price == 0:
                    pass
                else:
                    budget -= selected_cpu.price
            else:
                having_state |= 1 << 0

        if state.gpu["id"] != -1:
            if state.gpu["is_have"] == False:
                selected_gpu = session.query(GPU).filter(GPU.id == state.gpu["id"]).first()
                if selected_gpu.price == None or selected_gpu.price == 0:
                    pass
                else:
                    budget -= selected_gpu.price
            else:
                having_state |= 1 << 4

        if state.hdd["id"] != -1:
            if state.hdd["is_have"] == False:
                selected_hdd = session.query(HDD).filter(HDD.id == state.hdd["id"]).first()
                if selected_hdd.price == None or selected_hdd.price == 0:
                    pass
                else:
                    budget -= selected_hdd.price
            else:
                having_state |= 1 << 5

        if state.mainboard["id"] != -1:
            if state.case["is_have"] == False:
                selected_mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard["id"]).first()
                if selected_mainboard.price == None or selected_mainboard.price == 0:
                    pass
                else:
                    budget -= selected_mainboard.price
            else:
                having_state |= 1 << 2

        if state.power["id"] != -1:
            if state.power["is_have"] == False:
                selected_power = session.query(Power).filter(Power.id == state.power["id"]).first()
                if selected_power.price == None or selected_power.price == 0:
                    pass
                else:
                    budget -= selected_power.price
            else:
                having_state |= 1 << 1

        if state.ram["id"] != -1:
            if state.ram["is_have"] == False:
                selected_ram = session.query(RAM).filter(RAM.id == state.ram["id"]).first()
                if selected_ram.price == None or selected_ram.price == 0:
                    pass
                else:
                    budget -= selected_ram.price
            else:
                having_state |= 1 << 3

        if state.ssd["id"] != -1:
            if state.ssd["is_have"] == False:
                selected_ssd = session.query(SSD).filter(SSD.id == state.ssd["id"]).first()
                if selected_ssd.price == None or selected_ssd.price == 0:
                    pass
                else:
                    budget -= selected_ssd.price
            else:
                having_state |= 1 << 6

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
            req_cpu = session.query(CPU).filter(CPU.id == req.cpu_id).first()
            req_gpu = session.query(GPU).filter(GPU.id == req.gpu_id).first()
            min_ram_capa = req.ram if min_ram_capa < req.ram else min_ram_capa
            min_cpu_bench = req_cpu.bench_mark if min_cpu_bench < req_cpu.bench_mark else min_cpu_bench
            if req_gpu is not None:
                min_gpu_bench = req_gpu.bench_mark if min_gpu_bench < req_gpu.bench_mark else min_gpu_bench

        # 예산 비율 측정 (CPU:GPU:RAM:나머지)

        # 그룹 선택하는 코드

        budget_ratio = {
            "group1" : [0.2, 0.53, 0.02, 0.76]
        }

        s_group = budget_ratio["group1"]

        bench_factor = 0
        ce_factor = 0
        as_factor = 0
        sense_factor = 0
        noise_factor = 0
        storage_factor = 0

        storage_list = [500, 1000, 1500, 2000]
        # 우선순위 각 부품 가중치 설정
        for idx, pri in enumerate(state.priority):
            if pri == "성능":
                bench_factor = perform_pri(idx)
            elif pri == "가성비":
                ce_factor = ce_pri(idx)
            elif pri == "A/S":
                as_factor = idx + 1
            elif pri == "저장공간":
                storage_pri = idx + 1
            elif pri == "감성":
                sense_factor = idx + 1
            elif pri == "소음":
                noise_factor = idx + 1

        # cpu_bench_sum = session.query(func.sum(CPU.bench_mark)).filter(CPU.bench_mark != None).scalar()
        # cpu_mod = session.query(CPU).filter(CPU.bench_mark != None).count()
        # print(cpu_bench_sum/cpu_mod)

        cpu_bench_max = session.query(CPU).filter(CPU.bench_mark != None).order_by(desc(CPU.bench_mark)).first().bench_mark
        # 부품 8개 전부 기준을 만족하는 부품 리스트 가져오기

        cpu_ce_max = session.query(CPU).filter(CPU.bench_mark != None, CPU.price != None).order_by(desc(CPU.bench_mark / CPU.price)).first().bench_mark / session.query(CPU).filter(CPU.bench_mark != None, CPU.price != None).order_by(desc(CPU.bench_mark / CPU.price)).first().price
        # bench_mark ,bench_mark / price 스케일링 필요
        if selected_cpu == None:
            cpu_list = session.query(CPU).filter(CPU.price != None, CPU.bench_mark >= min_cpu_bench, CPU.price <= s_group[0]*1.1*raw_budget, CPU.price >= s_group[0]*0.9*raw_budget).order_by(desc(CPU.bench_mark / cpu_bench_max * bench_factor + CPU.bench_mark / CPU.price / cpu_ce_max* ce_factor)).limit(10).all()
            if len(cpu_list) == 0:
                cpu_list = session.query(CPU).filter(CPU.price != None, CPU.bench_mark >= min_cpu_bench).order_by(CPU.bench_mark * bench_factor + CPU.bench_mark / CPU.price * ce_factor).all()

        if selected_gpu == None:
            gpu_list = session.query(GPU).filter(GPU.price != None, GPU.bench_mark >= min_gpu_bench, GPU.price <= s_group[1]*1.1*raw_budget, GPU.price >= s_group[1]*0.9*raw_budget).order_by(desc(GPU.bench_mark * bench_factor + GPU.bench_mark / GPU.price * ce_factor)).limit(10).all()
            if len(gpu_list) == 0:
                gpu_list = session.query(GPU).filter(GPU.price != None, GPU.bench_mark >= min_cpu_bench).order_by(GPU.bench_mark * bench_factor + GPU.bench_mark / GPU.price * ce_factor).all()
        power_list = []
        ssd_list = []
        case_list = []
        hdd_list = []
        cooler_list = []    


        if as_factor == 1:
            if selected_ssd == None:
                ssd_list = session.query(SSD).filter(SSD.price != None, SSD.as_year >= 5, SSD.volume >= storage_list[storage_factor]).order_by(SSD.price).limit(10).all()
            if selected_cooler == None:
                cooler_list = session.query(Cooler).filter(Cooler.price != None, Cooler.as_years >= 5).limit(10).all()
            if selected_power == None:
                power_list = session.query(Power).filter(Power.price != None, Power.as_years >= 7).limit(10).all()
        elif as_factor == 2:
            if selected_ssd == None:
                ssd_list = session.query(SSD).filter(SSD.price != None, SSD.as_year >= 3, SSD.volume >= storage_list[storage_factor]).order_by(SSD.price).limit(10).all()
            if selected_cooler == None:
                cooler_list = session.query(Cooler).filter(Cooler.price != None, Cooler.as_years >= 3).limit(10).all()
            if selected_power == None:
                power_list = session.query(Power).filter(Power.price != None, Power.as_years >= 5).limit(10).all()
        elif as_factor == 3:
            if selected_ssd == None:
                ssd_list = session.query(SSD).filter(SSD.price != None, SSD.as_year >= 1, SSD.volume >= storage_list[storage_factor]).order_by(SSD.price).limit(10).all()
            if selected_cooler == None:
                cooler_list = session.query(Cooler).filter(Cooler.price != None, Cooler.as_years >= 1).limit(10).all()
            if selected_power == None:
                power_list = session.query(Power).filter(Power.price != None, Power.as_years >= 3).limit(10).all() 

        if power_list == []:
            power_list = session.query(Power).filter(Power.price != None).order_by(desc(Power.rated_power / Power.price)).limit(10).all()

        if selected_mainboard == None:
            mainboard_list = session.query(Mainboard).filter(Mainboard.price != None).limit(10).all()

        if selected_ram == None:
            ram_list = session.query(RAM).filter(RAM.price != None).limit(10).all()

        if selected_case == None:
            case_list = session.query(Case).filter(Case.price != None).limit(10).all()

        if selected_hdd == None:
            hdd_list = session.query(HDD).filter(HDD.price != None).limit(10).all()

        if selected_cooler == None:
            cooler_list = session.query(Cooler).filter(Cooler.price != None).limit(10).all()
        
        if selected_ssd == None:
            ssd_list = session.query(SSD).filter(SSD.price != None).limit(10).all()


        # 기준: 최소 사양, 예산(오차 10%), 가중치 + 추가적인 우선순위(감성, 소음, 용량, A/S)

        # 부품 고르면서 호환성 검사 계속 (QutationSchema List)

        result = []
        test_list.append(min_cpu_bench)
        test_list.append(min_gpu_bench)
        test_list.append(min_ram_capa)

        dfs_input = [cpu_list, power_list, mainboard_list, ram_list, gpu_list, hdd_list, ssd_list, case_list, cooler_list]
        quo_test = [0 for i in range(9)]

        result = com_dfs(result, quo_test, 0, dfs_input, 0, raw_budget)
        result = result[0:10]
        for idx, item in enumerate(result):
            item[0].memory_type = decimal_to_name(item[0].memory_type, len(cpu_com['memory_type']), cpu_com['memory_type'])
            item[0].pcie_version = decimal_to_name(item[0].pcie_version, len(cpu_com['pcie_version']), cpu_com['pcie_version'])
            item[2].m2_interface = decimal_to_name(item[2].m2_interface, len(mainboard_com['m2_interface']), mainboard_com['m2_interface'])
            item[2].m2_formfactor = decimal_to_name(item[2].m2_formfactor, len(mainboard_com['m2_formfactor']), mainboard_com['m2_formfactor'])
            item[2].wireless_lan = decimal_to_name(item[2].wireless_lan, len(mainboard_com['wireless_lan']), mainboard_com['wireless_lan']) 
            item[2].graphic_output = decimal_to_name(item[2].graphic_output, len(mainboard_com['graphic_output']), mainboard_com['graphic_output']) 
            item[2].pcie_version = decimal_to_name(item[2].pcie_version, len(mainboard_com['pcie_version']), mainboard_com['pcie_version']) 
            item[2].io_header = decimal_to_name(item[2].io_header, len(mainboard_com['io_header']), mainboard_com['io_header']) 
            item[2].feature = decimal_to_name(item[2].feature, len(mainboard_com['feature']), mainboard_com['feature']) 
            item[4].port = decimal_to_name(item[4].port, len(gpu_com['port']), gpu_com['port'])
            item[4].additional_function = decimal_to_name(item[4].additional_function, len(gpu_com['additional_function']), gpu_com['additional_function'])
            item[4].cooling_type = decimal_to_name(item[4].cooling_type, len(gpu_com['cooling_type']), gpu_com['cooling_type'])
            item[4].feature = decimal_to_name(item[4].feature, len(gpu_com['feature']), gpu_com['feature'])
            item[7].board_support = decimal_to_name(item[7].board_support, len(case_com['board_support']), case_com['board_support'])
            item[7].external_port = decimal_to_name(item[7].external_port, len(case_com['external_port']), case_com['external_port'])
            item[7].feature = decimal_to_name(item[7].feature, len(case_com['feature']), case_com['feature'])
            item[1].feature = decimal_to_name(item[1].feature, len(power_com['feature']), power_com['feature']) 
            item[1].inside = decimal_to_name(item[1].inside, len(power_com['inside']), power_com['inside'])
            item[1].protection = decimal_to_name(item[1].protection, len(power_com['protection']), power_com['protection'])
            item[8].intel_socket = decimal_to_name(item[8].intel_socket, len(cooler_com['intel_socket']), cooler_com['intel_socket'])   
            item[8].amd_socket = decimal_to_name(item[8].amd_socket, len(cooler_com['amd_socket']), cooler_com['amd_socket'])   
            item[8].feature = decimal_to_name(item[8].feature, len(cooler_com['feature']), cooler_com['feature'])   
            result[idx] = serialize_quotation_output(item)

        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f'{e}'})
    finally:
        session.close()
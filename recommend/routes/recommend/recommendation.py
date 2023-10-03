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
from schemas.quotation import QuotationSchema
from schemas.recommend_input import Recommend_input
from schemas.cpu import CPUSchema

from core.recommend.priority import *

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommends"
)

@router.post("/quotation", response_model=QuotationSchema)
async def recommend(state: Recommend_input):
    # 시작
    raw_budget = state.budget
    budget = state.budget

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

    cpu_ce_max = session.query(CPU).filter(CPU.bench_mark != None, CPU.price != None).order_by(desc(CPU.bench_mark / CPU.price)).first().bench_mark / session.query(CPU).filter(CPU.bench_mark != None, CPU.price != None).order_by(desc(CPU.bench_mark / CPU.price)).first().price
    # bench_mark ,bench_mark / price 스케일링 필요
    if selected_cpu == None:
        cpu_list = session.query(CPU).filter(CPU.price != None, CPU.bench_mark >= min_cpu_bench, CPU.price <= s_group[0]*1.1*raw_budget, CPU.price >= s_group[0]*0.9*raw_budget).order_by(desc(CPU.bench_mark / cpu_bench_max * bench_factor + CPU.bench_mark / CPU.price / cpu_ce_max* ce_factor)).all()
        if len(cpu_list) == 0:
            cpu_list = session.query(CPU).filter(CPU.price != None, CPU.bench_mark >= min_cpu_bench).order_by(CPU.bench_mark * bench_factor + CPU.bench_mark / CPU.price * ce_factor).all()

    if selected_gpu == None:
        gpu_list = session.query(GPU).filter(GPU.price != None, GPU.bench_mark >= min_gpu_bench, GPU.price <= s_group[1]*1.1*raw_budget, GPU.price >= s_group[1]*0.9*raw_budget).order_by(desc(GPU.bench_mark * bench_factor + GPU.bench_mark / GPU.price * ce_factor)).all()
        if len(gpu_list) == 0:
            gpu_list = session.query(GPU).filter(GPU.price != None, GPU.bench_mark >= min_cpu_bench).order_by(GPU.bench_mark * bench_factor + GPU.bench_mark / GPU.price * ce_factor).all()
    print(cpu_list[1].price)
    print(len(cpu_list))

    # 우선순위 각 부품 가중치 설정

    # 부품 8개 전부 기준을 만족하는 부품 리스트 가져오기

    # 기준: 최소 사양, 예산(오차 10%), 가중치 + 추가적인 우선순위(감성, 소음, 용량, A/S)

    # 부품 고르면서 호환성 검사 계속 (QutationSchema List)

    test_list.append(min_cpu_bench)
    test_list.append(min_gpu_bench)
    test_list.append(min_ram_capa)

    session.close()
    return JSONResponse(content={"test": test_list}, status_code=200)
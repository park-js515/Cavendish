from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse

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

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommends"
)

@router.post("/quotation", response_model=QuotationSchema)
async def recommend(state: Recommend_input):
    # 시작
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


    # 우선순위 각 부품 가중치 설정


    # 부품 8개 전부 기준을 만족하는 부품 리스트 가져오기
    # 기준: 최소 사양, 예산(오차 10%), 가중치 + 추가적인 우선순위(감성, 소음, 용량, A/S)
    # 부품 고르면서 호환성 검사 계속 (QutationSchema List)

    test_list.append(min_cpu_bench)
    test_list.append(min_gpu_bench)
    test_list.append(min_ram_capa)

    session.close()
    return JSONResponse(content={"test": test_list}, status_code=200)
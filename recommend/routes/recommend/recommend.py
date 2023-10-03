from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import select, func
from pydantic import BaseModel
from typing import List, Optional, Dict
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

from schemas.search import ProcessListStep1
from schemas.recommend_input import Recommend_input

from core.recommend.priority import *
from core.recommend.cpu_filter import cpu_filter
from core.recommend.gpu_filter import gpu_filter
from core.recommend.ram_filter import ram_filter
from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case
from schemas.case import CaseSchema, serialize_case
from schemas.cpu import CPUSchema
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program, RequirementsSchema, serialize_requirement
from schemas.quotation import QuotationSchema

import math

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommend"
)

@router.post("/quotation", response_model=QuotationSchema)
async def recommend(state : Recommend_input):
    budget = state.budget

    # cpu_factor = 0
    # gpu_factor = 0

    # if "모델링" in state.usage:
    #     if state.cpu["id"] == -1:
    #         cpu_factor = 700000 / math.log(budget)
    #     if state.gpu["id"] == -1:
    #         gpu_factor = 1000000 / budget
    # elif "인코딩" in state.usage:
    #     if state.cpu["id"] == -1:
    #         cpu_factor = 600000 / budget
    #     if state.gpu["id"] == -1:
    #         gpu_factor = 800000 / budget
    # elif "게임" in state.usage:
    #     if state.cpu["id"] == -1:
    #         cpu_factor = 500000 / budget
    #     if state.gpu["id"] == -1:
    #         gpu_factor = 700000 / budget
    # elif "사무" in state.usage:
    #     if state.cpu["id"] == -1:
    #         cpu_factor = 400000 / budget
    #     if state.gpu["id"] == -1:
    #         gpu_factor = 200000 / budget

    # print(cpu_factor, gpu_factor)

    quotation = [0 for i in range(9)]



    part_num = {
        "cpu" : 0,
        "mainboard" : 2,
        "ram" : 3,
        "gpu" : 4,
        "ssd" : 6,
        "hdd" : 5,
        "case" : 7,
        "power" : 8,
        "cooler" : 1
    }
    
    selected_case = None
    selected_cooler = None
    selected_cpu = None
    selected_gpu = None
    selected_hdd = None
    selected_power = None
    selected_mainboard = None
    selected_ram = None
    selected_ssd = None

    case_list = []
    cooler_list = []
    cpu_list = []
    gpu_list = []
    hdd_list = []
    mainboard_list = []
    power_list = []
    ram_list = []
    ssd_list = []

    # 선택한 부품 있을 경우, 선택한 부품을 소지하고 있을 경우
    if state.case["id"] != -1:
        if state.case["is_have"] == False:
            selected_case = session.query(Case).filter(Case.id == state.case["id"]).first()
            if selected_case.price == None or selected_case.price == 0:
                pass
            else:
                budget -= selected_case.price

    if state.cooler["id"] != -1:
        if state.cooler["is_have"] == False:
            selected_cooler = session.query(Cooler).filter(Cooler.id == state.cooler["id"]).first()
            if selected_cooler.price == None or selected_cooler.price == 0:
                pass
            else:
                budget -= selected_cooler.price

    if state.cpu["id"] != -1:
        if state.cpu["is_have"] == False:
            selected_cpu = session.query(CPU).filter(CPU.id == state.cpu["id"]).first()
            if selected_cpu.price == None or selected_cpu.price == 0:
                pass
            else:
                budget -= selected_cpu.price

    if state.gpu["id"] != -1:
        if state.gpu["is_have"] == False:
            selected_gpu = session.query(GPU).filter(GPU.id == state.gpu["id"]).first()
            if selected_gpu.price == None or selected_gpu.price == 0:
                pass
            else:
                budget -= selected_gpu.price

    if state.hdd["id"] != -1:
        if state.hdd["is_have"] == False:
            selected_hdd = session.query(HDD).filter(HDD.id == state.hdd["id"]).first()
            if selected_hdd.price == None or selected_hdd.price == 0:
                pass
            else:
                budget -= selected_hdd.price

    if state.mainboard["id"] != -1:
        if state.case["is_have"] == False:
            selected_mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard["id"]).first()
            if selected_mainboard.price == None or selected_mainboard.price == 0:
                pass
            else:
                budget -= selected_mainboard.price

    if state.power["id"] != -1:
        if state.power["is_have"] == False:
            selected_power = session.query(Power).filter(Power.id == state.power["id"]).first()
            if selected_power.price == None or selected_power.price == 0:
                pass
            else:
                budget -= selected_power.price

    if state.ram["id"] != -1:
        if state.ram["is_have"] == False:
            selected_ram = session.query(RAM).filter(RAM.id == state.ram["id"]).first()
            if selected_ram.price == None or selected_ram.price == 0:
                pass
            else:
                budget -= selected_ram.price

    if state.ssd["id"] != -1:
        if state.ssd["is_have"] == False:
            selected_ssd = session.query(SSD).filter(SSD.id == state.ssd["id"]).first()
            if selected_ssd.price == None or selected_ssd.price == 0:
                pass
            else:
                budget -= selected_ssd.price

    case_list = session.query(Case).filter(Case.price != None, Case.price != 0).all()

    case_price = 0

    for item in case_list:
        case_price += item.price

    gpu_list = session.query(GPU).filter(GPU.price != None, GPU.price != 0).all()

    gpu_price = 0

    for item in gpu_list:
        gpu_price += item.price

    if "성능" in state.priority and "가성비" in state.priority:
        pass

    elif "성능" in state.priority:
        pass

    elif "가성비" in state.priority:
        pass

    min_cpu_bench = 0
    min_gpu_bench = 0
    min_ram_capa = 0

    rec_cpu_bench = 0
    rec_gpu_bench = 0
    rec_ram_capa = 0

    max_cpu_bench = 0
    max_gpu_bench = 0
    max_ram_capa = 0


    for i in range(len(state.programs)):
        requirements = session.query(Requirements).filter(state.programs[i] == Requirements.program_id).all()
        for j in range(len(requirements)):
            temp_cpu = session.query(CPU).filter(CPU.id == requirements[j].cpu_id).first()
            temp_gpu = session.query(GPU).filter(GPU.id == requirements[j].gpu_id).first()
            
            if temp_cpu == None:
                temp_cpu = CPU()
                temp_cpu.bench_mark = 0

            if temp_gpu == None:
                temp_gpu = GPU()
                temp_gpu.bench_mark = 0
            
            if requirements[j].spec_class == 0:
                min_cpu_bench = max(min_cpu_bench, temp_cpu.bench_mark)
                min_gpu_bench = max(min_gpu_bench, temp_gpu.bench_mark)
                if requirements[j].ram != None:
                    min_ram_capa = max(min_ram_capa, requirements[j].ram)

            elif requirements[j].spec_class == 1:
                rec_cpu_bench = max(rec_cpu_bench, temp_cpu.bench_mark)
                rec_gpu_bench = max(rec_gpu_bench, temp_gpu.bench_mark)
                if requirements[j].ram != None:
                    rec_ram_capa = max(rec_ram_capa, requirements[j].ram)

            elif requirements[j].spec_class == 2:
                max_cpu_bench = max(max_cpu_bench, temp_cpu.bench_mark)
                max_gpu_bench = max(max_gpu_bench, temp_gpu.bench_mark)
                if requirements[j].ram != None:
                    max_ram_capa = max(max_ram_capa, requirements[j].ram)

    cpu_filter(min_cpu_bench, rec_cpu_bench, max_cpu_bench)

    gpu_filter(min_gpu_bench, rec_gpu_bench, max_gpu_bench)

    ram_filter(min_ram_capa, rec_ram_capa, max_ram_capa)

    for idx, name in enumerate(state.priority):
        if name == "성능":
            perform_pri(idx)
        elif name == "가성비":
            ce_pri(idx)
        elif name == "A/S":
            as_pri(idx)
        elif name == "감성":
            sense_pri(idx)
        elif name == "소음":
            noise_pri(idx)
        elif name == "저장공간":
            storage_pri(idx)

    try:
        return JSONResponse(content=[], status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()



    # if state.cpu != -1:
    #     cpu = session.query(CPU).filter(cpu.id == state.cpu).first()

    # if state.case != -1:
    #     case = session.query(Case).filter(case.id == state.case).first()
    
    # if state.cooler != -1:
    #     cooler = session.query(Cooler).filter(cooler.id == state.cooler).first()
    
    # if state.gpu != -1:
    #     gpu = session.query(GPU).filter(gpu.id == state.gpu).first()
    
    # if state.hdd != -1:
    #     hdd = session.query(HDD).filter(hdd.id == state.hdd).first()

    # if state.mainboard != -1:
    #     mainboard = session.query(Mainboard).filter(mainboard.id == state.mainboard).first()

    # if state.power != -1:
    #     power = session.query(Power).filter(power.id == state.power).first()

    # if state.ram != -1:
    #     ram = session.query(RAM).filter(ram.id == state.ram).first()
    
    # if state.ssd != -1:
    #     ssd = session.query(SSD).filter(ssd.id == state.ssd).first()
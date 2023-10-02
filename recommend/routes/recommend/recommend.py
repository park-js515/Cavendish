from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
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

from core.recommend.cpu_filter import cpu_filter
from core.recommend.gpu_filter import gpu_filter
from core.recommend.ram_filter import ram_filter
from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case, power_com_case_support
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program, RequirementsSchema, serialize_requirement

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommend"
)

@router.post("/quotation")
async def recommend(state : Recommend_input):

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


    try:
        return JSONResponse(content=[], status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
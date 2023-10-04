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

from schemas.mainboard import MainboardSchema, serialize_mainboard, serialize_mainboard_pci
from schemas.cpu import CPUSchema, serialize_cpu
from schemas.gpu import GPUSchema, serialize_gpu
from schemas.ram import RAMSchema, serialize_ram
from schemas.ssd import SSDSchema, serialize_ssd
from schemas.hdd import HDDSchema, serialize_hdd
from schemas.cooler import CoolerSchema, serialize_cooler
from schemas.case import CaseSchema, serialize_case
from schemas.power import PowerSchema, serialize_power

from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program

from schemas.parts import *

import json

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/parts/detail"
)

@router.get("/gpu/{gpu_id:int}")
async def gpu_part(gpu_id : int = 1):
    gpu = session.query(GPU).filter(GPU.id == gpu_id).first()
    try:
        gpu = serialize_gpu(gpu)
        return JSONResponse(content=gpu, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/cpu/{cpu_id:int}")
async def cpu_part(cpu_id : int = 1):
    cpu = session.query(CPU).filter(CPU.id == cpu_id).first()
    try:
        cpu = serialize_cpu(cpu)
        return JSONResponse(content=cpu, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/ram/{ram_id:int}")
async def ram_part(ram_id : int = 1):
    ram = session.query(RAM).filter(RAM.id == ram_id).first()
    try:
        ram = serialize_ram(ram)
        return JSONResponse(content=ram, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/ssd/{ssd_id:int}")
async def ssd_part(ssd_id : int = 1):
    ssd = session.query(SSD).filter(SSD.id == ssd_id).first()
    try:
        ssd = serialize_ssd(ssd)
        return JSONResponse(content=ssd, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/hdd/{hdd_id:int}")
async def hdd_part(hdd_id : int = 1):
    hdd = session.query(HDD).filter(HDD.id == hdd_id).first()
    try:
        hdd = serialize_hdd(hdd)
        return JSONResponse(content=hdd, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/cooler/{cooler_id:int}")
async def cooler_part(cooler_id : int = 1):
    cooler = session.query(Cooler).filter(Cooler.id == cooler_id).first()
    try:
        cooler = serialize_cooler(cooler)
        return JSONResponse(content=cooler, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/case/{case_id:int}")
async def case_part(case_id : int = 1):
    case = session.query(Case).filter(Case.id == case_id).first()
    try:
        case = serialize_case(case)
        return JSONResponse(content=case, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()

@router.get("/power/{power_id:int}")
async def power_part(power_id : int = 1):
    power = session.query(Power).filter(Power.id == power_id).first()
    try:
        power = serialize_power(power)
        return JSONResponse(content=power, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close() 

@router.get("/mainboard/{mainboard_id:int}")
async def mainboard_part(mainboard_id : int = 1):
    mainboard = session.query(Mainboard).filter(Mainboard.id == mainboard_id).first()
    pci = session.query(MainboardPCI).filter(MainboardPCI.mainboard_id == mainboard_id).all()
    try:
        mainboard = serialize_mainboard(mainboard, pci)
        return JSONResponse(content=mainboard, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()


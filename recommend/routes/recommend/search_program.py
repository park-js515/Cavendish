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

from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/program"
)

@router.get("/{category:str}/{page:int}", response_model=List[ProgramSchema])
async def search_program(category : str, page : int = 1, keyword : str = ""):
    program = session.query(Program).filter(Program.name.like(f'%{keyword}%'), Program.usage == category).all()
    max_page = len(program) // 10 + 1
    try:
        if page > max_page:
            return JSONResponse(content={"error" : "bad request", "message" : "page is too big"}, status_code=400)
        program = program[(page - 1) * 10 : page * 10]
        for i in range(len(program)):
            program[i] = serialize_program(program[i])

        return JSONResponse(content=program, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
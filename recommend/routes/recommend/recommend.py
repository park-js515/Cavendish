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

from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case, power_com_case_support
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommend"
)

@router.get("/quotation")
async def recommend(state : Recommend_input = Depends(), spec : List[str] = Query([]), program : List[str] = Query([])):
    try:
        return JSONResponse(content={"data" : "good", "message" : "good"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error" : "bad request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
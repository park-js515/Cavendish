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

from schemas.search import ProcessListStep1

from core.gpu import gpu_com_case
from core.power import power_com_case, power_com_case_support
from schemas.case import serialize_case
from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/case"
)

@router.get("/{keyword:str}/{page:int}")
async def case_search(keyword: str, page: int, state: ProcessListStep1 = Depends()):
    case = session.query(Case).filter(Case.name.like(f'%{keyword}%')).all()
    max_page = len(case)//10 + 1
    if page > max_page:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
    try:
        result = []
        
        for i in range(len(case)):
            item = {
                'data' : case[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.gpu != -1:
            gpu = session.query(GPU).filter(GPU.id == state.gpu).first()
            for i in range(len(result)):
                if gpu_com_case(gpu.length, result[i]['data'].gpu_size):
                    pass
                else:
                    result[i]['compatibility'].append('gpu')

        if state.power != -1:
            power = session.query(Power).filter(Power.id == state.power).first()
            for i in range(len(result)):
                if power_com_case(power.depth, result[i]['data'].power_size):
                    pass
                else:
                    result[i]['compatibility'].append('power')
                    continue
                if power_com_case_support(power.category, result[i]['data'].power_support):
                    pass
                else:
                    result[i]['compatibility'].append('power')

        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()

        if state.cooler != -1:
            cooler = session.query(Cooler).filter(Cooler.id == state.cooler).first()

    except:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
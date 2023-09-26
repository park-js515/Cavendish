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

        
    except:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
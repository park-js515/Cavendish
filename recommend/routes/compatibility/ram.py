from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
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
    prefix="/search/ram", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{keyword:str}/{page:int}")
async def ram_search(keyword: str, page: int, state: ProcessListStep1 = Depends()):
    result = session.query(RAM).filter(RAM.name.like(f'%{keyword}%')).offset((page-1)*10).limit(10).all()
    return result
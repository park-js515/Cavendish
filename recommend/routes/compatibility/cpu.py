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
    prefix="/search/cpu", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리



@router.get("/{keyword:str}/{page:int}")
async def cpu_search(keyword: str, page: int, state: ProcessListStep1 = Depends()):
    
    result = session.query(CPU).filter(CPU.name.like(f'%{keyword}%')).all()

    if state.mainboard != -1:
        mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
        result = [cpu for cpu in result if cpu.socket == mainboard.socket]
    
    if state.ram != -1:
        ram = session.query(RAM).filter(RAM.id == state.ram).first()
        result = [cpu for cpu in result if cpu.memory_type == ram.memory_type]
    
    if state.ssd != -1:
        ssd = session.query(SSD).filter(SSD.id == state.ssd).first()
        # result = [cpu for cpu in result if cpu.pcie_version == ssd.]

    # result = session.query(CPU).filter(CPU.name.like(f'%{keyword}%')).offset((page-1)*10).limit(10).all()
    
    return result
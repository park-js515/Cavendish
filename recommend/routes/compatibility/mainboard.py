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

from fastapi.responses import JSONResponse

from core.mainboard import *

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/mainboard", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{keyword:str}/{page:int}")
async def mainboard_search(keyword: str, page: int=1, state: ProcessListStep1 = Depends()):
    mainboard = session.query(Mainboard).filter(Mainboard.name.like(f'%{keyword}%')).all()
    page_size = (len(mainboard) // 10) + 1
    if page > page_size:
        return JSONResponse(content={"error": "Bad Request"}, status_code=400)
    try:
        result = []

        for i in range(len(mainboard)):
            item = {
                'data': mainboard[i],
                'compatibility': [],
            }
            result.append(item)

        if state.cpu != -1:
            # cpu 소켓
            cpu = session.query(CPU).filter(CPU.id == state.cpu).first()
            for target in result:
                mainboard_com_cpu(target, cpu)

        if state.case != -1:
            # 폼팩터 크기
            case = session.query(Case).filter(Case.id == state.case).first()
            mainboard_com_case(result, case)

        if state.ram != -1:
            # 램 타입, 램 개수, xmp, expo
            ram = session.query(RAM).filter(RAM.id == state.ram).first()
            for target in result:
                mainboard_com_ram(target, ram, state.ram_num)

        if state.ssd != -1:
            # ssd 타입, ssd 개수,
            ssd = session.query(SSD).filter(SSD.id == state.ssd).first()
            mainboard_com_ssd(result, ssd)

        if state.gpu != -1:
            # 그래픽카드 인터페이스
            gpu = session.query(GPU).filter(GPU.id == state.gpu).first()
            mainboard_com_gpu(result, gpu)


        headers = {"max_page": str(page_size)}

        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)

        return response
    except:
        return JSONResponse(content={"error": "Bad Request"}, status_code=400)
    finally:
        session.close()


    return result
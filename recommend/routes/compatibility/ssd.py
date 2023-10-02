from fastapi import FastAPI, APIRouter, Depends, Query
from typing import List, Optional
from models.cpu import CPU
from models.mainboard import Mainboard
from models.ssd import SSD
from models.power import Power

from fastapi.responses import JSONResponse

from core.ssd import *

from schemas.search import ProcessListStep1
from schemas.ssd import SSDSchema, serialize_ssd

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/ssd", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[SSDSchema])
async def ssd_search(page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
    ssd = session.query(SSD).filter(SSD.name.like(f'%{keyword}%')).all()
    page_size = (len(ssd) // 10) + 1

    try:
        result = []
        if page > page_size:
            return JSONResponse(content={"error": "Bad Request page"}, status_code=400)

        for i in range(len(ssd)):
            item = {
                'data': ssd[i],
                'compatibility': [],
            }
            result.append(item)

        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
            for target in result:
                ssd_com_mainboard(target, mainboard)

        if state.power != -1:
            power = session.query(Power).filter(Power.id == state.power).first()
            for target in result:
                ssd_com_power(target, power)

        if state.cpu != -1:
            cpu = session.query(CPU).filter(CPU.id == state.cpu).first()
            for target in result:
                ssd_com_cpu(target, cpu)

        result = sorted(result, key=lambda x: len(x['compatibility']))
        for i, item in enumerate(result):
            result[i] = serialize_ssd(result[i]['data'], result[i]['compatibility'], page_size)
        headers = {"max_page": str(page_size)}

        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        return response
    except Exception as e:
        return JSONResponse(content={"error": "Bad Request", "message": f'{e}'}, status_code=400)
    finally:
        session.close()

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
from schemas.power import serialize_power
from core.gpu import gpu_com_power, gpu_com_power_port
from core.power import power_com_ssd, power_com_case, power_com_case_support

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/power", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{keyword:str}/{page:int}")
async def power_search(keyword: str, page: int, state: ProcessListStep1 = Depends()):
    power = session.query(Power).filter(Power.name.like(f'%{keyword}%')).all()
    max_page = len(power)//10 + 1
    if page > max_page:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
    try:
        result = []
        for i in range(len(power)):
            item = {
                'data' : power[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.gpu != -1:
            gpu = session.query(GPU).filter(GPU.id == state.gpu).first()
            for i in range(len(result)):
                if gpu_com_power(gpu.recommend_power, result[i]['data'].rated_power):
                    pass
                else:
                    result[i]['compatibility'].append('gpu')
                    continue
                if gpu_com_power_port(gpu.pin, result[i]['data'].pcie_16pin, result[i]['data'].pcie_8pin, result[i]['data'].pcie_6pin):
                    pass
                else:
                    result[i]['compatibility'].append('gpu')

        if state.case != -1:
            case = session.query(Case).filter(Case.id == state.case).first()
            for i in range(len(result)):
                if case.power_included != '파워미포함' and case.power_included != None and case.power_included != '':
                    result[i]['compatibility'].append('case')
                    continue                   
                if power_com_case(result[i]['data'].depth, case.power_size):
                    pass
                else:
                    result[i]['compatibility'].append('case')
                    continue
                if power_com_case_support(result[i]['data'].category, case.power_support):
                    pass
                else:
                    result[i]['compatibility'].append('case')

        if state.ssd != -1:
            ssd = session.query(SSD).filter(SSD.id == state.ssd).first()    
            for i in range(len(result)):
                if power_com_ssd(result[i]['data'].sata, ssd.interface):
                    pass
                else:
                    result[i]['compatibility'].append('ssd')
        
        result = sorted(result, key=lambda x: len(x["compatibility"]))

        for i, item in enumerate(result):
            result[i] = serialize_power(result[i]['data'], result[i]['compatibility'])

        headers = {"max_page": str(max_page)}
        # 데이터를 리스트에 넣을 필요가 있는 경우만 리스트로 만듦
        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        # response = JSONResponse(content=result, status_code=200, headers=headers)

        session.close()
        return response
    
    except:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)

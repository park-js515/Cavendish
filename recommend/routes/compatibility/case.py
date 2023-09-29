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

from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case, power_com_case_support
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/case"
)

@router.get("/{page:int}", response_model=List[CaseSchema])
async def case_search(page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
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
            for i in range(len(result)):
                if case_com_mainboard(result[i]['data'].board_support, mainboard.form_factor):
                    pass
                else:
                    result[i]['compatibility'].append('mainboard') 

        if state.cooler != -1:
            cooler = session.query(Cooler).filter(Cooler.id == state.cooler).first()
            for i in range(len(result)):
                if case_com_cooler(result[i]['data'].cpu_cooler_size, result[i]['data'].liquid_cooler, result[i]['data'].radiator_top, result[i]['data'].radiator_front, result[i]['data'].radiator_rear, result[i]['data'].radiator_side, cooler.category, cooler.height, cooler.cooling_type, cooler.fan_size, cooler.fan_count):
                    pass
                else:
                    result[i]['compatibility'].append('cooler')
        
        result = sorted(result, key=lambda x: len(x['compatibility']))

        for i, item in enumerate(result):
            if result[i]['data'].board_support == None or result[i]['data'].board_support == 0:
                result[i]['data'].board_support = []
            else:
                result[i]['data'].board_support = decimal_to_name(result[i]['data'].board_support, len(case_com['board_support']), case_com['board_support'])
            
            if result[i]['data'].external_port == None or result[i]['data'].external_port == 0:
                result[i]['data'].external_port = []
            else:    
                result[i]['data'].external_port = decimal_to_name(result[i]['data'].external_port, len(case_com['external_port']), case_com['external_port'])
            
            if result[i]['data'].feature == None or result[i]['data'].feature == 0:
                result[i]['data'].feature = []
            else:    
                result[i]['data'].feature = decimal_to_name(result[i]['data'].feature, len(case_com['feature']), case_com['feature'])
            result[i] = serialize_case(result[i]['data'], result[i]['compatibility'])

        headers = {"max_page": str(max_page)}

        return JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)

    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f"{e}"}, status_code=400)
    
    finally:
        session.close()
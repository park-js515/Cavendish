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

from schemas.cooler import CoolerSchema, serialize_cooler
from schemas.search import ProcessListStep1

from core.common import decimal_to_name
from core.case import case_com_cooler
from core.com_data import cooler_com

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/cooler", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[CoolerSchema])
async def cooler_search(page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
    cooler = session.query(Cooler).filter(Cooler.name.like(f'%{keyword}%')).all()
    max_page = len(cooler)//10 + 1

    try:
        if page > max_page:
            return JSONResponse(content=result, status_code=400)
        result = []
        for i in range(len(cooler)):
            item = {
                'data' : cooler[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.case != -1:
            case = session.query(Case).filter(Case.id == state.case).first()
            for i in range(len(result)):
                if case_com_cooler(case, result[i]['data']):
                    pass
                else:
                    result[i]['compatibility'].append('case')

        for i, item in enumerate(result):
            if result[i]['data'].intel_socket == None or result[i]['data'].intel_socket == 0:
                result[i]['data'].intel_socket = []
            else:
                result[i]['data'].intel_socket = decimal_to_name(result[i]['data'].intel_socket, len(cooler_com['intel_socket']), cooler_com['intel_socket'])
            
            if result[i]['data'].amd_socket == None or result[i]['data'].amd_socket == 0:
                result[i]['data'].amd_socket = []
            else:    
                result[i]['data'].amd_socket = decimal_to_name(result[i]['data'].amd_socket, len(cooler_com['amd_socket']), cooler_com['amd_socket'])
            
            if result[i]['data'].feature == None or result[i]['data'].feature == 0:
                result[i]['data'].feature = []
            else:    
                result[i]['data'].feature = decimal_to_name(result[i]['data'].feature, len(cooler_com['feature']), cooler_com['feature'])
            result[i] = serialize_cooler(result[i]['data'], result[i]['compatibility'], max_page)

            headers = {"max_page": str(max_page)}


        return JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)

    except Exception as e:
        return JSONResponse(content={"error": "Bad Request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
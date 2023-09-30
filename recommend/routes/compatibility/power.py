from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
from models.gpu import GPU
from models.case import Case
from models.ssd import SSD
from models.power import Power

from schemas.search import ProcessListStep1
from schemas.power import PowerSchema, serialize_power
from core.gpu import gpu_com_power, gpu_com_power_port
from core.power import power_com_ssd, power_com_case, power_com_case_support
from core.com_data import power_com
from core.common import decimal_to_name

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/power", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[PowerSchema])
async def power_search( page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
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
            if result[i]['data'].protection == None or result[i]['data'].protection == 0:
                result[i]['data'].protection = []
            else:
                result[i]['data'].protection = decimal_to_name(result[i]['data'].protection, len(power_com['protection']), power_com['protection'])
            
            if result[i]['data'].inside == None or result[i]['data'].inside == 0:
                result[i]['data'].inside = []
            else:    
                result[i]['data'].inside = decimal_to_name(result[i]['data'].inside, len(power_com['inside']), power_com['inside'])
            
            if result[i]['data'].feature == None or result[i]['data'].feature == 0:
                result[i]['data'].feature = []
            else:    
                result[i]['data'].feature = decimal_to_name(result[i]['data'].feature, len(power_com['feature']), power_com['feature'])
            result[i] = serialize_power(result[i]['data'], result[i]['compatibility'])

        headers = {"max_page": str(max_page)}
        # 데이터를 리스트에 넣을 필요가 있는 경우만 리스트로 만듦
        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        # response = JSONResponse(content=result, status_code=200, headers=headers)

        return response
    
    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f'{e}'}, status_code=400)
    finally:
        session.close()
        

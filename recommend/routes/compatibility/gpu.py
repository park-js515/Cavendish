from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from typing import List
from models.cpu import CPU
from models.mainboard import Mainboard
from models.gpu import GPU
from models.case import Case
from models.power import Power

from core.gpu import gpu_com_case, gpu_com_cpu, gpu_com_mainboard, gpu_com_power
from core.common import decimal_to_name
from core.com_data import gpu_com
from schemas.search import ProcessListStep1
from schemas.gpu import GPUSchema, serialize_gpu

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/gpu", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[GPUSchema])
async def gpu_search( page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
    gpu = session.query(GPU).filter(GPU.name.like(f'%{keyword}%')).all()
    max_page = len(gpu) // 10 + 1
    try:
        result = []
        if page > max_page:
            return JSONResponse(content=result, status_code=400)

        for i in range(len(gpu)):
            item = {
                'data' : gpu[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.cpu != -1:
            cpu = session.query(CPU).filter(CPU.id == state.cpu).first()
            for i in range(len(result)):
                if gpu_com_cpu(result[i]['data'], cpu):
                    continue
                else:
                    result[i]['compatibility'].append('cpu')
        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
            for i in range(len(result)):
                if gpu_com_mainboard(result[i]['data'], mainboard):
                    continue
                else:
                    result[i]['compatibility'].append('mainboard')
        if state.power != -1:
            
            power = session.query(Power).filter(Power.id == state.power).first()
            for i in range(len(result)):
                if gpu_com_power(result[i]['data'], power):
                    pass
                else:
                    result[i]['compatibility'].append('power')

        if state.case != -1:
            for i in range(len(result)):
                case = session.query(Case).filter(Case.id == state.case).first()
                if gpu_com_case(result[i]['data'], case):
                    continue
                else:
                    result[i]['compatibility'].append('case')

        result = sorted(result, key=lambda x: len(x["compatibility"]))

        for i, item in enumerate(result):
            if result[i]['data'].port == None or result[i]['data'].port == 0:
                result[i]['data'].port = []
            else:
                result[i]['data'].port = decimal_to_name(result[i]['data'].port, len(gpu_com['port']), gpu_com['port'])
            
            if result[i]['data'].additional_function == None or result[i]['data'].additional_function == 0:
                result[i]['data'].additional_function = []
            else:    
                result[i]['data'].additional_function = decimal_to_name(result[i]['data'].additional_function, len(gpu_com['additional_function']), gpu_com['additional_function'])
            
            if result[i]['data'].feature == None or result[i]['data'].feature == 0:
                result[i]['data'].feature = []
            else:    
                result[i]['data'].feature = decimal_to_name(result[i]['data'].feature, len(gpu_com['feature']), gpu_com['feature'])
            if result[i]['data'].cooling_type == None or result[i]['data'].cooling_type == 0:
                result[i]['data'].cooling_type = []
            else:    
                result[i]['data'].cooling_type = decimal_to_name(result[i]['data'].cooling_type, len(gpu_com['cooling_type']), gpu_com['cooling_type'])

            result[i] = serialize_gpu(result[i]['data'], result[i]['compatibility'], max_page)

        headers = {"max_page": str(max_page)}
    # 데이터를 리스트에 넣을 필요가 있는 경우만 리스트로 만듦
        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        # response = JSONResponse(content=result, status_code=200, headers=headers)
        return response

    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
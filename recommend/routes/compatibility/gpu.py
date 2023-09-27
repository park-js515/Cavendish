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

from core.gpu import gpu_com_case, gpu_com_cpu, gpu_com_mainboard, gpu_com_power, gpu_com_power_port

from schemas.search import ProcessListStep1
from schemas.gpu import GPUSchema, serialize_gpu

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/gpu", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{keyword:str}/{page:int}")
async def gpu_search(keyword: str, page: int, state: ProcessListStep1 = Depends()):
    gpu = session.query(GPU).filter(GPU.name.like(f'%{keyword}%')).all()
    max_page = len(gpu) // 10 + 1
    if page > max_page:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
    try:
        result = []

        for i in range(len(gpu)):
            item = {
                'data' : gpu[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.cpu != -1:
            cpu = session.query(CPU).filter(CPU.id == state.cpu).first()
            for i in range(len(result)):
                if gpu_com_cpu(result[i]['data'].interface, cpu.pcie_version):
                    continue
                else:
                    result[i]['compatibility'].append('cpu')
        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
            for i in range(len(result)):
                if gpu_com_mainboard(result[i]['data'].interface, mainboard.vga_connection):
                    continue
                else:
                    result[i]['compatibility'].append('mainboard')
        if state.power != -1:
            
            power = session.query(Power).filter(Power.id == state.power).first()
            for i in range(len(result)):
                if gpu_com_power(result[i]['data'].recommend_power, power.rated_power):
                    pass
                else:
                    result[i]['compatibility'].append('power')
                    continue
                if gpu_com_power_port(result[i]['data'].pin, power.pcie_16pin, power.pcie_8pin, power.pcie_6pin):
                    pass
                else:
                    result[i]['compatibility'].append('power')
                    
        if state.case != -1:
            for i in range(len(result)):
                case = session.query(Case).filter(Case.id == state.case).first()
                if gpu_com_case(result[i]['data'].length, case.gpu_size):
                    continue
                else:
                    result[i]['compatibility'].append('case')

        result = sorted(result, key=lambda x: len(x["compatibility"]))

        for i in range(len(result)):
            result[i] = serialize_gpu(result[i]['data'], result[i]['compatibility'])

        headers = {"max_page": str(max_page)}
    # 데이터를 리스트에 넣을 필요가 있는 경우만 리스트로 만듦
        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        # response = JSONResponse(content=result, status_code=200, headers=headers)

        session.close()
        return response

    except:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
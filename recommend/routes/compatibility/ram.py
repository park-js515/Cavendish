from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from typing import List, Optional
from models.cpu import CPU
from models.mainboard import Mainboard
from models.ram import RAM

from schemas.ram import RAMSchema, serialize_ram

from schemas.search import ProcessListStep1
from core.ram import ram_com_cpu, ram_com_mainboard, ram_com_mainboard_expo, ram_com_mainboard_xmp, ram_com_num
from core.com_data import ram_com
from core.common import decimal_to_name

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/ram", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[RAMSchema])
async def ram_search(page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
    ram = session.query(RAM).filter(RAM.name.like(f'%{keyword}%')).all()
    max_page = len(ram)//10 + 1
    if page > max_page:
        return JSONResponse(content={"error" : "Bad Request"}, status_code=400)
    
    
    try:
        result = []

        for i in range(len(ram)):
            item = {
                'data' : ram[i],
                'compatibility' : [],
            }
            result.append(item)

        if state.cpu != -1:
            cpu = session.query(CPU).filter(CPU.id == state.cpu).first()
            for i in range(len(ram)):
                if ram_com_cpu(ram[i].generation, cpu.memory_type):
                    continue
                else:
                    result[i]['compatibility'].append('cpu')
    
        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
            for i in range(len(result)):
                if ram_com_mainboard(result[i]['data'].generation, mainboard.memory_type):
                    pass
                else:
                    result[i]['compatibility'].append('mainboard')
                    continue
                if ram_com_num(ram[i].capacity, state.ram_num, mainboard.memory_number, mainboard.memory_capacity):
                    pass
                else:
                    result[i]['compatibility'].append('mainboard')
                # 오버클럭 호환성 로직 추가

        result = sorted(result, key=lambda x: len(x["compatibility"]))
    # 비트마스킹 변환
        for i, item in enumerate(result):
            result[i] = serialize_ram(result[i]['data'], result[i]['compatibility'])

        headers = {"max_page": str(max_page)}
    # 데이터를 리스트에 넣을 필요가 있는 경우만 리스트로 만듦
        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        # response = JSONResponse(content=result, status_code=200, headers=headers)

        return response
        

    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f"{e}"}, status_code=400)
    finally:
        session.close()
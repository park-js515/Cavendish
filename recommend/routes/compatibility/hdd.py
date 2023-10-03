from fastapi import FastAPI, APIRouter, Depends, Query
from typing import List
from models.hdd import HDD
from models.mainboard import Mainboard
from models.case import Case

from fastapi.responses import JSONResponse

from core.hdd import *

from schemas.search import ProcessListStep1
from schemas.hdd import HDDSchema, serialize_hdd

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/hdd", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

@router.get("/{page:int}", response_model=List[HDDSchema])
async def hdd_search(page: int=1, keyword: str="", state: ProcessListStep1 = Depends()):
    hdd = session.query(HDD).filter(HDD.name.like(f'%{keyword}%')).all()
    page_size = (len(hdd) // 10) + 1
    try:
        result = []
        if page > page_size:
            return JSONResponse(content=result, status_code=400)

        for i in range(len(hdd)):
            item = {
                'data': hdd[i],
                'compatibility': [],
            }
            result.append(item)

        if state.mainboard != -1:
            mainboard = session.query(Mainboard).filter(Mainboard.id == state.mainboard).first()
            for target in result:
                if hdd_com_mainboard(target['data'], mainboard):
                    pass
                else:
                    target['compatibility'].append('mainboard')

        if state.case != -1:
            case = session.query(Case).filter(Case.id == state.case).first()
            for target in result:
                if hdd_com_case(target['data'], case):
                    pass
                else:
                    target['compatibility'].append('case')

        result = sorted(result, key=lambda x: len(x['compatibility']))
        for i, item in enumerate(result):
            result[i] = serialize_hdd(result[i]['data'], result[i]['compatibility'], page_size)
        headers = {"max_page": str(page_size)}

        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        return response
    except Exception as e:
        return JSONResponse(content={"error": "Bad Request", "message": f'{e}'}, status_code=400)
    finally:
        session.close()
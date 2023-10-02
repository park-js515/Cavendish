from fastapi import FastAPI, APIRouter, Depends, Query
from typing import List, Optional
from models.hdd import HDD
from models.cpu import CPU
from models.mainboard import Mainboard, MainboardPCI
from models.ram import RAM
from models.gpu import GPU
from models.case import Case
from models.ssd import SSD

from fastapi.responses import JSONResponse

from core.mainboard import *
from core.common import decimal_to_name
from core.com_data import mainboard_com

from schemas.search import ProcessListStep1
from schemas.mainboard import MainboardSchema, serialize_mainboard, serialize_mainboard_pci

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/search/mainboard", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리


@router.get("/{page:int}", response_model=List[MainboardSchema])
async def mainboard_search(page: int = 1, keyword: str = "", state: ProcessListStep1 = Depends()):
    mainboard = session.query(Mainboard).filter(Mainboard.name.like(f'%{keyword}%')).all()
    page_size = (len(mainboard) // 10) + 1
    try:
        result = []
        if page > page_size:
            return JSONResponse(content=result, status_code=400)

        for i in range(len(mainboard)):
            mainboard_pci = session.query(MainboardPCI).filter(MainboardPCI.mainboard_id == mainboard[i].id).all()

            item = {
                'data': mainboard[i],
                'pci': mainboard_pci,
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
            for target in result:
                mainboard_com_case(target, case)

        if state.ram != -1:
            # 램 타입, 램 개수, xmp, expo
            ram = session.query(RAM).filter(RAM.id == state.ram).first()
            for target in result:
                mainboard_com_ram(target, ram, state.ram_num)

        if state.ssd != -1:
            # ssd 타입, ssd 개수,
            ssd = session.query(SSD).filter(SSD.id == state.ssd).first()
            for target in result:
                mainboard_com_ssd(target, ssd)

        if state.gpu != -1:
            # 그래픽카드 인터페이스
            gpu = session.query(GPU).filter(GPU.id == state.gpu).first()
            for target in result:
                mainboard_com_gpu(target, gpu)

        result = sorted(result, key=lambda x: len(x['compatibility']))

        for i, item in enumerate(result):
            if result[i]['data'].m2_interface == None or result[i]['data'].m2_interface == 0:
                result[i]['data'].m2_interface = []
            else:
                result[i]['data'].m2_interface = decimal_to_name(result[i]['data'].m2_interface, len(mainboard_com['m2_interface']), mainboard_com['m2_interface'])
            
            if result[i]['data'].m2_formfactor == None or result[i]['data'].m2_formfactor == 0:
                result[i]['data'].m2_formfactor = []
            else:    
                result[i]['data'].m2_formfactor = decimal_to_name(result[i]['data'].m2_formfactor, len(mainboard_com['m2_formfactor']), mainboard_com['m2_formfactor'])
            
            if result[i]['data'].feature == None or result[i]['data'].feature == 0:
                result[i]['data'].feature = []
            else:    
                result[i]['data'].feature = decimal_to_name(result[i]['data'].feature, len(mainboard_com['feature']), mainboard_com['feature'])
            if result[i]['data'].wireless_lan == None or result[i]['data'].wireless_lan == 0:
                result[i]['data'].wireless_lan = []
            else:    
                result[i]['data'].wireless_lan = decimal_to_name(result[i]['data'].wireless_lan, len(mainboard_com['wireless_lan']), mainboard_com['wireless_lan'])
            if result[i]['data'].graphic_output == None or result[i]['data'].graphic_output == 0:
                result[i]['data'].graphic_output = []
            else:
                result[i]['data'].graphic_output = decimal_to_name(result[i]['data'].graphic_output, len(mainboard_com['graphic_output']), mainboard_com['graphic_output'])
            if result[i]['data'].pcie_version == None or result[i]['data'].pcie_version == 0:
                result[i]['data'].pcie_version = []
            else:
                result[i]['data'].pcie_version = decimal_to_name(result[i]['data'].pcie_version, len(mainboard_com['pcie_version']), mainboard_com['pcie_version'])
            if result[i]['data'].io_header == None or result[i]['data'].io_header == 0:
                result[i]['data'].io_header = []
            else:
                result[i]['data'].io_header = decimal_to_name(result[i]['data'].io_header, len(mainboard_com['io_header']), mainboard_com['io_header'])
            result[i] = serialize_mainboard(result[i]['data'], result[i]['pci'], result[i]['compatibility'], page_size)
            
        headers = {"max_page": str(page_size)}

        response = JSONResponse(content=result[(page-1)*10:page*10], status_code=200, headers=headers)
        return response
    except Exception as e:
        return JSONResponse(content={"error": "Bad Request", "message": f'{e}'}, status_code=400)
    finally:
        session.close()
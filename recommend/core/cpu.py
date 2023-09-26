from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
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

from .com_data import cpu_com

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

def cpu_com_mainboard(target, check):
    check_len = len(cpu_com['pcie_version'])
    result = []
    for item in target:
        if check.pcie_version == 0 or item['data'].pcie_version == 0 or item['data'].pcie_version == None:
            item['compatibility'].append('mainboard')
        # 메인보드 pcie 버전 3.0
        elif 4 <= check.pcie_version and check.pcie_version <=7:
            if (item['data'].pcie_version / 4) % 2 == 1: 
                pass
            else:
                item['compatibility'].append('mainboard')
            # item['data'].pcie_version = decimal_to_name(item['data'].pcie_version, check_len, cpu_com['pcie_version'])

        # 메인보드 pcie 버전 4.0
        elif 8 <= check.pcie_version and check.pcie_version <= 15:
            if  (item['data'].pcie_version / 2) % 2 == 1 or (item['data'].pcie_version / 4) % 2 == 1:
                pass
            else:
                item['compatibility'].append('mainboard')
            # item['data'].pcie_version = decimal_to_name(item['data'].pcie_version, check_len, cpu_com['pcie_version'])

        # 메인보드 pcie 버전 5.0    
        elif 16 <= check.pcie_version:
            if item['data'].pcie_version % 2 == 1 or (item['data'].pcie_version / 2) % 2 == 1 or (item['data'].pcie_version / 4) % 2 == 1:
                pass
            else:
                item['compatibility'].append('mainboard')
            # item['data'].pcie_version = decimal_to_name(item['data'].pcie_version, check_len, cpu_com['pcie_version'])
        result.append(item)

    return result

def cpu_com_ram(target, check):
    check_len = len(cpu_com['memory_type'])
    result = []
    for item in target:
        if item['data'].memory_type == None or item['data'].memory_type == 0:
            item['compatibility'].append('ram')
            result.append(item)
            continue
        # item['data'].memory_type = decimal_to_name(item['data'].memory_type, check_len, cpu_com['memory_type'])
        if check.generation in item['data'].memory_type:
            pass
        else:
            item['compatibility'].append('ram')
        result.append(item)
    return result

def cpu_com_ssd(target, check):
    check_len = len(cpu_com['pcie_version'])
    result = []

    for item in target:
        if item['data'].pcie_version == None or item['data'].pcie_version == 0:
            item['compatibility'].append('ssd')
            result.append(item)
            continue
        # ssd pcie 버전 3.0
        if check.interface[5] == '3':
            if item['data'].pcie_version % 2 == 1 or (item['data'].pcie_version / 2) % 2 == 1 or (item['data'].pcie_version / 4) % 2 == 1:
                pass
            else:
                item['compatibility'].append('ssd')
        # ssd pcie 버전 4.0
        elif check.interface[5] == '4':
            if  item['data'].pcie_version % 2 == 1 or (item['data'].pcie_version / 2) % 2 == 1:
                pass
            else:
                item['compatibility'].append('ssd')
        # ssd pcie 버전 5.0
        elif check.interface[5] == '5':
            if  item['data'].pcie_version % 2 == 1:
                pass
            else:
                item['compatibility'].append('ssd')
        result.append(item)
    
    return result
            
        

    
# def cpu_com_hdd(target, check):
#     check_len = len(cpu_com['pcie_version'])
#     result = []

#     for item in target:
#         if item['item'].pcie_version == None or item['data'].pcie_version == 0:
#             item['compatibility'] = False
#             result.append(item)
#             continue
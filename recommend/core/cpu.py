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
from .common import decimal_to_name

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

def cpu_com_mainboard(cpu, mainboard):
    check_len = len(cpu_com['pcie_version'])
    result = []
    
    if mainboard.cpu_socket != cpu.socket:
        return False

    elif mainboard.pcie_version == 0 or cpu.pcie_version == 0 or cpu.pcie_version == None:
        return False
    # 메인보드 pcie 버전 3.0
    elif 4 <= mainboard.pcie_version and mainboard.pcie_version <=7:
        if (cpu.pcie_version / 4) % 2 == 1:
            return True
        else:
            return False
        # cpu.pcie_version = decimal_to_name(cpu.pcie_version, mainboard_len, cpu_com['pcie_version'])

    # 메인보드 pcie 버전 4.0
    elif 8 <= mainboard.pcie_version and mainboard.pcie_version <= 15:
        if  (cpu.pcie_version / 2) % 2 == 1 or (cpu.pcie_version / 4) % 2 == 1:
            return True
        else:
            return False
        # cpu.pcie_version = decimal_to_name(cpu.pcie_version, mainboard_len, cpu_com['pcie_version'])

    # 메인보드 pcie 버전 5.0    
    elif 16 <= mainboard.pcie_version:
        if cpu.pcie_version % 2 == 1 or (cpu.pcie_version / 2) % 2 == 1 or (cpu.pcie_version / 4) % 2 == 1:
            return True
        else:
            return False
        # item['data'].pcie_version = decimal_to_name(item['data'].pcie_version, mainboard_len, cpu_com['pcie_version'])
    

    return True

def cpu_com_ram(cpu, ram):
    check_len = len(cpu_com['memory_type'])
    result = []
    if cpu.memory_type == None or cpu.memory_type == 0:
        return False
    # cpu.memory_type = decimal_to_name(cpu.memory_type, check_len, cpu_com['memory_type'])
    if ram.generation in decimal_to_name(cpu.memory_type, check_len, cpu_com['memory_type']):
        return True
    else:
        return False

def cpu_com_ssd(cpu, ssd):

    if cpu.pcie_version == None or cpu.pcie_version == 0:
        return False
    # ssd pcie 버전 3.0
    if ssd.interface[5] == '3':
        if cpu.pcie_version % 2 == 1 or (cpu.pcie_version / 2) % 2 == 1 or (cpu.pcie_version / 4) % 2 == 1:
            return True
        else:
            return False
    # ssd pcie 버전 4.0
    elif ssd.interface[5] == '4':
        if  cpu.pcie_version % 2 == 1 or (cpu.pcie_version / 2) % 2 == 1:
            return True
        else:
            return False
    # ssd pcie 버전 5.0
    elif ssd.interface[5] == '5':
        if  cpu.pcie_version % 2 == 1:
            return True
        else:
            return False
    
    return True
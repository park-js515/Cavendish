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

from core.calc import decimal_to_binary

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

cpu_com = {
    # ram 호환
    'memory_type' : {
        0 : 'DDR5',
        1 : 'DDR4',
        2 : 'DDR3L',
        3 : 'DDR3',
        4 : 'DDR2'
    },
    # 메인 보드, ssd, hdd 호환
    'pcie_version' : {
        0 : 'PCIe5.0',
        1 : 'PCIe4.0',
        2 : 'PCIe3.0'
    }
}

mainboard_com = {
    # ssd 호환
    'm2_interface' : {
        0 : 'SATA',
        1 : 'NVMe',
        2 : 'PCIe',
        3 : 'PCIe4.0',
        4 : 'PCIe5.0'
    },
    # ssd 호환
    'm2_formfactor' : {
        0 : '2230',
        1 : '2242',
        2 : '2260',
        3 : '2280',
        4 : '2580',
        5 : '22110',
        6 : '25110'
    },
    
    'wireless_lan' : {
        0 : '무선 LAN',
        1 : '블루투스',
        2 : 'M.2 Key-E(모듈별매)'
    },
    'graphic_output' : {
        0 : 'Type-C',
        1 : 'DP',
        2 : 'HDMI',
        3 : 'DVI',
        4 : 'D-SUB'
    },
    'pcie_version' : {
        0 : 'PCI',
        1 : 'PCIe',
        2 : 'PCIe3.0',
        3 : 'PCIe4.0',
        4 : 'PCIe5.0'
    },
    'io_header' : {
        0 : '썬더볼트4 헤더',
        1 : '썬더볼트3 헤더',
        2 : 'USB4 헤더',
        3 : 'USB3.1 헤더',
        4 : 'USB3.0 헤더',
        5 : 'USB2.0 헤더',
        6 : 'USB3.2 Type C 헤더',
        7 : 'USB3.1 Type C 헤더',
        8 : 'USB3.0 Type C 헤더',
        9 : '스템팬 6핀 헤더',
        10 : 'RGB 12V 4핀 헤더',
        11 : 'ARGB 5V 3핀 헤더',
        12 : 'ARGB 6핀 헤더',
        13 : 'TMP 헤더'
    },
    'feature' : {
        0 : '전원부 방열판',
        1 : 'DrMOS',
        2 : 'SPS(DrMOS)',
        3 : 'M.2 히트싱크',
        4 : 'LED 라이트',
        5 : '일체형IO실드',
        6 : 'UEFI',
        7 : '인텔 TBMT 3.0 지원',
        8 : 'AMD APU 지원'
    }
}

# api_logic.py
def cpu_compatibility(input):
    target = session.query(CPU).all()
    result = []
    # 메인보드 호환
    if input.mainboard != -1:
        mainboard = session.query(Mainboard).filter(Mainboard.id == input.mainboard).first()
        target = [cpu for cpu in result if cpu.socket == mainboard.cpu_socket]
        mainboard_pcie = mainboard.pcie_version

        if mainboard_pcie != 0:
            pcie_list = []
            mainboard_pcie = bin(mainboard_pcie)[2:].zfill(5)
            for i in range(len(mainboard_pcie)):
                if mainboard_pcie[i] == '1':
                    pcie_list.append(mainboard_com['pcie_version'][len(mainboard_pcie) - i - 1])

            for i in range(len(target)):
                if target[i].pcie_version != 0:
                    target_pci = bin(target[i].pcie_version)[2:].zfill(3)
                    for j in range(len(target_pci)):
                        pass

            
            
    if input.ram != -1:
        ram = session.query(RAM).filter(RAM.id == input.ram).first()
        result = [cpu for cpu in result if cpu.memory_type == ram.memory_type]
    
    if input.ssd != -1:
        pass
        # ssd = sessi   n.query(SSD).filter(SSD.id == input.ssd).first()
        # result = [cpu for cpu in result if cpu.pcie_version == ssd.]

    return result
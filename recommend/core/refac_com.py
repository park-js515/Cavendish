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

from core.com_data import mainboard_com

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()


def mainboard_com_cpu(mainboard, cpu):
    mainboard_cpu_socket = mainboard.cpu_socket
    mainboard_pcie_version = mainboard.pcie_version
    cpu_socket = cpu.socket
    cpu_pcie_version = cpu.pcie_version

    if cpu_socket != mainboard_cpu_socket:
        return False

    elif cpu_pcie_version == 0 or mainboard_pcie_version == 0 or mainboard_pcie_version is None or cpu_pcie_version is None:
        return False

    # PCIe 3.0
    elif 4 <= mainboard_pcie_version <= 7:
        if cpu_pcie_version >> 2 == 0:
            return False

    # PCIe 4.0
    elif 8 <= mainboard_pcie_version <= 15:
        if cpu_pcie_version >> 1 == 0:
            return False
    
    # PCIe 5.0
    elif 16 <= mainboard_pcie_version:
        if cpu_pcie_version == 0:
            return False




def mainboard_com_ssd(mainboard_sata3_number, mainboard_m2_formfactor, mainboard_m2_number, mainboard_m2_interface, ssd_form_factor, ssd_interface, ssd_protocol):
    ssd_ff = ssd_form_factor
    ssd_if = ssd_interface
    mb_m2i = mainboard_m2_interface

    if ssd_ff is None:
        return False
    
    elif ssd_ff.startswith('M.2'):
        if mainboard_m2_number is None:
            return False

        if ssd_protocol is None and mb_m2i & (1 << 1) == 0:
            return False

        ssd_m2 = ssd_ff[ssd_ff.index('22'):-1]
        mb_m2 = mainboard_m2_formfactor
        if ssd_m2 == '2280':
            if mb_m2 & (1 << 3) == 0:
                return False
        elif ssd_m2 == '2230':
            if mb_m2 & (1 << 0) == 0:
                return False
        elif ssd_m2 == '2242':
            if mb_m2 & (1 << 1) == 0:
                return False
        elif ssd_m2 == '22110':
            if mb_m2 & (1 << 5) == 0:
                return False

    elif ssd_ff.startswith('6.4') or ssd_ff.startswith('4.6'):
        if mainboard_sata3_number is None:
            return False

    else:
        return False

    if ssd_if is None:
        return False
    elif ssd_if.startswith('SATA'):
        if mb_m2i & (1 << 0) == 0:
            return False
    elif ssd_if.startswith('PCI'):
        if ssd_if.startswith('PCIe5'):
            if target['data'].pcie_version & (1 << 4) == 0:
                target['compatibility'].append('ssd')
        elif ssd_if.startswith('PCIe4'):
            if target['data'].pcie_version & (3 << 3) == 0:
                target['compatibility'].append('ssd')
        elif ssd_if.startswith('PCIe3'):
            if target['data'].pcie_version & (7 << 2) == 0:
                target['compatibility'].append('ssd')
        elif ssd_if.startswith('PCIe2'):
            if target['data'].pcie_version & (15 << 1) == 0:
                target['compatibility'].append('ssd')

    else:
        target['compatibility'].append('ssd need check')

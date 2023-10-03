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


def ssd_com_mainboard(ssd, mainboard):
    ssd_ff = ssd.form_factor
    ssd_if = ssd.interface
    mb_m2i = mainboard.m2_interface

    if ssd_ff is None:
        return False

    elif ssd_ff.startswith('M.2'):
        if mainboard.m2_number is None:
            return False

        ssd_protocol = ssd.protocol
        if ssd_protocol is None and mb_m2i & (1 << 1) == 0:
            return False

        ssd_m2 = ssd_ff[ssd_ff.index('22'):-1]
        mb_m2 = mainboard.m2_formfactor
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
        if mainboard.sata3_number is None:
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
            if mainboard.pcie_version & (1 << 4) == 0:
                return False
        elif ssd_if.startswith('PCIe4'):
            if mainboard.pcie_version & (3 << 3) == 0:
                return False
        elif ssd_if.startswith('PCIe3'):
            if mainboard.pcie_version & (7 << 2) == 0:
                return False
        elif ssd_if.startswith('PCIe2'):
            if mainboard.pcie_version & (15 << 1) == 0:
                return False
    return True

def ssd_com_power(ssd, mainboard):
    if ssd.interface is None or ssd.interface == "":
        return False
    elif ssd.interface.startswith('SATA'):
        if mainboard.sata == 0 or mainboard.sata is None:
            return False
    return True


def ssd_com_cpu(ssd, cpu):
    ssd_if = ssd.interface

    if cpu.pcie_version is None or cpu.pcie_version == 0:
        return False

    elif ssd_if.startswith('PCI'):
        if ssd_if.startswith('PCIe5'):
            if cpu.pcie_version & (1 << 0) == 0:
                return False
        elif ssd_if.startswith('PCIe4'):
            if cpu.pcie_version & (1 << 1) == 0:
                return False
        elif ssd_if.startswith('PCIe3'):
            if cpu.pcie_version & (1 << 2) == 0:
                return False
    return True
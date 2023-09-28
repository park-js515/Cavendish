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


def ssd_com_mainboard(target, check):
    ssd_ff = target['data'].form_factor
    ssd_if = target['data'].interface
    mb_m2i = check.m2_interface

    if ssd_ff is None:
        target['compatibility'].append('mainboard')

    elif ssd_ff.startswith('M.2'):
        if check.m2_number is None:
            target['compatibility'].append('mainboard')
            return

        ssd_protocol = target['data'].protocol
        if ssd_protocol is None and mb_m2i & (1 << 1) == 0:
            target['compatibility'].append('mainboard')
            return

        ssd_m2 = ssd_ff[ssd_ff.index('22'):-1]
        mb_m2 = check.m2_formfactor
        if ssd_m2 == '2280':
            if mb_m2 & (1 << 3) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_m2 == '2230':
            if mb_m2 & (1 << 0) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_m2 == '2242':
            if mb_m2 & (1 << 1) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_m2 == '22110':
            if mb_m2 & (1 << 5) == 0:
                target['compatibility'].append('mainboard')

    elif ssd_ff.startswith('6.4') or ssd_ff.startswith('4.6'):
        if check.sata3_number is None:
            target['compatibility'].append('mainboard')
            return

    else:
        target['compatibility'].append('mainboard need check')
        return

    if ssd_if is None:
        target['compatibility'].append('mainboard')

    elif ssd_if.startswith('SATA'):
        if mb_m2i & (1 << 0) == 0:
            target['compatibility'].append('mainboard')

    elif ssd_if.startswith('PCI'):
        if ssd_if.startswith('PCIe5'):
            if check.pcie_version & (1 << 4) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_if.startswith('PCIe4'):
            if check.pcie_version & (3 << 3) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_if.startswith('PCIe3'):
            if check.pcie_version & (7 << 2) == 0:
                target['compatibility'].append('mainboard')
        elif ssd_if.startswith('PCIe2'):
            if check.pcie_version & (15 << 1) == 0:
                target['compatibility'].append('mainboard')

    else:
        target['compatibility'].append('mainboard need check')


def ssd_com_power(target, check):
    if target['data'].interface is None or target['data'].interface == "":
        target['compatibility'].append('power need check')
    elif target['data'].interface.startswith('SATA'):
        if check.sata == 0 or check.sata is None:
            target['compatibility'].append('power')


def ssd_com_cpu(target, check):
    ssd_if = target['data'].interface

    if check.pcie_version is None or check.pcie_version == 0:
        target['compatibility'].append('cpu')

    elif ssd_if.startswith('PCI'):
        if ssd_if.startswith('PCIe5'):
            if check.pcie_version & (1 << 0) == 0:
                target['compatibility'].append('cpu')
        elif ssd_if.startswith('PCIe4'):
            if check.pcie_version & (1 << 1) == 0:
                target['compatibility'].append('cpu')
        elif ssd_if.startswith('PCIe3'):
            if check.pcie_version & (1 << 2) == 0:
                target['compatibility'].append('cpu')
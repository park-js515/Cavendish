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


def mainboard_com_cpu(target, check):
    if check.socket != target['data'].cpu_socket:
        target['compatibility'].append('cpu')

    elif check.pcie_version == 0 or target['data'].pcie_version == 0 or target['data'].pcie_version:
        target['compatibility'].append('cpu')

    # PCIe 3.0
    elif 4 <= target['data'].pcie_version <= 7:
        if check.pcie_version << 2 == 0:
            target['compatibility'].append('cpu')

    # PCIe 4.0
    elif 8 <= target['data'].pcie_version <= 15:
        if check.pcie_version << 1 == 0:
            target['compatibility'].append('cpu')


def mainboard_com_case(target, check):
    mb_ff = target['data'].form_factor
    case_bs = check.board_support
    if mb_ff is None:
        target['compatibility'].append('case')

    elif 'E-ATX' == mb_ff:
        if case_bs & (1 << 0) == 0:
            target['compatibility'].append('case')

    elif 'ATX' == mb_ff:
        if case_bs & (1 << 1) == 0:
            target['compatibility'].append('case')

    elif 'M-ATX' == mb_ff:
        if case_bs & (1 << 2) == 0:
            target['compatibility'].append('case')

    elif 'M-iTX' == mb_ff:
        if case_bs & (1 << 5) == 0:
            target['compatibility'].append('case')

    elif 'CEB' == mb_ff:
        if case_bs & (1 << 6) == 0:
            target['compatibility'].append('case')

    elif 'EEB' == mb_ff:
        if case_bs & (1 << 7) == 0:
            target['compatibility'].append('case')

    elif 'M-DTX' == mb_ff:
        if case_bs & (1 << 8) == 0:
            target['compatibility'].append('case')

    else:
        target['compatibility'].append('case need check')


def mainboard_com_ram(target, check, ram_num):
    if check.generation != target['data'].memory_type:
        target['compatibility'].append('ram')

    elif check.number * ram_num > target['data'].memory_number:
        target['compatibility'].append('ram')

    elif check.capacity * check.number * ram_num > target['data'].memory_capacity:
        target['compatibility'].append('ram')


def mainboard_com_ssd(target, check):
    ssd_ff = check.form_factor
    ssd_if = check.interface
    mb_m2i = target['data'].m2_interface

    if ssd_ff is None:
        target['compatibility'].append('ssd')

    elif ssd_ff.startswith('M.2'):
        if target['data'].m2_number is None:
            target['compatibility'].append('ssd')
            return

        ssd_protocol = check.protocol
        if ssd_protocol is None and mb_m2i & (1 << 1) == 0:
            target['compatibility'].append('ssd')
            return

        ssd_m2 = ssd_ff[ssd_ff.index('22'):-1]
        mb_m2 = target['data'].m2_formfactor
        if ssd_m2 == '2280':
            if mb_m2 & (1 << 3) == 0:
                target['compatibility'].append('ssd')
        elif ssd_m2 == '2230':
            if mb_m2 & (1 << 0) == 0:
                target['compatibility'].append('ssd')
        elif ssd_m2 == '2242':
            if mb_m2 & (1 << 1) == 0:
                target['compatibility'].append('ssd')
        elif ssd_m2 == '22110':
            if mb_m2 & (1 << 5) == 0:
                target['compatibility'].append('ssd')

    elif ssd_ff.startswith('6.4') or ssd_ff.startswith('4.6'):
        if target['data'].sata3_number is None:
            target['compatibility'].append('ssd')
            return

    else:
        target['compatibility'].append('ssd need check')
        return

    if ssd_if is None:
        target['compatibility'].append('ssd')

    elif ssd_if.startswith('SATA'):
        if mb_m2i & (1 << 0) == 0:
            target['compatibility'].append('ssd')

    elif ssd_if.startswith('PCI'):
        if ssd_if.startswith('PCIe5'):
            pass
        elif ssd_if.startswith('PCIe4'):
            pass
        elif ssd_if.startswith('PCIe3'):
            pass
        elif ssd_if.startswith('PCIe2'):
            pass

    else:
        target['compatibility'].append('ssd need check')


def mainboard_com_gpu(target, check):
    vga_connection = target['data'].vga_connection.replace(' ', '')
    interface = check.interface.replace(' ', '')
    if vga_connection not in interface:
        target['compatibility'].append('gpu')
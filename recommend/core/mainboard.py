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
    if cpu.socket is None or mainboard.cpu_socket is None:
        return False
    if cpu.socket != mainboard.cpu_socket:
        return False

    elif cpu.pcie_version == 0 or mainboard.pcie_version == 0 or mainboard.pcie_version is None or cpu.pcie_version is None:
        return False

    # PCIe 3.0
    elif 4 <= mainboard.pcie_version <= 7:
        if cpu.pcie_version >> 2 == 0:
            return False

    # PCIe 4.0
    elif 8 <= mainboard.pcie_version <= 15:
        if cpu.pcie_version >> 1 == 0:
            return False

    # PCIe 5.0
    elif 16 <= mainboard.pcie_version:
        if cpu.pcie_version == 0:
            return False
    return True

def mainboard_com_case(mainboard, case):
    mb_ff = mainboard.form_factor
    case_bs = case.board_support
    if mb_ff is None:
        return False

    elif 'E-ATX' in mb_ff:
        if case_bs & (1 << 0) == 0:
            return False

    elif 'ATX' in mb_ff:
        if case_bs & (1 << 1) == 0:
            return False

    elif 'M-ATX' in mb_ff:
        if case_bs & (1 << 2) == 0:
            return False

    elif 'M-iTX' in mb_ff:
        if case_bs & (1 << 5) == 0:
            return False

    elif 'CEB' in mb_ff:
        if case_bs & (1 << 6) == 0:
            return False

    elif 'EEB' in mb_ff:
        if case_bs & (1 << 7) == 0:
            return False

    elif 'M-DTX' in mb_ff:
        if case_bs & (1 << 8) == 0:
            return False

    return True


def mainboard_com_ram(mainboard, ram, ram_num):
    if ram.number == None or mainboard.memory_number == None or ram.capacity == None or mainboard.memory_capacity == None:
        return False

    if ram.generation != mainboard.memory_type:
        return False

    elif ram.number * ram_num > mainboard.memory_number:
        return False

    elif ram.capacity * ram.number * ram_num > float(mainboard.memory_capacity):
        return False


def mainboard_com_ssd(mainboard, ssd):
    ssd_ff = ssd.form_factor
    ssd_if = ssd.interface
    mb_m2i = mainboard.m2_interface

    if ssd_ff is None:
        return False

    elif ssd_ff.startswith('M.2'):
        if mainboard.m2_number is None:
            return False
            return

        ssd_protocol = ssd.protocol
        if ssd_protocol is None and mb_m2i & (1 << 1) == 0:
            return False
            return

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
            return

    else:
        return True
        return

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

    else:
        return True


def mainboard_com_gpu(mainboard, gpu):
    vga_connection = mainboard.vga_connection.replace(' ', '')
    interface = gpu.interface.replace(' ', '')
    if vga_connection not in interface:
        return False
    return True
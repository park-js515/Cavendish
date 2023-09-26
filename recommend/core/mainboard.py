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


def mainboard_com_cpu(target, check):
    result = []
    for item in target:
        if check.socket != item['data'].cpu_socket:
            item['compatibility'].append('cpu')
            continue

        if check.pcie_version == 0 or item['data'].pcie_version == 0 or item['data'].pcie_version:
            item['compatibility'].append('cpu')

        # PCIe 3.0
        elif 4 <= item['data'].pcie_version <= 7:
            if check.pcie_version << 2 == 0:
                item['compatibility'].append('cpu')

        # PCIe 4.0
        elif 8 <= item['data'].pcie_version <= 15:
            if check.pcie_version << 1 == 0:
                item['compatibility'].append('cpu')

    return result


def mainboard_com_case(target, check):
    result = []

    return result


def mainboard_com_ram(target, check):
    result = []

    return result


def mainboard_com_ssd(target, check):
    result = []

    return result


def mainboard_com_gpu(target, check):
    result = []

    return result

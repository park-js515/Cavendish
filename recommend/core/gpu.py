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

from .com_data import ram_com
from .common import decimal_to_name

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

def gpu_com_cpu(gpu_interface, cpu_pcie_version):
    pass

def gpu_com_mainboard(gpu_interface, mainboard_vga_connection):
    pass

def gpu_com_case(gpu_length, case_gpu_size):
    if gpu_length <= case_gpu_size:
        return True
    else:
        return False

def gpu_com_power(gpu_recommend_power, power_rated_power):
    if gpu_recommend_power <= power_rated_power:
        return True
    else:
        return False

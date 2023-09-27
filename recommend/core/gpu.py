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
    if gpu_interface == None or gpu_interface == "" or cpu_pcie_version == None or cpu_pcie_version == 0:
        return False
    elif gpu_interface[4] == " ":
        return False
    elif cpu_pcie_version % 2 == 1:
        if gpu_interface[4] == "5" or gpu_interface[4] == "4" or gpu_interface[4] == "3":
            return True
    elif (cpu_pcie_version / 2) % 2 == 1:
        if gpu_interface[4] == "4" or gpu_interface[4] == "3":
            return True
    elif (cpu_pcie_version / 4) % 2 == 1:
        if gpu_interface[4] == "3":
            return True    
    return False 

def gpu_com_mainboard(gpu_interface, mainboard_vga_connection):
    if mainboard_vga_connection == None or mainboard_vga_connection == "" or gpu_interface == None or gpu_interface == "":
        return False
    elif mainboard_vga_connection[4] == " ":
        if gpu_interface[4] == " ":
            return True 
    elif int(mainboard_vga_connection[4]) >= int(gpu_interface[4]):
        return True
    
    return False

def gpu_com_case(gpu_length, case_gpu_size):
    if gpu_length == None or gpu_length == 0 or case_gpu_size == None or case_gpu_size == 0:
        return False
    if gpu_length <= case_gpu_size:
        return True
    else:
        return False

def gpu_com_power(gpu_recommend_power, power_rated_power):
    if gpu_recommend_power == None or gpu_recommend_power == 0 or power_rated_power == None or power_rated_power == 0:
        return False
    if gpu_recommend_power <= power_rated_power:
        return True
    else:
        return False
    
def gpu_com_power_port(gpu_pin, pcie_16pin, pcie_8pin, pcie_6pin):
    if gpu_pin == None or gpu_pin == 0:
        return False
    if pcie_16pin == None or pcie_16pin == 0:
        pass
    else:
        if len(gpu_pin) == 3:
            if gpu_pin[-3] != "0":
                return True
        elif len(gpu_pin) > 3:
            if gpu_pin[-3] != "0" or gpu_pin[-4] != "0":
                return True
    if pcie_8pin == None or pcie_8pin == 0:
        pass
    else:
        if len(gpu_pin) >= 5:
            if gpu_pin[-3] != "0":
                return True
    if pcie_6pin == None or pcie_6pin == 0:
        pass
    else:
        if len(gpu_pin) >= 6:
            if gpu_pin[-3] != "0":
                return True

    return False

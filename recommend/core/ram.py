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

# 이진수를 십진수로 변환하는 함수 (문자열 반환)
def decimal_to_name(target, length, check_list):
    result = []
    
    for i in range(length):
        if target & (1 << i):
            result.append(check_list[i])
    
    return result

def ram_com_cpu(ram, cpu):
    ram_generation = ram.generation
    cpu_memory_type = cpu.memory_type
    if ram_generation == None:
        print("#", end="")
        return False
    if cpu_memory_type == None:
        print("%", end="")
        return False
    if ram_generation in decimal_to_name(cpu_memory_type, len(cpu_com['memory_type']), cpu_com['memory_type']):
        return True
    else:
        return False

def ram_com_mainboard(ram, mainboard):
    ram_generation = ram.generation
    mainboard_memory_type = mainboard.memory_type
    if ram_generation == mainboard_memory_type:
        return True
    ram_xmp = ram.xmp
    mainboard_xmp = mainboard.xmp
    if ram_xmp == 0 or ram_xmp == None:
        return True
    if ram_xmp == mainboard_xmp:
        return True
    ram_expo = ram.expo
    mainboard_expo = mainboard.expo
    if ram_expo == 0 or ram_expo == None:
        return True
    if ram_expo == mainboard_expo:
        return True
    else:
        return False

def ram_com_num(ram, mainboard, ram_num):
    ram_capacity = ram.capacity
    mainboard_number = mainboard.memory_number
    mainboard_memory_capacity = mainboard.memory_capacity
    if mainboard_number == None or ram_num == None:
        return False
    if mainboard_number >= ram_num:
        if mainboard_memory_capacity >= ram_capacity * ram_num:
            return True
    return False
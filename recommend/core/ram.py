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

def ram_com_cpu(target, check):
    pass
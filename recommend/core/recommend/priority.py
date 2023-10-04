from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
from models.programs import Program, Requirements

from schemas.search import ProcessListStep1
from schemas.recommend_input import Recommend_input

from core.recommend.cpu_filter import cpu_filter
from core.recommend.gpu_filter import gpu_filter
from core.recommend.ram_filter import ram_filter
from core.com_data import case_com
from core.common import decimal_to_name
from core.case import case_com_cooler, case_com_mainboard
from core.gpu import gpu_com_case
from core.power import power_com_case
from schemas.case import CaseSchema, serialize_case
from db.connection import engineconn
from schemas.program import ProgramSchema, serialize_program, RequirementsSchema, serialize_requirement

engine = engineconn()
session = engine.sessionmaker()

def perform_pri(pri_rank):

    if pri_rank == 0:
        return 1.7
    elif pri_rank == 1:
        return 1.0
    else:
        return 0.7

def ce_pri(pri_rank):
    if pri_rank == 0:
        return 1.7
    elif pri_rank == 1:
        return 1.0
    else:
        return 0.7
    
def as_pri(pri_rank):
    if pri_rank == 0:
        return 0.6
    elif pri_rank == 1:
        return 0.5
    else:
        return 0.4

def storage_pri(pri_rank):
    if pri_rank == 0:
        pass
    elif pri_rank == 1:
        pass
    else:
        pass


def sense_pri(pri_rank):
    if pri_rank == 0:
        pass
    elif pri_rank == 1:
        pass
    else:
        pass

def noise_pri(pri_rank):
    if pri_rank == 0:
        pass
    elif pri_rank == 1:
        pass
    else:
        pass
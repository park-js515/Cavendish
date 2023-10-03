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

def power_com_ssd(power, ssd):
    power_sata = power.sata
    ssd_interface = ssd.interface
    if ssd_interface == None or ssd_interface == "":
        return False
    if ssd_interface[0] == "S":
        if power_sata == 0 or power_sata == None:
            return False
    return True

def power_com_case(power, case):
    power_depth = power.depth
    case_power_size = case.power_size
    if power_depth == None or case_power_size == None:
        return False
    if power_depth + 20 <= case_power_size:
        return True

    power_category = power.category
    case_power_support = case.power_support
    if case_power_support == None or case_power_support == "" or power_category == None or power_category == "":
        return False
    if power_category == "ATX 파워":
        if case_power_support == "표준-ATX":
            return True
        else:
            return False
    elif power_category == "M-ATX(SFX) 파워":
        if case_power_support[0] == "M":
            return True
        else:
            return False
    if case_power_support == "FLEX":
        return True
    return False
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
session = engine.sessionmaker()\

def case_com_cooler(case_cpu_cooler_size, case_liquid_cooler, case_radiator_top, case_radiator_front, case_radiator_rear, case_radiator_side, cooler_category, cooler_height, cooler_cooling_type, cooler_fan_size, cooler_fan_count):
    if cooler_category != 'CPU 쿨러':
        return False
    if cooler_height == None or cooler_height == 0:
        return False
    if case_cpu_cooler_size == None or case_cpu_cooler_size == 0:
        return False
    if cooler_height > case_cpu_cooler_size:
        return False
    # 공랭
    if cooler_cooling_type == 0:
        return True
    # 수랭
    elif cooler_cooling_type == 1:
        if cooler_fan_count == None or cooler_fan_count == 0:
            return False
        if case_liquid_cooler == None or case_liquid_cooler == 0:
            return False
        if case_liquid_cooler < cooler_fan_count:
            return False
        if case_radiator_side == None or case_radiator_side == 0:
            return False
        if case_radiator_side >= cooler_fan_count * cooler_fan_size:
            return True
        if case_radiator_top == None or case_radiator_top == 0:
            return False
        if case_radiator_top >= cooler_fan_count * cooler_fan_size:
            return True
        if case_radiator_front == None or case_radiator_front == 0:
            return False
        if case_radiator_front >= cooler_fan_count * cooler_fan_size:
            return True
        if case_radiator_rear == None or case_radiator_rear == 0:
            return False
        if case_radiator_rear >= cooler_fan_count * cooler_fan_size:
            return True

    return False

def case_com_mainboard(case_board_support, mainboard_form_factor):
    if case_board_support == None or case_board_support == 0:
        return False

    if mainboard_form_factor == None or mainboard_form_factor == '':
        return False
    
    if 'E-ATX' in mainboard_form_factor:
        if case_board_support & (1 << 0):
            return True
    elif 'ATX' in mainboard_form_factor:
        if case_board_support & (1 << 1):
            return True
    elif 'M-ATX' in mainboard_form_factor:
        if case_board_support & (1 << 2):
            return True
    elif 'M-iTX' in mainboard_form_factor:
        if case_board_support & (1 << 5):
            return True
    elif 'CEB' in mainboard_form_factor:
        if case_board_support & (1 << 6):
            return True
    elif 'EEB' in mainboard_form_factor:
        if case_board_support & (1 << 7):
            return True
    elif 'M-DTX' in mainboard_form_factor:
        if case_board_support & (1 << 8):
            return True
        
    return False
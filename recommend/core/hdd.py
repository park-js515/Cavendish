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

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()


def hdd_com_mainboard(target, check):
    if target.interface.startswith('SATA3'):
        if check.sata3_number <= 0:
            target['compatibility'].append('mainboard')
    else:
        # SATA2, E-IDE, PATA100
        target['compatibility'].append('mainboard need check')


def hdd_com_case(target, check):
    if check.bay_89 is None or check.bay_89 <= 0:
        target['compatibility'].append('case')


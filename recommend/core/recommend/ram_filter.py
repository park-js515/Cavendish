from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from models.users import User
from models.hdd import HDD
from models.cpu import CPU
from models.gpu import GPU
from models.ram import RAM

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

def ram_filter(min_capa, rec_capa, max_capa):
    whole_cpu = session.query(RAM).filter(RAM.capacity != None, RAM.capacity != 0).all()
    
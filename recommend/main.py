from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
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

from db.connection import engineconn

app = FastAPI()

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = engineconn()
session = engine.sessionmaker()

@app.get("/")
async def root():
    example = session.query(User).all()
    return example

@app.get("/hdd")
async def hdd():
    example = session.query(HDD).all()
    return example

@app.get("/cpu")
async def cpu():
    example = session.query(CPU).all()
    return example

@app.get("/mainboard")
async def mainboard():
    example = session.query(Mainboard).all()
    return example 

@app.get("/ram")
async def ram():
    example = session.query(RAM).all()
    return example

@app.get("/gpu")
async def gpu():
    example = session.query(GPU).all()
    return example

@app.get("/case")
async def case():
    example = session.query(Case).all()
    return example

@app.get("/cooler")
async def get_coolers(skip: int = Query(0, description="Skip the first N items"), limit: int = Query(10, description="Limit the number of items returned")):
    cooler_data = session.query(Cooler).offset(skip).limit(limit).all()
    return cooler_data

@app.get("/ssd")
async def ssd():
    example = session.query(SSD).all()
    return example  

@app.get("/pci")
async def pci():
    example = session.query(MainboardPCI).all()
    return example

@app.get("/power")
async def power():
    example = session.query(Power).all()
    return example
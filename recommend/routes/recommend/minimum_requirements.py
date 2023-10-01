from fastapi import FastAPI, APIRouter, Depends, Query
from typing import List, Optional
from models.hdd import HDD
from models.cpu import CPU
from models.mainboard import Mainboard, MainboardPCI
from models.ram import RAM
from models.gpu import GPU
from models.case import Case
from models.ssd import SSD

from fastapi.responses import JSONResponse

from core.mainboard import *
from core.common import decimal_to_name

from schemas.search import ProcessListStep1
from schemas.cpu import CPUSchema
from schemas.gpu import GPUSchema

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()


def minimum_cpu(cpu_id: int):
    min_cpu_bench = session.query(CPU).filter(CPU.id == cpu_id).first().bench_mark
    cpu = session.query(CPU.id).filter(CPU.bench_mark >= min_cpu_bench).all()

    result = []
    for i in range(len(cpu)):
        result.append(cpu[i][0])
    session.close()

    return result


def minimum_gpu(gpu_id: int):
    min_gpu_bench = session.query(GPU).filter(GPU.id == gpu_id).first().bench_mark
    gpu = session.query(GPU.id).filter(GPU.bench_mark >= min_gpu_bench).all()

    result = []
    for i in range(len(gpu)):
        result.append(gpu[i][0])
    session.close()

    return result


from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from models.users import User
from models.hdd import HDD
from models.cpu import CPU
from models.gpu import GPU

from schemas.search import ProcessListStep1

from db.connection import engineconn

engine = engineconn()
session = engine.sessionmaker()

def gpu_filter(min_bench, rec_bench, max_bench):
    whole_gpu = session.query(GPU).filter(GPU.bench_mark != 0, GPU.bench_mark >= min_bench).all()

    gpu_count = len(whole_gpu)
    
    min_gpu = []
    rec_gpu = []
    max_gpu = []
    
    min_count = 0
    rec_count = 0
    max_count = 0

    min_percent = 0
    rec_percent = 0
    max_percent = 0

    for item in whole_gpu:
        if min_bench != 0 and item.bench_mark >= min_bench:
            min_count += 1
        if rec_bench != 0 and item.bench_mark >= rec_bench:
            rec_count += 1
        if max_bench != 0 and item.bench_mark >= max_bench:
            max_bench += 1

    if min_bench != 0:
        min_percent = min_count / gpu_count * 100

    if rec_bench != 0:
        rec_percent = rec_count / gpu_count * 100

    if max_bench != 0:
        max_percent = max_count / gpu_count * 100


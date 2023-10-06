from fastapi import FastAPI, APIRouter, Query
from fastapi.middleware.cors import CORSMiddleware

from routes.compatibility.cpu import router as cpu_router
from routes.compatibility.cooler import router as cooler_router
from routes.compatibility.hdd import router as hdd_router
from routes.compatibility.mainboard import router as mainboard_router
from routes.compatibility.ram import router as ram_router
from routes.compatibility.gpu import router as gpu_router
from routes.compatibility.case import router as case_router
from routes.compatibility.ssd import router as ssd_router
from routes.compatibility.power import router as power_router
from routes.recommend.search_program import router as program_router
from routes.recommend.recommendation import router as recommendation_router
from routes.recommend.recommendation_jh import router as recommedtation_router_
from routes.recommend.parts_detail import router as parts_detail_router

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://localhost",
    "https://localhost:8080",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

common_prefix = "/fapi"

routers = [
    cpu_router,
    cooler_router,
    hdd_router,
    mainboard_router,
    ram_router,
    gpu_router,
    case_router,
    ssd_router,
    power_router,
    program_router,
    parts_detail_router,
    recommendation_router,
    recommedtation_router_
]

for router in routers:
    app.include_router(router, prefix=common_prefix)
    
from pydantic import BaseModel
from typing import List, Optional

class ProcessListStep1(BaseModel):
    case: str = ""
    cooler: str = ""
    cpu: str = ""
    gpu: str = ""
    hdd: str = ""
    mainboard: str = ""
    power: str = ""
    ram: str = ""
    ssd: str = ""

class ProcessListStep2(BaseModel):
    usage: str = ""

class ProcessListStep3(BaseModel):
    program: str = ""
    spec: List[str] = []

class ProcessListStep4(BaseModel):
    budget: str = ""

class ProcessListStep5(BaseModel):
    priority1: str = ""
    priority2: str = ""
    priority3: str = ""

# class FastAPISchema(BaseModel):
#     processNo: int = -1
#     processList: List[ProcessListStep1, ProcessListStep2, ProcessListStep3, ProcessListStep4, ProcessListStep5]

# FastAPI 스키마 생성
# fastapi_schema = FastAPISchema()
fastapi_schema = ProcessListStep1()
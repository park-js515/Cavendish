from pydantic import BaseModel
from typing import Optional, List, Dict
from fastapi import Query

class Recommend_input(BaseModel):
    case: Optional[Dict] = {'id' : -1, 'is_have' : False}
    cooler: Optional[Dict] = {'id' : -1, 'is_have' : False}
    cpu: Optional[Dict] = {'id' : -1, 'is_have' : False}
    gpu: Optional[Dict] = {'id' : -1, 'is_have' : False}
    hdd: Optional[Dict] = {'id' : -1, 'is_have' : False}
    mainboard: Optional[Dict] = {'id' : -1, 'is_have' : False}
    power: Optional[Dict] = {'id' : -1, 'is_have' : False}
    ram: Optional[Dict] = {'id' : -1, 'is_have' : False}
    ssd: Optional[Dict] = {'id' : -1, 'is_have' : False}
    ram_num: int = 1
    budget: int = 0
    usage: List[str] = []
    programs : List[int] = []
    priority: List[str] = []
    # priority1: str = ""
    # priority2: str = ""
    # priority3: str = ""
    # processNo: Optional[Dict] = {'id' : -1, 'is_have' : False}
    # processList: List[ProcessListStep1, ProcessListStep2, ProcessListStep3, ProcessListStep4, ProcessListStep5]

class recommend_quotations(BaseModel):
    case: int = -1
    cooler: int = -1
    cpu: int = -1
    gpu: int = -1
    hdd: int = -1
    mainboard: int = -1
    power: int = -1
    ram: int = -1
    ssd: int = -1
    ram_num: int = -1

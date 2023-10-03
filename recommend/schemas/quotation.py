from pydantic import BaseModel
from typing import Optional
from datetime import date
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from .cpu import CPUSchema

class QuotationSchema(BaseModel):
    id: int
    user_id: Optional[int] = None
    cpu_id: Optional[int] = None
    power_id: Optional[int] = None
    mainboard_id: Optional[int] = None
    ram_id: Optional[int] = None
    graphic_id: Optional[int] = None
    hdd_id: Optional[int] = None
    ssd_id: Optional[int] = None
    case_id: Optional[int] = None
    cooler_id: Optional[int] = None
    name: str
    state: int
    create_date_time: datetime = datetime.now()
    # cpu_detail : Optional[CPUSchema] = None
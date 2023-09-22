from pydantic import BaseModel

class CoolerBase(BaseModel):
    name: str
    price: int
    link: str
    company: str
    product_seq: int
    image: str = None
    category: str = None
    cooling_type: int = None
    aircool_form: int = None
    tdp: int = None
    intel_socket: int = None
    amd_socket: int = None
    fan_size: int = None
    fan_count: int = None
    airflow: int = None
    noise: float = None
    width: float = None
    length: float = None
    height: float = None
    radiator: int = None
    radiator_length: float = None
    radiator_thickness: float = None
    hose_length: float = None
    feature: int = None
    as_years: int = None
    reg_date: int = None
    bookmark: int = 0

class CoolerCreate(CoolerBase):
    pass

class Cooler(CoolerBase):
    id: int

    class Config:
        orm_mode = True

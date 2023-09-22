from pydantic import BaseModel

class CPUSchema(BaseModel):
    name: str
    price: int
    link: str
    company: str
    product_seq: int
    image: str
    code: str
    socket: str
    core_number: int
    thread_number: int
    l2_cache: int
    l3_cache: int
    tdp: int
    pbpmtp: int
    has_graphic: bool
    graphic_name: str
    graphic_core_speed: int
    memory_capacity: int
    memory_type: int
    memory_clock: int
    memory_channel: int
    pcie_version: int
    pcie_channel_number: int
    has_cooler: bool
    clock_basic: float
    clock_max: float
    nm: int
    tech_support: str
    bench_mark: int
    reg_date: int
    bookmark: int

class CPUCreate(CPUSchema):
    pass

class CPUUpdate(CPUSchema):
    pass

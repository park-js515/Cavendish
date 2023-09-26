from pydantic import BaseModel
from typing import Optional, List


class CPUSchema(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    code: Optional[str] = None
    socket: str
    core_number: Optional[int] = None
    thread_number: Optional[int] = None
    l2_cache: Optional[int] = None
    l3_cache: Optional[int] = None
    tdp: Optional[int] = None
    pbpmtp: Optional[int] = None
    has_graphic: Optional[bool] = None
    graphic_name: Optional[str] = None
    graphic_core_speed: Optional[int] = None
    memory_capacity: Optional[int] = None
    memory_type: Optional[List[str]] = []
    memory_clock: Optional[int] = None
    memory_channel: Optional[int] = None
    pcie_version: Optional[List[str]] = []
    pcie_channel_number: Optional[int] = None
    has_cooler: Optional[bool] = None
    clock_basic: Optional[float] = None
    clock_max: Optional[float] = None
    nm: Optional[int] = None
    tech_support: Optional[str] = None
    bench_mark: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0
    compatibility: Optional[List[str]] = []

def serialize_cpu(cpu_object, compatibility):
    cpu_dict = CPUSchema(
        id=cpu_object.id,
        name=cpu_object.name,
        price=cpu_object.price,
        link=cpu_object.link,
        company=cpu_object.company,
        product_seq=cpu_object.product_seq,
        image=cpu_object.image,
        code=cpu_object.code,
        socket=cpu_object.socket,
        core_number=cpu_object.core_number,
        thread_number=cpu_object.thread_number,
        l2_cache=cpu_object.l2_cache,
        l3_cache=cpu_object.l3_cache,
        tdp=cpu_object.tdp,
        pbpmtp=cpu_object.pbpmtp,
        has_graphic=cpu_object.has_graphic,
        graphic_name=cpu_object.graphic_name,
        graphic_core_speed=cpu_object.graphic_core_speed,
        memory_capacity=cpu_object.memory_capacity,
        memory_type=cpu_object.memory_type,
        memory_clock=cpu_object.memory_clock,
        memory_channel=cpu_object.memory_channel,
        pcie_version=cpu_object.pcie_version,
        pcie_channel_number=cpu_object.pcie_channel_number,
        has_cooler=cpu_object.has_cooler,
        clock_basic=cpu_object.clock_basic,
        clock_max=cpu_object.clock_max,
        nm=cpu_object.nm,
        tech_support=cpu_object.tech_support,
        bench_mark=cpu_object.bench_mark,
        reg_date=cpu_object.reg_date,
        bookmark=cpu_object.bookmark,
        compatibility=compatibility
    ).__dict__
    return cpu_dict
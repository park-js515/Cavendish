from pydantic import BaseModel
from typing import Optional, List

class GPUSchema(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    chipset_company: Optional[str] = None
    chipset: str
    nm: Optional[int] = None
    base_clock: Optional[int] = None
    boost_clock: Optional[int] = None
    cuda_processor: Optional[int] = None
    stream_processor: Optional[int] = None
    interface: Optional[str] = None
    memory_type: Optional[str] = None
    memory_capacity: Optional[float] = None
    memory_clock: Optional[int] = None
    memory_bus: Optional[int] = None
    port: Optional[int] = None
    monitor_support: Optional[int] = None
    additional_function: Optional[int] = None
    usage_power: Optional[int] = None
    recommend_power: Optional[int] = None
    cooling_type: Optional[int] = None
    pan_number: Optional[int] = None
    length: Optional[float] = None
    thickness: Optional[float] = None
    pin: Optional[str] = None
    feature: Optional[int] = None
    as_years: Optional[int] = None
    bench_mark: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0
    compatibility: Optional[List[str]] = []


def serialize_gpu(gpu_object, compatibility):
    gpu_dict = GPUSchema(
        id=gpu_object.id,
        name=gpu_object.name,
        price=gpu_object.price,
        link=gpu_object.link,
        company=gpu_object.company,
        product_seq=gpu_object.product_seq,
        image=gpu_object.image,
        chipset_company=gpu_object.chipset_company,
        chipset=gpu_object.chipset,
        nm=gpu_object.nm,
        base_clock=gpu_object.base_clock,
        boost_clock=gpu_object.boost_clock,
        cuda_processor=gpu_object.cuda_processor,
        stream_processor=gpu_object.stream_processor,
        interface=gpu_object.interface,
        memory_type=gpu_object.memory_type,
        memory_capacity=gpu_object.memory_capacity,
        memory_clock=gpu_object.memory_clock,
        memory_bus=gpu_object.memory_bus,
        port=gpu_object.port,
        monitor_support=gpu_object.monitor_support,
        additional_function=gpu_object.additional_function,
        usage_power=gpu_object.usage_power,
        recommend_power=gpu_object.recommend_power,
        cooling_type=gpu_object.cooling_type,
        pan_number=gpu_object.pan_number,
        length=gpu_object.length,
        thickness=gpu_object.thickness,
        pin=gpu_object.pin,
        feature=gpu_object.feature,
        as_years=gpu_object.as_years,
        bench_mark=gpu_object.bench_mark,
        reg_date=gpu_object.reg_date,
        bookmark=gpu_object.bookmark,
        compatibility=compatibility
    ).__dict__
    return gpu_dict

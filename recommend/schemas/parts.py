from pydantic import BaseModel
from typing import Optional, List

class GPUPart(BaseModel):
    id : int
    base_clock : Optional[int] = None
    boost_clock : Optional[int] = None
    memory_clock : Optional[int] = None
    bench_mark : Optional[int] = None
    memory_capacity : Optional[float] = None
    memory_bus : Optional[int] = None
    cuda_processor : Optional[int] = None
    stream_processor : Optional[int] = None

class CPUPart(BaseModel):
    id : int
    clock_max : Optional[float] = None
    clock_basic : Optional[float] = None
    bench_mark : Optional[int] = None
    memory_clock : Optional[int] = None
    core_number : Optional[int] = None
    thread_number : Optional[int] = None
    memory_capacity : Optional[int] = None

class RAMPart(BaseModel):
    id : int
    clock : Optional[int] = None
    timing : Optional[str] = None

class SSDPart(BaseModel):
    id : int
    sequential_read : Optional[int] = None
    sequential_write : Optional[int] = None

def serialize_gpu_part(gpu_object):
    gpu_dict = GPUPart(
        id=gpu_object.id,
        base_clock=gpu_object.base_clock,
        boost_clock=gpu_object.boost_clock,
        memory_clock=gpu_object.memory_clock,
        bench_mark=gpu_object.bench_mark,
        memory_capacity=gpu_object.memory_capacity,
        memory_bus=gpu_object.memory_bus,
        cuda_processor=gpu_object.cuda_processor,
        stream_processor=gpu_object.stream_processor,
    ).__dict__
    return gpu_dict

def serialize_cpu_part(cpu_object):
    cpu_dict = CPUPart(
        id=cpu_object.id,
        clock_max=cpu_object.clock_max,
        clock_basic=cpu_object.clock_basic,
        bench_mark=cpu_object.bench_mark,
        memory_clock=cpu_object.memory_clock,
        core_number=cpu_object.core_number,
        thread_number=cpu_object.thread_number,
        memory_capacity=cpu_object.memory_capacity,
    ).__dict__
    return cpu_dict


def serialize_ram_part(ram_object):
    ram_dict = RAMPart(
        id=ram_object.id,
        clock=ram_object.clock,
        timing=ram_object.timing,
    ).__dict__
    return ram_dict


def serialize_ssd_part(ssd_object):
    ssd_dict = SSDPart(
        id=ssd_object.id,
        sequential_read=ssd_object.sequential_read,
        sequential_write=ssd_object.sequential_write,
    ).__dict__
    return ssd_dict
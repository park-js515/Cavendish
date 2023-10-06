from pydantic import BaseModel
from typing import Optional, List

class GPUPart(BaseModel):
    # id : int
    gpu_base_clock : Optional[int] = None
    gpu_boost_clock : Optional[int] = None
    gpu_memory_clock : Optional[int] = None
    gpu_bench_mark : Optional[int] = None
    gpu_memory_capacity : Optional[float] = None
    gpu_memory_bus : Optional[int] = None
    gpu_cuda_processor : Optional[int] = None
    gpu_stream_processor : Optional[int] = None

class CPUPart(BaseModel):
    # id : int
    cpu_clock_max : Optional[float] = None
    cpu_clock_basic : Optional[float] = None
    cpu_bench_mark : Optional[int] = None
    cpu_memory_clock : Optional[int] = None
    cpu_core_number : Optional[int] = None
    cpu_thread_number : Optional[int] = None
    cpu_memory_capacity : Optional[int] = None

class RAMPart(BaseModel):
    # id : int
    ram_clock : Optional[int] = None
    ram_timing : Optional[str] = None

class SSDPart(BaseModel):
    # id : int
    ssd_sequential_read : Optional[int] = None
    ssd_sequential_write : Optional[int] = None

def serialize_gpu_part(gpu_object):
    gpu_dict = GPUPart(
        # id=gpu_object.id,
        gpu_base_clock=gpu_object.base_clock,
        gpu_boost_clock=gpu_object.boost_clock,
        gpu_memory_clock=gpu_object.memory_clock,
        gpu_bench_mark=gpu_object.bench_mark,
        gpu_memory_capacity=gpu_object.memory_capacity,
        gpu_memory_bus=gpu_object.memory_bus,
        gpu_cuda_processor=gpu_object.cuda_processor,
        gpu_stream_processor=gpu_object.stream_processor,
    ).__dict__
    return gpu_dict

def serialize_cpu_part(cpu_object):
    cpu_dict = CPUPart(
        # id=cpu_object.id,
        cpu_clock_max=cpu_object.clock_max,
        cpu_clock_basic=cpu_object.clock_basic,
        cpu_bench_mark=cpu_object.bench_mark,
        cpu_memory_clock=cpu_object.memory_clock,
        cpu_core_number=cpu_object.core_number,
        cpu_thread_number=cpu_object.thread_number,
        cpu_memory_capacity=cpu_object.memory_capacity,
    ).__dict__
    return cpu_dict


def serialize_ram_part(ram_object):
    ram_dict = RAMPart(
        # id=ram_object.id,
        ram_clock=ram_object.clock,
        ram_timing=ram_object.timing,
    ).__dict__
    return ram_dict


def serialize_ssd_part(ssd_object):
    ssd_dict = SSDPart(
        # id=ssd_object.id,
        ssd_sequential_read=ssd_object.sequential_read,
        ssd_sequential_write=ssd_object.sequential_write,
    ).__dict__
    return ssd_dict
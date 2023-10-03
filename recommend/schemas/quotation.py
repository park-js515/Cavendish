from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import date
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from schemas.cpu import CPUSchema
from models.cpu import CPU

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

class CPUOutput(BaseModel):
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

class CaseOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    category: str
    size: str
    power_included: Optional[str] = None
    power_support: Optional[str] = None
    board_support: Optional[List[str]] = []
    bay_133: Optional[int] = None
    bay_89: Optional[int] = None
    bay_64: Optional[int] = None
    pci_horizontal: Optional[int] = None
    pci_vertical: Optional[int] = None
    cooling_fan: Optional[int] = None
    led_fan: Optional[int] = None
    front_type: Optional[str] = None
    side_open: Optional[str] = None
    side_type: Optional[str] = None
    back_vent: Optional[str] = None
    front_vent: Optional[str] = None
    top_vent: Optional[str] = None
    bottom_vent: Optional[str] = None
    external_port: Optional[List[str]] = []
    width: Optional[float] = None
    height: Optional[float] = None
    depth: Optional[float] = None
    gpu_size: Optional[int] = None
    cpu_cooler_size: Optional[int] = None
    power_size: Optional[int] = None
    liquid_cooler: Optional[int] = None
    radiator_top: Optional[int] = None
    radiator_front: Optional[int] = None
    radiator_rear: Optional[int] = None
    radiator_side: Optional[int] = None
    feature: Optional[List[str]] = []
    led_color: Optional[str] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

class CoolerOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    category: Optional[str] = None
    cooling_type: Optional[int] = None
    aircool_form: Optional[int] = None
    tdp: Optional[int] = None
    intel_socket: Optional[List[str]] = []
    amd_socket: Optional[List[str]] = []
    fan_size: Optional[int] = None
    fan_count: Optional[int] = None
    airflow: Optional[int] = None
    noise: Optional[float] = None
    width: Optional[float] = None
    length: Optional[float] = None
    height: Optional[float] = None
    radiator: Optional[int] = None
    radiator_length: Optional[float] = None
    radiator_thickness: Optional[float] = None
    hose_length: Optional[float] = None
    feature: Optional[List[str]] = []
    as_years: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

class GPUOutput(BaseModel):
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
    port: Optional[List[str]] = None
    monitor_support: Optional[int] = None
    additional_function: Optional[List[str]] = None
    usage_power: Optional[int] = None
    recommend_power: Optional[int] = None
    cooling_type: Optional[List[str]] = None
    pan_number: Optional[int] = None
    length: Optional[float] = None
    thickness: Optional[float] = None
    pin: Optional[str] = None
    feature: Optional[List[str]] = None
    as_years: Optional[int] = None
    bench_mark: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

class HDDOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    size: Optional[float] = None
    capacity: Optional[int] = None
    interface: str
    rpm: Optional[int] = None
    transfer_rate: Optional[int] = None
    buffer_capacity: Optional[int] = None
    recording_method: Optional[int] = None
    thickness: Optional[float] = None
    as_year: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0


class MainboardOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    cpu_socket: str
    chipset: Optional[str] = None
    form_factor: str
    memory_type: str
    memory_number: Optional[int] = None
    memory_capacity: Optional[float] = None
    xmp: Optional[bool] = None
    expo: Optional[bool] = None
    sata3_number: Optional[int] = None
    m2_number: Optional[int] = None
    m2_interface: Optional[List[str]] = []
    m2_formfactor: Optional[List[str]] = []
    pcie_version: Optional[List[str]] = []
    vga_connection: Optional[str] = None
    wireless_lan: Optional[List[str]] = []
    wired_lan_speed: Optional[int] = None
    phase: Optional[bool] = None
    graphic_output: Optional[List[str]] = []
    back_panel: Optional[str] = None
    io_header: Optional[List[str]] = []
    feature: Optional[List[str]] = []
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0
    mainboard_pci: Optional[List[dict]] = []

class PowerOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    category: str
    rated_power: Optional[int] = None
    _80plus_certification: Optional[str] = None
    eta_certification: Optional[str] = None
    lambda_certification: Optional[str] = None
    voltage_fluctuation: Optional[float] = None
    output_method: Optional[str] = None
    availability: Optional[int] = None
    pfc_circuit: Optional[str] = None
    pf_factor: Optional[int] = None
    fan_size: Optional[int] = None
    fan_number: Optional[int] = None
    bearing: Optional[str] = None
    output_12v: Optional[float] = None
    cable_connection: Optional[str] = None
    depth: Optional[int] = None
    main_power: Optional[str] = None
    sub_power: Optional[str] = None
    pcie_16pin: Optional[int] = None
    pcie_8pin: Optional[int] = None
    pcie_6pin: Optional[int] = None
    sata: Optional[int] = None
    ide_4: Optional[int] = None
    rgb_connector: Optional[int] = None
    feature: Optional[List[str]] = []
    inside: Optional[List[str]] = []
    protection: Optional[List[str]] = []
    as_years: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

class RAMOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    generation: Optional[str] = None
    capacity: Optional[float] = None
    clock: Optional[int] = None
    timing: Optional[str] = None
    number: Optional[int] = None
    ecc: Optional[int] = None
    xmp: Optional[int] = None
    expo: Optional[int] = None
    heatsink: Optional[int] = None
    heatsink_color: Optional[str] = None
    led: Optional[int] = None
    led_color: Optional[str] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

class SSDOutput(BaseModel):
    id: int
    name: str
    price: Optional[int] = None
    link: str
    company: str
    product_seq: int
    image: Optional[str] = None
    form_factor: str
    interface: str
    protocol: Optional[str] = None
    volume: Optional[int] = None
    memory_type: Optional[str] = None
    nand: Optional[str] = None
    ram_mounted: Optional[bool] = None
    ram_type: Optional[str] = None
    sequential_read: Optional[int] = None
    sequential_write: Optional[int] = None
    read_iops: Optional[int] = None
    write_iops: Optional[int] = None
    heatsink: Optional[bool] = None
    rgbled: Optional[bool] = None
    as_year: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0
    support_option: Optional[int] = None

class QuotationOutput(BaseModel):
    cpu : Dict
    power : Dict
    mainboard : Dict
    ram : Dict
    gpu : Dict
    hdd : Dict
    ssd : Dict
    case : Dict
    cooler : Dict

from pydantic import BaseModel

class CaseBase(BaseModel):
    name: str
    price: int
    link: str
    company: str
    product_seq: int
    image: str = None
    category: str
    size: str
    power_included: str = None
    power_support: str
    board_support: int
    bay_133: int = None
    bay_89: int = None
    bay_64: int = None
    pci_horizontal: int = None
    pci_vertical: int = None
    cooling_fan: int = None
    led_fan: int = None
    front_type: str = None
    side_open: str = None
    side_type: str = None
    back_vent: str = None
    front_vent: str = None
    top_vent: str = None
    bottom_vent: str = None
    external_port: int = None
    width: float = None
    height: float = None
    depth: float = None
    gpu_size: int = None
    cpu_cooler_size: int = None
    power_size: int = None
    liquid_cooler: int = None
    radiator_top: int = None
    radiator_front: int = None
    radiator_rear: int = None
    radiator_side: int = None
    feature: int = None
    led_color: str = None
    reg_date: int = None
    bookmark: int = 0

class CaseCreate(CaseBase):
    pass

class Case(CaseBase):
    id: int

    class Config:
        orm_mode = True

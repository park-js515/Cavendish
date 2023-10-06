from pydantic import BaseModel
from typing import Optional, List

class CaseSchema(BaseModel):
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
    compatibility: Optional[List[str]] = []
    max_page: int

def serialize_case(case_object, compatibility, max_page):
    case_dict = CaseSchema(
        id=case_object.id,
        name=case_object.name,
        price=case_object.price,
        link=case_object.link,
        company=case_object.company,
        product_seq=case_object.product_seq,
        image=case_object.image,
        category=case_object.category,
        size=case_object.size,
        power_included=case_object.power_included,
        power_support=case_object.power_support,
        board_support=case_object.board_support,
        bay_133=case_object.bay_133,
        bay_89=case_object.bay_89,
        bay_64=case_object.bay_64,
        pci_horizontal=case_object.pci_horizontal,
        pci_vertical=case_object.pci_vertical,
        cooling_fan=case_object.cooling_fan,
        led_fan=case_object.led_fan,
        front_type=case_object.front_type,
        side_open=case_object.side_open,
        side_type=case_object.side_type,
        back_vent=case_object.back_vent,
        front_vent=case_object.front_vent,
        top_vent=case_object.top_vent,
        bottom_vent=case_object.bottom_vent,
        external_port=case_object.external_port,
        width=case_object.width,
        height=case_object.height,
        depth=case_object.depth,
        gpu_size=case_object.gpu_size,
        cpu_cooler_size=case_object.cpu_cooler_size,
        power_size=case_object.power_size,
        liquid_cooler=case_object.liquid_cooler,
        radiator_top=case_object.radiator_top,
        radiator_front=case_object.radiator_front,
        radiator_rear=case_object.radiator_rear,
        radiator_side=case_object.radiator_side,
        feature=case_object.feature,
        led_color=case_object.led_color,
        reg_date=case_object.reg_date,
        bookmark=case_object.bookmark,
        compatibility=compatibility,
        max_page=max_page
    ).__dict__
    return case_dict

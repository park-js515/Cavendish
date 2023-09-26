from pydantic import BaseModel
from typing import Optional

class RAMSchema(BaseModel):
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


def serialize_ram(ram_object):
    ram_dict = RAMSchema(
        id=ram_object.id,
        name=ram_object.name,
        price=ram_object.price,
        link=ram_object.link,
        company=ram_object.company,
        product_seq=ram_object.product_seq,
        image=ram_object.image,
        generation=ram_object.generation,
        capacity=ram_object.capacity,
        clock=ram_object.clock,
        timing=ram_object.timing,
        number=ram_object.number,
        ecc=ram_object.ecc,
        xmp=ram_object.xmp,
        expo=ram_object.expo,
        heatsink=ram_object.heatsink,
        heatsink_color=ram_object.heatsink_color,
        led=ram_object.led,
        led_color=ram_object.led_color,
        reg_date=ram_object.reg_date,
        bookmark=ram_object.bookmark
    ).__dict__
    return ram_dict

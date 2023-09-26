from pydantic import BaseModel
from typing import Optional

class HDDSchema(BaseModel):
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


def serialize_hdd(hdd_object):
    hdd_dict = HDDSchema(
        id=hdd_object.id,
        name=hdd_object.name,
        price=hdd_object.price,
        link=hdd_object.link,
        company=hdd_object.company,
        product_seq=hdd_object.product_seq,
        image=hdd_object.image,
        size=hdd_object.size,
        capacity=hdd_object.capacity,
        interface=hdd_object.interface,
        rpm=hdd_object.rpm,
        transfer_rate=hdd_object.transfer_rate,
        buffer_capacity=hdd_object.buffer_capacity,
        recording_method=hdd_object.recording_method,
        thickness=hdd_object.thickness,
        as_year=hdd_object.as_year,
        reg_date=hdd_object.reg_date,
        bookmark=hdd_object.bookmark
    ).__dict__
    return hdd_dict


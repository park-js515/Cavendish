from pydantic import BaseModel
from typing import Optional

class SSDSchema(BaseModel):
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

def serialize_ssd(ssd_object):
    ssd_dict = SSDSchema(
        id=ssd_object.id,
        name=ssd_object.name,
        price=ssd_object.price,
        link=ssd_object.link,
        company=ssd_object.company,
        product_seq=ssd_object.product_seq,
        image=ssd_object.image,
        form_factor=ssd_object.form_factor,
        interface=ssd_object.interface,
        protocol=ssd_object.protocol,
        volume=ssd_object.volume,
        memory_type=ssd_object.memory_type,
        nand=ssd_object.nand,
        ram_mounted=ssd_object.ram_mounted,
        ram_type=ssd_object.ram_type,
        sequential_read=ssd_object.sequential_read,
        sequential_write=ssd_object.sequential_write,
        read_iops=ssd_object.read_iops,
        write_iops=ssd_object.write_iops,
        heatsink=ssd_object.heatsink,
        rgbled=ssd_object.rgbled,
        as_year=ssd_object.as_year,
        reg_date=ssd_object.reg_date,
        bookmark=ssd_object.bookmark,
        support_option=ssd_object.support_option
    ).__dict__
    return ssd_dict

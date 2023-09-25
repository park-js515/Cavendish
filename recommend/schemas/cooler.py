from pydantic import BaseModel
from typing import Optional

class CoolerSchema(BaseModel):
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
    intel_socket: Optional[int] = None
    amd_socket: Optional[int] = None
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
    feature: Optional[int] = None
    as_years: Optional[int] = None
    reg_date: Optional[int] = None
    bookmark: Optional[int] = 0

def serialize_cooler(cooler_object):
    cooler_dict = CoolerSchema(
        id=cooler_object.id,
        name=cooler_object.name,
        price=cooler_object.price,
        link=cooler_object.link,
        company=cooler_object.company,
        product_seq=cooler_object.product_seq,
        image=cooler_object.image,
        category=cooler_object.category,
        cooling_type=cooler_object.cooling_type,
        aircool_form=cooler_object.aircool_form,
        tdp=cooler_object.tdp,
        intel_socket=cooler_object.intel_socket,
        amd_socket=cooler_object.amd_socket,
        fan_size=cooler_object.fan_size,
        fan_count=cooler_object.fan_count,
        airflow=cooler_object.airflow,
        noise=cooler_object.noise,
        width=cooler_object.width,
        length=cooler_object.length,
        height=cooler_object.height,
        radiator=cooler_object.radiator,
        radiator_length=cooler_object.radiator_length,
        radiator_thickness=cooler_object.radiator_thickness,
        hose_length=cooler_object.hose_length,
        feature=cooler_object.feature,
        as_years=cooler_object.as_years,
        reg_date=cooler_object.reg_date,
        bookmark=cooler_object.bookmark
    ).__dict__
    return cooler_dict

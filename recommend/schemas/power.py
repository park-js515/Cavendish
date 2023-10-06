from pydantic import BaseModel
from typing import Optional, List

class PowerSchema(BaseModel):
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
    compatibility: Optional[list[str]] = []
    max_page: int

def serialize_power(power_object, compatibility, max_page):
    power_dict = PowerSchema(
        id=power_object.id,
        name=power_object.name,
        price=power_object.price,
        link=power_object.link,
        company=power_object.company,
        product_seq=power_object.product_seq,
        image=power_object.image,
        category=power_object.category,
        rated_power=power_object.rated_power,
        _80plus_certification=power_object._80plus_certification,
        eta_certification=power_object.eta_certification,
        lambda_certification=power_object.lambda_certification,
        voltage_fluctuation=power_object.voltage_fluctuation,
        output_method=power_object.output_method,
        availability=power_object.availability,
        pfc_circuit=power_object.pfc_circuit,
        pf_factor=power_object.pf_factor,
        fan_size=power_object.fan_size,
        fan_number=power_object.fan_number,
        bearing=power_object.bearing,
        output_12v=power_object.output_12v,
        cable_connection=power_object.cable_connection,
        depth=power_object.depth,
        main_power=power_object.main_power,
        sub_power=power_object.sub_power,
        pcie_16pin=power_object.pcie_16pin,
        pcie_8pin=power_object.pcie_8pin,
        pcie_6pin=power_object.pcie_6pin,
        sata=power_object.sata,
        ide_4=power_object.ide_4,
        rgb_connector=power_object.rgb_connector,
        feature=power_object.feature,
        inside=power_object.inside,
        protection=power_object.protection,
        as_years=power_object.as_years,
        reg_date=power_object.reg_date,
        bookmark=power_object.bookmark,
        compatibility=compatibility,
        max_page=max_page
    ).__dict__
    return power_dict

from pydantic import BaseModel
from typing import Optional, List


class MainboardPCISchema(BaseModel):
    id: int
    mainboard_id: int
    pci_type: str
    pci_number: int


class MainboardSchema(BaseModel):
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
    compatibility: Optional[List[str]] = []


def serialize_mainboard(mainboard_object, mainboard_pci_object, compatibility):
    mainboard_dict = MainboardSchema(
        id=mainboard_object.id,
        name=mainboard_object.name,
        price=mainboard_object.price,
        link=mainboard_object.link,
        company=mainboard_object.company,
        product_seq=mainboard_object.product_seq,
        image=mainboard_object.image,
        cpu_socket=mainboard_object.cpu_socket,
        chipset=mainboard_object.chipset,
        form_factor=mainboard_object.form_factor,
        memory_type=mainboard_object.memory_type,
        memory_number=mainboard_object.memory_number,
        memory_capacity=mainboard_object.memory_capacity,
        xmp=mainboard_object.xmp,
        expo=mainboard_object.expo,
        sata3_number=mainboard_object.sata3_number,
        m2_number=mainboard_object.m2_number,
        m2_interface=mainboard_object.m2_interface,
        m2_formfactor=mainboard_object.m2_formfactor,
        pcie_version=mainboard_object.pcie_version,
        vga_connection=mainboard_object.vga_connection,
        wireless_lan=mainboard_object.wireless_lan,
        wired_lan_speed=mainboard_object.wired_lan_speed,
        phase=mainboard_object.phase,
        graphic_output=mainboard_object.graphic_output,
        back_panel=mainboard_object.back_panel,
        io_header=mainboard_object.io_header,
        feature=mainboard_object.feature,
        reg_date=mainboard_object.reg_date,
        bookmark=mainboard_object.bookmark,
        compatibility=compatibility,
        mainboard_pci=[]
    ).__dict__
    if mainboard_pci_object:
        mainboard_dict['mainboard_pci'] = [serialize_mainboard_pci(x) for x in mainboard_pci_object]
    return mainboard_dict


def serialize_mainboard_pci(mainboard_pci_object):
    return MainboardPCISchema(
        id=mainboard_pci_object.id,
        mainboard_id=mainboard_pci_object.mainboard_id,
        pci_type=mainboard_pci_object.pci_type,
        pci_number=mainboard_pci_object.pci_number
    ).__dict__

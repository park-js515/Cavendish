from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Mainboard(Base):
    __tablename__ = 'mainboard'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Integer)
    link = Column(String(500), nullable=False)
    company = Column(String(30), nullable=False)
    product_seq = Column(Integer, nullable=False)
    image = Column(String(500), nullable=True, comment='이미지 링크')
    cpu_socket = Column(String(30), nullable=False, comment='호환성(CPU)')
    chipset = Column(String(30))
    form_factor = Column(String(30), nullable=False, comment='호환성(케이스)')
    memory_type = Column(String(30), nullable=False, comment='호환성(램)')
    memory_number = Column(Integer, comment='호환성(램 개수)')
    memory_capacity = Column(Float, comment='단위: GB')
    xmp = Column(Boolean, default=None, comment='1: XMP, 2: XMP3.0, 호환성(인텔 램 오버클럭)')
    expo = Column(Boolean, default=None, comment='1: EXPO, 호환성(AMD 램 오버클럭)')
    sata3_number = Column(Integer, comment='호환성(SSD/HDD 개수)')
    m2_number = Column(Integer, comment='호환성(SSD 개수)')
    m2_interface = Column(Integer, comment='비트마스킹, 호환성(SSD 인터페이스)')
    m2_formfactor = Column(Integer, comment='비트마스킹, 호환성(SSD)')
    pcie_version = Column(Integer, comment='비트마스킹')
    vga_connection = Column(String(30), comment='호환성(그래픽카드 인터페이스)')
    wireless_lan = Column(Integer, comment='비트마스킹')
    wired_lan_speed = Column(Integer, comment='단위: 100Mbps')
    phase = Column(Boolean, comment='단위: 개')
    graphic_output = Column(Integer, comment='비트마스킹, 호환성(모니터)')
    back_panel = Column(String(200), comment='후면단자')
    io_header = Column(Integer, comment='비트마스킹')
    feature = Column(Integer, comment='비트마스킹')
    reg_date = Column(Integer, comment='yyyymm')
    bookmark = Column(Integer, default=0)

    mainboard_pci = relationship("MainboardPCI", back_populates="mainboard")


class MainboardPCI(Base):
    __tablename__ = 'mainboard_pci'
    id = Column(Integer, primary_key=True)
    mainboard_id = Column(Integer, ForeignKey('mainboard.id'), nullable=False)
    pci_type = Column(String(30), nullable=False, comment='호환성')
    pci_number = Column(Integer)

    mainboard = relationship("Mainboard", back_populates="mainboard_pci")
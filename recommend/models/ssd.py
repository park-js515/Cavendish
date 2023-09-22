from sqlalchemy import Column, Integer, String, SmallInteger, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class SSD(Base):
    __tablename__ = 'ssd'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Integer)
    link = Column(String(500), nullable=False)
    company = Column(String(30), nullable=False)
    product_seq = Column(Integer, nullable=False)
    image = Column(String(500), nullable=True, comment='이미지 링크')
    form_factor = Column(String(30), nullable=False, comment='호환성(메인보드)')
    interface = Column(String(30), nullable=False, comment='호환성(메인보드)')
    protocol = Column(String(20))
    volume = Column(Integer, comment='GB')
    memory_type = Column(String(30))
    nand = Column(String(10))
    ram_mounted = Column(Boolean, comment='0: none, 1: DRAM탑재')
    ram_type = Column(String(30))
    sequential_read = Column(Integer, comment='MB/s')
    sequential_write = Column(Integer, comment='MB/s')
    read_iops = Column(Integer, comment='K')
    write_iops = Column(Integer, comment='K')
    heatsink = Column(Boolean, comment='0: 없음, 1: 있음')
    rgbled = Column(Boolean, comment='0: 없음, 1: 있음')
    as_year = Column(Integer, comment='년')
    reg_date = Column(Integer, comment='yyyymm')
    bookmark = Column(Integer, default=0)
    support_option = Column(Integer, comment='비트마스킹')

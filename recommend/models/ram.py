from sqlalchemy import Column, Integer, String, Float, Boolean, SmallInteger
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class RAM(Base):
    __tablename__ = 'ram'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Integer)
    link = Column(String(500), nullable=False)
    company = Column(String(30), nullable=False)
    product_seq = Column(Integer, nullable=False)
    image = Column(String(500), nullable=True, comment='이미지 링크')
    generation = Column(String(10), comment='DDR')
    capacity = Column(Float, comment='GB')
    clock = Column(Integer, comment='MHz')
    timing = Column(String(20))
    number = Column(SmallInteger)
    ecc = Column(SmallInteger, default=0, comment='0: none, 1: ECC, 2: 온다이ECC')
    xmp = Column(SmallInteger, default=None, comment='1: XMP, 2: XMP3.0, 호환성')
    expo = Column(SmallInteger, default=None, comment='1: EXPO, 호환성')
    heatsink = Column(SmallInteger, default=0, comment='0: 미포함, 1: 방열판')
    heatsink_color = Column(String(20))
    led = Column(SmallInteger, comment='0: false, 1: true')
    led_color = Column(String(20))
    reg_date = Column(Integer, comment='yyyymm')
    bookmark = Column(Integer, default=0)

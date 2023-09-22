from sqlalchemy import Column, Integer, String, Float, SmallInteger
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class HDD(Base):
    __tablename__ = 'hdd'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Integer)
    link = Column(String(500), nullable=False)
    company = Column(String(30), nullable=False)
    product_seq = Column(Integer, nullable=False)
    image = Column(String(500), nullable=True, comment='이미지 링크')
    size = Column(Float, comment='cm')
    capacity = Column(Integer, comment='GB')
    interface = Column(String(30), nullable=False, comment='호환성(메인보드 SATA 슬롯)')
    rpm = Column(Integer, comment='RPM')
    transfer_rate = Column(Integer, comment='MB/s')
    buffer_capacity = Column(Integer, comment='MB')
    recording_method = Column(SmallInteger, comment='0: CMR, 1: SMR')
    thickness = Column(Float, comment='mm')
    as_year = Column(Integer, comment='년')
    reg_date = Column(Integer, comment='yyyymm')
    bookmark = Column(Integer, default=0)
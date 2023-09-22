from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Quotation(Base):
    __tablename__ = 'quotation'
    id = Column(Integer, primary_key=True)
    user_id = Column(UUID(as_uuid=True), comment='견적함')
    cpu_id = Column(Integer)
    power_id = Column(Integer)
    mainboard_id = Column(Integer)
    ram_id = Column(Integer)
    graphic_id = Column(Integer)
    hdd_id = Column(Integer)
    ssd_id = Column(Integer)
    case_id = Column(Integer)
    cooler_id = Column(Integer)
    name = Column(String(100), comment='견적함')
    state = Column(Integer, comment='비트 마스킹, 견적함')
    create_date = Column(Date, comment='견적함')

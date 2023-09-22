from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Program(Base):
    __tablename__ = 'programs'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    usage = Column(String(50), nullable=False)
    image = Column(String(500), comment='이미지 링크')

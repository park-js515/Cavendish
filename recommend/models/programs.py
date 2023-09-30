from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, SmallInteger
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()

class Program(Base):
    __tablename__ = 'programs'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    usage = Column(String(50), nullable=False)
    image = Column(String(500), comment='이미지 링크')

    requirements = relationship("Requirements", back_populates="program")

class Requirements(Base):
    __tablename__ = 'requirements'
    id = Column(Integer, primary_key=True)
    program_id = Column(Integer, ForeignKey('programs.id'), nullable=False)
    cpu_id = Column(Integer, ForeignKey('cpu.id'), nullable=False)
    gpu_id = Column(Integer, ForeignKey('gpu.id'), nullable=True)
    ram = Column(Float, default=None)
    dx = Column(String(120), default=None)
    storage = Column(Float, default=None)
    os = Column(String(200), default=None)
    spec_class = Column(SmallInteger, nullable=False)
    from .gpu import GPU
    from .cpu import CPU    
    program = relationship("Program", back_populates="requirements")
    gpu = relationship("GPU", back_populates="requirements")
    cpu = relationship("CPU", back_populates="requirements")

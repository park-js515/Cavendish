from sqlalchemy import Column, Integer, String, Float, Boolean, SmallInteger, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Power(Base):
    __tablename__ = 'power'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    price = Column(Integer)
    link = Column(String(500), nullable=False)
    company = Column(String(30), nullable=False)
    product_seq = Column(Integer, nullable=False)
    image = Column(String(500), comment='이미지 링크')
    category = Column(String(15), nullable=False, comment='호환성')
    rated_power = Column(Integer, comment='W, 호환성')
    _80plus_certification = Column(String(30), name='80plus_certification')
    eta_certification = Column(String(15))
    lambda_certification = Column(String(15), comment='소음')
    voltage_fluctuation = Column(Float, comment='+-n%, 성능, 안정성, 시스템수명')
    output_method = Column(String(10), comment='성능(고성능 글카)')
    availability = Column(Integer, comment='%, 안정성(고성능 글카, 오버클럭)')
    pfc_circuit = Column(String(6), comment='PFC 회로')
    pf_factor = Column(Integer, comment='%')
    fan_size = Column(Integer, comment='mm, 소음')
    fan_number = Column(Integer, comment='소음(0인 경우)')
    bearing = Column(String(20))
    output_12v = Column(Float, comment='단위: A')
    cable_connection = Column(String(10), comment='케이블 연결')
    depth = Column(Integer, comment='mm')
    main_power = Column(String(10), comment='메인 전원 연결 핀')
    sub_power = Column(String(20), comment='서브 전원 연결 핀')
    pcie_16pin = Column(SmallInteger, comment='0: none, 1: 12VHPWR 1개, 2: 12VHPWR 2개, 3: 12V2x6 1개, 호환성')
    pcie_8pin = Column(SmallInteger, comment='개, 호환성')
    pcie_6pin = Column(SmallInteger, comment='개, 호환성')
    sata = Column(SmallInteger, comment='개, 호환성')
    ide_4 = Column(SmallInteger, comment='개, 호환성')
    rgb_connector = Column(Integer, comment='개')
    feature = Column(Integer, comment='비트마스킹')
    inside = Column(Integer, comment='비트마스킹')
    protection = Column(Integer, comment='비트마스킹')
    as_years = Column(Integer, comment='년')
    reg_date = Column(Integer, comment='yyyymm')
    bookmark = Column(Integer, default=0)

    # Define the relationship with other tables if needed
    # For example, if you have a foreign key relationship:
    # other_table_id = Column(Integer, ForeignKey('other_table.id'))
    # other_table = relationship("OtherTable", back_populates="power")

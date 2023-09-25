from sqlalchemy import Column, TEXT, INT, BIGINT, UUID, VARCHAR
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    login_id = Column(VARCHAR(20), nullable=False)
    password = Column(VARCHAR(20), nullable=False)
    nickname = Column(VARCHAR(20), nullable=False)
    state = Column(INT, nullable=False)
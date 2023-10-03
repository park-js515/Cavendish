from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

app = {
    "name" : "mysql+pymysql",
    "user" : "root",
    "password" : "ssafy",
    "host" : "localhost",
    "port" : 3306,
    "database" : "s09p22c105"
}

conn_string = f'{app["name"]}://{app["user"]}:{app["password"]}@{app["host"]}:{app["port"]}/{app["database"]}'

class engineconn:

    def __init__(self):
        self.engine = create_engine(conn_string, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        session = Session()
        return session
    
    def connection(self):
        conn = self.engine.connect()
        return conn
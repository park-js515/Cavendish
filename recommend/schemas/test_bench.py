from pydantic import BaseModel

class CPUIDSchema(BaseModel):
    id: int

def serialize_cpu_id(cpu_id):
    cpu_dict = CPUIDSchema(
        id=cpu_id
    ).__dict__
    return cpu_dict

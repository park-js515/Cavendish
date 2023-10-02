from pydantic import BaseModel
from typing import Optional, List

class ProgramSchema(BaseModel):
    id : int
    name : str
    usage : str
    image : str

def serialize_program(program_object):
    program_dict = ProgramSchema(
        id=program_object.id,
        name=program_object.name,
        usage=program_object.usage,
        image=program_object.image
    ).__dict__

    return program_dict


class RequirementsSchema(BaseModel):
    id: int
    program_id: int
    cpu_id: int
    gpu_id: Optional[int] = None
    ram: Optional[float] = None
    dx: Optional[str] = None
    storage: Optional[float] = None
    os: Optional[str] = None
    spec_class: int

    class Config:
        orm_mode = True


def serialize_requirement(requirements):
    return RequirementsSchema(
        id=requirements.id,
        program_id=requirements.program_id,
        cpu_id=requirements.cpu_id,
        gpu_id=requirements.gpu_id,
        ram=requirements.ram,
        dx=requirements.dx,
        storage=requirements.storage,
        os=requirements.os,
        spec_class=requirements.spec_class
    ).__dict__

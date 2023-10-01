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
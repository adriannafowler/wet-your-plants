from pydantic import BaseModel
from typing import Optional
from jwtdown_fastapi.authentication import Token


class UserIn(BaseModel):
    name: str
    email: str
    password: str
    zipcode: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    zipcode: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateUserError(ValueError):
    pass


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


class TodoIn(BaseModel):
    todo: str
    due_date: str


class CompleteIn(BaseModel):
    complete: bool


class TodoOut(BaseModel):
    id: int
    todo: str
    due_date: str
    time_completed: Optional[str]
    complete: bool
    status: Optional[str]
    plant_id: int
    owner_id: int


class PlantIn(BaseModel):
    name: str
    source: str
    species_id: int
    watering_schedule: int


class PlantOut(BaseModel):
    id: int
    name: str
    source: str
    common_name: Optional[str]
    type: Optional[str]
    cycle: Optional[str]
    watering: Optional[str]
    sunlight: Optional[str]
    indoor: Optional[bool]
    care_level: Optional[str]
    maintenance: Optional[str]
    description: Optional[str]
    hardiness: Optional[str]
    original_url: Optional[str]
    dimensions: Optional[str]
    owner_id: int
    watering_schedule: int


class ScheduleIn(BaseModel):
    id: int
    schedule: str


class ScheduleOut(BaseModel):
    id: int
    schedule: str

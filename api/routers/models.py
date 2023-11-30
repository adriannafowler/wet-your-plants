from pydantic import BaseModel


class UserIn(BaseModel):
    name: str
    email: str
    password: str
    zipcode: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    password: str
    zipcode: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateUserError(ValueError):
    pass

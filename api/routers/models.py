from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class User(BaseModel):
    name: str
    email: str
    password: str
    zipcode: str


class DBAccount(User):
    id: int
    password_hash: str


class UserOut(BaseModel):
    id: int
    modified: str


class UserIn(BaseModel):
    password: str


class UserToken(Token):
    user: UserOut


class AuthenticationException(Exception):
    pass

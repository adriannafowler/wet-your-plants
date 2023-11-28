from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.users import UserQueries
from queries.pool import pool
from models import UserOut


class UserForm(BaseModel):
    email: str
    password: str


class UserToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

# @router.post("/api/users", response_model=UserToken | HttpError)
# async def create_user(
#     info: UserOut,
#     request: Request,
#     response: Response,
#     queries: UserQueries = Depends(),
# ): 
#     password = authenticator.hash_password(info.password)
#     try:
#         user = queries.create_user(info,password)
#     except DuplicateUserError:
#         raise HTTPException(
#             status_code = status.HTTP_400_BAD_REQUEST,
#             detail = "Email already exists"
#         )
#     form = UserForm(email=info.email, password=info.password)

#     token = await authenticator.login(response, request, form, queries)

#     return UserToken(user=user, **token.dict())
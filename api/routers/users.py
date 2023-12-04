from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from queries.users import UserQueries
from queries.pool import pool
from routers.models import UserOut,DuplicateUserError,UserIn
from authenticator import authenticator


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

@router.get("/users/{user_id}/", response_model=UserOut)
async def get_user(
    user_id: int,
    repo: UserQueries = Depends(),
) -> UserOut:
    return repo.get_by_id(user_id)


@router.post("/api/user", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),   
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = queries.create_user(info,hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already in use",
        )
    form = UserForm(username=info.email,password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(account=user, **token.dict())

@router.put("/api/user/{users_id}/",response_model=UserOut)
async def update_user(
    info: UserIn,
    users_id: int,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    info.password = hashed_password
    try:
        user = queries.update_user(users_id,info)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already in use",
        )
    return user

@router.get("/token")
async def get_token(
    request:  Request,
    user: dict =Depends(authenticator.try_get_current_account_data),
)-> UserToken | None:
    try:
        if user and authenticator.cookie_name in request.cookies:
            return {
                "access_token": request.cookies[authenticator.cookie_name],
                "type": "Bearer",
                "user": user,
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
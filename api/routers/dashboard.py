from fastapi import APIRouter, Depends
from queries.dashboard import TodoRepository
from models import TodoIn, CompleteIn, TodoOut
from typing import List
from jwtdown_fastapi.authentication import Token
from .auth import authenticator


class AccountToken(Token):
    account: AccountOut


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

router = APIRouter()


@router.get("/dashboard/", response_model=List[TodoOut])
def get_all_todos(
    user_id: int,
    account_data: dict(Depends(authenticator.try_get_current_account_data))
    repo: TodoRepository = Depends(),
) -> List[TodoOut]:
    return repo.get_all(user_id)


@router.delete("/dashboard/{todo_id}/")
def delete_todo(
    todo_id: int,
    repo: TodoRepository = Depends(),
) -> bool:
    return repo.delete(todo_id)


@router.post("/dashboard/")
def create_todo(
    user_id: int, plant_id: int, todo: TodoIn, repo: TodoRepository = Depends()
) -> TodoOut:
    return repo.create(user_id, plant_id, todo)


@router.put("/dashboard/")
def update_todo(
    todo_id: int, todo: TodoIn, repo: TodoRepository = Depends()
) -> TodoOut:
    return repo.update(todo_id, todo)


@router.put("/complete/")
def update_complete_todo(
    todo_id: int, complete: CompleteIn, repo: TodoRepository = Depends()
) -> TodoOut:
    return repo.update_complete(todo_id, complete)

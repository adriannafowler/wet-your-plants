from fastapi import APIRouter, Depends, Response
from queries.dashboard import TodoIn, CompleteIn, TodoOut, TodoRepository
from models import UserOut
from typing import List
from authenticator import authenticator


router = APIRouter()


@router.get("/dashboard/", response_model=List[TodoOut])
def get_all_todos(
    repo: TodoRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
    plant_id: int = None,
) -> List[TodoOut] | None:
    if plant_id:
        return repo.get_by_plant_id(user.get("id"), plant_id)
    else:
        return repo.get_all(user.get("id"))


@router.delete("/dashboard/{todo_id}/")
def delete_todo(
    todo_id: int,
    repo: TodoRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(todo_id)


@router.post("/dashboard/")
def create_todo(
    plant_id: int,
    todo: TodoIn,
    response: Response,
    repo: TodoRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
) -> TodoOut:
    try:
        response.status_code = 200
        return repo.create(user.get("id"), plant_id, todo)
    except Exception:
        response.status_code = 500
        return {"message": "Count not create todo"}


@router.put("/dashboard/")
def update_todo(
    todo_id: int,
    todo: TodoIn,
    repo: TodoRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
) -> TodoOut:
    return repo.update(todo_id, todo)


@router.put("/dashboard/complete/")
def update_complete_todo(
    todo_id: int,
    complete: CompleteIn,
    repo: TodoRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
) -> TodoOut:
    return repo.update_complete(todo_id, complete)

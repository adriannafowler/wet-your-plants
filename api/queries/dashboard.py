import logging
from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool


class TodoIn(BaseModel):
    todo: str
    due_date: str

class TodoOut(BaseModel):
    id: int
    todo: str
    due_date: str
    time_completed: Optional[str]
    complete: bool
    status: Optional[str]
    plant_id: int
    owner_id: int

class TodoRepository:
    def get_all(self, user_id:int) -> List[TodoOut]:
        todos = []
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM todos
                        WHERE owner_id = %s
                        """,
                        [user_id]
                    )
                    records = result.fetchall()
                    for record in records:
                        record_dict = {
                            "id": record[0],
                            "todo": record[1],
                            "due_date": str(record[2]),
                            "time_completed": record[3],
                            "complete": record[4],
                            "status": record[5],
                            "plant_id": record[6],
                            "owner_id": record[7]
                        }
                        todos.append(TodoOut(**record_dict))
        except Exception as e:
            logging.error("Error in getting plants: %s", e)
            raise

        return todos

    def delete(self, todo_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM todos
                        WHERE id = %s
                        """,
                        [todo_id]
                    )
                    return True
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

    def create(self, user_id: int, plant_id: int, todo: TodoIn,) -> TodoOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db. execute(
                        """
                        INSERT INTO todos
                            (todo, due_date, time_completed, complete, status, plant_id, owner_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            todo.todo,
                            todo.due_date,
                            None,
                            False,
                            'upcoming',
                            plant_id,
                            user_id
                        ]
                    )
                    id = result.fetchone()[0]
                    todo_dict = {
                        "id": id,
                        "todo": todo.todo,
                        "due_date": todo.due_date,
                        "time_completed": None,
                        "complete": False,
                        "status": "upcoming",
                        "plant_id": plant_id,
                        "owner_id": user_id
                    }
                    return TodoOut(**todo_dict)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

    def update(self, todo_id: int, todo: TodoIn,) -> TodoOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db. execute(
                        """
                        SELECT *
                        FROM todos
                        WHERE id = %s;
                        """,
                        [todo_id]
                    )
                    current_data = db.fetchone()
                    if current_data is None:
                        raise ValueError("Todo not found")
                    else:
                        result = db.execute(
                            """
                            UPDATE todos
                            SET
                                todo = %s,
                                due_date = %s,
                                time_completed = %s,
                                complete = %s,
                                status = %s,
                                plant_id = %s,
                                owner_id = %s
                            WHERE id = %s
                            RETURNING id, todo, due_date, time_completed, complete,
                            status, plant_id, owner_id;
                            """,
                            [
                                todo.todo,
                                todo.due_date,
                                current_data[3],
                                current_data[4],
                                current_data[5],
                                current_data[6],
                                current_data[7],
                                current_data[0]
                            ]
                        )
                        if db.rowcount == 0:
                            raise ValueError("No updates made, todo data may be identical or plant not found")
                    todo_dict = {
                        "id": todo_id,
                        "todo": todo.todo,
                        "due_date": todo.due_date,
                        "time_completed": current_data[3],
                        "complete": current_data[4],
                        "status": current_data[5],
                        "plant_id": current_data[6],
                        "owner_id": current_data[7]
                    }
                    return TodoOut(**todo_dict)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

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

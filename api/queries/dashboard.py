import logging
from typing import List
from queries.pool import pool
from models import TodoIn, CompleteIn, TodoOut


class TodoRepository:
    def get_all(self, user_id: int) -> List[TodoOut]:
        """
        Retrieves all todo items associated with a given user ID.

        Parameters
        ----------
        user_id : int

        Returns
        -------
        List[TodoOut]
            A list of TodoOut objects representing the todo items.
        """
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
                    return[self.record_out(record) for record in records]
        except Exception as e:
            logging.error("Error in getting plants: %s", e)
            raise

    def delete(self, todo_id:int) -> bool:
        """
        Deletes a todo item identified by the provided todo_id.

        Parameters
        ----------
        todo_id : int
            The ID of the todo item to be deleted.

        Returns
        -------
        bool
            Returns True if the todo item was successfully deleted, False otherwise.
        """
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
                    return db.rowcount > 0
        except Exception as e:
            logging.error("Error in deleting todo: %s", e)
            raise

    def create(self, user_id: int, plant_id: int, todo: TodoIn,) -> TodoOut:
        """
        Creates a new todo item.

        Parameters
        ----------
        user_id : int
            The ID of the user creating the todo item.
        plant_id : int
            The ID of the plant object associated with the todo item.
        todo : TodoIn
            The TodoIn object containing the todo and due_date.

        Returns
        -------
        TodoOut
            A TodoOut object representing the newly created todo item.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db. execute(
                        """
                        INSERT INTO todos
                            (todo, due_date, status, plant_id, owner_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            todo.todo,
                            todo.due_date,
                            'upcoming',
                            plant_id,
                            user_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_out(record)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

    def update(self, todo_id: int, todo: TodoIn,) -> TodoOut:
        """
        Updates an existing todo item identified by todo_id with new information.

        Parameters
        ----------
        todo_id : int
            The ID of the todo item to be updated.
        todo : TodoIn
            An instance of TodoIn containing the updated information for the todo item.
            It includes:
            - todo: A string representing the updated task description.
            - due_date: A string representing the updated due date of the task.

        Returns
        -------
        TodoOut
            A TodoOut object representing the updated todo item. It contains
            changes in the task description and due date.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE todos
                        SET
                            todo = %s,
                            due_date = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [
                            todo.todo,
                            todo.due_date,
                            todo_id
                        ]
                    )
                    if db.rowcount == 0:
                        raise ValueError("No updates made, todo data may be identical or plant not found")
                    record = db.fetchone()
                return self.record_out(record)
        except Exception as e:
            logging.error("Error in creating todo: %s", e)
            raise

    def update_complete(self, todo_id: int, complete: CompleteIn,) -> TodoOut:
        """
        Updates the completion status of a todo item.

        Parameters
        ----------
        todo_id : int
            The ID of the todo item to be updated.
        complete : CompleteIn
            The CompleteIn object containing the completion status.

        Returns
        -------
        TodoOut
            A TodoOut object representing the updated todo item.
        """
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

                    new_time_completed = "NULL" if not complete.complete else "time_completed"

                    db.execute(
                        f"""
                        UPDATE todos
                        SET complete = %s, time_completed = {new_time_completed}
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [complete.complete, todo_id]
                    )
                    record = db.fetchone()
                    return self.record_out(record)
        except Exception as e:
            logging.error("Error in updating todo: %s", e)
            raise

    def record_out(self, record) -> TodoOut:
        """
        Converts a database record into a TodoOut object.

        Parameters
        ----------
        record : tuple
            A tuple representing a row from the todos database table.

        Returns
        -------
        TodoOut
            A TodoOut object representing the todo item.
        """
        todo_dict = {
            "id": record[0],
            "todo": record[1],
            "due_date": str(record[2]),
            "time_completed": str(record[3]) if record[3] else None,
            "complete": record[4],
            "status": record[5],
            "plant_id": record[6],
            "owner_id": record[7]
        }
        print("type", type(TodoOut(**todo_dict)))
        return TodoOut(**todo_dict)

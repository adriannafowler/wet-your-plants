from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from models import UserOut


class UserQueries:
    def get_user(self, user_id: int) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT * 
                        FROM users
                        WHERE id = %s;
                        """,
                    [user_id],
                )
                try:
                    record = None
                    for row in cur.fetchone():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record
                except Exception:
                    return {
                        "message": "Could not get user record for this user id"
                    }
                

    def create_user(self,info) -> UserOut:
        with pool.connection() as conn:
            with conn.curson() as cur:
                input = [
                    info.name,
                    info.email,
                    info.password,
                    info.zipcode,
                ]
                cur.execute(
                    """
                        INSERT INTO users (name,email,password,zipcode)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, name, email, password, zipcode
                    """,
                    input,
                )

                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record
                except Exception:
                    return {
                        "message": "Email already exists"
                    }
                
                
    def update_user(self,user_id,info):
        with pool.connection() as conn:
            with conn.curson() as cur:
                input = [
                    info.name,
                    info.email,
                    info.password,
                    info.zipcode,
                    user_id
                ]
                cur.execute(
                    """
                        UPDATE users
                        SET name = %s,
                            email = %s,
                            password = %s,
                            zipcode = %s,
                        WHERE id = %s
                        RETURNING id, name, email, password, zipcode
                    """,
                    input,
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record
                except Exception:
                    return {
                    "message": "Update Failed"
                    }

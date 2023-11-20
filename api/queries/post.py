from pydantic import BaseModel, condecimal
from datetime import datetime
from decimal import Decimal
from queries.pool import pool
from typing import List, Union


class PostedIn(BaseModel):
    title: str
    description: str
    price: condecimal(decimal_places=2)
    user_id: int
    plant_id: int


class PostedOut(BaseModel):
    id: int
    title: str
    description: str
    price: Decimal
    created_on: datetime
    user_id: int
    plant_id: int


class PostedRepo:
    def create(self, posted: PostedIn) -> PostedOut: 
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO posted
                            (title, description, price, user_id, plant_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id, created_on;
                        """,
                        [
                            posted.title,
                            posted.description,
                            posted.price,
                            posted.user_id,
                            posted.plant_id,
                        ],
                    )
                    row = result.fetchone()
                    id = row[0]
                    created_on = row[1]
                    return self.posted_in_to_out(id, created_on, posted)
        except Exception as e:
            print(e)
            return {"message": "Could not create a post"}
        

    def get_all_posted(
    ) -> Union[List[PostedOut], None]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , title
                            , description
                            , price
                            , created_on
                            , user_id
                            , plant_id
                        FROM posted
                        """,
                    )
                    result = []
                    for data in db:
                        posted = PostedOut(
                            id=data[0],
                            title=data[1],
                            description=data[2],
                            price=data[3],
                            created_on=data[4],
                            user_id=data[5],
                            plant_id=data[6],
                        )
                        result.append(posted)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all posted"}
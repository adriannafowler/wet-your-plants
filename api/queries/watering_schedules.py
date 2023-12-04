import logging
from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from acls import get_plant_details


class ScheduleIn(BaseModel):
    id: int
    schedule: str

class ScheduleOut(BaseModel):
    id: int
    schedule: str

def get_schedules() -> List[ScheduleOut]:
    schedules = []
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, schedule
                    FROM watering_schedules;
                    """
                )
                records = result.fetchall()
                print("result:", result)
                print("records:", records)
                for record in records:
                    record_dict = {"id": record[0], "schedule": record[1]}
                    schedules.append(ScheduleOut(**record_dict))
                print(schedules)
    except Exception as e:
        logging.error("Error in fetching watering schedules: %s", e)

    return schedules

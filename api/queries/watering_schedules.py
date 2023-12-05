import logging
from typing import List
from queries.pool import pool
from models import ScheduleOut


def get_schedules() -> List[ScheduleOut]:
    """
    Retrieves a list of all watering schedules from the database.

    Parameters
    ----------
    None

    Returns
    -------
    List[ScheduleOut]
        A list of ScheduleOut objects, each representing a watering schedule.
        If there are no schedules, an empty list is returned.
    """
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
                for record in records:
                    record_dict = {"id": record[0], "schedule": record[1]}
                    schedules.append(ScheduleOut(**record_dict))
    except Exception as e:
        logging.error("Error in fetching watering schedules: %s", e)

    return schedules

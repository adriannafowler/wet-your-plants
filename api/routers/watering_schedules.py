from fastapi import APIRouter, Depends, Query
from queries.watering_schedules import get_schedules


router = APIRouter()



@router.get("/watering-schedules/")
def get_all_watering_schedules():
    schedules = get_schedules()
    return schedules

from fastapi import APIRouter, Depends
from queries.watering_schedules import ScheduleRepository
from models import UserOut, ScheduleOut
from authenticator import authenticator
from typing import List

router = APIRouter()


@router.get("/watering-schedules/")
def get_all_watering_schedules(
    repo: ScheduleRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
) -> List[ScheduleOut]:
    return repo.get_schedules()

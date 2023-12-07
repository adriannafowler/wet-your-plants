from fastapi import APIRouter, Depends
from queries.watering_schedules import get_schedules
from models import UserOut
from authenticator import authenticator

router = APIRouter()


@router.get("/watering-schedules/")
def get_all_watering_schedules(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    schedules = get_schedules()
    return schedules

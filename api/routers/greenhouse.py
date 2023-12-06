from fastapi import APIRouter, Depends, Query
from queries.greenhouse import PlantIn, PlantOut, PlantRepository
from models import UserOut
from authenticator import authenticator
from typing import List


router = APIRouter()



@router.post("/greenhouse/")
def create_plant(
    plant: PlantIn,
    user_id: int,
    repo: PlantRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data)
) -> PlantOut:
    return repo.create(plant, user.get("id"))


@router.get("/greenhouse/", response_model=List[PlantOut])
def get_all_plants(
    repo: PlantRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
) -> List[PlantOut]:
    try:
        return repo.get_all(user.get("id"))
    except Exception:
        return {"message":"Could not get plant list"}

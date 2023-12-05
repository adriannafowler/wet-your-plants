from fastapi import APIRouter, Depends
from queries.greenhouse import PlantRepository
from models import PlantIn, PlantOut
from typing import List


router = APIRouter()


@router.post("/greenhouse/")
def create_plant(
    plant: PlantIn,
    user_id: int,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    return repo.create(plant, user_id)


@router.get("/greenhouse/", response_model=List[PlantOut])
def get_all_plants(
    user_id: int,
    repo: PlantRepository = Depends(),
) -> List[PlantOut]:
    return repo.get_all(user_id)

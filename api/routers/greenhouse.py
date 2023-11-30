from fastapi import APIRouter, Depends, Query
from queries.greenhouse import PlantIn, PlantOut, PlantRepository


router = APIRouter()



@router.post("/greenhouse/")
def create_plant(
    plant: PlantIn,
    user_id: int,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    return repo.create(plant, user_id)

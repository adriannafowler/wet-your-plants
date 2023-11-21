from fastapi import APIRouter, Depends, Query
from queries.plant_detail import PlantIn, PlantRepository


router = APIRouter()



@router.post("/greenhouse/{user_id}/")
def create_plant(plant:PlantIn,
                user_id: int,
                repo: PlantRepository = Depends()
                ):
    print('plant', plant)
    return repo.create(plant, user_id)

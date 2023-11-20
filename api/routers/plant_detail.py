from fastapi import APIRouter
from queries.plant_detail import PlantIn


router = APIRouter()



@router.post("/greenhouse/{user_id}/")
def add_plant(plant:PlantIn, user_id, plant_id):
    print('plant', plant)
    return plant

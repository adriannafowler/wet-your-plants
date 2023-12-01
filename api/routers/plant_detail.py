from fastapi import APIRouter, Depends, Query
from queries.plant_detail import PlantIn, PlantOut, PlantRepository, StatusIn


router = APIRouter()



@router.get("/greenhouse/{plant_id}/")
def get_one_plant(
    plant_id: int,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    return repo.get_one(plant_id)

@router.delete("/greenhouse/{plant_id}/")
def delete_plant(
    plant_id: int,
    repo: PlantRepository = Depends(),
) -> bool:
    return repo.delete(plant_id)

@router.put("/greenhouse/{plant_id}/")
def update_plant(
    plant_id: int,
    plant: PlantIn,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    return repo.update(plant_id, plant)

@router.put("/greenhouse/update-status/{plant_id}/")
def update_plant_status(
    plant_id: int,
    status_data: StatusIn,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    return repo.update_status(plant_id, status_data)

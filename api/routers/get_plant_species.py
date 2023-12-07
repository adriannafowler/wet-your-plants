from fastapi import APIRouter, Depends
from queries.get_plant_species import SpeciesRepository
from models import UserOut
from authenticator import authenticator

router = APIRouter()


@router.get("/species_ids/{query}")
def get_all_species_id(
    query: str,
    repo: SpeciesRepository = Depends(),
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return repo.get_all(query)

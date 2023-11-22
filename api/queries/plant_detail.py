import logging
from pydantic import BaseModel
from queries.pool import pool
from acls import get_plant_details


class Error(BaseModel):
    message: str


class PlantIn(BaseModel):
    name: str
    source: str
    species_id: int
    watering_schedule: int


class PlantOut(BaseModel):
    id: int
    name: str
    source: str
    common_name: str
    type: str
    cycle: str
    watering: str
    sunlight: str
    indoor: bool
    care_level: str
    maintenance: str
    description: str
    hardiness: str
    original_url: str
    dimensions: str
    owner_id: int
    status: int
    watering_schedule: int


class PlantRepository:
    

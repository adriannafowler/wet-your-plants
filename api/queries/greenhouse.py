import logging
from pydantic import BaseModel
from typing import Optional
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
    common_name: Optional[str]
    type: Optional[str]
    cycle: Optional[str]
    watering: Optional[str]
    sunlight: Optional[str]
    indoor: Optional[bool]
    care_level: Optional[str]
    maintenance: Optional[str]
    description: Optional[str]
    hardiness: Optional[str]
    original_url: Optional[str]
    dimensions: Optional[str]
    owner_id: int
    status: int
    watering_schedule: int


class PlantRepository:
    def create(self, plant: PlantIn, user_id: int) -> PlantOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    details = get_plant_details(plant.species_id)
                    print("Plant details:", details)
                    result = db.execute(
                        """
                        INSERT INTO plants
                            (name, source, common_name, type, cycle, watering, sunlight,
                            indoor, care_level, maintenance, description, hardiness, original_url,
                            dimensions, owner_id, status, watering_schedule)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            plant.name,
                            plant.source,
                            details["common_name"],
                            details["type"],
                            details["cycle"],
                            details["watering"],
                            details["sunlight"],
                            details["indoor"],
                            details["care_level"],
                            details["maintenance"],
                            details["description"],
                            details["hardiness"],
                            details["original_url"],
                            details["dimensions"],
                            user_id,
                            1,
                            plant.watering_schedule
                        ]
                    )
                    id = result.fetchone()[0]
                    print("new plant ID:", id)
                    print("RESULT:", result)
                    plant_data = {
                        "id": id,
                        "name": plant.name,
                        "source": plant.source,
                        "common_name": details["common_name"],
                        "type": details["type"],
                        "cycle": details["cycle"],
                        "watering": details["watering"],
                        "sunlight": details["sunlight"],
                        "indoor": details["indoor"],
                        "care_level": details["care_level"],
                        "maintenance": details["maintenance"],
                        "description": details["description"],
                        "hardiness": details["hardiness"],
                        "original_url": details["original_url"],
                        "dimensions": details["dimensions"],
                        "owner_id": user_id,
                        "status": 1,
                        "watering_schedule": plant.watering_schedule
                    }
                    print("Plant data:", plant_data)
                    return PlantOut(**plant_data)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

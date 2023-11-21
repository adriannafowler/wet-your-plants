import logging
from pydantic import BaseModel
from queries.pool import pool
from acls import get_plant_details, get_plant_species


class Error(BaseModel):
    message: str


class PlantIn(BaseModel):
    name: str
    source: str
    species_id: int


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


class PlantRepository:
    def create(self, plant: PlantIn, user_id: int) -> PlantOut:
        try:
        #connect to database
            with pool.connection() as conn:
                #get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    details = get_plant_details(plant.species_id)
                    print("Plant details:", details)
                    #Run our Insert statement
                    result = db.execute(
                        """
                        INSERT INTO plants
                            (name, source, common_name, type, cycle, watering, sunlight,
                            indoor, care_level, maintenance, description, hardiness, original_url,
                            dimensions, owner_id, status)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                            1
                        ]
                    )
                    id = result.fetchone()[0]
                    print("new plant ID:", id)
                    print("RESULT:", result)
                    #return new data
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
                        "status": 1
                    }
                    print("Plant data:", plant_data)
                    return PlantOut(**plant_data)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

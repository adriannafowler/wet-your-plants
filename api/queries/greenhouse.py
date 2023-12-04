import logging
from typing import List
from queries.pool import pool
from models import PlantIn, PlantOut
from acls import get_plant_details


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
                            dimensions, owner_id, watering_schedule)
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
                        "watering_schedule": plant.watering_schedule
                    }
                    print("Plant data:", plant_data)
                    return PlantOut(**plant_data)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

    def get_all(self, user_id: int) -> List[PlantOut]:
        plants = []
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM plants
                        WHERE owner_id = %s;
                        """,
                        [user_id]
                    )
                    records = result.fetchall()
                    print("records:", records)
                    for record in records:
                        record_dict = {
                            "id": record[0],
                            "name": record[1],
                            "source": record[2],
                            "common_name": record[3],
                            "type": record[4],
                            "cycle": record[5],
                            "watering": record[6],
                            "sunlight": record[7],
                            "indoor": record[8],
                            "care_level": record[9],
                            "maintenance": record[10],
                            "description": record[11],
                            "hardiness": record[12],
                            "original_url": record[13],
                            "dimensions": record[14],
                            "owner_id": record[15],
                            "watering_schedule": record[16]
                        }
                        plants.append(PlantOut(**record_dict))
            print("PLANTS:", plants)
        except Exception as e:
            logging.error("Error in getting plants: %s", e)
            raise

        return plants

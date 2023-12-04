import logging
from typing import List
from queries.pool import pool
from models import PlantIn, PlantOut
from acls import get_plant_details


class PlantRepository:
    def create(self, plant: PlantIn, user_id: int) -> PlantOut:
        """
        Creates a new plant record in the database with the provided plant information and user ID.

        Parameters
        ----------
        plant : PlantIn
            An instance of PlantIn containing the new plant's information.
        user_id : int
            The ID of the user creating the new plant record.

        Returns
        -------
        PlantOut
            A PlantOut object representing the newly created plant record.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    details = get_plant_details(plant.species_id)
                    result = db.execute(
                        """
                        INSERT INTO plants
                            (name, source, common_name, type, cycle, watering, sunlight,
                            indoor, care_level, maintenance, description, hardiness, original_url,
                            dimensions, owner_id, watering_schedule)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
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
                    record = result.fetchone()
                    print("RECORD:", record)
                    return self.record_out(record)
        except Exception as e:
            logging.error("Error in creating plant: %s", e)
            raise

    def get_all(self, user_id: int) -> List[PlantOut]:
        """
        Retrieves a list of all plant records associated with the specified user ID.

        Parameters
        ----------
        user_id : int
            The ID of the user whose plant records are to be retrieved.

        Returns
        -------
        List[PlantOut]
            A list of PlantOut objects, each representing a plant owned by the user.
            If the user has no plants, an empty list is returned.
        """
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
                    return[self.record_out(record) for record in records]
        except Exception as e:
            logging.error("Error in getting plants: %s", e)
            raise

    def record_out(self, record) -> PlantOut:
        """
        Converts a database record into a PlantOut object.

        Parameters
        ----------
        record : tuple
            A tuple representing a row from the plants database table.

        Returns
        -------
        PlantOut
            A PlantOut object representing the plant item.
        """
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
        return PlantOut(**record_dict)

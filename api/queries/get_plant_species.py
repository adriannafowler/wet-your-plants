import logging
from typing import List
from queries.pool import pool
from models import SpeciesIn, SpeciesOut
from acls import get_plant_species




class SpeciesRepository:
    def get_all(self, query: str):
        return get_plant_species(query)

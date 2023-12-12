from acls import get_plant_species


class SpeciesRepository:
    def get_all(self, query: str):
        return get_plant_species(query)

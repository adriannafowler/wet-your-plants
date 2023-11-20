from pydantic import BaseModel


class PlantIn(BaseModel):
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
    maitenance: str
    description: str
    hardiness: str
    original_url: str
    dimensions: str
    owner_id: int
    status: int

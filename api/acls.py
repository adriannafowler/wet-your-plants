import json
import requests
from keys import PERENUAL_API_KEY


def get_plant_species(name):
    url = f"https://perenual.com/api/species-list?key={PERENUAL_API_KEY}&q={name}"

    response = requests.get(url)
    content = json.loads(response.content)

    try:
        result = {"id": []}
        for item in content["data"]:
            result["id"].append(item["id"])
        return result
    except (KeyError, IndexError):
        return {"plant_id": None}

def get_plant_details(plant_id):
    url = f"https://perenual.com/api/species/details/{plant_id}?key={PERENUAL_API_KEY}"

    response = requests.get(url)
    content = json.loads(response.content)
    print(response)

    try:
        return {
            "id": content["id"],
            "common_name": content["common_name"],
            "dimensions": f"{content['dimensions']['min_value']} - {content['dimensions']['max_value']} feet",
            "cycle": content["cycle"],
            "watering": content["watering"],
            "sunlight": content["sunlight"],
            "hardiness": content["hardiness"],
            "maintenance": content["maintenance"],
            "indoor": content["indoor"],
            "care_level": content["care_level"],
            "description": content["description"],
            "default_image": content["default_image"]["original_url"]
        }
    except (KeyError, IndexError):
        return {"plant_details": None}

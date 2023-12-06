import json
import requests
from keys import PERENUAL_API_KEY, OPEN_WEATHER_API_KEY

def get_plant_species(query):
    url = f"https://perenual.com/api/species-list?key={PERENUAL_API_KEY}&q={query}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        content = response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

    try:
        result = {"species": []}
        for item in content.get("data", []):
            default_image = item.get("default_image")
            original_url = default_image.get("original_url") if default_image is not None else None

            species_data = {
                "id": item.get("id"),
                "common_name": item.get("common_name"),
                "original_url": original_url
            }
            result["species"].append(species_data)
        return result
    except (KeyError, IndexError) as e:
        return {"error": f"Data processing error: {str(e)}"}


def get_plant_details(species_id):
    url = f"https://perenual.com/api/species/details/{species_id}?key={PERENUAL_API_KEY}"

    response = requests.get(url)
    content = json.loads(response.content)
    sunlight = ""
    if "sunlight" in content and isinstance(content["sunlight"], list):
        sunlight = ", ".join(content["sunlight"])
    else:
        sunlight = ""

    try:
        return {
            "id": content["id"],
            "common_name": content["common_name"],
            "type": content["type"],
            "dimensions": f"{content['dimensions']['min_value']} - {content['dimensions']['max_value']} feet",
            "cycle": content["cycle"],
            "watering": content["watering"],
            "sunlight": sunlight,
            "hardiness": f"min: {content['hardiness']['min']} max: {content['hardiness']['max']}",
            "maintenance": content["maintenance"],
            "indoor": content["indoor"],
            "care_level": content["care_level"],
            "description": content["description"],
            "original_url": content["default_image"]["original_url"],
        }
    except (KeyError, IndexError):
        return {"plant_details": None}


def get_weather_data(zipcode):
    geo_url = "http://api.openweathermap.org/geo/1.0/zip"
    headers = {"Authorization": OPEN_WEATHER_API_KEY}
    geo_params = {
        "zip": f"{zipcode},US",
        "appid": OPEN_WEATHER_API_KEY,
    }
    response = requests.get(
        geo_url,
        headers=headers,
        params=geo_params,
    )
    geo_content = json.loads(response.content)

    try:
        coordinates = {
            "latitude": geo_content["lat"],
            "longitude": geo_content["lon"],
        }
    except (KeyError, IndexError):
        coordinates = {
            "latitude": None,
            "longitude": None,
        }

    weather_url = "https://api.openweathermap.org/data/2.5/weather"
    weather_params = {
        "lat": coordinates["latitude"],
        "lon": coordinates["longitude"],
        "appid": OPEN_WEATHER_API_KEY,
        "units": "imperial",
    }
    response = requests.get(
        weather_url,
        headers=headers,
        params=weather_params,
    )
    weather_content = json.loads(response.content)
    try:
        weather_data = {
            "temp": weather_content["main"]["temp"],
            "description": weather_content["weather"][0]["description"],
            "wind_speed": weather_content["wind"]["speed"],
        }
    except (KeyError, IndexError):
        weather_data = {
            "temp": None,
            "description": None,
            "wind_speed": None,
        }

    return weather_data

import json
import requests
# from keys import PERENUAL_API_KEY, OPEN_WEATHER_API_KEY


# def get_plant_species(name):
    # url = f"https://perenual.com/api/species-list?key={PERENUAL_API_KEY}&q={name}"

    # response = requests.get(url)
    # content = json.loads(response.content)

    # try:
    #     result = {"species_id": []}
    #     for item in content["data"]:
    #         result["species_id"].append(item["id"])
    #     return result
    # except (KeyError, IndexError):
    #     return {"species_id": None}


# def get_plant_details(species_id):
    # url = f"https://perenual.com/api/species/details/{species_id}?key={PERENUAL_API_KEY}"

    # response = requests.get(url)
    # content = json.loads(response.content)
    # sunlight = ""
    # if 'sunlight' in content and isinstance(content['sunlight'], list):
    #     sunlight = ", ".join(content['sunlight'])
    # else:
    #     sunlight = ""

    # try:
    #     return {
    #         "id": content["id"],
    #         "common_name": content["common_name"],
    #         "type": content["type"],
    #         "dimensions": f"{content['dimensions']['min_value']} - {content['dimensions']['max_value']} feet",
    #         "cycle": content["cycle"],
    #         "watering": content["watering"],
    #         "sunlight": sunlight,
    #         "hardiness": f"min: {content['hardiness']['min']} max: {content['hardiness']['max']}",
    #         "maintenance": content["maintenance"],
    #         "indoor": content["indoor"],
    #         "care_level": content["care_level"],
    #         "description": content["description"],
    #         "original_url": content["default_image"]["original_url"],
    #     }
    # except (KeyError, IndexError):
    #     return {"plant_details": None}


# def get_weather_data(zipcode):
    # geo_url = "http://api.openweathermap.org/geo/1.0/zip"
    # headers = {"Authorization": OPEN_WEATHER_API_KEY}
    # geo_params = {
    #     "zip": f"{zipcode},US",
    #     "appid": OPEN_WEATHER_API_KEY,
    # }
    # response = requests.get(
    #     geo_url,
    #     headers=headers,
    #     params=geo_params,
    # )
    # geo_content = json.loads(response.content)

    # try:
    #     coordinates = {
    #         "latitude": geo_content["lat"],
    #         "longitude": geo_content["lon"],
    #     }
    # except (KeyError, IndexError):
    #     coordinates = {
    #         "latitude": None,
    #         "longitude": None,
    #     }

    # weather_url = "https://api.openweathermap.org/data/2.5/weather"
    # weather_params = {
    #     "lat": coordinates["latitude"],
    #     "lon": coordinates["longitude"],
    #     "appid": OPEN_WEATHER_API_KEY,
    #     "units": "imperial",
    # }
    # response = requests.get(
    #     weather_url,
    #     headers=headers,
    #     params=weather_params,
    # )
    # weather_content = json.loads(response.content)
    # try:
    #     weather_data = {
    #         "temp": weather_content["main"]["temp"],
    #         "description": weather_content["weather"][0]["description"],
    #         "wind_speed": weather_content["wind"]["speed"],
    #     }
    # except (KeyError, IndexError):
    #     weather_data = {
    #         "temp": None,
    #         "description": None,
    #         "wind_speed": None,
    #     }

    # return weather_data

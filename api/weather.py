import requests
import json
from keys import OPEN_WEATHER_API_KEY

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
            "wind_speed": weather_content["wind"]["speed"]
        }
    except (KeyError, IndexError):
        weather_data = {
            "temp": None,
            "description": None,
            "wind_speed": None,
            
        }

    return weather_data





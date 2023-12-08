from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from keys import OPEN_WEATHER_API_KEY
import os
from routers import (
    plant_detail,
    users,
    watering_schedules,
    greenhouse,
    dashboard,
    get_plant_species
)
from authenticator import authenticator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/weather-key", response_model=dict)
def get_weather_api_key():
    return {"weatherApiKey": OPENWEATHER_API_KEY}

print(os.environ.get("CORS_HOST", "http://localhost:3000"))

app.include_router(authenticator.router)
app.include_router(plant_detail.router)
app.include_router(users.router)
app.include_router(watering_schedules.router)
app.include_router(greenhouse.router)
app.include_router(dashboard.router)
app.include_router(get_plant_species.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import weather_router, dashboard_router
import os
from routers import plant_detail, users, watering_schedules, greenhouse
from authenticator import authenticator

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather_router, prefix="/weather-data", tags=["weather"])
app.include_router(dashboard_router, tags=["dashboard"])

@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }


app.include_router(authenticator.router)
app.include_router(plant_detail.router)
app.include_router(users.router)
app.include_router(watering_schedules.router)
app.include_router(greenhouse.router)

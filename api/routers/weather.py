from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/{zipcode}")
async def get_weather_data(zipcode: str):
    try:
        # Replace the following logic with your actual weather data fetching mechanism
        # Example: Fetching weather data from an external API
        weather_data = {"zipcode": zipcode, "temperature": 75, "conditions": "Sunny"}
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching weather data: {str(e)}")

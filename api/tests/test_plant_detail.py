from queries.plant_detail import PlantRepository
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from models import UserOut, PlantOut

client = TestClient(app)


class FakePlantRepository:
    plant_id = 1
    def get_one(self, plant_id):
        plant = {
                "id": plant_id,
                "name": "TEST",
                "source": "TEST",
                "common_name": "German garlic",
                "type": "Bulb",
                "cycle": "Perennial",
                "watering": "Average",
                "sunlight": "full sun",
                "indoor": False,
                "care_level": "Medium",
                "maintenance": "Low",
                "description": "description",
                "hardiness": "min: 5 max: 9",
                "original_url": "https://perenual.com/storage/species_image/678_allium_lusitanicum/og/52284274607_40b7c8241e_b.jpg",
                "dimensions": "0.75 - 1.5 feet",
                "owner_id": 1,
                "watering_schedule": 2
                }
        return PlantOut(**plant)


def fake_get_current_account_data():
    return dict(UserOut(
        id = 1,
        name = "test test",
        email="test@test.com",
        zipcode="12345"
        ))


plant_id = 1
plant = {
        "id": plant_id,
        "name": "TEST",
        "source": "TEST",
        "common_name": "German garlic",
        "type": "Bulb",
        "cycle": "Perennial",
        "watering": "Average",
        "sunlight": "full sun",
        "indoor": False,
        "care_level": "Medium",
        "maintenance": "Low",
        "description": "description",
        "hardiness": "min: 5 max: 9",
        "original_url": "https://perenual.com/storage/species_image/678_allium_lusitanicum/og/52284274607_40b7c8241e_b.jpg",
        "dimensions": "0.75 - 1.5 feet",
        "owner_id": 1,
        "watering_schedule": 2
        }

def test_get_thing():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[PlantRepository] = FakePlantRepository

    # Act
    response = client.get(f"/greenhouse/{plant_id}/")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    expected_response = dict(PlantOut(**plant))
    assert response.json() == expected_response

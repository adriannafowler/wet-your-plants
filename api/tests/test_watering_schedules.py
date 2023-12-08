from queries.watering_schedules import ScheduleRepository
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from models import UserOut

client = TestClient(app)


class FakeScheduleRepository:
    def get_schedules(self):
        return []


def fake_get_current_account_data():
    return dict(
        UserOut(id=1, name="test test", email="test@test.com", zipcode="12345")
    )


def test_get_thing():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ScheduleRepository] = FakeScheduleRepository

    # Act
    response = client.get("/watering-schedules/")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []

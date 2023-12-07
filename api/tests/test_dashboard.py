from queries.dashboard import TodoRepository
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from models import TodoOut, UserOut

client = TestClient(app)


class FakeTodoRepository:
    def get_all(self, user_id):
        test_dict1 = {
            "id": 1,
            "todo": "Water",
            "due_date": "2023-12-12",
            "time_completed": None,
            "complete": False,
            "status": "upcoming",
            "plant_id": 1,
            "owner_id": user_id,
        }
        test_dict2 = {
            "id": 2,
            "todo": "Water",
            "due_date": "2023-12-17",
            "time_completed": None,
            "complete": False,
            "status": "upcoming",
            "plant_id": 1,
            "owner_id": user_id,
        }
        return [TodoOut(**test_dict1), TodoOut(**test_dict2)]


def fake_get_current_account_data():
    return dict(UserOut(id=1, name="test test", email="test@test.com", zipcode="12345"))


test_dict1 = {
    "id": 1,
    "todo": "Water",
    "due_date": "2023-12-12",
    "time_completed": None,
    "complete": False,
    "status": "upcoming",
    "plant_id": 1,
    "owner_id": 1,
}
test_dict2 = {
    "id": 2,
    "todo": "Water",
    "due_date": "2023-12-17",
    "time_completed": None,
    "complete": False,
    "status": "upcoming",
    "plant_id": 1,
    "owner_id": 1,
}


def test_get_thing():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[TodoRepository] = FakeTodoRepository

    # Act
    response = client.get("/dashboard/")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [TodoOut(**test_dict1), TodoOut(**test_dict2)]

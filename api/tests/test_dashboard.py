from pydantic import BaseModel
from queries.dashboard import TodoRepository
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

class FakeTodoRepository:
    def get_all(self, user_id):
        return []

def test_get_thing():
    # Arrange
    app.dependency_overrides[TodoRepository] = FakeTodoRepository
    user_id = 1

    # Act
    response = client.get(f"/dashboard/?user_id={user_id}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []

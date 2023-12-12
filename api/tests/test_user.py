from queries.users import UserQueries
from main import app
from fastapi.testclient import TestClient
from models import UserOut

client = TestClient(app)


class FakeUserRepository:
    user_id = 1

    def create_user(self, user_id):
        test_user = {
            "id": user_id,
            "name": "test",
            "password": "test",
            "email": "test@test.com",
            "zipcode": "11111",
        }
        return UserOut(**test_user)


test_user = {
    "id": 1,
    "name": "test",
    "password": "test",
    "email": "test@test.com",
    "zipcode": "11111",
}


def fake_get_user():
    app.depedency_overrides[UserQueries] = FakeUserRepository
    response = client.get("/api/users/1/")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [UserOut(**test_user)]

    response = client.get("/api/users/2/")
    assert response.status_code == 404

    app.dependency_overrides[UserQueries] = None

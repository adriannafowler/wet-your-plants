import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import (
    UserQueries,
)
from models import UserOutWithPassword


class PlantAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UserQueries,
    ):
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account):
        if isinstance(account, dict):
            account = UserOutWithPassword(**account)

        return account.email, account.dict()


authenticator = PlantAuthenticator(os.environ.get("SIGNING_KEY"))
authenticator = PlantAuthenticator(os.environ["SIGNING_KEY"])

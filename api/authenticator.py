import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import (
    UserQueries,
)
from models import UserOutWithPassword,UserOut


class PlantAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UserQueries,
    ):
        return accounts.get(email)
<<<<<<< HEAD

=======



>>>>>>> inventory
    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        print(account)
        return account.hashed_password
<<<<<<< HEAD

    def get_account_data_for_cookie(self, account):
        if isinstance(account, dict):
            account = UserOutWithPassword(**account)
=======


    def get_account_data_for_cookie(self,account):
        if isinstance(account,dict):
            account = UserOut(**account)
>>>>>>> inventory

        return account.email, account.dict()


authenticator = PlantAuthenticator(os.environ.get("SIGNING_KEY"))
authenticator = PlantAuthenticator(os.environ["SIGNING_KEY"])

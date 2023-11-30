import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import (
    UserQueries,
    
)
from routers.models import UserOutWithPassword


class PlantAuthenticator(Authenticator):
    async def get_account_data(
            self,
            email:str,
            users: UserQueries,
    ):
        return users.get_user(email)
    
    def get_account_getter(
            self,
            users: UserQueries = Depends(),
    ):
        return users
    
    def get_hashed_password(self, user: UserOutWithPassword):
        return user.hashed_password
    
    def get_account_data_for_cookie(self,user):
        if isinstance(user,dict):
            user = UserOutWithPassword(**user)

        return user.email, user.dict()
    

authenticator = PlantAuthenticator(os.environ.get("SIGNING_KEY"))
    
    


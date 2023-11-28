import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserQueries
from routers.models import UserOut, DBAccount


class PlantAuthenticator(Authenticator):
    async def get_user_data(
            self,
            email:str,
            users: UserQueries,
    ):
        return users.get_user(email)
    
    def get_account(
            self,
            users: UserQueries = Depends(),
    ):
        return users
    
    def get_hashed_password(self, user: DBAccount):
        return user.password_hash
    
    
    def get_account_data_for_cookie(
            self,
            user: DBAccount,
    ):
        return user.email, UserOut(
            id = user.id,
            email = user.email,
            name = user.name,
            modified = user.modified.isoformat(),
        )
    

authenticator = PlantAuthenticator(os.environ["SIGNING_KEY"])
    
    


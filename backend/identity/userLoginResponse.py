from collections import UserDict
import json

class UserLoginResponse():
    def __init__(self, token, userId, email, firstName, lastName) -> None:
        self.token = token
        self.userId = userId
        self.email = email
        self.firstName = firstName
        self.lastName = lastName

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
import json

class UserLoginResponse():
    def __init__(self, token, firstName, lastName) -> None:
        self.token = token
        self.firstName = firstName
        self.lastName = lastName

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
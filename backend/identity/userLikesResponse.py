import json

class UserLikesResponse():
    def __init__(self, likes) -> None:
        self.likes = likes

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
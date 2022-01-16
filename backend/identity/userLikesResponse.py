import json

class UserLikesResponse():
    def __init__(self, likes) -> None:
        if likes == None or len(likes) == 0:
            self.likes = []
        self.likes = likes

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
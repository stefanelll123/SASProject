import json

class UserPreferencesResponse():
    def __init__(self, preferences) -> None:
        self.preferences = preferences

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
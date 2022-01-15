import hashlib

class UserLoginRequest():
    def __init__(self, dictionary) -> None:
        self.email = dictionary['email']
        self.password = hashlib.sha256(dictionary['password'].encode('utf-8')).hexdigest()

schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string', "minLength": 5, "maxLength": 200},
        'password': {'type': 'string', "minLength": 8, "maxLength": 200}
    },
    'required': ['email', 'password']
}

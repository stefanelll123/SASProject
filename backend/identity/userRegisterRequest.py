import hashlib

class UserRegisterRequest():
    def __init__(self, dictionary) -> None:
        self.email = dictionary['email']
        self.password = hashlib.sha256(dictionary['password'].encode('utf-8')).hexdigest()
        self.firstName = dictionary['firstName']
        self.lastName = dictionary['lastName']

        self.preferences = dictionary['preferences']
        self.likes = []

schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string', "minLength": 5, "maxLength": 200},
        'password': {'type': 'string', "minLength": 8, "maxLength": 200},
        'firstName': {'type': 'string', "minLength": 2, "maxLength": 200},
        'lastName': {'type': 'string', "minLength": 2, "maxLength": 200},
        'preferences': {'type': 'array'}
    },
    'required': ['email', 'password', 'firstName', 'lastName', 'preferences']
}

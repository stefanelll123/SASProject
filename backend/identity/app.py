import os
import jwt

from flask import Flask
from flask import request
from flask_expects_json import expects_json
from flask import Response

from flask import make_response, jsonify
from jsonschema import ValidationError

from pymongo import MongoClient
from dotenv import load_dotenv

from userRegisterRequest import UserRegisterRequest
from userRegisterRequest import schema as registerSchema

from userLoginRequest import UserLoginRequest
from userLoginRequest import schema as loginSchema

from userLoginResponse import UserLoginResponse

app = Flask(__name__)
load_dotenv()

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['identity']
users = db['users']

key = os.getenv('SECRET')

def createToken(userId, email):
    token = jwt.encode(
        payload= {
            'sub': str(userId),
            'name': email
        },
        key=key
    )
    return token

@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        message = original_error.message
        if 'password' in list(original_error.path):
            message = message.replace(original_error.instance, 'Password')

        return make_response(jsonify({'error': message, 'field': list(original_error.path)[0]}), 400)
    return error

@app.route("/api/login", methods = ['POST'])
@expects_json(loginSchema)
def login():
    user = UserLoginRequest(request.get_json())

    databaseUser = users.find_one({'email': user.email, 'password': user.password})
    if databaseUser == None:
        return Response('{"error": "Wrong username or password"}', status=401)

    response = UserLoginResponse(createToken(databaseUser['_id'], databaseUser['email']), databaseUser['firstName'], databaseUser['lastName'])
    return Response(str(response), status=200)

@app.route('/api/register', methods = ['POST'])
@expects_json(registerSchema)
def register():
    user = UserRegisterRequest(request.get_json())

    databaseUser = users.find_one({'email': user.email})
    if databaseUser != None:
        return Response('{"error": "The email already exists"}', status=400)
    
    print(user.__dict__)
    response = users.insert_one(user.__dict__)
    return Response('{"message": "User with id %s created."}' % response.inserted_id, status=200)

app.run(debug=True)
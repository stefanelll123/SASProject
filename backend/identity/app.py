import os
import jwt

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from flask_expects_json import expects_json
from flask import Response

from flask import make_response, jsonify
from jsonschema import ValidationError

from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

from userRegisterRequest import UserRegisterRequest
from userRegisterRequest import schema as registerSchema

from userLoginRequest import UserLoginRequest
from userLoginRequest import schema as loginSchema

from likeRequest import LikeRequest
from likeRequest import schema as likeSchema

from userLoginResponse import UserLoginResponse
from userPreferencesResponse import UserPreferencesResponse
from userLikesResponse import UserLikesResponse

app = Flask(__name__)
#CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
load_dotenv()

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['identity']
users = db['users']

key = os.getenv('SECRET')


def isValidToken(token):
    try:
        decodeJwt(token)
        return True
    except Exception as e:
        print(e)
        return False

def decodeJwt(token):
    components = token.split(' ')
    if len(components) != 2:
        raise Exception()

    token = components[1]

    header_data = jwt.get_unverified_header(token)
    return jwt.decode(token, key=key, algorithms=[header_data['alg'], ])

def createToken(userId, email):
    token = jwt.encode(
        payload= {
            'sub': str(userId),
            'name': email
        },
        key=key
    )
    return token

@app.before_request
def checkIfAuthentificated():
    if 'login' not in request.endpoint and 'register' not in request.endpoint and request.method != 'OPTIONS':
        response = Response('{"error": "Please login before"}', status=401)
        if request.headers.get('Authentication') == None:
            return response

        if not isValidToken(request.headers.get('Authentication')):
            return response

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
#@cross_origin()
def login():
    user = UserLoginRequest(request.get_json())

    databaseUser = users.find_one({'email': user.email, 'password': user.password})
    if databaseUser == None:
        return Response('{"error": "Wrong username or password"}', status=401)

    response = UserLoginResponse(createToken(databaseUser['_id'], databaseUser['email']), str(databaseUser['_id']), databaseUser['email'], databaseUser['firstName'], databaseUser['lastName'])
    return Response(str(response), status=200)

@app.route('/api/register', methods = ['POST'])
@expects_json(registerSchema)
#@cross_origin()
def register():
    user = UserRegisterRequest(request.get_json())

    databaseUser = users.find_one({'email': user.email})
    if databaseUser != None:
        return Response('{"error": "The email already exists"}', status=400)
    
    print(user.__dict__)
    response = users.insert_one(user.__dict__)
    return Response('{"message": "User with id %s created."}' % response.inserted_id, status=200)

@app.route('/api/users/<id>/preferences', methods= ['GET'])
#@cross_origin()
def getUserPreferencesById(id):
    databaseUser = users.find_one({'_id': ObjectId(id)})
    if databaseUser == None:
        return Response('{"error": "User with id: %s not found"}' % id, status=404)

    response = UserPreferencesResponse(databaseUser['preferences'])
    return Response(str(response), status=200)

@app.route('/api/users/<id>/likes', methods= ['GET'])
#@cross_origin()
def getUserLikesById(id):
    userId = decodeJwt(request.headers.get('Authentication'))['sub']
    if id != userId:
        return Response('{"error": "User with id: %s is not the one authentificated"}' % id, status=400)

    databaseUser = users.find_one({'_id': ObjectId(id)})
    if databaseUser == None:
        return Response('{"error": "User with id: %s not found"}' % id, status=404)

    response = UserLikesResponse(databaseUser['likes'])
    return Response(str(response), status=200)

@app.route('/api/users/<id>/likes', methods= ['POST'])
@expects_json(likeSchema)
#@cross_origin()
def addLike(id):
    userId = decodeJwt(request.headers.get('Authentication'))['sub']
    if id != userId:
        return Response('{"error": "User with id: %s is not the one authentificated"}' % id, status=400)

    databaseUser = users.find_one({'_id': ObjectId(id)})
    if databaseUser == None:
        return Response('{"error": "User with id: %s not found"}' % id, status=404)

    like = LikeRequest(request.get_json())
    users.update_one({ '_id': ObjectId(id) }, { '$addToSet': { 'likes': like.articleId } })

    return Response('{"message": "Like for article %s added for user with id %s"}' % (like.articleId, id), status=200)
    
    
app.run(debug=True)
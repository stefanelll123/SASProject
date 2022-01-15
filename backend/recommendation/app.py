import os
import jwt
import json

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from flask import Response

import requests

from pymongo import MongoClient
from pymongo import TEXT
from dotenv import load_dotenv

from newsfeedResponse import NewsfeedResponse

def createMongotextIndexes(articles):
    articles.create_index([
        ("title", TEXT),
        ("subtitle", TEXT)
    ])

app = Flask(__name__)
CORS(app)
load_dotenv()

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['recommendation']
articles = db['articles']
createMongotextIndexes(articles)

key = os.getenv('SECRET')
identityUri = os.getenv('IDENTITY_URI')

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

def markedArticlesAsLikedByUser(newsfeed, likes):
    for article in newsfeed.articles:
        if article['id'] in likes:
            article['liked'] = True

    return newsfeed

def getLikes(userId):
    response = requests.get(identityUri + '/api/users/%s/likes' % userId, headers={'Authentication': request.headers['Authentication']})
    if response.status_code == 404:
        return Response('{"error": "Userid not found"}', status=404)

    if response.status_code != 200:
        return Response('{"error": "%s"}' % response.reason, status=response.status_code)

    return json.loads(response.content)['likes']

@app.before_request
def checkIfAuthentificated():
    response = Response('{"error": "Please login before"}', status=401)
    if request.headers.get('Authentication') == None:
        return response

    if not isValidToken(request.headers.get('Authentication')):
        return response
        
@app.route("/api/newsfeed", methods = ['GET'])
@cross_origin()
def getArticlesForUser():
    userId = decodeJwt(request.headers.get('Authentication'))['sub']
    
    response = requests.get(identityUri + '/api/users/%s/preferences' % userId, headers={'Authentication': request.headers['Authentication']})
    if response.status_code == 404:
        return Response('{"error": "Userid not found"}', status=404)

    if response.status_code != 200:
        return Response('{"error": "%s"}' % response.reason, status=response.status_code)

    preferences = json.loads(response.content)['preferences']
    preferences = [x.lower() for x in preferences]
    
    queryParams = request.args.to_dict()
    offeset = 0 if queryParams.get('offeset') == None else int(queryParams.get('offeset'))
    limit = 20 if queryParams.get('limit') == None else int(queryParams.get('limit'))

    likes = getLikes(userId)
    if isinstance(likes, Response):
        return likes

    results = articles.find({ 'tags': { '$in': preferences } }).skip(offeset).limit(limit)
    response = NewsfeedResponse(list(results))
    response = markedArticlesAsLikedByUser(response, likes)

    return Response(str(response), status=200)

@app.route("/api/articles", methods = ['GET'])
@cross_origin()
def search():
    queryParams = request.args.to_dict()
    search = queryParams.get('search')

    if search == None:
        return Response([], status=200)

    userId = decodeJwt(request.headers.get('Authentication'))['sub']
    likes = getLikes(userId)
    if isinstance(likes, Response):
        return likes

    results = articles.find({'$text': { '$search': search }}).limit(100)
    response = NewsfeedResponse(list(results))
    response = markedArticlesAsLikedByUser(response, likes)

    return Response(str(response), status=200)

app.run(debug=True)
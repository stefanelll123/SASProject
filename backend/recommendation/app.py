import os

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from pymongo import MongoClient
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['recommendation']
articles = db['articles']

@app.route("/api/articles", methods = ['GET'])
@cross_origin()
def getArticlesForUser():
    pass

app.run(debug=True)
import os

from flask import Flask
from flask import request
from pymongo import MongoClient
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['recommendation']
articles = db['articles']

@app.route("/login", methods = ['GET'])
def getArticlesForUser(user):
    print(request.data)

    doc1 = {"name": "Ram", "age": "26", "city": "Hyderabad"}
    articles.insert_one(doc1)

    return "<p>Hello, World!</p>"
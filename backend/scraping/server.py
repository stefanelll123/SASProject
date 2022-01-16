import pika, sys, os
import requests
import json
import re

from urllib import request
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
rabbitServer = os.getenv('RABBITMQ_SERVER')

client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['recommendation']
articles = db['articles']

class LazyDecoder(json.JSONDecoder):
    def decode(self, s, **kwargs):
        regex_replacements = [
            (re.compile(r'([^\\])\\([^\\])'), r'\1\\\\\2'),
            (re.compile(r',(\s*])'), r'\1'),
        ]
        for regex, replacement in regex_replacements:
            s = regex.sub(replacement, s)
        return super().decode(s, **kwargs)

def callback(ch, method, properties, body):
    try:
        body = json.loads(body)
        result = requests.get('https://medium.com/search?q=%s' % body['search'], headers= {'Accept': 'application/json'})
        if result.status_code == 200:
            #articles = re.search(r'window\[\"obvInit\"\]\((.*)\)', str(result.content))
            articles = str(result.content).replace('])}while(1);</x>', '')
            print(articles[0:20])
            if articles != None:
                text = articles#.group(1)
                print('TEXT: %s' % text[249570:249585])
                articles = json.loads(text, cls=LazyDecoder)
    except Exception as e:
        print("[ERROR]:")
        print(e)

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitServer))
    channel = connection.channel()

    channel.queue_declare(queue='searchMoreArticles')

    channel.basic_consume(queue='searchMoreArticles', on_message_callback=callback, auto_ack=True)

    print('[*] Waiting for messages.')
    channel.start_consuming()

if __name__ == '__main__':
    main()
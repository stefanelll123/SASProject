import pika, sys, os
import requests
import json
import re

from urllib import request
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

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
            content = str(result.content.decode('ascii', 'ignore')).replace('])}while(1);</x>', '')
            content = json.loads(content, cls=LazyDecoder)

            for post in content['payload']['value']['posts']:
                try:
                    article = articles.find_one({'id': post['id']})
                    if article == None:
                        topics = [x['name'].lower() for x in post['virtuals']['topics']]
                        primaryTopic = ''
                        if len(topics) > 0:
                            primaryTopic = topics[0]
                        article = {
                            "id": post['id'],
                            "title": post['title'],
                            "subtitle": post['virtuals']['subtitle'],
                            "source": 'https://medium.com/pixelpassion/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176',
                            "cover": post['virtuals']['previewImage']['imageId'],
                            "primaryTopic": primaryTopic,
                            "topics": topics,
                            "tags": [x['name'].lower() for x in post['virtuals']['tags']],
                            "claps": post['virtuals']['totalClapCount'],
                            "readingTime":post['virtuals']['readingTime'],
                            "recommends": post['virtuals']['recommends'],
                        }

                        articles.insert_one(article)
                        print("Inserted")
                        article = None
                    else:
                        print("skiped, already exists")
                except Exception as e:
                    print(e, file=sys.stderr)
                    print('Not added')
                    pass
                
    except Exception as e:
        print("[ERROR]:", file=sys.stderr)
        print(e, file=sys.stderr)

    print("[INFO] Message processed", file=sys.stderr)

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=os.getenv('RABBITMQ_SERVER')))
    channel = connection.channel()

    channel.queue_declare(queue='searchMoreArticles')

    channel.basic_consume(queue='searchMoreArticles', on_message_callback=callback, auto_ack=True)

    print('[*] Waiting for messages.')
    channel.start_consuming()

if __name__ == '__main__':
    main()
import json

class NewsfeedResponse():
    def __init__(self, articles) -> None:
        self.articles = []
        for article in articles:
            self.articles.append(Article(article).__dict__)

    def __str__(self) -> str:
        return json.dumps(self.__dict__)

class Article():
    def __init__(self, article) -> None:
        self.id = str(article['_id'])
        self.title = article['title']
        self.subtitle = article['subtitle']
        self.source = article['source']
        self.cover = 'https://miro.medium.com/max/875/' + article['cover']
        self.liked = False

    def __str__(self) -> str:
        return json.dumps(self.__dict__)

class LikeRequest():
    def __init__(self, dictionary) -> None:
        self.articleId = dictionary['articleId']

schema = {
    'type': 'object',
    'properties': {
        'articleId': {'type': 'string'}
    },
    'required': ['articleId']
}
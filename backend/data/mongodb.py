from pymongo import MongoClient
from backend.config.base import *


def get_mongo_client():
    return MongoClient(host=MONGO_HOST, port=MONGO_PORT)

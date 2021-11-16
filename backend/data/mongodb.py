from pymongo import MongoClient
from backend.config.base import *


def get_mongo_client():
    return MongoClient(host=MONGO_HOST, port=MONGO_PORT)


def get_database(database):
    return get_mongo_client()[database]


# read last item from collection
def mongo_read_last(collection):
    last_item = collection.find({}) \
                          .sort("_id", -1) \
                          .limit(1)
    return list(last_item)[0]

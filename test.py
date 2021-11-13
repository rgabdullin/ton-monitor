import os
import requests
import pymongo

from pymongo.mongo_client import MongoClient
from loguru import logger


if __name__ == '__main__':
    logger.info(f'requests: {requests.__version__}')
    logger.info(f'pymongo: {pymongo.__version__}')

    logger.info('Environment')
    for k, v in os.environ.items():
        logger.info(f'\t{k:<30s}{v}')

    client = MongoClient(host=os.environ.get('MONGO_HOST', 'mongodb'),
                         port=os.environ.get('MONGO_PORT', 27017))
    logger.info(f'Client: {client}')
    client.test_db.test_table.insert_one({'test1': 1, 'test2': 2})
    
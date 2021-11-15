#!/usr/bin/env python3
import os
import requests as R
import pymongo

from datetime import datetime
from pymongo.mongo_client import MongoClient
from tcp_latency import measure_latency
from backend.background.celery import hello

from loguru import logger


if __name__ == '__main__':
    logger.info(f'requests: {R.__version__}')
    logger.info(f'pymongo: {pymongo.__version__}')

    logger.info('Environment')
    for k, v in os.environ.items():
        logger.info(f'\t{k:<30s}{v}')

    # check mongo
    client = MongoClient(host=os.environ.get('MONGO_HOST', 'localhost'),
                         port=os.environ.get('MONGO_PORT', 27017))
    logger.info(f'Client: {client}')
    client.test_db.test_table.insert_one({'timestamp': datetime.now()})

    logger.info('Mongo table has:')
    for item in client.test_db.test_table.find({}):
        logger.info(f"\t{item}")

    # check endpoints
    endpoints = [
        '/api/getTPS',
    ]
    for endpoint in endpoints:
        resp = R.get(f'http://localhost:8080{endpoint}')
        resp_json = resp.json() if resp.status_code == 200 else {}
        logger.info(f'Endpoint: {endpoint:<40s}Code: {resp.status_code} Resp: {resp_json}')

    # ping
    resp_time = measure_latency('67.207.74.182', port=4924, runs=10, wait=0)
    logger.info(f'resp time: {resp_time}')

    # check celery
    try:
        celery_res = hello.apply_async(retry=False).get(timeout=3)
        logger.info(f"Celery works: hello() returns '{celery_res}'")
    except:
        logger.error("Celery seems to be broken")

from celery import Celery
from backend.config.base import *
from loguru import logger


app = Celery("backend.background",
             broker=CELERY_BROKER_URL,
             backend=CELERY_BACKEND_URL)

@app.task
def hello():
    logger.info('Hello task')
    return "Hello, World!"


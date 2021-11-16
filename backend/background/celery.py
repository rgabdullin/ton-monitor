from celery import Celery
from backend.config.base import *
from loguru import logger


# celery app
app = Celery("backend.background.celery",
             broker=CELERY_BROKER_URL,
             backend=CELERY_BACKEND_URL,
             include=['backend.background.tasks'])

app.conf.update(
    result_expires=600,
)

app.conf.beat_schedule = {
    "ton-apis": {
        "task": "backend.background.tasks.check_ton_apis",
        "schedule": 20.0,
        'options': {'expires': 120.0}
    },
    "ton-bridges": {
        "task": "backend.background.tasks.check_ton_bridges",
        "schedule": 20.0,
        'options': {'expires': 120.0}
    },
    "liteservers": {
        "task": "backend.background.tasks.check_liteservers",
        "schedule": 60.0,
        'options': {'expires': 120.0}
    },
    "network_stats": {
        "task": "backend.background.tasks.check_network_stats",
        "schedule": 5.0,
        'options': {'expires': 20.0}
    },
    "check_governance": {
        "task": "backend.background.tasks.check_governance",
        "schedule": 60.0,
        'options': {'expires': 120.0}
    },
}


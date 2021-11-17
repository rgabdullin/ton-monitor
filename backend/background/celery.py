from celery import Celery
from celery.signals import worker_ready
from backend.config.base import *

from loguru import logger



# celery app
app = Celery("backend.background.celery",
             broker=CELERY_BROKER_URL,
             backend=CELERY_BACKEND_URL,
             include=['backend.background.tasks.services',
                      'backend.background.tasks.blockchain',
                      'backend.background.tasks.servers'])

# FIXME: dangerous for multiple workers
app.control.purge()
app.conf.update(result_expires=600)

app.conf.beat_schedule = {
    "update_ton_apis_stats": {
        "task": "backend.background.tasks.services.update_ton_apis_stats",
        "schedule": 20.0,
        'options': {'expires': 120.0}
    },
    "update_ton_bridges_stats": {
        "task": "backend.background.tasks.services.update_ton_bridges_stats",
        "schedule": 20.0,
        'options': {'expires': 120.0}
    },
    "update_liteserver_stats": {
        "task": "backend.background.tasks.servers.update_liteserver_stats",
        "schedule": 30.0,
        'options': {'expires': 120.0}
    },
    "update_governance_stats": {
        "task": "backend.background.tasks.servers.update_governance_stats",
        "schedule": 30.0,
        'options': {'expires': 120.0}
    },
    "update_validator_stats": {
        "task": "backend.background.tasks.servers.update_validator_stats",
        "schedule": 30.0,
        'options': {'expires': 120.0}
    },
    "update_local_validator_status": {
        "task": "backend.background.tasks.blockchain.update_local_validator_status",
        "schedule": 1.0,
        "options": {'expires': 20.0}
    }
}


# setup logger
logger.add(LOG_PATH, mode='w', level='INFO')

# worker_ready
@worker_ready.connect
def on_worker_ready(sender, **k):
    with sender.app.connection() as conn:
        logger.info('Starting scan_masterchain_loop')
        sender.app.send_task('backend.background.tasks.blockchain.scan_masterchain_loop', 
                             kwargs={'prev_block': None}, 
                             connection=conn)

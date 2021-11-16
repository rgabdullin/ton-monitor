import os


CELERY_BROKER_URL = "amqp://guest:guest@localhost:5672"
CELERY_BACKEND_URL = "rpc://guest:guest@localhost:5672"

MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
MONGO_PORT = int(os.environ.get("MONGO_PORT", "27017"))

MONGO_DATABASE = os.environ.get("MONGO_DATASE", "ton_monitor_debug")

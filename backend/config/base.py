import os


# logs
LOG_PATH = "logs/celery.log"

# RabbitMQ and Celery
RABBITMQ_USER = os.environ.get("CELERY_USER", "guest")
RABBITMQ_PASSWORD = os.environ.get("CELERY_PASSWORD", "guest")
RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST", "localhost")
RABBITMQ_PORT = int(os.environ.get("RABBITMQ_PORT", "5672"))

CELERY_BROKER_URL = f"amqp://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}:{RABBITMQ_PORT}"
CELERY_BACKEND_URL = f"rpc://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}:{RABBITMQ_PORT}"

# mongo
MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
MONGO_PORT = int(os.environ.get("MONGO_PORT", "27017"))
MONGO_DATABASE = os.environ.get("MONGO_DATABASE", "ton_monitor_debug_v2")

# APIs
TON_APIS = [{'name': 'ton.sh',
             'url': 'https://api.ton.sh/getAddressInformation?address=EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
             'webpage': 'https://api.ton.sh'},
            {'name': 'toncenter.com',
             'url': 'https://toncenter.com/api/v2/getAddressInformation?address=0QCyt4ltzak71h6XkyK4ePfZCzJQDSVUNuvZ3VE7hP_Q-GTE',
             'webpage': 'https://toncenter.com'},
            {'name': 'ton.org',
             'url': 'https://ton.org',
             'website': 'https://ton.org'}]

# Bridges
TON_BRIDGES = [{'name': 'ton-eth', 
                'url': 'https://ton.org/bridge/', 
                'address': 'Ef_dJMSh8riPi3BTUTtcxsWjG8RLKnLctNjAM4rw8NN-xWdr'},
               {'name': 'ton-bsc',
                'url': 'https://ton.org/bridge/bsc', 
                'address': 'Ef9NXAIQs12t2qIZ-sRZ26D977H65Ol6DQeXc5_gUNaUys5r'}]

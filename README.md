# TON Monitor
Service for monitoring TON Network status.

Service contains of ??? parts:
* Full TON node with `mytonctrl` module to observe and collect statistics:
    * At this image
* MongoDB database to store extracted from TON node statistics.

## Manual
### Running Celery
1. Set `export PYTHONPATH=/usr/src/mytonctrl`.
2. Run `celery -A backend.background.celery worker --loglevel="INFO"`.

## Running Flask
1. Set `export PYTHONPATH=/usr/src/mytonctrl`.
2. Run `./run_web_server.py`.

## Running MongoDB and RabbitMQ
1. Run `sudo docker-compose up -d --build --force-recreate`.



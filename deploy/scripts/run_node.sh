#!/bin/bash
set -e

echo "Starting validator and mytoncore"
systemctl start validator
systemctl start mytoncore

echo "Check logs, wait for Accept"
cat /var/ton-work/log

echo "Running celery"
cd /usr/src/app
export PYTHONPATH=/usr/src/mytonctrl
celery -A backend.backgroud worker -B --loglevel="INFO"

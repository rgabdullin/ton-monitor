#!/usr/bin/env python3
import sys
sys.path.insert(0, '/usr/src/mytonctrl')

from backend.web import app_demo as app
# from backend.web import app
from loguru import logger


if __name__ == '__main__':
    logger.info('Logger works')
    app.run(host='0.0.0.0', port=8080)

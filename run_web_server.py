#!/usr/bin/env python3
from web import app
from argparse import ArgumentParser
from loguru import logger


if __name__ == '__main__':
    argparser = ArgumentParser("Run Flask Server")
    argparser.add_argument('--demo', action='store_true', help='Run demo server')
    argparser.add_argument('--ip', type=str, default='0.0.0.0', help='IP to listen (default: 0.0.0.0)')
    argparser.add_argument('--port', type=int, default=8080, help='Port to listen (default: 8080)')
    args = argparser.parse_args()

    app.run(host=args.ip, port=args.port)

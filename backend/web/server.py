import mytoncore as M
import requests as R

from flask import Flask
from flask_cors import CORS
from flask import jsonify
from pymongo import MongoClient
from loguru import logger


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/getTPS")
def get_tps():
    data = {
        'tps': [0, 0, 0]
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
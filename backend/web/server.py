from datetime import datetime

from flask import Flask
from flask_cors import CORS
from flask import jsonify

from backend.utils import check_relevance
from backend.data.mongodb import get_database, mongo_read_last
from backend.config.base import MONGO_DATABASE
from loguru import logger


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# database
database = get_database(MONGO_DATABASE)


# endpoints
@app.route("/api/getTonApis")
def get_ton_apis():
    collection = database.ton_apis
    result = mongo_read_last(collection)

    check_relevance(result['timestamp'])
    return jsonify(result['data'])


@app.route("/api/getTonBridges")
def get_ton_bridges():
    collection = database.ton_bridges
    result = mongo_read_last(collection)

    check_relevance(result['timestamp'])
    return jsonify(result['data'])


@app.route("/api/getLiteServers")
def get_liteservers():
    collection = database.liteservers
    result = mongo_read_last(collection)

    check_relevance(result['timestamp'])
    return jsonify(result['data'])


@app.route("/api/getGovernance")
def get_governance():
    collection = database.governance
    result = mongo_read_last(collection)

    check_relevance(result['timestamp'])

    # result['offers'].pop('offers_list')
    # result['complaints'].pop('complaints_list')
    result.pop('_id')
    return jsonify(result)


@app.route("/api/getNetworkStats")
def get_network_stats():
    collection = database.network_stats
    result = mongo_read_last(collection)

    check_relevance(result['timestamp'])
    result.pop('_id')
    return jsonify(result)


@app.route("/")
def index():
    return jsonify(['/api/getTonApis',
                    '/api/getTonBridges',
                    '/api/getLiteServers',
                    '/api/getGovernance',
                    '/api/getNetworkStats'])

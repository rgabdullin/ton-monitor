import pandas as pd
import traceback

from datetime import datetime, timedelta

from flask import Flask
from flask_cors import CORS
from flask import jsonify
from bson import ObjectId

from backend.utils import check_relevance
from backend.data.mongodb import get_database, mongo_read_last
from backend.config.base import MONGO_DATABASE
from loguru import logger


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# database
database = get_database(MONGO_DATABASE)


@app.route("/api/getGovernance")
def get_governance():
    try:
        result = database.governance.find_one({})
        if result is None:
            result = {}
        if '_id' in result:
            result.pop('_id')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
    return jsonify(result)


@app.route("/api/getLiteServers")
def get_liteservers():
    result = list(database.liteservers.find({}))
    for r in result:
        r.pop('_id')
    return jsonify(result)


@app.route("/api/getValidators")
def get_validators():
    result = list(database.validators.find({}))
    for r in result:
        r.pop('_id')
    return jsonify(result)


@app.route("/api/getLocalValidatorStatus")
def get_local_validator_status():
    try:
        result = database.validator_status.find_one({})
        if result is None:
            result = {}
        if '_id' in result:
            result.pop('_id')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
    return jsonify(result)


@app.route("/api/getTonBridgeStats")
def get_ton_bridge_stats(hours=24):
    start = datetime.now() - timedelta(hours=hours)

    results = []
    try:
        df = list(database.ton_bridges.find({"timestamp": {'$gt': start}}))
        if len(df) > 0:
            df = pd.DataFrame(df)
            df.drop(columns='_id', inplace=True)
            df.timestamp = df.timestamp.dt.floor('300s')

            df['smart_contract_state'] = (df.smart_contract_state == 0)
            df.fillna(0.0, inplace=True)
            df = df.groupby(['name', 'url', 'timestamp']).mean().reset_index()

            for name in df.name.unique():
                loc = df[df.name == name]
                url = loc['url'].iloc[0]
                loc = loc.drop(columns=['name', 'url'])
                ts = {key: list(loc[key]) for key in loc.columns}
                res = dict(name=name, url=url, **ts)
                results.append(res)
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
    return jsonify(results)


@app.route("/api/getTonApisStats")
def get_ton_apis_stats(hours=24):
    start = datetime.now() - timedelta(hours=hours)
    
    try:
        df = list(database.ton_apis.find({"timestamp": {'$gt': start}}))
        results = []
        if len(df) > 0:
            df = pd.DataFrame(df)
            df.drop(columns='_id', inplace=True)
            df.timestamp = df.timestamp.dt.floor('300s')

            df.fillna(0.0, inplace=True)
            df = df.groupby(['service_name', 'timestamp']).mean().reset_index()

            for service_name in df.service_name.unique():
                loc = df[df.service_name == service_name]
                loc = loc.drop(columns=['service_name'])
                ts = {key: list(loc[key]) for key in loc.columns}
                res = dict(service_name=service_name, **ts)
                results.append(res)
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
    return jsonify(results)


@app.route("/api/getBlockRate")
def get_block_rate(minutes=2):
    start = datetime.utcnow() - timedelta(minutes=minutes)
    start = ObjectId.from_datetime(start)
    
    # compute metrics
    try:
        sync = database.validator_status.find_one({})
        sync = (sync["outOfSync"] + (datetime.now() - sync['timestamp']).total_seconds()) if sync is not None else 1e9
    
        blocks = list(database.blocks.find({"_id": {"$gt": start}}))
        blocks = pd.DataFrame(blocks).drop(columns='_id')
        blocks['block_number'] = blocks['block_number'].astype(int)
        
        gb = blocks.groupby(['workchain_id'])
        block_num = gb.block_number.max() - gb.block_number.min()
        block_num = block_num.to_frame('blocks_per_second')
        
        block_num['seconds_per_block'] = (minutes * 60) / (block_num.blocks_per_second + 1e-8)
        block_num['blocks_per_second'] = block_num.blocks_per_second / (minutes * 60)
        
        # check sync
        if sync > 60:
            logger.warning('Out of Sync')
            block_num.loc[:] = -1

        result = block_num.reset_index().to_dict(orient='records')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
        result = [{'workchain_id': '-1', 'seconds_per_block': -1, 'blocks_per_second': -1},
                  {'workchain_id': '0', 'seconds_per_block': -1, 'blocks_per_second': -1}]
    return jsonify(result)


@app.route("/api/getTps")
def get_tps(minutes=2):
    start = datetime.utcnow() - timedelta(minutes=minutes)
    start = ObjectId.from_datetime(start)
    try:
        sync = database.validator_status.find_one({})
        sync = (sync["outOfSync"] + (datetime.now() - sync['timestamp']).total_seconds()) if sync is not None else 1e9
        
        # compute metrics
        transactions_count = database.transactions.count_documents({"_id": {"$gt": start}})
        tps = transactions_count / (minutes * 60)
        if sync > 60:
            tps = -1
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.error(f"{traceback.format_exc()}")
        tps = -1
    return jsonify({'transactions_per_second': tps})


@app.route("/api/getLastBlock")
def get_last_block(minutes=2):
    start = datetime.utcnow() - timedelta(minutes=minutes)
    start = ObjectId.from_datetime(start)
    
    try:
        sync = database.validator_status.find_one({})
        sync = (sync["outOfSync"] + (datetime.now() - sync['timestamp']).total_seconds()) if sync is not None else 1e9
        
        # compute metrics
        last_blocks = {}
        for workchain_id in ["-1", "0"]:
            res = database.blocks.find({"workchain_id": {"$eq": workchain_id}})
            res = res.sort("timestamp", -1).limit(1)
            res = list(res)
            if len(res) > 0 and sync <= 60:
                res = res[0]['block_number']
            else:
                res = "-1"
            last_blocks[workchain_id] = res
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.error(f"{traceback.format_exc()}")
        last_blocks = {'-1': '-1', '0': '-1'}
    return jsonify(last_blocks)


@app.route("/api/getTransactionStats")
def get_transaction_stats(hours=24):
    start = datetime.utcnow() - timedelta(hours=hours)
    start = ObjectId.from_datetime(start)

    result = []
    try:
        sync = database.validator_status.find_one({})
        sync = (sync["outOfSync"] + (datetime.now() - sync['timestamp']).total_seconds()) if sync is not None else 1e9
        
        # transactions
        t_list = list(database.transaction_details.find({"_id": {"$gt": start}}))
        if len(t_list) > 0:
            df = pd.DataFrame(t_list)
            df['total'] = 1
            df['value'] = df['value'].fillna(0.0).astype(float)
            df['gas_used'] = df['gas_used'].fillna(0).astype(float)
            
            # stats
            gb = df.groupby('transaction_type')
            res = gb[['value', 'gas_used', 'total']].sum()
            if sync > 60:
                res.loc[:] = -1
            result = res.reset_index().to_dict(orient='records')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.info(f"{traceback.format_exc()}")
        result = []
    return jsonify(result)


@app.route("/")
def index():
    return jsonify(['/api/getGovernance',
                    '/api/getLiteServers',
                    '/api/getValidators',
                    '/api/getLocalValidatorStatus',
                    '/api/getTonApisStats',
                    '/api/getTonBridgeStats',
                    '/api/getBlockRate',
                    '/api/getTps',
                    '/api/getLastBlock',
                    '/api/getTransactionStats',])

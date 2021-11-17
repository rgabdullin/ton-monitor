import mytoncore as M
import requests as R
import traceback
import json
import time

from datetime import datetime
from loguru import logger

from backend.data.mongodb import get_mongo_client, get_database
from backend.background.celery import app
from backend.config.base import *
from backend.utils import *


# ton
ton = M.MyTonCore()


# Tasks
@app.task(bind=True)
def update_transactions(self, block, info=None):
    try:
        chain_id, _, _ = parse_block_ext_id(block)

        if info is None:
            info = dict()

        # reading transactions
        transactions = ton.GetTransactions(block)

        # additional info
        for t in transactions:
            t['block_ext_id'] = block
            t['chain_id'] = chain_id
            t.update(info)

        # details
        transaction_details = []
        for t in transactions:
            t_detail = t.copy()
            account = f"{chain_id}:{t['account']}"    
            try:
                t_info = ton.GetTrans(block, account, t['lt'])
                t_detail.update(t_info)
            except Exception as ee: 
                logger.warning(f"Failed to read transaction details: {ee}")

            # transaction type
            raw_transaction = ton.liteClient.Run('dumptrans {} {} {}'.format(block, account, t['lt']))
            tt, ttf = "unknown", "unknown"
            if raw_transaction:
                tt, ttf = get_transaction_type(raw_transaction)
            t_detail['transaction_type'] = tt
            t_detail['transaction_type_full'] = ttf
            transaction_details.append(t_detail)

        # insert
        db = get_database(MONGO_DATABASE)
        transactions_collection = db.transactions
        transaction_details_collection = db.transaction_details

        # stats and details
        if transactions:
            transactions_collection.insert_many(transactions)
            transaction_details_collection.insert_many(transaction_details)
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update transactions: {traceback.format_exc()}")


@app.task(bind=True)
def add_masterchain_block(self, block_ext_id, timestamp):
    try:
        # check for validator sync
        db = get_database(MONGO_DATABASE)
        sync = db.validator_status.find_one({})
        sync = sync["outOfSync"] + (datetime.now() - sync['timestamp']).total_seconds()
        if sync > 60:
            logger.warning(f"Skipping, local validator is out of sync: {sync} seconds")
            return
        
        # else
        blocks = []
        queue = [block_ext_id]
        while len(queue) > 0:
            block = queue.pop(0)
            chain_id, _, block_number = parse_block_ext_id(block)

            # shards
            shards = ton.GetShards(block)
            for shard in shards:
                if 'block' in shard:
                    queue.append(shard['block'])

            block_info = {
                'timestamp': timestamp,
                'block_ext_id': block,
                'workchain_id': chain_id,
                'block_number': block_number,
                'shards': len(shards)
            }
            blocks.append(block_info)
        #end while

        # insert
        blocks_collection = db.blocks
        blocks_collection.insert_many(blocks)
        # update transactions
        for block in blocks:
            update_transactions.delay(block=block['block_ext_id'], info={'timestamp': timestamp})
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update blocks: {traceback.format_exc()}")


@app.task(bind=True)
def update_local_validator_status(self):
    try:
        validator_status = ton.GetValidatorStatus()
        timestamp = datetime.now()
        validator_status['timestamp'] = timestamp

        # insert
        db = get_database(MONGO_DATABASE)
        validator_status_collection = db.validator_status
        mongo_upload_single(validator_status, validator_status_collection)
        # logger.debug("Local Validator Status updated")
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update local validator status: {traceback.format_exc()}")


@app.task(bind=True)
def scan_masterchain_loop(self, prev_block, prev_timestamp=None):
    timestamp = None
    try:
        # wait for next block
        block = prev_block
        while block == prev_block:
            time.sleep(0.01)
            block = ton.GetLastBlock()
        timestamp = datetime.now()

        # found
        chain_id, _, number = parse_block_ext_id(block)
        add_masterchain_block.delay(block_ext_id=block, timestamp=timestamp)
        logger.info(f"New block #{number} on {chain_id} workchain")
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update last masterchain block: {traceback.format_exc()}")
    
    # launch new task and go
    scan_masterchain_loop.delay(prev_block=block, prev_timestamp=timestamp)

        

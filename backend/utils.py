import socket
import struct

from datetime import datetime
from loguru import logger


# time
def get_last_update(ts):
    td = (datetime.now() - ts).total_seconds()
    return td


def check_relevance(ts, threshold=60):
    td = get_last_update(ts)
    is_relevant = td <= threshold
    if not is_relevant:
        logger.warning(f"Data not relevant. Last update was {td} seconds ago")
    return is_relevant


# ip utils
def ip2int(addr):
    return struct.unpack("!i", socket.inet_aton(addr))[0]


def int2ip(addr):
    return socket.inet_ntoa(struct.pack("!i", addr))


# block parser
def parse_block_ext_id(block_ext_id):
    return block_ext_id.split(':')[0][1:-1].split(',')


# transaction type parser
def get_transaction_type(raw_transaction):
    transaction_type_full = 'unknown'
    try:
        for row in raw_transaction.split('\n'):
            if 'description:(' in row:
                transaction_type_full = row.split('description:(')[-1].strip()
    except Exception as ee:
        logger.warning(f"Failed to parse transaction type: {ee}")
    if len(transaction_type_full) == 0:
        logger.warning(f"Empty transaction type")
        transaction_type_full = 'unknown'
    transaction_type = transaction_type_full.split(' ')[0]
    return transaction_type, transaction_type_full


# mongo update
def update_mongo_collection(new, old, collection, key):
    new_set = {x[key] for x in new}
    old_set = {x[key] for x in old}

    to_remove = old_set - new_set
    to_update = old_set & new_set
    to_add = new_set - old_set

    # remove
    for k in to_remove:
        collection.delete_one({key: k})

    # add and update
    for x in new:
        if x[key] in to_update:
            collection.replace_one({key: x[key]}, x)
        else:
            collection.insert_one(x)
    return

# mongo upload single
def mongo_upload_single(value, collection):
    if collection.count_documents({}) != 1:
        collection.drop()
        collection.insert_one(value)
    else:
        collection.replace_one({}, value)
    return

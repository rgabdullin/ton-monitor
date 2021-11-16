import socket
import struct

from datetime import datetime


# time
def get_last_update(ts):
    td = (datetime.now() - ts).total_seconds()
    return td


def check_relevance(ts, threshold=60):
    td = get_last_update(ts)
    is_relevant = td > threshold
    if not is_relevant:
        logger.warning(f"Data not relevant. Last update was {td} seconds ago")
    return is_relevant


# ip utils
def ip2int(addr):
    return struct.unpack("!i", socket.inet_aton(addr))[0]


def int2ip(addr):
    return socket.inet_ntoa(struct.pack("!i", addr))

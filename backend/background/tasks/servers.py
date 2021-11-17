import traceback
import mytoncore as M
import requests as R
import json

from datetime import datetime
from tcp_latency import measure_latency

from backend.data.mongodb import get_mongo_client, get_database
from backend.background.celery import app
from backend.config.base import *
from backend.utils import *

from loguru import logger


# ton
ton = M.MyTonCore()


@app.task(bind=True)
def update_liteserver_stats(self):
    try:
        # server list
        filePath = ton.liteClient.configPath
        with open(filePath, 'rt') as file:
            text = file.read()
        data = json.loads(text)

        # for all servers
        new_servers = list()
        liteservers = data.get("liteservers")
        for index, server in enumerate(liteservers):
            ip = int2ip(server['ip'])
            port = server['port']
            addr = f"{ip}:{port}"
            
            # working
            working = False
            syncronized = True
            try:
                resp = ton.liteClient.Run("last", index=index)
                if 'out of sync' in resp:
                    syncronized = False
                working = True
            except: 
                working = False
                syncronized = False
            
            # ping
            if working:
                runs = 10
                resp_time = measure_latency(ip, port=port, runs=runs, wait=0)
                ping = sum(resp_time) / runs
            else:
                ping = None
            
            # raw
            timestamp = datetime.now()
            loc = {
                'timestamp': timestamp,
                'addr': addr,
                'working': working,
                'syncronized': syncronized,
                'response_time': ping,
            }
            new_servers.append(loc)

        # update table
        db = get_database(MONGO_DATABASE)
        liteservers_collection = db.liteservers

        old_servers = list(liteservers_collection.find({}))
        
        # to_remove
        update_mongo_collection(new_servers, old_servers, liteservers_collection, 'addr')
        logger.info('Liteserver stats updated')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update Liteserver stats: {traceback.format_exc()}")


@app.task(bind=True)
def update_validator_stats(self):
    try:
        validators = ton.GetValidatorsList()
        timestamp = datetime.now()
        for v in validators:
            if 'online' not in v:
                v['online'] = False
            v['timestamp'] = timestamp
        # insert
        db = get_database(MONGO_DATABASE)
        validators_collection = db.validators

        old_validators = list(validators_collection.find({}))
        update_mongo_collection(validators, old_validators, validators_collection, 'adnlAddr')
        logger.info('Validator stats updated')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update Governance stats: {traceback.format_exc()}")


@app.task(bind=True)
def update_governance_stats(self):
    try:
        # election times
        config17 = ton.GetConfig17()
        config15 = ton.GetConfig15()
        config34 = ton.GetConfig34()
        config36 = ton.GetConfig36()

        fullElectorAddr = ton.GetFullElectorAddr()

        # get times
        startWorkTime = ton.GetActiveElectionId(fullElectorAddr)
        election_status = "open"
        if startWorkTime == 0:
            startWorkTime = config36.get("startWorkTime")
            if startWorkTime is None:
                startWorkTime = config34.get("startWorkTime")
            election_status = "closed" 

        electionsStartBefore = config15["electionsStartBefore"]
        electionsEndBefore = config15["electionsEndBefore"]
        validatorsElectedFor = config15["validatorsElectedFor"]

        # compute election times
        startElection = startWorkTime - electionsStartBefore
        endElection = startWorkTime - electionsEndBefore
        startNextElection = startElection + validatorsElectedFor

        startElection = datetime.fromtimestamp(startElection)
        endElection = datetime.fromtimestamp(endElection)
        startNextElection = datetime.fromtimestamp(startNextElection)

        # data
        timestamp = datetime.now()
        elections = {
            'status': election_status,
            'start': startElection,
            'end': endElection,
            'start_next': startNextElection
        }
        logger.info('Elections info collected')
        
        # offers
        offers = ton.GetOffersNumber()
        logger.info('Offers info collected')

        # complaints
        complaints = ton.GetComplaintsNumber()
        logger.info('Complaints info collected')

        # TODO: make offers and complaints collection
        # offers_list = ton.GetOffers()
        # offers_list = [json.dumps(x) for x in offers_list]
        # complaints_list = ton.GetComplaints()
        # complaints_list = [json.dumps(x) for x in complaints_list]
        
        governance = {
            'timestamp': timestamp,
            'elections': elections,
            'offers': offers,
            'complaints': complaints
        }
        # insert
        db = get_database(MONGO_DATABASE)
        governance_collection = db.governance
        
        # create if something wrong
        if governance_collection.count_documents({}) != 1:
            db.drop_collection('governance')
            governance_collection.insert_one(governance)
        
        # update
        governance_collection.replace_one({}, governance)
        logger.info('Governance stats updated')
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update Governance stats: {traceback.format_exc()}")

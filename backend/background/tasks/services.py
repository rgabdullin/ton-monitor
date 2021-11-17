import traceback
import mytoncore as M
import requests as R

from datetime import datetime
from bs4 import BeautifulSoup
from tcp_latency import measure_latency

from backend.data.mongodb import get_mongo_client, get_database
from backend.background.celery import app
from backend.config.base import *
from backend.utils import *

from loguru import logger


# ton
ton = M.MyTonCore()


@app.task(bind=True)
def update_ton_apis_stats(self):
    # for each service
    try:
        services = []
        for service in TON_APIS:
            name = service['name']
            url = service['url']

            available = False
            resp_time = None
            try:
                # knock url
                resp = R.get(url, timeout=2)
                available = resp.status_code == 200

                # if available then compute response time
                if available:
                    runs = 5
                    resp_time = [R.get(url, timeout=2).elapsed.total_seconds() * 1000 for _ in range(runs)]
                    resp_time = [x for x in resp_time if x is not None]
                    resp_time = sum(resp_time) / len(resp_time)
            except: pass
            # results
            timestamp = datetime.now()
            loc = {
                'timestamp': timestamp, 
                'service_name': name, 
                'available': available, 
                'response_time': resp_time}
            services.append(loc)
        
        # insert
        db = get_database(MONGO_DATABASE)
        ton_apis_collection = db.ton_apis
        ton_apis_collection.insert_many(services)
        logger.info("Ton APIs updated")
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update TON APIs states: {traceback.format_exc()}")
    

@app.task(bind=True)
def update_ton_bridges_stats(self):
    try:
        bridges = []
        for bridge_dict in TON_BRIDGES:
            url = bridge_dict['url']
            resp = R.get(url)
            
            # web page status
            web_page_avaliable = False
            if resp.status_code == 200:
                page = BeautifulSoup(resp.content, features="html.parser")
                button = page.find_all(attrs={'id': ['transferButton']})
                web_page_avaliable = len(button) > 0
                    
            # api status
            smart_contract_state = None
            if bridge_dict['address']:
                cmd = 'runmethod {address} get_bridge_data'.format(**bridge_dict)
                resp = ton.liteClient.Run(cmd)
                for row in resp.split('\n'):
                    if 'result:' in row and '[' in row:
                        row = row[row.find('[')+1:row.find(']')].strip()
                        row = row.split()
                        if len(row) > 0:
                            smart_contract_state = int(row[0])
            # results
            if web_page_avaliable:
                runs = 5
                resp_time = [R.get(url, timeout=2).elapsed.total_seconds() * 1000 for _ in range(runs)]
                resp_time = [x for x in resp_time if x is not None]
                resp_time = sum(resp_time) / len(resp_time)

            timestamp = datetime.now()
            loc = {
                'timestamp': timestamp, 
                'name': bridge_dict['name'],
                'url': bridge_dict['url'],
                'web_page_available': web_page_avaliable,
                'response_time': resp_time,
                'smart_contract_state': smart_contract_state
            }
            bridges.append(loc)

        # insert
        db = get_database(MONGO_DATABASE)
        ton_bridges_collection = db.ton_bridges
        ton_bridges_collection.insert_many(bridges)
        logger.info("Ton Bridges updated")
    except KeyboardInterrupt:
        raise KeyboardInterrupt()
    except:
        logger.critical(f"Failed to update TON Bridges states: {traceback.format_exc()}")

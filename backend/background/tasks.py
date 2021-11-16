import mytoncore as M
import requests as R
import traceback
import json

from datetime import datetime
from loguru import logger
from bs4 import BeautifulSoup
from tcp_latency import measure_latency

from backend.utils import int2ip
from backend.data.mongodb import get_mongo_client
from backend.background.celery import app
from backend.config.base import *


# ton
ton = M.MyTonCore()


# demo task
@app.task
def hello():
    logger.info('Hello task')
    return "Hello, World!"


def upload_to_mongo(result, collection, database, wrap=True):
    try:
        client = get_mongo_client()
        timestamp = datetime.now()
        if wrap:
            data = {'timestamp': timestamp, 'data': result}
        else:
            data = {'timestamp': timestamp}
            data.update(result)
        client[database][collection].insert_one(data)
        logger.info(f'Data successfully uploaded to {database}.{collection}')
    except:
        logger.critical(f'Failed to upload data to {database}.{collection}: {traceback.format_exc()}')
        logger.critical(f'data: {result}')
    return


# Tasks
@app.task
def check_ton_apis():
    services_list = [{'name': 'ton.sh',
                      'api': 'https://api.ton.sh/getAddressInformation?address=EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
                      'ip': 'https://ton.sh'},
                      {'name': 'toncenter.com',
                      'api': 'https://toncenter.com/api/v2/getAddressInformation?address=0QCyt4ltzak71h6XkyK4ePfZCzJQDSVUNuvZ3VE7hP_Q-GTE',
                      'ip': 'https://toncenter.com'}]

    services = []
    for service in services_list:
        name = service['name']
        url = service['api']
        ip = service['ip']
        try:
            available = R.get(url, timeout=2).status_code == 200
        except:
            available = False

        # ping
        runs = 1
        resp_time = measure_latency(ip, runs=runs, timeout=2)
        resp_time = [x for x in resp_time if x is not None]
        if len(resp_time) > 0:
            resp_time = sum(resp_time) / len(resp_time)
        else:
            resp_time = None
        loc = {'name': name, 'available': available, 'resp_time': resp_time}
        services.append(loc)
    logger.info('Apis info updated')
    upload_to_mongo(services, 'ton_apis', MONGO_DATABASE, wrap=True)


@app.task
def check_ton_bridges():
    bridge_list = [{'name': 'ton-eth','url': 'https://ton.org/bridge/', 
                    'address': 'Ef_dJMSh8riPi3BTUTtcxsWjG8RLKnLctNjAM4rw8NN-xWdr'},
                   {'name': 'ton-bsc', 'url': 'https://ton.org/bridge/bsc', 
                    'address': 'Ef9NXAIQs12t2qIZ-sRZ26D977H65Ol6DQeXc5_gUNaUys5r'},
                   {'name': 'ton-other', 'url': 'https://ton.org/bridge/exmo', 
                    'address': ''}]

    bridges = []
    for bridge_dict in bridge_list:
        resp = R.get(bridge_dict['url'])
        
        # web page status
        web_page_status = 'not available'
        if resp.status_code == 200:
            page = BeautifulSoup(resp.content, features="html.parser")
            button = page.find_all(attrs={'id': ['transferButton']})
            if len(button) > 0:
                web_page_status = 'available'
                
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
        bridges.append({
            'name': bridge_dict['name'],
            'url': bridge_dict['url'],
            'web_page_status': web_page_status,
            'smart_contract_state': smart_contract_state
        })
    logger.info('Bridges info updated')
    upload_to_mongo(bridges, 'ton_bridges', MONGO_DATABASE, wrap=True)


@app.task
def check_liteservers():
    # server list
    filePath = ton.liteClient.configPath
    file = open(filePath, 'rt')
    text = file.read()
    file.close()
    data = json.loads(text)

    # for all servers
    result = list()
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
        
        loc = {
            'addr': addr,
            'working': working,
            'syncronized': syncronized,
            'response_time': ping,
        }
        result.append(loc)

    logger.info('LiteServers info updated')
    upload_to_mongo(result, 'liteservers', MONGO_DATABASE, wrap=True)


@app.task
def check_network_stats():
    data = {}

    statistics = ton.GetSettings("statistics")
    data['tps'] = ton.GetStatistics('tpsAvg', statistics)[0]

    # block rate
    data['block_rate'] = {
        'masterchain': -1.0,
        'basechain': -1.0,
    }

    # shardchains
    data['shardchains'] = ton.GetShardsNumber()

    # validators
    validators = ton.GetValidatorsList()
    validators_total = len(validators)
    validators_online = len(list(filter(lambda x: x['online'], validators)))
    data['validators'] = {
        'online': validators_online,
        'total': validators_total
    }

    logger.info('Network Stats info updated')
    upload_to_mongo(data, 'network_stats', MONGO_DATABASE, wrap=False)


# TODO: add more governance info
@app.task
def check_governance():
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

    elections = {
        'status': election_status,
        'start': startElection,
        'end': endElection,
        'start_next': startNextElection
    }

    logger.info('Elections info collected')
    
    # offers
    offers = ton.GetOffersNumber()
    offers_list = ton.GetOffers()
    offers['offers_list'] = [json.dumps(x) for x in offers_list]

    logger.info('Offers info collected')

    # complaints
    complaints = ton.GetComplaintsNumber()
    complaints_list = ton.GetComplaints()
    complaints['complaints_list'] = [json.dumps(x) for x in complaints_list]

    logger.info('Complaints info collected')

    governance = {
        'elections': elections,
        'offers': offers,
        'complaints': complaints
    }

    logger.info('Governance info updated')
    upload_to_mongo(governance, 'governance', MONGO_DATABASE, wrap=False)

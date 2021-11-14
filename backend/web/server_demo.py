from flask import Flask
from flask_cors import CORS
from flask import jsonify
from pymongo import MongoClient

from loguru import logger


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/")
def index():
    logger.info('index method called')
    resp = "<p><H1>Methods</H1></p>"
    resp += '<p>/api/getBlockRate: block rate info</p>'
    resp += '<p>/api/getUptime: uptime and response</p>'
    resp += '<p>/api/getGovernance</p>'
    resp += '<p>/api/getLiteservers</p>'
    resp += '<p>/api/getBasicOnChainStats</p>'
    return resp


@app.route("/api/getTPS")
def get_tps():
    data = {'tps': 1.3,
            'block_rate': {'masterchain': 3.0, 'basechain': 2.0},
            'shardchains': 1,
            'validators': {'online': 124, 'total': 139}}
    return jsonify(data)

@app.route("/api/getLiteServers")
def get_liteservers():
    data = [{'addr': '67.207.74.182:4924',
            'working': True,
            'response_time': 47.67313003540039,
            'syncronized': 'unknown'},
            {'addr': '5.9.10.47:19949',
            'working': True,
            'response_time': 43.97885799407959,
            'syncronized': 'unknown'},
            {'addr': '5.9.10.15:48014',
            'working': True,
            'response_time': 44.907498359680176,
            'syncronized': 'unknown'},
            {'addr': '135.181.177.59:53312',
            'working': True,
            'response_time': 21.085214614868164,
            'syncronized': 'unknown'},
            {'addr': '135.181.140.212:13206',
            'working': True,
            'response_time': 22.59547710418701,
            'syncronized': 'unknown'},
            {'addr': '135.181.140.221:46995',
            'working': True,
            'response_time': 20.648527145385742,
            'syncronized': 'unknown'},
            {'addr': '51.195.176.148:4194',
            'working': True,
            'response_time': 62.694478034973145,
            'syncronized': 'unknown'},
            {'addr': '65.21.141.233:30131',
            'working': True,
            'response_time': 21.662235260009766,
            'syncronized': 'unknown'},
            {'addr': '65.21.141.198:47160',
            'working': True,
            'response_time': 21.21891975402832,
            'syncronized': 'unknown'},
            {'addr': '65.21.141.231:17728',
            'working': True,
            'response_time': 21.36540412902832,
            'syncronized': 'unknown'},
            {'addr': '65.21.141.197:13570',
            'working': True,
            'response_time': 20.913314819335938,
            'syncronized': 'unknown'},
            {'addr': '164.68.101.206:52995',
            'working': True,
            'response_time': 54.43284511566162,
            'syncronized': 'unknown'},
            {'addr': '164.68.99.144:20334',
            'working': True,
            'response_time': 52.297234535217285,
            'syncronized': 'unknown'},
            {'addr': '188.68.216.239:19925',
            'working': True,
            'response_time': 13.794636726379395,
            'syncronized': 'unknown'},
            {'addr': '51.195.189.59:52888',
            'working': True,
            'response_time': 64.40062522888184,
            'syncronized': 'unknown'},
            {'addr': '51.195.189.140:48621',
            'working': True,
            'response_time': 164.27335739135742,
            'syncronized': 'unknown'},
            {'addr': '135.181.132.198:53560',
            'working': True,
            'response_time': 21.636128425598145,
            'syncronized': 'unknown'},
            {'addr': '135.181.132.253:46529',
            'working': True,
            'response_time': 21.435976028442383,
            'syncronized': 'unknown'},
            {'addr': '54.39.158.156:51565',
            'working': True,
            'response_time': 140.3064250946045,
            'syncronized': 'unknown'},
            {'addr': '3.139.38.190:32000',
            'working': True,
            'response_time': 129.60433959960938,
            'syncronized': 'unknown'},
            {'addr': '13.53.155.120:32000',
            'working': True,
            'response_time': 26.490068435668945,
            'syncronized': 'unknown'},
            {'addr': '52.66.91.187:32000',
            'working': True,
            'response_time': 160.26957035064697,
            'syncronized': 'unknown'},
            {'addr': '54.179.9.65:32000',
            'working': False,
            'response_time': None,
            'syncronized': 'unknown'}]
    return jsonify(data)


@app.route("/api/getBlockRate")
def get_block_rate():
    logger.info('get_block_rate method called')
    data = {
        'masterchain': 13.37,
        'basechain': 69.69
    }
    return jsonify(data)
    

@app.route("/api/getUptime")
def get_uptime():
    logger.info('get_uptime method called')
    data = [
        {
            'host': 'ton.org',
            'timestamps': [1633381200, 1633384800, 1633388400, 1633392000, 1633395600, 1633399200, 
                        1633402800, 1633406400, 1633410000, 1633413600, 1633417200, 1633420800, 
                        1633424400, 1633428000, 1633431600, 1633435200, 1633438800, 1633442400, 
                        1633446000, 1633449600, 1633453200, 1633456800, 1633460400, 1633464000],
            'uptimes': [0.74, 0.67, 0.4 , 0.25, 0.19, 0.78, 0.43, 0.94, 0.59, 0.18, 0.39,
                        0.79, 0.79, 0.84, 0.66, 0.45, 0.82, 0.64, 0.8 , 0.71, 0.03, 0.08,
                        0.16, 0.08],
            'response_times': [42.0, 155.0, 120.0, 30.0, 310.0, 100.0, 58.0, 161.0, 
                            565.0, 276.0, 23.0, 193.0, 195.0, 158.0, 98.0, 218.0, 
                            85.0, 37.0, 1.0, 138.0, 48.0, 308.0, 25.0, 33.0]
        },
        {
            'host': 'ton.sh',
            'timestamps': [1633381200, 1633384800, 1633388400, 1633392000, 1633395600, 1633399200, 
                        1633402800, 1633406400, 1633410000, 1633413600, 1633417200, 1633420800, 
                        1633424400, 1633428000, 1633431600, 1633435200, 1633438800, 1633442400, 
                        1633446000, 1633449600, 1633453200, 1633456800, 1633460400, 1633464000],
            'uptimes': [0.16, 0.84, 0.17, 0.08, 0.18, 0.52, 0.59, 0.71, 0.72, 0.31, 0.79, 0.0, 
                        0.72, 0.63, 0.87, 0.46, 0.51, 0.13, 0.23, 0.24, 0.6, 0.48, 0.32, 0.87],
            'response_times': [496.0, 161.0, 7.0, 1203.0, 89.0, 209.0, 323.0, 103.0, 
                            151.0, 32.0, 342.0, 62.0, 553.0, 416.0, 58.0, 523.0, 
                            162.0, 96.0, 28.0, 30.0, 466.0, 16.0, 80.0, 512.0]
        },
        {
            'host': 'toncenter.com',
            'timestamps': [1633381200, 1633384800, 1633388400, 1633392000, 1633395600, 1633399200, 
                        1633402800, 1633406400, 1633410000, 1633413600, 1633417200, 1633420800, 
                        1633424400, 1633428000, 1633431600, 1633435200, 1633438800, 1633442400, 
                        1633446000, 1633449600, 1633453200, 1633456800, 1633460400, 1633464000],
            'uptimes': [1.0, 0.81, 0.61, 0.49, 0.97, 0.6, 0.36, 0.98, 0.09, 0.25, 0.5, 0.9, 
                        0.31, 0.2, 0.73, 0.08, 0.96, 0.67, 0.96, 0.91, 0.46, 0.81, 0.67, 0.63],
            'response_times': [118.0, 147.0, 157.0, 588.0, 112.0, 18.0, 100.0, 27.0, 
                            42.0, 261.0, 65.0, 256.0, 132.0, 59.0, 104.0, 128.0, 
                            414.0, 395.0, 59.0, 468.0, 54.0, 7.0, 4.0, 386.0]
        }
    ]
    return jsonify(data)


@app.route("/api/getGovernance")
def get_governance():
    data = {
        'validator_elections': 13,
        'config': 20,
        'slashing': 'пока хз'
    }
    return jsonify(data)


# @app.route("/api/getLiteservers")
# def get_liteservers():
#     data = [
#         {
#             'host': 'some_liteserver.org',
#             'response_time': 123,
#             'sync_state': 'state_string'
#         },
#         {
#             'host': 'some_another_liteserver.org',
#             'response_time': 321,
#             'sync_state': 'another_state_string'
#         },
#     ]
#     return jsonify(data)

@app.route("/api/getBasicOnChainStats")
def get_basic_onchain_stats():
    data = {
        'tps': 13.4,
        'num_validators': 10,
        'num_validators_online': 8,
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

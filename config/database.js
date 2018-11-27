require('dotenv').config();

module.exports = {
    'development': {
        'username': '',
        'password': '',
        'database': 'postgres',
        'host': '127.0.0.1',
        'dialect': 'postgres'
    },
    'test': {
        'username': '',
        'password': '',
        'database': 'postgres',
        'host': '127.0.0.1',
        'dialect': 'postgres'
    },
    'production': {
        'username': 'dgfgvmdyiyaehb',
        'password': 'd9a7a79dfb1e9b528843a5c7069dc00d5988ca1909b368eab3a130073bac494c',
        'database': 'ddaq0s9mc1slpj',
        'host': 'ec2-23-21-65-173.compute-1.amazonaws.com',
        'dialect': 'postgres'
    }
};

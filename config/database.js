require('dotenv').config();

module.exports = {
    'development': {
        'username': 'root',
        'password': '123456',
        'database': 'test',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    },
    'test': {
        'username': 'root',
        'password': '',
        'database': 'test',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    },
    'production': {
        'username': 'jpzmmfnqestolx',
        'password': '3ea1a73b09f541dae9e8edc062663612e4c1e6d7c355552ba3807c213c5aace4',
        'database': 'da49hvhhm66phr',
        'host': 'ec2-107-21-233-72.compute-1.amazonaws.com',
        'dialect': 'postgres'
    }
};

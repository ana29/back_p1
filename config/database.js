require('dotenv').config();

module.exports = {
    'development': {
        'username': '',// caso tenha configurado o bd com um username add aqui
        'password': '',//caso tenha configurado o bd com uma senha add aqui
        'database': 'postgres',//add aqui com o nome do seu db
        'host': '127.0.0.1',
        'dialect': 'postgres'

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

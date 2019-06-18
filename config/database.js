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
        'username': 'blsqvntphqztrl',
        'password': 'c2d01218ccc12bd1cbaf9961708a49066a3ac8025097a09fc7f84ca56b1c690d',
        'database': 'd44ed760tfpdqn',
        'host': 'ec2-54-225-205-79.compute-1.amazonaws.com',
        'dialect': 'postgres'
    }
};

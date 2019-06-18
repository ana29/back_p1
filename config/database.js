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
        'username': 'xfulpaytwjfhne',
        'password': '8cbdd538b3a6a296f9c5dcfb23d765c136d89bb626f9bc67b7a34b596d134e81',
        'database': 'dd1t66tmm68egt',
        'host': 'ec2-50-19-221-38.compute-1.amazonaws.com',
        'dialect': 'postgres'
    }
};

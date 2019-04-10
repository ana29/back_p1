const config = require('config');
const server = require('./app/core/app');
const models = require('./app/models');

global.findUserById = (userId) => {

    return models.Users.findById(userId).then((data) => {
        if (data) {
            return { data: data.dataValues };
        } else {
            return false;
        }
    });
};

process.on('unhandledRejection', (reason, p) =>
    console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
    console.log('Application started on http://%s:%d', config.get('host'), port)
);

const port = config.get('port');

server.listen(port, config.get('host'));



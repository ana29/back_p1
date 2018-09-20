const config = require('config');
const server = require('./app/core/app');
const models = require('./app/models');


process.on('unhandledRejection', (reason, p) =>
    console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
    console.log('Application started on http://%s:%d', config.get('host'), port)
);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = config.get('port');

server.listen(port, config.get('host'));
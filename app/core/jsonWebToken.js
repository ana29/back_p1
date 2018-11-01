const jwt = require('jsonwebtoken');
const config = require('config');
const HttpStatusCodes = require('http-status-codes');

const secretKey = Buffer.from(config.get('jwtSecret')).toString('base64');

module.exports = {
    generateToken: (id) => {
        return jwt.sign({ id }, secretKey, { expiresIn: '7d' });
    },
    authenticateSocket: (request) => {
        return new Promise((resolve, reject) => {
            try {
                const token = request.body.token;
                let decoded = jwt.verify(token, secretKey);
                return global.findUserById(decoded.id).then((user) => {
                    if (user) {
                        resolve(user.data);
                    } else {
                        throw new Error(global.__('user_unauthorized'));
                    }
                }).catch(() => {
                    throw new Error(global.__('user_unauthorized'));
                });
            } catch(err) {
                reject(err);
            }
        });
    }
};

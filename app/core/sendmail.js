const {createConnection} = require('net');
const {resolveMx} = require('dns');
const {DKIMSign} = require('dkim-signer');
const CRLF = '\r\n';

function dummy () {}
module.exports = function (options) {
    options = options || {};
    const logger = options.logger || (options.silent && {
        debug: dummy,
        info: dummy,
        warn: dummy,
        error: dummy
    } || {
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
    });
    const dkimPrivateKey = (options.dkim || {}).privateKey;
    const dkimKeySelector = (options.dkim || {}).keySelector || 'dkim';
    const devPort = options.devPort || -1;
    const devHost = options.devHost || 'localhost';
    const smtpPort = options.smtpPort || 25
    const smtpHost = options.smtpHost || -1
    }
    return sendmail
}
const config = require('config');
const appPackage = require('../../package');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = app => {
    const swaggerDefinition = {
        info: {
            title: `${appPackage.fullname} Swagger API`,
            version: '1.0.0',
            description: `Describes a RESTful API with Swagger for ${appPackage.fullname}`,
        },
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [
            {jwt: []}
        ],
        host: process.env.IS_HEROKU ?
            `${config.get('swaggerHost')}` :
            `${config.get('swaggerHost')}:${config.get('swaggerPort')}`,
        basePath: '/',
    };
=======
const swaggerJSDoc = require('swagger-jsdoc');
const config       = require('config');
const appPackage   = require('../../package');

module.exports = app => {
  const swaggerDefinition = {
    info: {
      title: `${appPackage.fullname} Swagger API` ,
      version: '1.0.0',
      description: `Describes a RESTful API with Swagger for ${appPackage.fullname}`,
    },
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [
      { jwt: [] }
    ],
    host: `${config.get('swaggerHost')}:${config.get('swaggerPort')}`,
    basePath: '/',
  };

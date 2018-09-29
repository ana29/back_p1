require('dotenv').config();

module.exports = {
  'host': 'https://projetop1.herokuapp.com',
  'swaggerHost': process.env.SWAGGER_HOST,
  'swaggerPort': process.env.SWAGGER_PORT,
  'port':process.env.PORT|| 3000 ,
  'public': '../public/',
  'paginate': {
    'default': 10,
    'max': 50
  },
  'jwtSecret': 'jWtSeCrEt'
};

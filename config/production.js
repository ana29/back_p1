require('dotenv').config();

module.exports = {
  'host': '0.0.0.0',
  'swaggerHost': process.env.HOST,
  'swaggerPort': process.env.PORT,
  'port':process.env.PORT|| 3000 ,
  'public': '../public/',
  'paginate': {
    'default': 10,
    'max': 50
  },
  'jwtSecret': 'jWtSeCrEt'
};

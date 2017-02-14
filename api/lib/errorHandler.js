const logger = require('./logger');
const responseProxy = require('./responseProxy');

module.exports = (err, request, response, next) => {
  logger.error('> server error: ', err);
  responseProxy(response, {
    status: err.status || 500,
    data: {},
    error: err.message || 'Internal Server Error',
  });
};

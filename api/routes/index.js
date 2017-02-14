const logger = require('../lib/logger');
const shorten = require('./v1/shorten');
const info = require('./v1/info');
const remove = require('./v1/remove');
const update = require('./v1/update');

module.exports = (router) => {
  // Log requests
  router.use((req, res, next) => {
    logger.log('> request:', req.originalUrl);
    return next();
  });

  // Setup routes
  router.post('/shorten', shorten);
  router.get('/info/:hash', info);
  router.delete('/remove', remove);
  router.put('/update/:hash', update);

  return router;
};

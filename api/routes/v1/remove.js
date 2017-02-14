const Link = require('../../db/model/link');
const responseProxy = require('../../lib/responseProxy');
const timestamp = require('../../lib/timestamp');

module.exports = (request, response, next) => {
  const hash = request.body.hash;

  Link.findOne({ hash }).exec((err, link) => {
    if (err) return next(err);

    if (link === null) {
      return responseProxy(response, {
        status: 404,
        data: {},
        error: 'Not Found',
      });
    }

    return link.remove((err) => {
      if (err) return next(err);

      return responseProxy(response, {
        status: 200,
        data: {
          hash,
          deletedAt: timestamp(),
        },
      });
    });
  });
};

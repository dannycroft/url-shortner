const Link = require('../../db/model/link');
const responseProxy = require('../../lib/responseProxy');
const timestamp = require('../../lib/timestamp');

module.exports = (request, response, next) => {
  const hash = request.params.hash;
  const url = request.body.url;
  const updatedAt = timestamp();
  const updates = {
    url,
    updatedAt,
  };

  Link.findOneAndUpdate({ hash }, updates, { new: true }).exec((err, link) => {
    if (err) return next(err);

    if (link === null) {
      return responseProxy(response, {
        status: 404,
        data: {},
        error: 'Not Found',
      });
    }

    return responseProxy(response, {
      status: 200,
      data: link,
    });
  });
};

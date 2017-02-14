const Link = require('../../db/model/link');
const responseProxy = require('../../lib/responseProxy');

module.exports = (request, response, next) => {
  const hash = request.params.hash;

  Link.findOne({ hash }).exec((err, link) => {
    if (err) return next(err);

    const result = (link === null) ? {} : link.toObject();
    return responseProxy(response, {
      status: 200,
      data: result,
    });
  });
};

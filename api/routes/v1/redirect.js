const Link = require('../../db/model/link');

module.exports = (request, response, next) => {
  const hash = request.params.hash;

  Link.findOne({ hash }).exec((err, link) => {
    if (err) return next(err);

    if (link === null) {
      return response.status(404).send('Link not found!');
    }

    return response.redirect(link.url);
  });
};

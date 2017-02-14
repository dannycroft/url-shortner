const shortid = require('shortid');
const config = require('../../config');
const timestamp = require('../../lib/timestamp');
const Link = require('../../db/model/link');
const responseProxy = require('../../lib/responseProxy');

module.exports = (request, response, next) => {
  const url = request.body.url; // TODO: validate & throw/return
  const domain = config.domain;
  const hash = shortid.generate();
  const shortUrl = `${domain}/${hash}`;
  const time = timestamp();

  const link = new Link({
    url,
    hash,
    shortUrl,
    createdAt: time,
    updatedAt: time,
  });

  return link.save((err) => {
    if (err) return next(err);

    return responseProxy(response, {
      status: 200,
      data: { hash, shortUrl },
    });
  });
};

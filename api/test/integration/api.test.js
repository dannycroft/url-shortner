/* global describe, it */

const superagent = require('superagent');
const expect = require('expect.js');

const state = {
  link: null,
};

describe('API', () => {
  describe('shorten/:url', () => {
    it('returns a valid response', (done) => {
      superagent
        .post('http://localhost:8888/v1/shorten')
        .send({
          url: 'https://www.google.de',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data.hash).to.be.a('string');
          expect(res.body.data.shortUrl).to.be.a('string');

          state.link = res.body.data;
          done();
        });
    });
  });

  describe('info/:hash', () => {
    it('returns a valid response', (done) => {
      superagent
        .get(`http://localhost:8888/v1/info/${state.link.hash}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.status).to.equal(200);
          expect(typeof res.body.data).to.equal('object');
          expect(typeof res.body.data.url).to.equal('string');
          expect(typeof res.body.data.hash).to.equal('string');
          expect(typeof res.body.data.shortUrl).to.equal('string');
          expect(typeof res.body.data.createdAt).to.equal('number');

          done();
        });
    });
  });

  describe('update', () => {
    it('returns a valid response', (done) => {
      superagent
        .put(`http://localhost:8888/v1/update/${state.link.hash}`)
        .send({
          url: 'http://localhost:8888/1/2/3/4',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data.hash).to.be.a('string');
          expect(res.body.data.url).to.equal('http://localhost:8888/1/2/3/4');

          state.link = res.body.data;
          done();
        });
    });
  });

  describe('redirect', () => {
    it('successfully redirects to target url', (done) => {
      superagent
        .post(`http://localhost:8888/${state.link.hash}`)
        .end((err, res) => {
          // TODO: Verify status code & header location
          expect(res.redirects[0]).to.equal(state.link.url);

          done();
        });
    });
  });

  describe('remove', () => {
    it('returns a valid response', (done) => {
      superagent
        .delete('http://localhost:8888/v1/remove')
        .send({
          hash: state.link.hash,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data.hash).to.be.a('string');
          expect(res.body.data.deletedAt).to.be.a('number');

          done();
        });
    });
  });
});

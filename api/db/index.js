const mongoose = require('mongoose');

const state = { db: null };
mongoose.Promise = global.Promise;

module.exports = {
  connect: (url, callback) => {
    if (state.db) return callback();

    // Mock DB when in test
    if (process.env.NODE_ENV === 'test') {
      return require('mockgoose')(mongoose).then(() => {
        return mongoose.connect(url, (err, db) => {
          if (err) return callback(err);
          state.db = db;

          return callback();
        });
      });
    }

    return mongoose.connect(url, (err, db) => {
      if (err) return callback(err);
      state.db = db;

      return callback();
    });
  },

  get: () => state.db,

  close: (callback) => {
    if (state.db) {
      state.db.close((err) => {
        state.db = null;

        return callback(err);
      });
    }
  },

};

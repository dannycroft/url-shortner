/*
eslint no-underscore-dangle: 0
no-param-reassign: ["error", { "props": false }]
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LinkSchema = new Schema({
  url: String,
  hash: String,
  shortUrl: String,
  createdAt: Number,
  updatedAt: Number,
}, {
  toObject: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;

      return ret;
    },
  },
});

module.exports = mongoose.model('Link', LinkSchema);

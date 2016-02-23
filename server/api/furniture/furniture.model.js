'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var FurnitureSchema = new mongoose.Schema({
  index: Number,
  title: String,
  type: String
});

export default mongoose.model('Furniture', FurnitureSchema);

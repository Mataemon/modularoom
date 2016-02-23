'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var FurnitureSchema = new mongoose.Schema({
  index: Number,
  title: String,
  type: String
});

var GridSchema = new mongoose.Schema({
  name: String,
  info: String,
  furnitures: [FurnitureSchema]
});

export default mongoose.model('Grid', GridSchema);

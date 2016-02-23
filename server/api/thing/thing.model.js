'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  index: Number,
  title: String,
  type: String
});

export default mongoose.model('Thing', ThingSchema);

/**
 * Grid model events
 */

'use strict';

import {EventEmitter} from 'events';
var Grid = require('./grid.model');
var GridEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GridEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Grid.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GridEvents.emit(event + ':' + doc._id, doc);
    GridEvents.emit(event, doc);
  }
}

export default GridEvents;

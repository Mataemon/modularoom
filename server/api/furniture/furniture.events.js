/**
 * Furniture model events
 */

'use strict';

import {EventEmitter} from 'events';
var Furniture = require('./furniture.model');
var FurnitureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FurnitureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Furniture.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FurnitureEvents.emit(event + ':' + doc._id, doc);
    FurnitureEvents.emit(event, doc);
  }
}

export default FurnitureEvents;

/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var FurnitureEvents = require('./furniture.events');
var Furniture = require('./furniture.model');

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('furniture:' + event, socket);

	console.log(event);
	
    FurnitureEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
  socket.on('furniture:save', function(doc){
	  console.log(doc);
  Furniture.find({}).removeAsync()
  .then(() => {
    Furniture.create(doc)
  })
  });
}


function createListener(event, socket) {
  return function(doc) {
	  
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    FurnitureEvents.removeListener(event, listener);
  };
}

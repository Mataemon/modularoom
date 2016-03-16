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
	
    FurnitureEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
  socket.on('furniture:save', function(doc){
  Furniture.find({index: doc.index}).removeAsync()
  .then(() => {
    Furniture.create(doc)
  })
  });
  socket.on('furniture:remove', function(doc){
	Furniture.findOne({index: doc.index}, function(err, doc){
		doc.remove();
	});
  });
  
  socket.on('furniture:getGrid', function(doc){

  Furniture.find({}, function(err, doc){
	  socket.emit('furniture:getGrid', doc);
  })
  });
}


function createListener(event, socket) {
  return function(doc) {
	  console.log(event, doc);
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    FurnitureEvents.removeListener(event, listener);
  };
}

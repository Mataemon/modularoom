/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var GridEvents = require('./grid.events');
var Grid = require('./grid.model');

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('grid:' + event, socket);

    GridEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
  socket.on('grid:save', function(doc){
	  console.log(doc);
	  Grid.create(doc);
	  /*
  Grid.find({}).removeAsync()
  .then(() => {
    Grid.create(doc)
  })
  */
  
  });
  
   socket.on('grid:get', function(doc){
	   
	  Grid.findOne({_id:doc}, function(err, doc){
		  console.log(doc);
		socket.emit('grid:get', doc);
		})
  });
  socket.on('grid:list', function(doc){
	  Grid.find({}, function(err, doc){
		socket.emit('grid:list', doc);
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
    GridEvents.removeListener(event, listener);
  };
}

'use strict';

angular.module('modularoomApp')
  .controller('MainCtrl', ["$scope", "$rootScope", "socket", function($scope, $rootScope, socket) {
  var total = 25;
  var cellsPerRow = 5;
  var grid = [];
  
  /*
  true : grille avec index du type :
  1 2 3
  4 5 6
  7 8 9
  false : grille avec index du type :
  1 2 3
  6 5 4
  7 8 9
  */
  var isMatrix = true;

  for (var i = 0; i < total; i++) {
    var j = getIndex(i);
	
    grid.push({

	index: j,
	  title: "Vide",
      type: "empty"
    });
	
  }
  function getIndex(i) {
    if (isMatrix)
      return i;
    var row = Math.floor(i / cellsPerRow) + 1;
    if (row % 2 == 0)
      return row * cellsPerRow - (i % 5) - 1;
    else
      return i;
  }
  
  $scope.grid = grid;

  $scope.furnitures = [{
    title: "Chaise",
    type: "chair"
  }, {
    title: "Bureau",
    type: "desk"
  }];

  $scope.furnitureList = [];

/*
  socket.syncUpdates('furniture',$scope.grid, function(event, item, array){
	  console.log(event, item, array, $scope.grid);
	  //$scope.$apply()
	  });
*/

  $scope.$on('dropEvent', function(evt, dragged, dropped) {
	  evt.preventDefault();
	  if(dragged.clone){
		  $scope.grid[dropped.index].type = dragged.type;
		  socket.socket.emit('furniture:save', $scope.grid[dropped.index]);
	  }
	  else
	  {
		  var oldIndex = dragged.index
		  $scope.grid[dropped.index].type = dragged.type;
		  socket.socket.emit('furniture:save', $scope.grid[dropped.index]);
		  $scope.grid[oldIndex].type = "empty";
		  socket.socket.emit('furniture:remove', $scope.grid[oldIndex]);
	}
	//console.log(evt, dragged, dropped,$scope.grid);
    $scope.$apply();
	//$scope.sendGrid();
  });
  $scope.$on('dropOnBody', function(evt, dragged, dropped, ui) {
	  
	  //ui.draggable.remove();
		  var oldIndex = dragged.index
		  $scope.grid[oldIndex].type = "empty";
		  socket.socket.emit('furniture:remove', $scope.grid[oldIndex]);
    console.log('dropOnBody');
    $scope.$apply();
  });
  $scope.sendGrid = function(){
	  
	  var tempGrid = {
		  name: 'pipo',
		  furnitures: $scope.grid
	  };
	  //socket.socket.emit('grid:save', tempGrid);
	  
	  for(var k =0; k < $scope.grid.length ; k++){
		  socket.socket.emit('furniture:save', $scope.grid[k]);
	  }
	  
  }
socket.socket.emit('furniture:getGrid', $scope.grid);

socket.socket.on('furniture:getGrid', function (array) {
	
	for (var i = 0; i < array.length; i++) {
	
	$scope.grid.splice(array[i].index, 1, array[i]);
	/*
		var oldItem = _.find($scope.grid, {index: array[i].index});
		var index = $scope.grid.indexOf(oldItem);
		console.log(array[i].index, index);
          if (oldItem) {
            $scope.grid.splice(index, 1, array[i]);
          }
		  */
  }
});

socket.socket.on('furniture:save', function (item) {
            $scope.grid.splice(item.index, 1, item);
});
socket.socket.on('furniture:remove', function (item) {
	console.log(item);
	item.type = "empty";
	console.log(item);
	$scope.grid.splice(item.index, 1, item);
});

}]);

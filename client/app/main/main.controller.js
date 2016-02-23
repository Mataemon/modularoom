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
  
  socket.syncUpdates('thing',grid, function(event, item, array){$scope.$apply()});

  $rootScope.$on('dropEvent', function(evt, dragged, dropped) {
	  if(dragged.clone)
		  $scope.grid[dropped.index].type = dragged.type;
	  else
	  {
		  var oldIndex = dragged.index
		  $scope.grid[dropped.index].type = dragged.type;
		  $scope.grid[oldIndex].type = "empty";
	}
    $scope.$apply();
	$scope.sendGrid();
  });
  $rootScope.$on('dropOnBody', function(evt, dragged, dropped, ui) {
	  
	  //ui.draggable.remove();
		  var oldIndex = dragged.index
		  $scope.grid[oldIndex].type = "empty";
    
    $scope.$apply();
  });
  $scope.sendGrid = function(){
	  console.log($scope.grid);
	  socket.socket.emit('save', {
      grid: $scope.grid
    });
  }

}]);

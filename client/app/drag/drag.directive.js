'use strict';

angular.module('modularoomApp')
  .directive('drag', ["$rootScope", function($rootScope) {


  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.dragData = scope[attrs["drag"]];
      scope.dragStyle = attrs["dragstyle"];
	  scope.dragClone = (attrs["dragclone"] === undefined)?false:attrs["dragclone"];
	  
	  if(scope.dragData.type != "empty")
		  if(scope.dragClone)
			element.draggable({ revert: "invalid", helper: "clone", stack: ".furniture" });
		else
			element.draggable({stack: ".furniture"});
	  
      element.bind('dragstart', function(evt) {
        $rootScope.draggedElement = scope.dragData;
		$rootScope.draggedElement.clone = scope.dragClone;
      });
	  
	  $("body").droppable({
		accept: ".grid .furniture",
		drop: function( event, ui ) {
			$rootScope.$broadcast('dropOnBody', $rootScope.draggedElement, scope.dropData, ui);
		}
	});
    }
  }
}]);

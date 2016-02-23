'use strict';

angular.module('modularoomApp')
  .directive('drop', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.dropData = scope[attrs["drop"]];
      scope.dropStyle = attrs["dropstyle"];

	  element.droppable({
		accept: ".furniture",
		greedy: true,
		hoverClass: scope.dropStyle,
		drop: function( event, ui ) {
			$rootScope.$broadcast('dropEvent', $rootScope.draggedElement, scope.dropData);
		}
		});
    }
  }
}]);

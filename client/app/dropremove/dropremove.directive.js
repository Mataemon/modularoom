'use strict';

angular.module('modularoomApp')
  .directive('dropremove', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
 console.log(element, scope);
	  element.droppable({
		drop: function( event, ui ) {
			console.log(event, ui);
			ui.draggable.remove();
		}
		});

      }
    };
  });

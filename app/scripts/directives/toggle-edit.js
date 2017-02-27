'use strict';
angular.module('hongcaiApp').directive('toggleEdit', [function() {
  var attr = 'readonly';
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      element.bind('click', function() {
        element.parent().siblings().find('input[ng-model]').removeAttr(attr);
      })
    }
  };
}]);
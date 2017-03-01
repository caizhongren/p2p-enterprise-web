'use strict';
angular.module('hongcaiApp').directive('toggleEdit', [function() {
  var attr = 'readonly';
  return {
    restrict: 'A',
    link: function($scope, element, attrs, ctrl) {
      element.bind('click', function() {
        if(!$scope.enterprise){
          $scope.readOnly = false;
          element.parents(".panel-collapse").find('input[ng-model]').removeAttr(attr);
          element.parents(".panel-collapse").find('textarea[ng-model]').removeAttr(attr);
          element.parents(".panel-collapse").siblings().find('input[ng-model]').removeAttr(attr);
        }
        
      })
    }
  };
}]);
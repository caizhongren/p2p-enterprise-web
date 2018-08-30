'use strict';
angular.module('hongcaiApp')
  .controller('InfoAuthorizationCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.type = $stateParams.type;
  }]);

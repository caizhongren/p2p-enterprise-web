'use strict';
angular.module('hongcaiApp')
  .controller('YeepaySuccessCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
    $scope.page = 1;
    $scope.counter = 3;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter === 0) {
        $state.go('root.userCenter.security-settings');
      }
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('$stateChangeStart', function() {
      $timeout.cancel(mytimeout);
    });
  }]);

'use strict';
angular.module('hongcaiApp')
  .controller('UnBindBankcardSuccessCtrl', ['$scope', '$timeout', '$state', function($scope, $timeout, $state) {
    $scope.page = 7;

    $scope.counter = 5;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter === 0) {
        $state.go('root.userCenter.account-overview');
      }
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('$stateChangeStart', function() {
      $timeout.cancel(mytimeout);
    });
  }]);

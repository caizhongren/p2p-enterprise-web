'use strict';
angular.module('hongcaiApp')
  .controller('FddSuccessCtrl', ['$scope', '$timeout', '$state', '$stateParams', 'config', '$window', function($scope, $timeout, $state, $stateParams, config, $window) {
    $scope.page =13;
    $scope.counter = 3;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter === 0) {
        $window.location.href = config.domain + '/user-center/lend-money?loanStatus=' + $stateParams.preProjectId
        // $state.go('root.userCenter.lend-money', {loanStatus: $stateParams.preProjectId});
      }
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('$stateChangeStart', function() {
      $timeout.cancel(mytimeout);
    });
  }]);

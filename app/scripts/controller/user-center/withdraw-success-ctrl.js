'use strict';
hongcaiApp.controller('WithdrawSuccessCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', function($scope, $timeout, $state, $rootScope, $stateParams) {
  $scope.page = 3;
  // $scope.counter = 5;
  // $scope.onTimeout = function() {
  //   $scope.counter--;
  //   mytimeout = $timeout($scope.onTimeout, 1000);
  //   if ($scope.counter === 0) {
  //     window.location.href = '/account-overview';
  //   }
  // }
  // var mytimeout = $timeout($scope.onTimeout, 1000);
  // $scope.$on('$stateChangeStart', function() {
  //   $timeout.cancel(mytimeout);
  // });
}]);

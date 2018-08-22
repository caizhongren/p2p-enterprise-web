'use strict';
angular.module('hongcaiApp')
  .controller('LoanApplicationLetterCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.type = $stateParams.type;
  }]);

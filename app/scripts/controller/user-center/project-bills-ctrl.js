'use strict';
angular.module('hongcaiApp')
  .controller('ProjectBillsCtrl', ['$scope', '$stateParams', 'UserCenterService', '$rootScope', '$location', function($scope, $stateParams, UserCenterService, $rootScope, $location) {
    $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[1];
    UserCenterService.getProjectBill.get({
      number: $stateParams.number
    }, function (response) {
      if (response && response.ret !== -1) {
        $scope.projectBill = response
        UserCenterService.getProjectDetail.get({
          id: $scope.projectBill[0].projectId
        }, function (response) {
          if (response && response.ret !== -1) {
            $scope.projectDetail = response
          }
        })
      }
    })

  }])
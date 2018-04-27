'use strict';
angular.module('hongcaiApp')
  .controller('RealNameCtrl', ['$scope', 'UserCenterService', '$rootScope', function($scope, UserCenterService, $rootScope) {
    
    $scope.getEnterpriseInfo = function(uesr) {
      UserCenterService.getEnterpriseInfo.get({}, function(response) {
        if (response.ret !== 1) {
          $scope.companyName = response.name;
          $scope.userMobile = response.contactMobile;
        }
      })
      UserCenterService.getUserBankCard.get({}, function(response) {
        if (response.ret !== 1) {
          var card = response.data.card;
          if (card) {
            $scope.accountNumber = card.cardNo;
          }
        }
      })
    }
    $scope.getEnterpriseInfo()
    
  }])

'use strict';
angular.module('hongcaiApp')
  .controller('RealNameCtrl', ['$scope', 'UserCenterService', '$rootScope', function($scope, UserCenterService, $rootScope) {
    $scope.user = {
      name: '',
      legalIdNo: '',
      mobile: '',
      cardNo: ''
    }
    $scope.getEnterpriseInfo = function() {
      UserCenterService.getEnterpriseInfo.get({}, function(response) {
        if (response.ret !== 1) {
          $scope.user.name = response.name;
          $scope.user.mobile = response.contactMobile;
          $scope.user.legalIdNo = response.legalIdNo;
          
        }
      })
      UserCenterService.getUserBankCard.get({}, function(response) {
        if (response.ret === 1) {
          var card = response.data.card;
          if (card) {
            $scope.user.cardNo = card.cardNo;
          }
        }
      })
    }
    $scope.getEnterpriseInfo()
    
  }])

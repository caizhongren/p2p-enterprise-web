'use strict';
angular.module('hongcaiApp')
  .controller('BankCardManagementCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', '$alert', 'toaster', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, $alert, toaster) {
    $rootScope.selectSide = 'bankcard-management';
    $scope.dosi = true;
    UserCenterService.getUserBankCard.get({}, function(response) {
      if (response.ret === 1) {
        var card = response.data.card;
        $scope.card = card;
        if (card) {
          $scope.haveCard = (card.status === 'VERIFIED');
          $scope.bankName = card.openBank;
          $scope.cardNo = '***********' + card.cardNo.slice(-4);
          $scope.isVerifying = (card.status === 'VERIFYING');
        } else {
          $scope.haveCard = false;
          $scope.isVerifying = false;
        }
        $scope.isAuth = response.data.isAuth;
      } else {
        toaster.pop('error', response.msg);
      }
    });


    $scope.reload = function() {
      window.location.reload();
    };

    $scope.bindBankCard = function() {
      $scope.msg = '5';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/bankcard-transfer/0');
    };

    $scope.unbindBankCard = function() {
      if($rootScope.userDetail.account.tTotalAssets > 2){
        UserCenterService.unbindBankCardApply.get({}, function(response) {
          if (response && response.ret !== 1) {
            $scope.unbindBankCardApply = response;
            if($scope.unbindBankCardApply.status === 1){
              window.open('/#!/bankcard-transfer/1');
            }else{
              $scope.msg = '11';
              $alert({
                scope: $scope,
                template: 'views/modal/alertYEEPAY.html',
                show: true
              });
            }
          } else {
            toaster.pop('error', '请联系客服解绑银行卡');
          }
        });
      }else{
        window.open('/#!/bankcard-transfer/1');
      }
    };

    angular.element('.bankCard .bank-card-show-verify').hover(function(event) {
      $(event.target).parent().find('a').height('78px');
    }, function(event) {
      $(event.target).parent().find('a').height('0');
    });

  }]);

'use strict';
angular.module('hongcaiApp')
  .controller('RechargeCtrl', ['$location', '$scope', 'toaster', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', 'config', '$alert', function($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, config, $alert) {
    $rootScope.selectSide = 'recharge';
    $scope.balance = 0;
    $scope.isSecurityAuth = $rootScope.securityStatus.realNameAuthStatus === 1 ? true : false;
    UserCenterService.waitRepaymentAmount.get({ // 获取当期待还金额
      repaymentDays: 28,
    }, function (response) {
      if (response.ret !== -1) {
        $scope.unpaidAmount = response.waitRepaymentAmount;
      } else {
        console.log(response.msg);
      }
    })
    UserCenterService.getUserBalance.get({}, function(response) {
      if (response.ret === 1) {
        $scope.balance = response.data.balance;
      } else {
        console.log('ask recharge, why getUserBalance did not load data...');
      }
    });

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.reload = function() {
      window.location.reload();
    };

    $scope.recharge = function(amount) {
      if ($rootScope.userType === 7 || $rootScope.userType === 8) { // 取消资产方充值功能 
        alert('操作受限');
        return;
      }
      $scope.msg = '2';
      $scope.rechargeAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/recharge-transfer/' + amount +"/"+ $scope.rechargeWay +"/" + $scope.expectPayCompany);
    };

    $scope.transferToPlaform = function(amount) {
      $scope.msg = '8';
      $scope.transferAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/transfer-transfer/' + amount);
    };

    //记录选择支付方式
    $scope.selectPay = function(payment) {
      $scope.payment = payment;
      if(payment ===1){
        $scope.rechargeWay = 'SWIFT';
        $scope.expectPayCompany = 'UCFPAY';
      }else {
        $scope.rechargeWay = 'WEB';
        $scope.expectPayCompany = 'YEEPAY';
      }
    }
    $scope.selectPay(2);

  }]);

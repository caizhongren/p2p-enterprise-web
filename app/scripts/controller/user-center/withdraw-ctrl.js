'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', ['$window', '$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', '$alert', function($window, $location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert) {
    $scope.MathMin = $window.Math.min;
    $rootScope.selectSide = 'withdraw';
    $scope.availableCash = 0;
    $scope.maxWithdrawAmount = 0;
    $scope.isSecurityAuth = $rootScope.securityStatus.realNameAuthStatus === 1 ? true : false;
    UserCenterService.getUserAvailableCash.get({}, function(response) {
      if (response.ret === 1) {
        $scope.availableCash = response.data.availableCash;
        $scope.availableCashRealNo = $scope.availableCash;
      } else {
        console.log('ask withdraw, why getUserAvailableCash did not load data...');
      }
    });
    UserCenterService.getMaxWithdrawAmount.get({}, function(response) {
      if (response.ret === -1) {
        console.log('ask withdraw, why getUserAvailableCash did not load data...');
      } else {
        $scope.maxWithdrawAmount = response.amount;
      }
    });
    $scope.checkLargestAmount = function(amount) {
      if (amount > Math.min($scope.availableCashRealNo, $scope.maxWithdrawAmount) - 2) {
        return true;
      } else {
        return false;
      }
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.reload = function() {
      window.location.reload();
    };

    $scope.withdraw = function(amount, captcha) {
      $scope.msg = '3';
      $scope.withdrawAmount = amount;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/#!/withdraw-transfer/' + amount + '/' + captcha);
    };
  }]);

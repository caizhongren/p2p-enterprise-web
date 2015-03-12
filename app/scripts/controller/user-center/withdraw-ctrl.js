'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', ['$location', '$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'DEFAULT_DOMAIN', '$alert', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert) {

    $rootScope.selectSide = $location.path().substr($location.path().indexOf('/') + 1);
    $scope.availableCash = 0;
    UserCenterService.getUserAvailableCash.get({}, function(response) {
      if (response.ret === 1) {
        $scope.availableCash = response.data.availableCash;
        $scope.availableCashRealNo = $scope.availableCash >= 2 ? $scope.availableCash - 2 : 0;
      } else {
        console.log('ask withdraw, why getUserAvailableCash did not load data...');
      }
    });
    $scope.checkLargestAmount = function(amount) {
      if (amount > $scope.availableCashRealNo) {
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

'use strict';
angular.module('hongcaiApp')
  .controller('RechargeTransferCtrl', function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config, PayUtils) {


    
    UserCenterService.yeepayRecharge.get({
      amount: $stateParams.amount
    }, function(response) {
      if (response && response.ret !== -1) {
        PayUtils.redToTrusteeship('toRecharge', response);
      } else {
        // TODO alert是更好的方式，暂且用toaster
        // $scope.msg = response.msg;
        // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
        toaster.pop('warning', response.msg);
        $state.go('root.userCenter.security-settings');
        $rootScope.openTrusteeshipAccount = true;
      }
    });

  });
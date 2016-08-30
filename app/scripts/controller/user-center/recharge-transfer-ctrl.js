'use strict';
angular.module('hongcaiApp')
  .controller('RechargeTransferCtrl', function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config, PayUtils) {


    
    UserCenterService.yeepayRecharge.post({
      amount: $stateParams.amount
    }, function(response) {
      if (response && response.ret !== -1) {
        PayUtils.redToTrusteeship('toRecharge', response);
      } else {
        toaster.pop('warning', response.msg);
      }
    });

  });
'use strict';
angular.module('hongcaiApp')
  .controller('BankcardTransferCtrl', function ( $scope, toaster, $stateParams, UserCenterService, config, PayUtils) {

    if ($stateParams.type === '0') {
      UserCenterService.bindBankCard.get({}, function(response) {
        if (response && response.ret !== -1) {
          $scope.dosi = false;
          PayUtils.redToTrusteeship('toBindBankCard', response);
        } else {
          toaster.pop('error', response.msg);
        }
      });

    } else if ($stateParams.type === '1') {
      UserCenterService.unbindBankCard.get({}, function(response) {
        if (response && response.ret !== -1) {
          $scope.dosi = true;
          PayUtils.redToTrusteeship('toUnbindBankCard', response);
        } else {
          toaster.pop('error', response.msg);
        }
      });
    }
    
  });
'use strict';
angular.module('hongcaiApp')
  .controller('RightsTransferCtrl', function ($rootScope, $scope, toaster, $stateParams, UserCenterService, config, $alert, PayUtils) {

    if ($stateParams.type === '0') {
      UserCenterService.yeepayRegister.post({
        realName: $stateParams.realName,
        idCardNo: $stateParams.idCardNo
      }, function(response) {
        if (response && response.ret !== -1) {
          $rootScope.securityStatus.realNameAuthStatus = 1;
          PayUtils.redToTrusteeship('toRegister', response);
        } else {
          console.log('ask security-settings, why yeepayRegister did not load data...');
        }
      });

    } else if ($stateParams.type === '1') {
      if($rootScope.securityStatus.realNameAuthStatus === 0 || !$rootScope.securityStatus.realNameAuthStatus) {
        $scope.msg = '请先开通托管账户';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return;
      }

      // 调用自动投标接口
      UserCenterService.authorizeAutoTransfer.post({
      }, function(response) {
        if (response && response.ret !== -1) {
          
          // 这块应该如何判断？ TODO
          // 这里实现方法不太好，如果所有的实现都在用户表里面提现，是再好不过的了。
          $scope.openTrustReservation = true;
          PayUtils.redToTrusteeship('toAuthorizeAutoTransfer', response);
        } else {
          toaster.pop('warning', response.msg);
          console.log('ask security-settings, why authorizeAutoTransfer did not load data...');
        }
      });
    } else if ($stateParams.type === '2') {

      // 调用开通自动还款接口
      UserCenterService.autoRepayment.post({
        userId: 0
      }, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toAutoRepayment', response);
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }
    
  });
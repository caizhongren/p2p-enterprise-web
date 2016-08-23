'use strict';
angular.module('hongcaiApp')
  .controller('TransferTransferCtrl',  function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config) {
    
    toaster.pop('warning', '暂不支持！');

    // UserCenterService.transferToPlatform.get({
    //   transferAmount: $stateParams.transferAmount
    // }, function(response) {
    //   if (response.ret === 1) {
    //     toaster.pop('warning', '暂不支持！');
    //   } else {
    //     // TODO alert是更好的方式，暂且用toaster
    //     // $scope.msg = response.msg;
    //     // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
    //     toaster.pop('warning', response.msg);
    //     $state.go('root.userCenter.recharge-transfer');
    //     $rootScope.openTrusteeshipAccount = true;
    //   }
    // });

  });

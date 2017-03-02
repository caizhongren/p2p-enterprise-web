'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderTransferCtrl', function ($rootScope, $scope, toaster, $location, $stateParams, OrderService, UserCenterService, config, PayUtils) {
    
    // OrderService.transfer.get({
    //   projectId: $stateParams.projectId,
    //   orderId: $stateParams.orderId
    // }, function(response) {
    //   if (response.ret === 1) {
    //     PayUtils.redToTrusteeship('toTransfer', response);
    //   } else {
    //     toaster.pop('warning', response.msg);
    //   }
    // });
      $scope.orderNumber = $location.search().orderNumber;

      if($stateParams.orderType === '4') {
        UserCenterService.transferFunds.get({
          projectId: $stateParams.projectId,
          orderId: $stateParams.orderId
        }, function(response) {
          if (response && response.ret !== -1) {
            PayUtils.redToTrusteeship('toTransfer', response);
          } else {
            toaster.pop('warning', response.msg);
          }
        });
      } else if($stateParams.orderType === '2'){

        UserCenterService.transferAssignment.POST({
          number: $scope.orderNumber
        }, function(response) {
          if (response && response.ret !== -1) {
            PayUtils.redToTrusteeship('toTransfer', response);
          } else {
            toaster.pop('warning', response.msg);
          }
        });

    } else {
        UserCenterService.transfer.get({
          projectId: $stateParams.projectId,
          orderId: $stateParams.orderId
        }, function(response) {
          if (response && response.ret !== -1) {
            PayUtils.redToTrusteeship('toTransfer', response);
          } else {
            toaster.pop('warning', response.msg);
          }
        });
      }

  });
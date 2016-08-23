'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderTransferCtrl', function ($rootScope, $scope, toaster, $stateParams, OrderService, config, PayUtils) {
    
    OrderService.transfer.get({
      projectId: $stateParams.projectId,
      orderId: $stateParams.orderId
    }, function(response) {
      if (response.ret === 1) {
        PayUtils.redToTrusteeship('toTransfer', response);
      } else {
        toaster.pop('warning', response.msg);
      }
    });

  }]);
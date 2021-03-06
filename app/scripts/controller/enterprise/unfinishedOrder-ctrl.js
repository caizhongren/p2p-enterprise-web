'use strict';
angular.module('hongcaiApp')
  .controller('UnfinishedOrderCtrl', function($scope, $rootScope, $stateParams, UserCenterService, $modal, $alert, $state, toaster) {
  	// 未支付订单
  	UserCenterService.unFinishedOrder.get({}, function(order){
  	  $scope.unFinishedOrder = order;
  	  //项目期限
      $scope.projectDays = Math.ceil((order.repaymentDate-order.createTime)/1000/3600/24);
  	})
    
  	/**
  	 * 继续支付订单
  	 */
  	$scope.toPay = function(order) {
  	  var projectId = order.projectId;
  	  var orderId = order.id;
  	  var orderType = order.type;
  	  var orderAmount = order.orderAmount;
  	  var orderNumber = order.number;

  	  $scope.msg = '4';
  	  $scope.investAmount = orderAmount;
  	  $scope.page = 'investment';
  	  $alert({
  	    scope: $scope,
  	    template: 'views/modal/alertYEEPAY.html',
  	    show: true
  	  });

  	  window.open('/user-order-transfer/' + projectId + '/' + orderId + '/' + orderType + '?orderNumber=' + orderNumber);
  	};

  	/**
  	 * 取消订单
  	 */
  	$scope.cancelOrder = function(number) {
  	  UserCenterService.cancelOrder.get({
  	    number: number
  	  }, function(response) {
  	    if (response.ret === 1) {
  	      $state.reload();
  	      toaster.pop('success', '订单取消成功！');
  	    } else {
  	      toaster.pop('warning', '无法取消订单，请重试。');
  	    }
  	  });
  	};
  });
'use strict';
angular.module('hongcaiApp')
  .controller('TransactionRecordCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', function($scope, $state, $rootScope, $stateParams, UserCenterService) {
    $rootScope.selectSide = 'transaction-record';
    $scope.type = $stateParams.type || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.typeValue = {
      '1': '充值',
      '2': '提现',
      '3': '投资',
      '4': '收益',
      '5': '回收本金',
      '6': '放款',
      '7': '还款',
      '8': '手续费',
      '9': '充值手续费',
      '10': '活期利息',
      '11': '预约期利息',
      '12': '预约',
      '13': '取消预约',
      '14': '咨询服务费',
      '15': '债权转让服务费',
      '16': '债权转让回款',
      '17': '宏金盈转账',
      '18': '奖金',
      '19': '提前赎回',
      '20': '代理人绩效',
      '23': '提现打款失败',
      '24': '补偿',
      '25': '冻结资金',
      '26': '解冻资金'
    };
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.getDeals = function(page) {
      $scope.currentPage = page;
      var getDealByUser = UserCenterService.getDealListByUser.get({ 
        dateInterval: $stateParams.dateInterval,
        type: $stateParams.type,
        page: page,
        pageSize: $scope.pageSize
      },function(response) {
        if (getDealByUser.ret === 1) {
          $scope.dealList = getDealByUser.data.dealList;
          $scope.type = getDealByUser.data.type;
          $scope.dateInterval = getDealByUser.data.dateInterval;
          $scope.userId = getDealByUser.data.userId;
          $scope.capital = getDealByUser.data.capital;
          $scope.dealTypes = getDealByUser.data.dealTypes;
          $scope.count = getDealByUser.data.count;
          $scope.data = [];
          $scope.totalPage = Math.ceil(getDealByUser.data.count / $scope.pageSize);

          for (var i = 0; i < $scope.dealList.length; i++) {
            $scope.data.push($scope.dealList[i]);
          }

        } else {
          toaster.pop('warning',response.msg);
        }
      });
    };
    
    $scope.getDeals(1);
  }]);

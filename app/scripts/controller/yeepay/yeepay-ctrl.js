'use strict';
angular.module('hongcaiApp')
  .controller('YeepayCtrl', function($scope, $state, $rootScope, $stateParams, $timeout) {
    $scope.business = $stateParams.business;
    $scope.yeepayCallBackStatus = $stateParams.yeepayStatus;

    var business = $stateParams.business;
    $scope.amount = $stateParams.amount;
    var page = 1;

    if (business === 'REGISTER'){
    	page == 1;
    } else if (business == 'RESET_MOBILE'){
    	page = 9;
    } else if (business === 'RECHARGE'){
    	page = 4;
    } else if (business === 'WITHDRAW'){
    	page = 6;
    } else if(business === 'UNBIND_CARD'){
    	page = 7;
    } else if(business === 'BIND_BANK_CARD'){
    	page = 5;
    } else if (business === 'AUTHORIZE_AUTO_REPAYMENT'){
    	page = 2;
    } else if (business === 'REPAYMENT'){
    	page = 3;
    } else if (business === 'USER_ACTIVE'){
        page = 10;
    } else if (business === 'AUTOREPAYMENT'){
        page = 11;
    }


    $scope.page = page;

    $scope.counter = 3;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter === 0) {
        $state.go('root.userCenter.account-overview');
      }
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('$stateChangeStart', function() {
      $timeout.cancel(mytimeout);
    });


  });

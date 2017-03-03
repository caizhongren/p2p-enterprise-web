'use strict';
angular.module('hongcaiApp')
  .controller('LendMoneyCtrl', function($scope, $state, $rootScope, ipCookie, EnterpriseService, UserCenterService, $alert, $timeout, toaster) {
    $rootScope.selectSide = 'lend-money';
    
    /*
     * 查询借款企业信息
    */
    $scope.getEnterpriseInfo = function(){
		if ($rootScope.securityStatus) {
			EnterpriseService.getEnterprise.get({userId: $rootScope.securityStatus.userId},function(response) {
		      	if (response && response.ret !== -1) {
		      		$scope.infoStatus = response.infoStatus;
		      	}else {
		      		$scope.infoStatus = 0;
		      	}
		    })
		}
    }
    $scope.getEnterpriseInfo();

    if ($rootScope.securityStatus && $rootScope.securityStatus.userAuth) {
    	//判断是否开通存管通
	    if ($rootScope.securityStatus.userAuth.yeepayAccountStatus === 1) {
	    	$scope.haveTrusteeshipAccount = true;
	    }else {
	    	$scope.haveTrusteeshipAccount = false;
	    }

	    //判断是否开通自动还款
	    if ($rootScope.securityStatus.userAuth.autoRepayment) {
	    	$scope.autoRepayment = true;
	    }else {
	    	$scope.autoRepayment = false;
	    }
    }

    //开通自动还款
    $scope.goToAutoRepayment = function() {
      $scope.msg = '9';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      var user = {
        'realName' : 'default',
        'idCardNo' : 'default'
      };
      window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/2');
    }

    //跳转到完善资料页
    $scope.gotoPerfectInformation = function() {
    	ipCookie('lendMoney', 1)
    	$state.go('root.userCenter.perfect-information');
    }

    //检查借款金额
    $scope.checkLoanAmount = function(enterprise) {
    	UserCenterService.borrowPreprojectStat.get({userId: $rootScope.securityStatus.userId}, function(response) {
    		if (response && response.ret !== -1) {
    			$scope.loanTotalAmount = response.amount;
    			$scope.loanCounter = response.number;

    			$scope.isContinue = false;
    			$scope.isKnow = false;

    			if ($scope.loanCounter == 0 && enterprise.loanAmount > 1000000) {
    				$scope.msg = '借款上限为100万，请您修改借款金额。';
    			}else if ($scope.loanCounter >0 && enterprise.loanAmount + $scope.loanTotalAmount > 1000000) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。';
    				$scope.isKnow = true;
    			}else if ($scope.loanCounter >0 && enterprise.loanAmount + $scope.loanTotalAmount <= 1000000) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。是否确定继续借款？';
    				$scope.isContinue = true;
    			}else if ($scope.loanCounter == 0 && enterprise.loanAmount <= 1000000) {
                    $scope.msg = '';
                    $scope.gotoLoan(enterprise);
                }
    			
    			if ($scope.msg) {
    				$alert({
			          scope: $scope,
			          template: 'views/modal/alert-dialog.html',
			          show: true
			        });
    			}
    		}else {
    			toaster.pop('warning', response.msg);
    		}
    	})
    }

    //继续提交借款申请
    $scope.gotoLoan = function(enterprise) {
    	if (enterprise.loanDate <=0 ) {
    		toaster.pop('warning', '填写信息有误，请重新填写');
    		return;
    	}
    	UserCenterService.preProject.post({
    		userId: $rootScope.securityStatus.userId,
	        amount: enterprise.loanAmount,
	        projectDays: enterprise.loanDate,
	        financingPurpose: enterprise.loanUsage
    	}, function(response){
    		if (response && response.ret !== -1) {
    			$scope.loanInformation = true;
    			$scope.showPendingAudit = true;
    			$scope.counter = 3;
				$scope.onTimeout = function(){
					$scope.counter--;
					mytimeout = $timeout($scope.onTimeout,1000);
					if($scope.counter === 0) {
                      $scope.loanInformation = true;
					  $state.go('root.userCenter.account-overview');
					}
				};
				var mytimeout = $timeout($scope.onTimeout,1000);
				$scope.$on('$stateChangeStart', function(){
					$timeout.cancel(mytimeout);
				});
    		}else {
    			toaster.pop('warning', '填写信息有误，请重新填写');
    		}
    	})
    }
  });

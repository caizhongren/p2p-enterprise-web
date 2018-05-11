'use strict';
angular.module('hongcaiApp')
  .controller('LendMoneyCtrl', function($scope, $state, $rootScope, ipCookie, EnterpriseService, UserCenterService, $alert, $timeout, toaster) {
    $rootScope.selectSide = 'lend-money';
		
		function isEqual(a,b){
			//如果a和b本来就全等
			if(a===b){
				//判断是否为0和-0
				return a !== 0 || 1/a ===1/b;
			}
			//判断是否为null和undefined
			if(a==null||b==null){
				return a===b;
			}
			//接下来判断a和b的数据类型
			var classNameA=toString.call(a),
				classNameB=toString.call(b);
			//如果数据类型不相等，则返回false
			if(classNameA !== classNameB){
				return false;
			}
			//如果数据类型相等，再根据不同数据类型分别判断
			switch(classNameA){
				case '[object RegExp]':
				case '[object String]':
				//进行字符串转换比较
				return '' + a ==='' + b;
				case '[object Number]':
				//进行数字转换比较,判断是否为NaN
				if(+a !== +a){
					return +b !== +b;
				}
				//判断是否为0或-0
				return +a === 0?1/ +a === 1/b : +a === +b;
				case '[object Date]':
				case '[object Boolean]':
				return +a === +b;
			}
			//如果是对象类型
			if(classNameA == '[object Object]'){
				//获取a和b的属性长度
				var propsA = Object.getOwnPropertyNames(a),
					propsB = Object.getOwnPropertyNames(b);
				if(propsA.length != propsB.length){
					return false;
				}
				for(var i=0;i<propsA.length;i++){
					var propName=propsA[i];
					//如果对应属性对应值不相等，则返回false
					if(a[propName] !== b[propName]){
						return false;
					}
				}
				return true;
			}
			//如果是数组类型
			if(classNameA == '[object Array]'){
				if(a.toString() == b.toString()){
					return true;
				}
				return false;
			}
		}

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
	    if ($rootScope.securityStatus.userAuth.authStatus === 2) {
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
		$scope.loanTab = 0;
		$scope.preLoan = 0;
		$scope.loanList = [
			{
				creatTime: 1111111,
				loanAmount: 11111,
				loanDate: 111,
				status: 0 //审核中
			},
			{
				creatTime: 222222,
				loanAmount: 2222,
				loanDate: 222,
				status: 1 //已批准
			},
			{
				creatTime: 333333,
				loanAmount: 33333,
				loanDate: 333,
				status: 2 //已拒绝
			}
		]
		var preLoanList = [
			{
				title: '姓名',
				content: '111111111111111111111'
			},
			{
				title: '证件类型',
				content: '111111111111111111111'
			},
			{
				title: '证件号码',
				content: '111111111111111111111'
			},
			{
				title: '文化程度',
				content: '111111111111111111111'
			},
			{
				title: '婚姻状况',
				content: '111111111111111111111'
			},
			{
				title: '户籍所在地',
				content: '111111111111111111111'
			},
			{
				title: '工作单位',
				content: '111111111111111111111'
			},
			{
				title: '职务',
				content: '111111111111111111111'
			},
			{
				title: '工作年限',
				content: '111111111111111111111'
			},
			{
				title: '现居住地',
				content: '111111111111111111111'
			},
			{
				title: '通信地址',
				content: '111111111111111111111'
			},
			{
				title: '家庭电话',
				content: '111111111111111111111'
			},
			{
				title: '手机号',
				content: '111111111111111111111'
			},
			{
				title: '邮箱',
				content: '111111111111111111111'
			}
		]
		var maxLoanAmount = 1000000;
		var preEnterprise = {
			amount: 1,
			date: 1,
			usage: '1',
			payment: '1',
			enterpriseProfit: 1,
			totalExpenditure: 1,
			debtExpenditure: 1,
			totalGuarantee: 1
		}
		$scope.userType === 2 ? maxLoanAmount = 1000000 : maxLoanAmount = 200000;
		$scope.preLoanBtn = function () {
			$scope.preLoan = 0
			$scope.enterprise = preEnterprise
		}
		$scope.nextPreForm = function (enterprise) {
			// console.log(enterprise)
			// console.log(preEnterprise)
			// console.log(isEqual(enterprise, preEnterprise))
			var preLoanList2 = [
				{
					title: '家庭月收入',
					content: enterprise.enterpriseProfit
				},
				{
					title: '家庭月总支出',
					content: enterprise.totalExpenditure
				},
				{
					title: '家庭月债务支出',
					content: enterprise.debtExpenditure
				},
				{
					title: '家庭当前对外担保总额',
					content: enterprise.totalGuarantee
				},
				{
					title: '申请借款金额',
					content: enterprise.amount
				},
				{
					title: '申请借款期限',
					content: enterprise.date
				},
				{
					title: '借款用途',
					content: enterprise.usage
				},
				{
					title: '还款来源',
					content: enterprise.payment
				}
			]
			if (!isEqual(enterprise, preEnterprise)) {
				// 调暂存接口
				// preEnterprise = response.data
			} else {
			}
			console.log(preLoanList2)
			$scope.preLoanList = preLoanList.concat(preLoanList2)
			console.log($scope.preLoanList)
			$scope.preLoan = 1;
		}
    //检查借款金额
    $scope.checkLoanAmount = function(enterprise) {
    	UserCenterService.borrowPreprojectStat.get({userId: $rootScope.securityStatus.userId}, function(response) {
    		if (response && response.ret !== -1) {
    			$scope.loanTotalAmount = response.amount;
    			$scope.loanCounter = response.number;

    			$scope.isContinue = false;
    			$scope.isKnow = false;

    			if ($scope.loanCounter == 0 && enterprise.loanAmount > maxLoanAmount) {
    				$scope.msg = '借款上限为100万，请您修改借款金额。';
    			}else if ($scope.loanCounter >0 && enterprise.loanAmount + $scope.loanTotalAmount > maxLoanAmount) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。';
    				$scope.isKnow = true;
    			}else if ($scope.loanCounter >0 && enterprise.loanAmount + $scope.loanTotalAmount <= maxLoanAmount) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。是否确定继续借款？';
    				$scope.isContinue = true;
    			}else if ($scope.loanCounter == 0 && enterprise.loanAmount <= maxLoanAmount) {
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
    $scope.busy = false;
    $scope.gotoLoan = function(enterprise) {
    	if (enterprise.loanDate <=0 ) {
    		toaster.pop('warning', '填写信息有误，请重新填写');
    		return;
    	}
        if($scope.busy){
            return;
        }
        $scope.busy = true;
        $timeout(function() {
            $scope.busy = false;
        }, 1000);
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

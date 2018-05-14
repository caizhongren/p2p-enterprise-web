'use strict';
angular.module('hongcaiApp')
  .controller('LendMoneyCtrl', function($scope, $state, $rootScope, ipCookie, EnterpriseService, UserCenterService, $alert, $timeout, toaster) {
    $rootScope.selectSide = 'lend-money';
		$scope.loanDetail = false;
		$scope.maxLoanAmount = 1000000;
		$rootScope.userType === 2 ? $scope.maxLoanAmount = 1000000 : $scope.maxLoanAmount = 200000;
		$scope.enterpriseTxt = {
			profitTxt: $rootScope.userType === 2 ? '企业月净利润' : '家庭月收入',
			expenditureTxt: ($rootScope.userType === 2 ? '企业' : '家庭') + '月总支出',
			debtTxt: ($rootScope.userType === 2 ? '企业' : '家庭') + '月债务支出',
			guaranteeTxt: ($rootScope.userType === 2 ? '企业' : '家庭') + '当前对外担保总额',
		}

    /*
     * 查询借款企业信息
    */
	 var loanListM = {}
    $scope.getEnterpriseInfo = function(){
			if ($rootScope.securityStatus) {
				EnterpriseService.getEnterprise.get({userId: $rootScope.securityStatus.userId},function(response) {
							if (response && response.ret !== -1) {
								$scope.infoStatus = response.infoStatus;
								loanListM = response;
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
		// 借款申请列表查询
		$scope.getLoanList = function (page) {
			UserCenterService.getPreProjects.get({
        userId: $rootScope.securityStatus.userId,
        page: page,
        pageSize: 10000,
        status: '0,1,2'
        },function(response){
          if(response && response.ret !== -1){
            $scope.loanList = response.data;
						$scope.toDetail(-1)
          }
      })
		}
		$scope.getLoanList(1);
		var preLoanListP = []
		var preLoanListC = []
		$scope.toDetail = function (index) {
			index === -1 ? index = 0 : $scope.loanDetail = true;
			var loanDetail = $scope.loanList[index];
			$scope.loanList.length <= 0 ? loanDetail = {
				amount: null,
				projectDays: null,
				financingPurpose: null,
				repaymentSource: null,
				monthNetProfit: null,
				monthTotalExpend: null,
				monthDebtExpend: null,
				externalGuaranteedAmount: null
			} : null
			var detailList = [];
			if ($rootScope.userType === 2) { // 企业
				var preLoanList = [
					{
						title: '企业月净利润',
						content: loanDetail.monthNetProfit
					},
					{
						title: '企业月总支出',
						content: loanDetail.monthTotalExpend
					},
					{
						title: '企业月债务支出',
						content: loanDetail.monthDebtExpend
					},
					{
						title: '企业当前对外担保总额',
						content: loanDetail.externalGuaranteedAmount
					},
					{
						title: '申请借款金额',
						content: loanDetail.amount
					},
					{
						title: '申请借款期限',
						content: loanDetail.projectDays
					},
					{
						title: '借款用途',
						content: loanDetail.financingPurpose
					},
					{
						title: '还款来源',
						content: loanDetail.repaymentSource
					}
				]
				preLoanListC = [
					{
						title: '公司名称',
						content: loanListM.name
					},
					{
						title: '法定代表人',
						content: loanListM.legalRepresentative
					},
					{
						title: '法定代表人身份证号',
						content: loanListM.legalIdNo
					},
					{
						title: '统一社会信用代码',
						content: loanListM.unifiedCode
					},
					{
						title: '注册时间',
						content: loanListM.registerDate
					},
					{
						title: '注册资本',
						content: loanListM.registerCapital
					},
					{
						title: '注册地址',
						content: loanListM.idRegisterAddress
					},
					{
						title: '企业性质',
						content: loanListM.enterpriseProperty
					},
					{
						title: '所属行业',
						content: loanListM.industry
					},
					{
						title: '营业范围',
						content: loanListM.businessScope
					},
					{
						title: '公司现办公地址',
						content: loanListM.address
					},
					{
						title: '公司通信地址',
						content: loanListM.mailingAddress
					},
					{
						title: '公司电话',
						content: loanListM.phoneNumber
					},
					{
						title: '公司联系人姓名',
						content: loanListM.contactName
					},
					{
						title: '公司联系人手机号',
						content: loanListM.contactMobile
					},
					{
						title: '公司联系人邮箱',
						content: loanListM.contactEmail
					}
				]
				console.log(loanListM.name)
				$scope.detailList = preLoanListC.concat(preLoanList)
			} else { // 个人
				var preLoanList = [
					{
						title: '企业月净利润',
						content: loanDetail.monthNetProfit
					},
					{
						title: '企业月总支出',
						content: loanDetail.monthTotalExpend
					},
					{
						title: '企业月债务支出',
						content: loanDetail.monthDebtExpend
					},
					{
						title: '企业当前对外担保总额',
						content: loanDetail.externalGuaranteedAmount
					},
					{
						title: '申请借款金额',
						content: loanDetail.amount
					},
					{
						title: '申请借款期限',
						content: loanDetail.projectDays
					},
					{
						title: '借款用途',
						content: loanDetail.financingPurpose
					},
					{
						title: '还款来源',
						content: loanDetail.repaymentSource
					}
				]
				preLoanListP = [
					{
						title: '姓名',
						content: loanListM.legalRepresentative
					},
					{
						title: '证件类型',
						content: loanListM.legalIdType === 1 ? '身份证' : loanListM.legalIdType === 2 ? '护照' : loanListM.legalIdType === 3 ? '港澳台通行证' : '外国人永久居住证'
					},
					{
						title: '证件号码',
						content: loanListM.legalIdNo
					},
					{
						title: '文化程度',
						content: loanListM.cultureLevel === 1 ? '初中及一下' : loanListM.legalIdType === 2 ? '高中/中专' : loanListM.legalIdType === 3 ? '本科/大专' : '研究生级以上'
					},
					{
						title: '婚姻状况',
						content: loanListM.maritalStatus === 1 ? '已婚' : '未婚'
					},
					{
						title: '户籍所在地',
						content: loanListM.idRegisterAddress
					},
					{
						title: '工作单位',
						content: loanListM.idRegisterAddress
					},
					{
						title: '职务',
						content: loanListM.industry
					},
					{
						title: '工作年限',
						content: loanListM.workingDuration
					},
					{
						title: '现居住地',
						content: loanListM.address
					},
					{
						title: '通信地址',
						content: loanListM.mailingAddress
					},
					{
						title: '家庭电话',
						content: loanListM.phoneNumber
					},
					{
						title: '手机号',
						content: loanListM.contactMobile
					},
					{
						title: '邮箱',
						content: loanListM.contactEmail
					}
				]
				$scope.detailList = preLoanListP.concat(preLoanList)
			}
		}
		$scope.gobackDetail = function () {
			$scope.loanDetail = false;
			$scope.loanTab = 1;
		}
		// 获取暂存的借款信息
		var preEnterprise = {}; // 暂存借款信息
		$scope.getPreProject = function () {
			UserCenterService.getPreProject.get({
				userId: $rootScope.securityStatus.userId
			}, function (response) {
				if (response && response.amount !== undefined) {
					$scope.enterprise = response;
					preEnterprise = {
							amount: response.amount,
							projectDays: response.projectDays,
							financingPurpose: response.financingPurpose,
							repaymentSource: response.repaymentSource,
							monthNetProfit: response.monthNetProfit,
							monthTotalExpend: response.monthTotalExpend,
							monthDebtExpend: response.monthDebtExpend,
							externalGuaranteedAmount: response.externalGuaranteedAmount
						}
				} else {
					preEnterprise = {
						amount: null,
						projectDays: null,
						financingPurpose: null,
						repaymentSource: null,
						monthNetProfit: null,
						monthTotalExpend: null,
						monthDebtExpend: null,
						externalGuaranteedAmount: null
					}
				}
			})
		}
		$scope.getPreProject();

		$scope.savePreProject = function (keep, enterprise) { // keep 是否保存数据，true 保存，false 暂存
			UserCenterService.preProject.post({
				userId: $rootScope.securityStatus.userId,
        keep: keep,
        amount: enterprise.amount,
        projectDays: enterprise.projectDays,
        financingPurpose: enterprise.financingPurpose,
        repaymentSource: enterprise.repaymentSource,
        monthNetProfit: enterprise.monthNetProfit,
        monthTotalExpend: enterprise.monthTotalExpend,
        monthDebtExpend: enterprise.monthDebtExpend,
        externalGuaranteedAmount: enterprise.externalGuaranteedAmount,
			}, function (response) {
				if (response && response.ret !== -1) {
					if (keep) {
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
					}
    		} else {
    			toaster.pop('warning', '填写信息有误，请重新填写');
    		}
			})
		}

		// 返回 重新编辑
		$scope.preLoanBtn = function (enterprise) {
			$scope.preLoan = 0
			preEnterprise = {
				amount: enterprise.amount,
				projectDays: enterprise.projectDays,
				financingPurpose: enterprise.financingPurpose,
				repaymentSource: enterprise.repaymentSource,
				monthNetProfit: enterprise.monthNetProfit,
				monthTotalExpend: enterprise.monthTotalExpend,
				monthDebtExpend: enterprise.monthDebtExpend,
				externalGuaranteedAmount: enterprise.externalGuaranteedAmount
			}
		}

		// 下一步，暂存借款信息
		$scope.nextPreForm = function (enterprise) {
			$scope.enterprise = enterprise
			var preLoanList2 = [
				{
					title: $scope.enterpriseTxt.profitTxt,
					content: enterprise.monthNetProfit
				},
				{
					title: $scope.enterpriseTxt.expenditureTxt,
					content: enterprise.monthTotalExpend
				},
				{
					title: $scope.enterpriseTxt.debtTxt,
					content: enterprise.monthDebtExpend
				},
				{
					title: $scope.enterpriseTxt.guaranteeTxt,
					content: enterprise.externalGuaranteedAmount
				},
				{
					title: '申请借款金额',
					content: enterprise.amount
				},
				{
					title: '申请借款期限',
					content: enterprise.projectDays
				},
				{
					title: '借款用途',
					content: enterprise.financingPurpose
				},
				{
					title: '还款来源',
					content: enterprise.repaymentSource
				}
			]
			if (enterprise.amount !== preEnterprise.amount || 
					enterprise.projectDays !== preEnterprise.projectDays || 
					enterprise.financingPurpose !== preEnterprise.financingPurpose || 
					enterprise.repaymentSource !== preEnterprise.repaymentSource || 
					enterprise.monthNetProfit !== preEnterprise.monthNetProfit || 
					enterprise.monthTotalExpend !== preEnterprise.monthTotalExpend || 
					enterprise.monthDebtExpend !== preEnterprise.monthDebtExpend || 
					enterprise.externalGuaranteedAmount !== preEnterprise.externalGuaranteedAmount) {
				// 调暂存接口
				$scope.savePreProject(false, enterprise)
			} else {
			}
			$scope.preLoanList = $rootScope.userType === 2 ? preLoanListC.concat(preLoanList2) : preLoanListP.concat(preLoanList2)
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

    			if ($scope.loanCounter == 0 && enterprise.amount > $scope.maxLoanAmount) {
    				$scope.msg = '借款上限为' + $scope.maxLoanAmount / 10000 + '万，请您修改借款金额。';
    			}else if ($scope.loanCounter >0 && enterprise.amount + $scope.loanTotalAmount > $scope.maxLoanAmount) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。';
    				$scope.isKnow = true;
    			}else if ($scope.loanCounter >0 && enterprise.amount + $scope.loanTotalAmount <= $scope.maxLoanAmount) {
    				$scope.msg = '您当前已申请'+ $scope.loanCounter + '笔借款，总金额为' + $scope.loanTotalAmount/10000 +'万元。是否确定继续借款？';
    				$scope.isContinue = true;
    			}else if ($scope.loanCounter == 0 && enterprise.amount <= $scope.maxLoanAmount) {
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
    	if (enterprise.projectDays <=0 ) {
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
				$scope.savePreProject(true, enterprise)
    }
  });

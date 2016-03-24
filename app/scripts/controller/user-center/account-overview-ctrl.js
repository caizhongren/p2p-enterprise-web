'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'config', function($scope, $state, $rootScope, $stateParams, UserCenterService, config) {
    $rootScope.selectSide = 'account-overview';
    $scope.timestamp = new Date();
    $scope.year = $scope.timestamp.getFullYear();
    $scope.month = $scope.timestamp.getMonth();
    $scope.day = $scope.timestamp.getDate();



    $scope.getEnterpriseAccount = function(){
      UserCenterService.getEnterpriseUserInfo.get(function(response) {
        if (response.ret === 1) {
          var account = response.data.account;
          var enterpriseUserCapital = response.data.enterpriseCapitalVo;

          $scope.totalAssets = response.data.totalAssets;
          $scope.totalFundRaising = enterpriseUserCapital.totalFundRaising;
          $scope.unPrincipal = enterpriseUserCapital.unPrincipal;
          $scope.accruedInterest = enterpriseUserCapital.accruedInterest;
          $scope.unInterest = enterpriseUserCapital.unInterest;
          $scope.receivedProfit = account.receivedProfit;
          $scope.balance = account.balance;
          $scope.fundsBorrowerWaitingAmount = enterpriseUserCapital.fundsBorrowerWaitingAmount;

          if ($scope.totalFundRaising === 0 && $scope.accruedInterest === 0 && $scope.balance === 0) {
            $scope.doughnutAccountData = [{
              value: 30,
              label: '累计募资',
              //highlight: '#FF5A5E',
              color: '#e94828'
            }, {
              value: 30,
              label: '累计利息',
              color: '#f9b81e'
            }, {
              value: 30,
              label: '账户余额',
              color: '#62cbc6'
            }];
          } else {
            $scope.doughnutAccountData = [{
              value: $scope.totalFundRaising,
              label: '累计募资',
              //highlight: '#FF5A5E',
              color: '#e94828'
            }, {
              value: $scope.accruedInterest,
              label: '累计利息',
              color: '#f9b81e'
            }, {
              value: $scope.balance,
              label: '账户余额',
              color: '#62cbc6'
            }];
          }
        }
      });

    };


    $scope.getFundsUserAccount = function(){
      UserCenterService.getFundsUserAccount.get(function(response) {
        if (response.ret === 1) {
          var account = response.data.account;
          var enterpriseUserCapital = response.data.enterpriseCapital;
          $scope.enterpriseCapital = enterpriseUserCapital;

          $scope.totalAssets = response.data.totalAssets;
          $scope.totalFundRaising = enterpriseUserCapital.totalFundRaising;
          $scope.unPrincipal = enterpriseUserCapital.unPrincipal;
          $scope.accruedInterest = enterpriseUserCapital.accruedInterest;
          $scope.unInterest = enterpriseUserCapital.unInterest;
          $scope.receivedProfit = account.receivedProfit;
          $scope.balance = account.balance;
          $scope.fundsBorrowerWaitingAmount = enterpriseUserCapital.fundsBorrowerWaitingAmount;

          if ($scope.totalFundRaising === 0 && $scope.accruedInterest === 0 && $scope.balance === 0) {
            $scope.doughnutAccountData = [{
              value: 30,
              label: '累计募资',
              //highlight: '#FF5A5E',
              color: '#e94828'
            }, {
              value: 30,
              label: '累计利息',
              color: '#f9b81e'
            }, {
              value: 30,
              label: '账户余额',
              color: '#62cbc6'
            }];
          } else {
            $scope.doughnutAccountData = [{
              value: $scope.totalFundRaising,
              label: '累计募资',
              //highlight: '#FF5A5E',
              color: '#e94828'
            }, {
              value: $scope.accruedInterest,
              label: '累计利息',
              color: '#f9b81e'
            }, {
              value: $scope.balance,
              label: '账户余额',
              color: '#62cbc6'
            }];
          }
        }
      });

    };

  // 默认查询还款中项目
  $scope.$watch('userType', function(userType) {

    if (!$rootScope.userType){
      return;
    }
    if ($rootScope.userType != 5) {
      $scope.statusx = 1;
      $scope.getProjects(1);
      $scope.getEnterpriseAccount();
    } else {
      $scope.statusx = 0;
      $scope.getNeedAuthorizeAutoRepaymentFundsProjectList();
      $scope.getFundsUserAccount();
    }
  });

    if ($scope.totalFundRaising > 0 && $scope.accruedInterest > 0 && $scope.balance > 0) {
      $scope.doughnutOptions = {
        segmentShowStroke: false,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 2,
        percentageInnerCutout: 65,
        animation: true,
        animationSteps: 100,
        animationEasing: 'easeOutQuart',
        animateRotate: true,
        animateScale: false
      };
    } else {
      $scope.doughnutOptions = {
        segmentShowStroke: false,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 2,
        percentageInnerCutout: 65,
        animation: true,
        animationSteps: 100,
        animationEasing: 'easeOutQuart',
        animateRotate: true,
        animateScale: false,
        showTooltips: false
      };
    }


    /**
     * 根据项目状态查询项目列表
     */
    $scope.getProjects = function(status) {
      var searchStatus;
      if (status === 1) {
        searchStatus = '9';
      } else if (status === 2) {
        searchStatus = '6,7,8';
      } else {
        searchStatus = '10';
      }
      UserCenterService.getProjectByStatus.get({
        status: searchStatus
      }, function(response) {
        if (response.ret !== 1) {
          alert('查询出错，请联系客服！');
          return;
        }

        var projectBillDetails = response.data.projectBillDetails;
        $scope.projectBillDetails = projectBillDetails;

        for (var i = projectBillDetails.length - 1; i >= 0; i--) {
          $scope.projectBillDetails[i].project.releaseEndTimeDate = new Date($scope.projectBillDetails[i].project.releaseEndTime);
          $scope.projectBillDetails[i].project.investPercent = ($scope.projectBillDetails[i].project.soldStock + $scope.projectBillDetails[i].project.occupancyStock) / $scope.projectBillDetails[i].project.countInvest * 100;
          $scope.projectBillDetails[i].project.projectBackCapital = 0;
          var projectBills = projectBillDetails[i].projectBills;
          for (var j = projectBills.length - 1; j >= 0; j--) {
            if (projectBills[j].status === 0) {
              projectBills[j].repaymentTimeDate = new Date(projectBills[j].repaymentTime);
              projectBillDetails[i].recentProjectBill = projectBills[j];
              if (new Date(projectBills[j].repaymentTime).getFullYear() === new Date(response.data.time).getFullYear() &&
                new Date(projectBills[j].repaymentTime).getMonth() === new Date(response.data.time).getMonth() &&
                new Date(projectBills[j].repaymentTime).getDate() === new Date(response.data.time).getDate()) {
                projectBillDetails[i].project.isAvailableRepayment = true;
              } else {
                projectBillDetails[i].project.isAvailableRepayment = false;
              }
              break;
            } else {
              $scope.projectBillDetails[i].project.projectBackCapital = $scope.projectBillDetails[i].project.projectBackCapital + projectBills[j].repaymentInterest;
            }
          }
        }

      });
    };

    /**
     * 根据项目状态查询项目列表
     */
    $scope.getFundsProject = function(status) {
      var searchStatus;
      if (status === 1) {
        searchStatus = '4';
      } else if (status === 2) {
        searchStatus = '1,2,3';
      } else {
        searchStatus = '5';
      }
      UserCenterService.getFundsProjectByStatus.get({
        status: searchStatus
      }, function(response) {
        if (response.ret !== 1) {
          alert('查询出错，请联系客服！');
          return;
        }

        var projectBillDetails = response.data.fundsProjectDetails;
        $scope.projectBillDetails = projectBillDetails;

        for (var i = projectBillDetails.length - 1; i >= 0; i--) {
          $scope.projectBillDetails[i].project.releaseEndTimeDate = new Date($scope.projectBillDetails[i].project.releaseEndTime);
          $scope.projectBillDetails[i].project.investPercent = ($scope.projectBillDetails[i].project.soldStock + $scope.projectBillDetails[i].project.occupancyStock) / $scope.projectBillDetails[i].project.countInvest * 100;
          $scope.projectBillDetails[i].project.projectBackCapital = 0;
          var projectBills = projectBillDetails[i].projectBill;
          if (projectBills.status && projectBills.status === 0) {
            projectBills.repaymentTimeDate = new Date(projectBills.repaymentTime);
            projectBillDetails[i].recentProjectBill = projectBills;
            if (new Date(projectBills.repaymentTime).getFullYear() === new Date(response.data.time).getFullYear() &&
              new Date(projectBills.repaymentTime).getMonth() === new Date(response.data.time).getMonth() &&
              new Date(projectBills.repaymentTime).getDate() === new Date(response.data.time).getDate()) {
              projectBillDetails[i].project.isAvailableRepayment = true;
            } else {
              projectBillDetails[i].project.isAvailableRepayment = false;
            }
            break;
          } else {
            $scope.projectBillDetails[i].project.projectBackCapital = $scope.projectBillDetails[i].project.projectBackCapital + projectBills.repaymentInterest;
          }
        }

      });
    };

    /**
     * 需要自动还款授权的项目
     */
    $scope.getNeedAuthorizeAutoRepaymentFundsProjectList = function() {
      UserCenterService.getNeedAuthorizeAutoRepaymentFundsProjectList.get({
      }, function(response) {
        if (response.ret !== 1) {
          alert('查询出错，请联系客服！');
          return;
        }

        $scope.projectBillDetails = response.data.fundsProjectDetails;
      });
    };





    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    }

    // 企业用户点击还款按钮，进行还款
    // @param  {[type]} projectId
    // @return {[type]}
    $scope.repayment = function(project) {
      if (project.repaymentAmount > $scope.balance) {
        alert('账户余额不足，请先充值');
        return;
      }
      UserCenterService.repayment.get({
        projectId: project.id
      }, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toRepayment';
          _f.submit();
        } else if (response.ret === -1) {
          alert(response.msg);
        } else {
          console.log('ask account-overview, why repayment did not load data...');
        }
      });
    };

    // 企业用户点击还款按钮，进行还款
    // @param  {[type]} projectId
    // @return {[type]}
    $scope.fundsRepayment = function(project) {
      if (project.repaymentAmount > $scope.balance) {
        alert('账户余额不足，请先充值');
        return;
      }
      UserCenterService.repaymentFundsProject.get({
        projectId: project.id
      }, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toRepayment';
          _f.submit();
        } else if (response.ret === -1) {
          alert(response.msg);
        } else {
          console.log('ask account-overview, why repayment did not load data...');
        }
      });
    };

    /*宏金盈自动还款授权*/
    $scope.authorizeFundsProjectAutoRepayment = function(project) {
      UserCenterService.authorizeFundsProjectAutoRepayment.get({
        projectId: project.id
      }, function(response) {
        if (response.ret === 1) {
          var req = response.data.req;
          var sign = response.data.sign;
          var _f = newForm();
          createElements(_f, 'req', req);
          createElements(_f, 'sign', sign);
          _f.action = config.YEEPAY_ADDRESS + 'toAuthorizeAutoRepayment';
          _f.submit();
        } else if (response.ret === -1) {
          alert(response.msg);
        } else {
          console.log('ask account-overview, why repayment did not load data...');
        }
      });
    };

  }]);

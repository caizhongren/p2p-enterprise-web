'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', function($scope, $state, $rootScope, $stateParams, UserCenterService, $alert, config, DEFAULT_DOMAIN, PayUtils, $window) {
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
    //居间人账户总览 
    $scope.getIntermediaryAccount =function(){
      UserCenterService.getIntermediaryAccount.get({userId: $rootScope.securityStatus.userId},function(response){
        if(response && response.ret !== -1) {
          $scope.intermediaryAccount = response;
        }
      })
    };

    //居间人&借款方 审核中的项目
    
    $scope.page = 1;
    $scope.getPreProjects =function(page){
      UserCenterService.getPreProjects.get({
        userId: $rootScope.securityStatus.userId,
        page: page,
        pageSize: 10,
        status: '0,1'
        },function(response){
          if(response && response.ret !== -1){
            $scope.preProjects = response.data;
            $scope.total = response.total;
            $scope.totalPage = response.totalPage;
            $scope.pageSize = response.pageSize;
          }
      })
    };

    //居间人 待投资、还款完成 && 借款方 募集中\还款中\已结清的项目：getEnterpriseProjects
    $scope.getEnterpriseProjects =function(page, status){
      var searchStatus;
      if (status === 1) {
        searchStatus = '9';
      } else if (status === 2) {
        searchStatus = '6,7,8';
      } else {
        searchStatus = '10';
      }
      UserCenterService.getEnterpriseProjects.get({
        userId: $rootScope.securityStatus.userId,
        page: page,
        pageSize: 10,
        status: searchStatus
        },function(response){
          if(response && response.ret !== -1) {
            $scope.total = response.total;
            $scope.totalPage = response.totalPage;
            $scope.pageSize = response.pageSize;
            var projectBillDetails = response.data;
            $scope.projectBillDetails = projectBillDetails;

            for (var i = projectBillDetails.length - 1; i >= 0; i--) {
              $scope.projectBillDetails[i].releaseEndTimeDate = new Date($scope.projectBillDetails[i].releaseEndTime);
              $scope.projectBillDetails[i].investPercent = ($scope.projectBillDetails[i].soldStock + $scope.projectBillDetails[i].occupancyStock) / $scope.projectBillDetails[i].countInvest * 100;
              $scope.projectBillDetails[i].projectBackCapital = 0;
              var projectBills = projectBillDetails[i].projectBills;
              for (var j = projectBills.length - 1; j >= 0; j--) {
                if (projectBills[j].status === 0) {
                  projectBills[j].repaymentTimeDate = new Date(projectBills[j].repaymentTime);
                  projectBillDetails[i].recentProjectBill = projectBills[j];
                  if (new Date(projectBills[j].repaymentTime).getFullYear() === new Date(response.data.time).getFullYear() &&
                    new Date(projectBills[j].repaymentTime).getMonth() === new Date(response.data.time).getMonth() &&
                    new Date(projectBills[j].repaymentTime).getDate() === new Date(response.data.time).getDate()) {
                    projectBillDetails[i].isAvailableRepayment = true;
                  } else {
                    projectBillDetails[i].isAvailableRepayment = false;
                  }
                  break;
                } else {
                  $scope.projectBillDetails[i].projectBackCapital = $scope.projectBillDetails[i].projectBackCapital + projectBills[j].repaymentInterest;
                }
              }
            }
          } 
      })
    };

    //居间人 转让中、已转让 125,已转，34转让中
    $scope.getEnterpriseAssignments =function(page, status){
      var searchStatus;
      if (status === 1) {
        searchStatus = '1,2,5';
      } else{
        searchStatus = '3,4';
      } 
      UserCenterService.getEnterpriseAssignments.get({
        userId: $rootScope.securityStatus.userId,
        page: page,
        pageSize: 10,
        status: searchStatus
        },function(response){
          if(response && response.ret !== -1){
            $scope.enterpriseAssignments = response.data;
            $scope.total = response.total;
            $scope.totalPage = response.totalPage;
            $scope.pageSize = response.pageSize;
            var enterpriseAssignments = response.data;
            // for (var i = enterpriseAssignments.length - 1; i >= 0; i--) {
            //   $scope.enterpriseAssignments[i].project.releaseEndTimeDate = new Date($scope.enterpriseAssignments[i].project.releaseEndTime);
            //   $scope.enterpriseAssignments[i].project.investPercent = ($scope.enterpriseAssignments[i].project.soldStock + $scope.enterpriseAssignments[i].project.occupancyStock) / $scope.enterpriseAssignments[i].project.countInvest * 100;
            //   $scope.enterpriseAssignments[i].project.projectBackCapital = 0;
            //   var projectBills = enterpriseAssignments[i].projectBills;
            //   for (var j = projectBills.length - 1; j >= 0; j--) {
            //     if (projectBills[j].status === 0) {
            //       projectBills[j].repaymentTimeDate = new Date(projectBills[j].repaymentTime);
            //       enterpriseAssignments[i].recentProjectBill = projectBills[j];
            //       if (new Date(projectBills[j].repaymentTime).getFullYear() === new Date(response.data.time).getFullYear() &&
            //         new Date(projectBills[j].repaymentTime).getMonth() === new Date(response.data.time).getMonth() &&
            //         new Date(projectBills[j].repaymentTime).getDate() === new Date(response.data.time).getDate()) {
            //         enterpriseAssignments[i].project.isAvailableRepayment = true;
            //       } else {
            //         enterpriseAssignments[i].project.isAvailableRepayment = false;
            //       }
            //       break;
            //     } else {
            //       $scope.enterpriseAssignments[i].project.projectBackCapital = $scope.enterpriseAssignments[i].project.projectBackCapital + projectBills[j].repaymentInterest;
            //     }
            //   }
            // }

          }
      })
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
      if ($rootScope.userType == 5) {
        $scope.statusx = 0;
        $scope.getNeedAuthorizeAutoRepaymentFundsProjectList();
        $scope.getFundsUserAccount();
      } else if($rootScope.userType == 6) {
        $scope.statusx = 4;
        $scope.getIntermediaryAccount();
        $scope.getPreProjects($scope.page);
      }
       else {
        $scope.statusx = 4;
        $scope.getPreProjects($scope.page);
        $scope.getEnterpriseAccount();
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
     * 投资 调到易宝支付
     */
    $scope.transfer = function(project) {
      if($rootScope.securityStatus.userAuth.active == false) {
        $rootScope.realNameAuth();
        return;
      }
      if($scope.intermediaryAccount.account.balance < project.total) {
        alert('账户余额不足，请先充值');
        $state.go('root.userCenter.recharge');
        return;
      }
      
      // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题 
      $.ajax({
        url: DEFAULT_DOMAIN + '/siteOrder/saveOrder?projectId=' + project.id + '&investAmount=' + project.total + '&giftCount=0' + '&couponNumber=',
        'type': 'POST',
        async: false,
        dataType: 'json',
        success: function(response) {
          if (response.ret === 1) {
            var orderId = response.data.orderId;
            var orderType = 1;
            $alert({
              scope: $scope,
              template: 'views/modal/alertYEEPAY.html',
              show: true
            });

            $window.open('/#!/user-order-transfer/' + project.id + '/' + orderId + '/' + orderType, '_blank');
          } else {
            // toaster.pop('error', response.msg);
            alert(response.msg);
          }
        }
      });
    };
    //预回购
    $scope.continueInvest =function() {
      $scope.msg = '将冻结资金222元，用于还款日回购投资者债券';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });

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
      // $scope.url = DEFAULT_DOMAIN + '/enterpriseFunds/getNeedAuthorizeAutoRepaymentFundsProjectList';
      UserCenterService.getNeedAuthorizeAutoRepaymentFundsProjectList.get({
      }, function(response) {
        if (response.ret !== 1) {
          alert('查询出错，请联系客服！');
          return;
        }
        $scope.projectBillDetails = response.data.fundsProjectDetails;
      });
    };


    //标志位，用户防止用户多次点击还款问题
    $scope.canRepayment = true;
    // 企业用户点击还款按钮，进行还款
    // @param  {[type]} projectId
    // @return {[type]}
    $scope.repayment = function(project, repaymentNo) {
      if (project.repaymentAmount > $scope.balance) {
        alert('账户余额不足，请先充值');
        return;
      }

      if(!$scope.canRepayment){
        return;
      }

      $scope.canRepayment = false;
      UserCenterService.repayment.get({
        projectId: project.id,
        repaymentNo: repaymentNo
      }, function(response) {
        $scope.canRepayment = true;

        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toRepayment', response);
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
          PayUtils.redToTrusteeship('toRepayment', response.data);
        } else if (response.ret === -1) {
          alert(response.msg);
        } else {
          console.log('ask account-overview, why repayment did not load data...');
        }
      });
    };


    
    /**
     * 提前还款
     */
    $scope.earlyFundsRepayment = function(project) {
      var really = confirm('确定提前还款！！！！？');

      if(!really){
        return;
      }


      if (project.repaymentAmount > $scope.balance) {
        alert('账户余额不足，请先充值');
        return;
      }
      UserCenterService.earlyRepaymentFundsProject.get({
        projectId: project.id
      }, function(response) {
        if (response.ret === 1) {

          PayUtils.redToTrusteeship('toRepayment', response.data);

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

          PayUtils.redToTrusteeship('toAuthorizeAutoRepayment', response.data);

        } else if (response.ret === -1) {
          alert(response.msg);
        } else {
          console.log('ask account-overview, why repayment did not load data...');
        }
      });
    };

    $scope.goActivateUser = function(){
      UserCenterService.cgtActive.active({}, function(response){
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toActive', response);
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }

  });

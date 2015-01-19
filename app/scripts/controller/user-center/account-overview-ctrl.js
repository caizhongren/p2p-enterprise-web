'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', 'config', function($scope, $state, $rootScope, $stateParams, UserCenterService, config) {
    $rootScope.selectSide = 'account-overview';
    $scope.timestamp = new Date();
    $scope.year = $scope.timestamp.getFullYear();
    $scope.month = $scope.timestamp.getMonth();
    $scope.day = $scope.timestamp.getDate();
    UserCenterService.getEnterpriseUserInfo.get(function(response) {
      if (response.ret === 1) {
        $scope.totalAssets = response.data.totalAssets;
        $scope.totalFundRaising = response.data.enterpriseCapitalVo.totalFundRaising;
        $scope.unPrincipal = response.data.enterpriseCapitalVo.unPrincipal;
        $scope.accruedInterest = response.data.enterpriseCapitalVo.accruedInterest;
        $scope.unInterest = response.data.enterpriseCapitalVo.unInterest;
        $scope.receivedProfit = response.data.userCapital.receivedProfit;
        $scope.balance = response.data.userCapital.balance;

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

    // 还款中项目查询
    // @type {Number}
    $scope.statusx = 1;
    UserCenterService.getProjectByStatus.get({
      status: $scope.statusx
    }, function(response) {
      if (response.ret === 1) {
        var projectBillDetails = response.data.projectBillDetails;
        for (var i = projectBillDetails.length - 1; i >= 0; i--) {
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
            }
          }
        }
        $scope.projectBillDetails = projectBillDetails;
        if (response.data.projectBillDetails.length !== 0) {
          $scope.status = 9;
        }
        // var timestamp = Date.parse(new Date());
      } else {
        alert('查询出错，请联系客服！');
      }
    });




    // 投标中项目查询
    // @return {[type]} [description]
    $scope.bidPro = function() {
      $scope.statusx = 2;
      UserCenterService.getProjectByStatus.get({
        status: $scope.statusx
      }, function(response) {
        $scope.projectBillDetails = response.data.projectBillDetails;
        for (var i = 0; i < response.data.projectBillDetails.length; i++) {
          $scope.projectBillDetails[i].project.releaseEndTimeDate = new Date($scope.projectBillDetails[i].project.releaseEndTime);
          $scope.projectBillDetails[i].project.investPercent = ($scope.projectBillDetails[i].project.soldStock + $scope.projectBillDetails[i].project.occupancyStock) / $scope.projectBillDetails[i].project.countInvest * 100;
        }
        if (response.data.projectBillDetails.length !== 0) {
          $scope.status = 7;
        }
      });
    };

    // 还款中项目查询
    // @return {[type]} [description]
    $scope.repaymentPro = function() {
      $scope.statusx = 1;
      UserCenterService.getProjectByStatus.get({
        status: $scope.statusx
      }, function(response) {
        if (response.ret === 1) {
          var projectBillDetails = response.data.projectBillDetails;

          for (var i = projectBillDetails.length - 1; i >= 0; i--) {
            projectBillDetails[i].project.isAvailableRepayment = true;
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
                  //projectBillDetails[i].project.isAvailableRepayment = false;
                  projectBillDetails[i].project.isAvailableRepayment = true;
                }
                break;
              }
            }
          }

          $scope.projectBillDetails = projectBillDetails;
          if (response.data.projectBillDetails.length !== 0) {
            $scope.status = 9;
          }
          // var timestamp = Date.parse(new Date());
        } else {
          alert('查询出错，请联系客服！');
        }

      });
    };

    // 已结清项目查询
    // @return {[type]} [description]
    $scope.settlePro = function() {
      $scope.statusx = 3;
      UserCenterService.getProjectByStatus.get({
        status: $scope.statusx
      }, function(response) {
        $scope.projectBillDetails = response.data.projectBillDetails;
        for (var i = 0; i < response.data.projectBillDetails.length; i++) {
          $scope.projectBillDetails[i].project.releaseEndTimeStr = new Date($scope.projectBillDetails[i].project.releaseEndTime);
          $scope.projectBillDetails[i].project.projectBackCapital = 0;
          for (var j = $scope.projectBillDetails[i].projectBills.length - 1; j >= 0; j--) {
            $scope.projectBillDetails[i].project.projectBackCapital = $scope.projectBillDetails[i].project.projectBackCapital + $scope.projectBillDetails[i].projectBills[j].repaymentInterest;
          }
        }
        if (response.data.projectBillDetails.length !== 0) {
          $scope.status = 3;
        }
      });
    };


    // 用户投资情况
    // @param  {[type]} response 用户投资情况
    // @return {[type]}          [description]
    UserCenterService.statisticsByUser.get(function(response) {
      if (response.ret === 1) {
        var orderNum = response.data.orderNum;
        if (orderNum) {
          $scope.investingNum = orderNum.isInve;
          $scope.investedNum = orderNum.overInve;
          $scope.investNum = orderNum.allInve;
        }
      }
    });

    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      //f.target = '_blank';
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
  }]);

'use strict';
/**
 * @ngdoc overview
 * @name hongcaiApp
 * @description
 * #
 * 宏财JS库依赖以及程序路由主配置文件
 */
var hongcaiApp = angular.module('hongcaiApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  // 'chartjs',
  'ngResource',
  'toaster',
  'ipCookie',
  'config',
  'angular-md5',
  'angularFileUpload',
  'bgf.paginateAnything',
  'ui.bootstrap'
]);

hongcaiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider
    .state('root', {
      abstract: true,
      views: {
        '': {
          templateUrl: 'views/root.html'
        },
        'header': {
          templateUrl: 'views/header.html',
          controller: 'LoginCtrl',
          controllerUrl: 'scripts/controller/user-center/login-ctrl'
        },
        'footer': {
          templateUrl: 'views/footer.html'
        }
      }
    })
    .state('root.login', {
      url: '/',
      views: {
        '': {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerUrl: 'scripts/controller/user-center/login-ctrl'
        }
      }
    })
    .state('root.registerMobile', {
      url: '/registerMobile',
      views: {
        '': {
          templateUrl: 'views/registerMobile.html',
          controller: 'registerMobileCtrl',
          controllerUrl: 'scripts/controller/user-center/registerMobile-ctrl'
        }
      }
    })
    .state('root.pLogin', {
      url: '/p',
      views: {
        '': {
          templateUrl: 'views/pLogin.html',
          controller: 'LoginCtrl',
          controllerUrl: 'scripts/controller/user-center/login-ctrl'
        }
      }
    })
    /*------------------------------------------  agreements  -----------------------------------------------*/
    // 三方协议模版
    .state('root.serviceAgree', {
      url: '/agreements/service-agree',
      views: {
        '': {
          templateUrl: 'views/agreements/service-agree.html'
        }
      }
    })
    // 网络借贷信息中介服务协议模版
    .state('root.intermediaryService', {
      url: '/agreements/intermediary-service',
      views: {
        '': {
          templateUrl: 'views/agreements/intermediary-service.html'
        }
      }
    })
    // 借款申请函(个人/企业)
    .state('root.loanApplicationLetter', {
      url: '/agreements/loan-application-letter/:type',
      views: {
        '': {
          templateUrl: 'views/agreements/loan-application-letter.html',
          controller: 'LoanApplicationLetterCtrl',
          controllerUrl: 'scripts/controller/user-center/loan-application-letter-ctrl'
        }
      }
    })
    // 个人信息查询及使用授权书(企业)
    .state('root.infoAuthorization', {
      url: '/agreements/info-authorization/:type',
      views: {
        '': {
          templateUrl: 'views/agreements/info-authorization.html',
          controller: 'InfoAuthorizationCtrl',
          controllerUrl: 'scripts/controller/user-center/info-authorization-ctrl'
        }
      }
    })
    /*------------------------------------------  user-center  -----------------------------------------------*/
    .state('root.userCenter', {
      'url':'/user-center',
      abstract: false,
      views: {
        'user-center': {
          templateUrl: 'views/user-center/user-center.html',
          controller: 'UserCenterCtrl',
          controllerUrl: 'scripts/controller/user-center-ctrl'
        },
        'sidebar': {
          templateUrl: 'views/user-center/sidebar.html',
          controller: 'UserCenterCtrl',
          controllerUrl: 'scripts/controller/user-center-ctrl'
        }
      }
    })
    .state('root.userCenter.project-bills', {
      url: '/project-bills/:number',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/project-bills.html',
          controller: 'ProjectBillsCtrl',
          controllerUrl: 'scripts/controller/user-center/project-bills-ctrl'
        }
      }
    })
    .state('root.userCenter.account-overview', {
      url: '/account-overview',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/account-overview.html',
          controller: 'AccountOverviewCtrl',
          controllerUrl: 'scripts/controller/user-center/account-overview-ctrl'
        }
      }
    })
    .state('root.userCenter.bankcard-management', {
      url: '/bankcard-management',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/bankcard-management.html',
          controller: 'BankCardManagementCtrl',
          controllerUrl: 'scripts/controller/user-center/bankcard-management-ctrl'
        }
      }
    })
    .state('root.userCenter.perfect-information', {
      url: '/perfect-information',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/perfect-information.html',
          controller: 'PerfectInformationCtrl',
          controllerUrl: 'scripts/controller/user-center/perfect-information-ctrl'
        }
      }
    })
    .state('root.userCenter.transaction-record', {
      url: '/transaction-record',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/transaction-record.html',
          controller: 'TransactionRecordCtrl',
          controllerUrl: 'scripts/controller/user-center/transaction-record-ctrl'
        }
      }
    })
    .state('root.userCenter.transaction-query', {
      url: '/transaction-record/:dateInterval/:type',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/transaction-record.html',
          controller: 'TransactionRecordCtrl',
          controllerUrl: 'scripts/controller/user-center/transaction-record-ctrl'
        }
      }
    })

    .state('root.userCenter.security-settings', {
      url: '/security-settings',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/security-settings.html',
          controller: 'SecuritySettingsCtrl',
          controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
        }
      }
    })

    .state('root.userCenter.lend-money', {
      url: '/lend-money?tab&loanStatus',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/lend-money.html',
          controller: 'LendMoneyCtrl',
          controllerUrl: 'scripts/controller/user-center/lend-money-ctrl'
        }
      }
    })
    .state('root.userCenter.recharge', {
      url: '/recharge',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/recharge.html',
          controller: 'RechargeCtrl',
          controllerUrl: 'scripts/controller/user-center/recharge-ctrl'
        }
      }
    })

    .state('root.recharge-success', {
      url: '/recharge-success/:status',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'RechargeSuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/recharge-success-ctrl'
        }
      }
    })
    .state('root.withdraw-success', {
      url: '/withdraw-success/:status',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'WithdrawSuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/withdraw-success-ctrl'
        }
      }
    })
    .state('root.fdd-success', {
      url: '/fdd-success/:preProjectId',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'FddSuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/fdd-success-ctrl'
        }
      }
    })
    .state('root.userCenter.withdraw', {
      url: '/withdraw',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/withdraw.html',
          controller: 'WithdrawCtrl',
          controllerUrl: 'scripts/controller/user-center/withdraw-ctrl'
        }
      }
    })
    .state('root.userCenter.record', {
      url: '/record',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/record.html',
          controller: 'UserCenterCtrl',
          controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
        }
      }
    })
    .state('root.yeepay-success', {
      url: '/yeepay-success',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/success.html',
          controller: 'YeepaySuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/yeepay-success-ctrl'
        }
      }
    })
    .state('root.bankcard-success', {
      url: '/bankcard-success/:status',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'BankcardSuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/bankcard-success-ctrl'
        }
      }
    })
    .state('root.unbind-bankcard-success', {
      url: '/unBindbankcard-success/:status',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'UnBindBankcardSuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/unbind-bankcard-success-ctrl'
        }
      }
    })
    /*------------------------------------------  toYeepay transfer  -----------------------------------------------*/
    .state('root.recharge-transfer', {
      url: '/recharge-transfer/:amount/:rechargeWay/:expectPayCompany',
      views: {
        '': {
          templateUrl: 'views/transfer.html',
          controller: 'RechargeTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/recharge-transfer-ctrl'
        }
      }
    })
    .state('root.rights-transfer', {
      url: '/righs-transfer/:realName/:idCardNo/:type',
      views: {
        '': {
          templateUrl: 'views/transfer.html',
          controller: 'RightsTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/rights-transfer-ctrl'
        }
      }
    })
    .state('root.withdraw-transfer', {
      url: '/withdraw-transfer/:amount/:captcha',
      views: {
        '': {
          templateUrl: 'views/transfer.html',
          controller: 'WithdrawTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/withdraw-transfer-ctrl'
        }
      }
    })
    .state('root.bankcard-transfer', {
      url: '/bankcard-transfer/:type',
      views: {
        '': {
          templateUrl: 'views/transfer.html',
          controller: 'BankcardTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/bankcard-transfer-ctrl'
        }
      }
    })
    .state('root.user-order-transfer', {
        url: '/user-order-transfer/:projectId/:orderId/:orderType',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'UserOrderTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-transfer-ctrl'
          }
        }
      })
    .state('root.transfer-transfer', {
      url: '/transfer-transfer/:transferAmount',
      views: {
        '': {
          templateUrl: 'views/transfer.html',
          controller: 'TransferTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/transfer-transfer-ctrl'
        }
      }
    })
    /*------------------------------------------  get-pwd-back  -----------------------------------------------*/
    .state('root.get-pwd-back', {
      url: '/get-pwd-back',
      views: {
        '': {
          templateUrl: 'views/get-pwd-back/get-pwd-back.html',
          controller: 'GetPwdCtrl',
          controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
        }
      }
    })
    /*------------------------------------------  set-new-pwd  -----------------------------------------------*/
    .state('root.set-new-pwd', {
      url: '/set-new-pwd/:uuid/:etoken',
      views: {
        '': {
          templateUrl: 'views/get-pwd-back/set-new-pwd.html',
          controller: 'SetNewPwdCtrl',
          controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
        }
      }
    })
    /*---------------------------------------------  yeepay  ---------------------------------------------*/
    .state('root.yeepay-callback', {
      url: '/yeepay-callback/:business/:yeepayStatus?amount&number',
      views: {
        '': {
          templateUrl: 'views/user-center/success.html',
          controller: 'YeepayCtrl',
          controllerUrl: 'scripts/controller/yeepay/yeepay-ctrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.when('', '/');

  //initialize get if not there
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }
  //disable IE ajax request caching
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

}]);

hongcaiApp.run(function($rootScope, $location, $http, DEFAULT_DOMAIN, config, $alert, UserCenterService, $modal) {
  $rootScope.pay_company = config.pay_company;
  // Array 在IE8下没有indexOf 方法。
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }
  
  $rootScope.alertRealName = function (authStatus) {
    if (authStatus && authStatus === 1 && $rootScope.isPublicUser) {
      alert('认证中');
      return;
    }
    $alert({
      scope: $rootScope,
      template: 'views/modal/modal-realNameAuth.html',
      controller: 'RealNameCtrl',
      show: true
    });
  }
  
  /*
   * 开通存管通
  */
  $rootScope.realNameAuth = function(user) {
    $rootScope.msg = '1';
    $alert({
      scope: $rootScope,
      template: 'views/modal/alertYEEPAY.html',
      show: true
    });

    $rootScope.isPrivateUser ? window.open('/#!/righs-transfer/' + user.name + '/' + user.legalIdNo + '/0') : window.open('/#!/righs-transfer/0/0/0');
  };

  /**
   * 未完成订单
   */
  $rootScope.toFinishOrder = function() {
    UserCenterService.unFinishedOrder.get({},function(order){
      // console.log(order.orderAmount);
      if(!order.orderAmount) {
        $state.reload();
        return;
      }
      $modal({
        scope: $rootScope,
        template: 'views/modal/alert-unfinishedOrder.html',
        show: true
      });
    });
    
  };

  // 检查是否绑定邮箱和手机号码
  $rootScope.checkEmailAndMobile = function(email, mobile) {
    if (!email || !mobile) {
      $rootScope.msg = '请先绑定邮箱和手机号码';
      $alert({
        scope: $rootScope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
      return false;
    }
    return true;
  };

  // 绑卡
  $rootScope.toBindBank = function(){
    if($rootScope.userDetail.bankCardStatus !== 'VERIFIED') {
      $rootScope.msg = '5';
      $alert({
        scope: $rootScope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/bankcard-transfer/0');
      return;
    }
  }
  // userType：0-投资用户，1-企业对私账号，2-企业对公账户，3-借款个人，4-宏金盈资金账户，5-宏金盈资产账户，6-居间人资产账户，7-受托支付方（资产方）对私，8-受托支付方（资产方）对公，9-担保方对公，10-供应商（企业／对公），11-供应商（个人／对私）
  $rootScope.$on('$stateChangeStart', function() {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if ($location.path().split('/')[1] !== 'user-center') {
      return
    } else {  
      $checkSessionServer.error(function(response) {
        return;
      }).success(function(response) {
        if (response.ret !== -1 && response.data && response.data.userDetail !== '' && response.data.userDetail.user !== undefined && response.data.userDetail.user !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.name;
          $rootScope.userType = response.data.userType;
          $rootScope.isPrivateUser = $rootScope.userType == 1 || $rootScope.userType == 7 || $rootScope.userType == 11 ? true : null;
          $rootScope.isPublicUser = $rootScope.userType == 2 || $rootScope.userType == 8 || $rootScope.userType == 9 || $rootScope.userType == 10 ? true : null;
          $rootScope.securityStatus = response.data.securityStatus;
          $rootScope.realNameAuthStatus = response.data.securityStatus.realNameAuthStatus;
          $rootScope.userDetail = response.data.userDetail;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
          $location.path('/login/');
        }
      });
    }
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    if ($location.path().indexOf('bills') !== -1) {
      $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[1];
    } else {
      $rootScope.selectPage_two = null;
    }
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if ($location.path().split('/')[1] !== 'user-center') {
      return
    } else {  
      $checkSessionServer.error(function(response) {
        return;
      }).success(function(response) {
        if (response.ret !== -1 && response.data && response.data.userDetail !== '' && response.data.userDetail.user !== undefined && response.data.userDetail.user !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.name;
          $rootScope.userType = response.data.userType;
          $rootScope.isPrivateUser = $rootScope.userType == 1 || $rootScope.userType == 7 || $rootScope.userType == 11 ? true : null;
          $rootScope.isPublicUser = $rootScope.userType == 2 || $rootScope.userType == 8 || $rootScope.userType == 9 || $rootScope.userType == 10 ? true : null;
          $rootScope.securityStatus = response.data.securityStatus;
          $rootScope.realNameAuthStatus = response.data.securityStatus.realNameAuthStatus;
          $rootScope.userDetail = response.data.userDetail;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
          $location.path('/login/');
        }
      });
    }
  })
});

hongcaiApp.constant('DEFAULT_DOMAIN', '/enterprise/api/v1');
hongcaiApp.constant('RESTFUL_DOMAIN', '/enterprise/rest');

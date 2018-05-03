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
      url: '/lend-money',
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
    .state('root.userCenter.investment', {
      url: '/userCenter-investment',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/investment.html',
          controller: 'UserOrderCtrl',
          controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
        }
      }
    })
    .state('root.userCenter.investment-query', {
      url: '/userCenter-investment/:dateInterval',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/investment.html',
          controller: 'UserOrderCtrl',
          controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
        }
      }
    })
    .state('root.userCenter.news', {
      url: '/news',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/news.html',
          controller: 'UserCenterCtrl',
          controllerUrl: 'scripts/controller/user-center/user-center-ctrl'
        }
      }
    })
    .state('root.userCenter.realname-authentication', {
      url: '/realname-authentication',
      views: {
        'user-center': {
          templateUrl: 'views/user-center/realname-authentication.html',
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
    /*------------------------------------------  about-us  -----------------------------------------------*/
    .state('root.about-us', {
      views: {
        'about-us': {
          templateUrl: 'views/about-us/about-us.html',
          controller: 'AboutUsCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        },
        'about-sidebar': {
          templateUrl: 'views/about-us/about-sidebar.html',
          controller: 'AboutUsCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.introduction-of-platform', {
      url: '/introduction-of-platform',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/introduction-of-platform.html',
          controller: 'IntroductionCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.business-model', {
      url: '/business-model',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/business-model.html',
          controller: 'BusinessModelCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.company-profile', {
      url: '/company-profile',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/company-profile.html',
          controller: 'CompanyProfileCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.web-site-announcement', {
      url: '/web-site-announcement',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/web-site-announcement.html',
          controller: 'WebSiteCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.hongcaidynamic', {
      url: '/hongcaidynamic',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/hongcaidynamic.html',
          controller: 'HongcaiDynamicCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.media-reports', {
      url: '/media-reports',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/media-reports.html',
          controller: 'MediaReportsCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    .state('root.about-us.link-us', {
      url: '/link-us',
      views: {
        'about-us-right': {
          templateUrl: 'views/about-us/link-us.html',
          controller: 'LinkUsCtrl',
          controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
        }
      }
    })
    /*------------------------------------------  safe  -----------------------------------------------*/
    .state('root.safe', {
      url: '/safe',
      views: {
        '': {
          templateUrl: 'views/safe.html',
          controller: 'SafeCtrl',
          controllerUrl: 'scripts/controller/safe-ctrl'
        },
        'sponsor': {
          templateUrl: 'views/project/project-sponsor-list.html',
          controller: 'GuaranteeListCtrl',
          controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
        }
      }
    })
    .state('root.safe-nav', {
      url: '/safe/:anchor',
      views: {
        '': {
          templateUrl: 'views/safe.html',
          controller: 'SafeCtrl',
          controllerUrl: 'scripts/controller/safe-ctrl'
        },
        'sponsor': {
          templateUrl: 'views/project/project-sponsor-list.html',
          controller: 'GuaranteeListCtrl',
          controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
        }
      }
    })
    /*------------------------------------------ help-center   -----------------------------------------------*/
    .state('root.help-center', {
      views: {
        'help-center-right': {
          templateUrl: 'views/help-center/help-center.html'
        },
        'help-sidebar': {
          templateUrl: 'views/help-center/help-sidebar.html',
          controller: 'HelpCenterCtrl',
          controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
        }
      }
    })
    .state('root.help-center.introduce', {
      url: '/introduce',
      views: {
        'help-center-right-show': {
          templateUrl: 'views/help-center/introduce.html'
        }
      }
    })
    .state('root.help-center.investors', {
      url: '/investors',
      views: {
        'help-center-right-show': {
          templateUrl: 'views/help-center/investors.html'
        }
      }
    })
    .state('root.help-center.account-management', {
      url: '/account-management',
      views: {
        'help-center-right-show': {
          templateUrl: 'views/help-center/account-management.html'
        }
      }
    })
    .state('root.help-center.safety-certification', {
      url: '/safety-certification',
      views: {
        'help-center-right-show': {
          templateUrl: 'views/help-center/safety-certification.html'
        }
      }
    })
    .state('root.help-center.law-and-policy-guarantee', {
      url: '/law-and-policy-guarantee',
      views: {
        'help-center-right-show': {
          templateUrl: 'views/help-center/law-and-policy-guarantee.html'
        }
      }
    })

  .state('root.about-us.news-details', {
    url: '/news-details',
    views: {
      'about-us-right': {
        templateUrl: 'views/about-us/news-details.html',
        controller: 'NewsCtrl',
        controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
      }
    }
  });

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
  var routespermission = ['/account-overview',
    '/user-center'
  ];
  $rootScope.alertRealName = function () {
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
    if ($rootScope.userType == 1 || $rootScope.userType == 7) {
      if (user && (!user.realName || !user.idCardNo || user.idCardNo.length < 18)) {
        return;
      }
    }
    $rootScope.msg = '1';
    $alert({
      scope: $rootScope,
      template: 'views/modal/alertYEEPAY.html',
      show: true
    });

    $rootScope.userType == 1 || $rootScope.userType == 7 ? window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/0') : window.open('/#!/righs-transfer/0/0/0');
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

  $rootScope.$on('$stateChangeStart', function() {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if ($location.path().split('/')[1] !== 'user-center') {
      return
    } else {  
      $checkSessionServer.error(function(response) {
        return;
      }).success(function(response) {
        if (response.ret !== -1 && response.data && response.data.userDetail !== '' && response.data.userDetail.user !== undefined && response.data.userDetail.user !== null) {
          $rootScope.loginName = response.data.name;
          $rootScope.userType = response.data.userType;
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

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
  'chartjs',
  'ngResource',
  'toaster',
  'ipCookie',
  'config',
  'angular-md5'
]);

hongcaiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
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
    /*------------------------------------------  user-center  -----------------------------------------------*/
    .state('root.userCenter', {
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
    /*---------------------------------------------  yeepay  ---------------------------------------------*/
    .state('root.userCenter.yeepay-callback', {
      url: '/yeepay-callback/:yeepayService/:yeepayStatus',
      views: {
        '': {
          templateUrl: 'views/user-center/yeepay-callback.html',
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

}]);

hongcaiApp.run(function($rootScope, $location, $http, DEFAULT_DOMAIN) {
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
    '/assets-overview',
    '/bankcard-management',
    '/security-settings',
    '/withdraw',
    '/recharge',
    '/invest-verify'
  ];
  $rootScope.$on('$stateChangeStart', function() {
    var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if (routespermission.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      $checkSessionServer.then(function(response) {
        if (response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.data.name;
          $rootScope.securityStatus = response.data.data.securityStatus;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
          $location.path('/login/');
        }
      });
    } else {
      $checkSessionServer.then(function(response) {
        if (response.data.data && response.data.data.name !== '' && response.data.data.name !== undefined && response.data.data.name !== null) {
          $rootScope.isLogged = true;
          $rootScope.loginName = response.data.data.name;
          $rootScope.securityStatus = response.data.data.securityStatus;
        } else {
          $rootScope.isLogged = false;
          $rootScope.loginName = '';
        }
      });
    }
  });
});

hongcaiApp.constant('DEFAULT_DOMAIN', '/enterprise/api/v1');

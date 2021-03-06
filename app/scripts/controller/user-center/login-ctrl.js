'use strict';
angular.module('hongcaiApp')
  .controller('LoginCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'LoginService', 'SessionService', 'ipCookie', 'toaster', 'md5', '$timeout', 'UserCenterService', function($scope, $state, $rootScope, $stateParams, LoginService, SessionService, ipCookie, toaster, md5, $timeout, UserCenterService) {
    // b端登录后没有首页展示，当判断用户已经登录，自动跳转个人中心
    // if ($rootScope.isLogged === true) {
    //   $state.go('root.userCenter.account-overview');
    // }
    $scope.goMain = function() {
      if ($rootScope.isLogged === true) {
        $state.go('root.userCenter.account-overview');
      } else {
        $state.go('root.login');
      }
    }

    // 从cookie中读取用户名
    if (ipCookie('bUserName')) {
      $scope.user = [];
      $scope.user.account = ipCookie('bUserName');
    }


    $scope.user ={
      type: 1
    }
    $scope.busy = false;
    $scope.login = function(user) {
      if($scope.busy){
          return;
      }
      $scope.busy = true;
      $timeout(function() {
        $scope.busy = false;
      }, 1000);
      //记住用户名处理
      if ($scope.rememberUserName) {
        ipCookie('bUserName', user.account, {
          expires: 60
        });
      }
      var md5Password = md5.createHash(user.password);
      LoginService.userLogin.get({
        account: user.account,
        password: md5Password,
        userType: $rootScope.userType,
        type: user.type
      }, function(response) {
        if (response.ret === 1) {
          // SessionService.destory('token');
          SessionService.set('user', response.data.user.name);
          $state.go('root.userCenter.account-overview');
          $rootScope.loginName = response.data.user.name;
          $rootScope.isLogged = true;
          toaster.pop('success', '恭喜您，登录成功！');
          // $rootScope.realNameAuthStatus !== 1 ? $rootScope.alertRealName() : null
          UserCenterService.userSecurityInfo.get({}, function(response) {
            if (response.ret === 1) {
              $rootScope.isPublicUser = (response.data.user.type == 2 || response.data.user.type == 8 || response.data.user.type == 9 || response.data.user.type == 10) ? true : null;
              response.data.userAuth.authStatus === 2 || (response.data.userAuth.authStatus === 1 && $rootScope.isPublicUser) ? null : $rootScope.alertRealName()
            }
          })
        } else {
          toaster.pop('error', response.msg);
        }
      });
    };

    $scope.pLogin = function(user) {

      //记住用户名处理
      if ($scope.rememberUserName) {
        ipCookie('bUserName', user.account, {
          expires: 60
        });
      }
      var md5Password = md5.createHash(user.password);
      LoginService.userLogin.get({
        account: user.account,
        password: md5Password,
        userType: 6,
        type: 1
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.userCenter.account-overview');
          $rootScope.loginName = response.data.user.name;
          $rootScope.isLogged = true;
          toaster.pop('success', '恭喜您，登录成功！');
        } else if (response.code === -1009) {
          toaster.pop('error', response.msg);
          $scope.isPasswordError = true;

        }
      });
    };

    $scope.$watch('user.password', function() {
      $scope.isPasswordError = false;
    });

    $scope.$watch('user.account', function() {
      $scope.isPasswordError = false;
    });

    $scope.logout = function() {
      SessionService.destory('user');
        $rootScope.loginName = '';
      $rootScope.isLogged = false;
    };
    $scope.islogged = function() {
      if (SessionService.get('user'))
        {return true;}
    };
  }]);

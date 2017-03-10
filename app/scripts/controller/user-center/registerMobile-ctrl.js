'use strict';
angular.module('hongcaiApp')
  .controller('registerMobileCtrl', ['$scope', 'checkPwdUtils', 'DEFAULT_DOMAIN', 'RegisterService', 'toaster', '$state', 'md5', '$timeout', function($scope, checkPwdUtils, DEFAULT_DOMAIN, RegisterService, toaster, $state, md5, $timeout) {
    $scope.business = 0;
    $scope.busy = false;
    $scope.register = function(user) {
      if ($scope.msg || !$scope.piccha) {
        return;
      }
      if($scope.busy){
        return;
      }
      $scope.busy = true;
      $timeout(function() {
        $scope.busy = false;
      }, 1000);
      RegisterService.saveRegister.save({
        mobile: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
      }, function(response) {
        if (response && response.ret === -1) {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMobile');
        } else {
          toaster.pop('success', '注册成功');
          $state.go('root.login');
        }
      });
    };

    //获取图形验证码
    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    //刷新图形验证码
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };
  
    //监测密码
    $scope.$watch('user.password', function(newVal) {
      if (!newVal) {
        return;
      }
      //调用checkPwdUtils，判断密码是否含非法字符
      $scope.msg = checkPwdUtils.showPwd1(newVal) || checkPwdUtils.showPwd2(newVal);

    })


    
  }]);

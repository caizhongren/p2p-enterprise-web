'use strict';
angular.module('hongcaiApp')
  .controller('SecuritySettingsCtrl', function(toaster, $scope, $state, $rootScope, $stateParams, UserCenterService, config, md5, $alert, DEFAULT_DOMAIN) {
    $scope.business = 2;
    var userAuth = {};
    $rootScope.selectSide = 'security-settings';
    $scope.cancelUserAuthorization = function () {
      UserCenterService.cancelUserAuthorization.post({
        userId: 0,
        device: 0
      }, function(response) {
        if (response && response.ret !== -1) {
          toaster.pop('success', '已成功取消自动还款授权');
          $state.reload();
        } else {
          toaster.pop('warning', response.msg)
        }
      })
    }
    UserCenterService.userSecurityInfo.get({}, function(response) {
      if (response.ret === 1) {
        userAuth = response.data.userAuth;
        $scope.user = response.data.user;
        $scope.email = $scope.user.email;
        $scope.mobile = $scope.user.mobile;
        // $scope.realName = userAuth.realName;
        // $scope.idNo = userAuth.idNo;
        $scope.openTrustReservation = userAuth.autoTransfer;  //自动投标
        $scope.openAutoRepayment = userAuth.autoRepayment;  //自动还款

        if (userAuth && userAuth.authStatus === 2) {
          $scope.haveTrusteeshipAccount = true;
        } else {
          $scope.haveTrusteeshipAccount = false;
        }

      } else {
        console.log('ask security-settings, why userSecurityInfo did not load data...');
      }
    });

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.bindMobile = function(mobileNo, mobileCaptcha) {
      UserCenterService.bindMobile.get({
        mobile: mobileNo,
        captcha: mobileCaptcha,
        userType: $scope.user.type,
        business: 2

      }, function(response) {
        if (response.ret === 1) {
          $scope.mobile = mobileNo.substr(0, 3) + '****' + mobileNo.substr(7, 11);
          $scope.changeMobile = false;
          $scope.user.mobile = null;
          $scope.mobileCaptcha = null;
          $rootScope.securityStatus.mobileStatus = 1;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.bindEmail = function(email) {
      UserCenterService.bindEmail.get({
        email: email
      }, function(response) {
        if (response.ret === 1) {
          $scope.msg = '操作成功';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
          $scope.email = email.substr(0, 2) + '****' + email.substr(email.indexOf('@'));
          $scope.changeEmail = false;
          $scope.newEmail = null;
          $rootScope.securityStatus.emailStatus = 1;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.checkTwoPassword = function(password) {
      if (password) {
        if (password.repeatNewPassword !== password.newPassword) {
          return false;
        } else {
          return true;
        }
      }
    };

    var md5Password = function(password) {
      return md5.createHash(password);
    };
    $scope.changePassword = function(password) {
      if (password.repeatNewPassword !== password.newPassword) {
        return;
      }
      UserCenterService.changePassword.get({
        oldPassword: md5Password(password.oldPassword),
        newPassword: md5Password(password.newPassword),
        repeatNewPassword: md5Password(password.repeatNewPassword)
      }, function(response) {
        if (response.ret === 1) {
          $scope.changPwd = false;
          $scope.password = null;
          $state.reload()
        // } else if (response.ret === -1) {
        //   if (response.code === -1021) {
        //     $scope.isOldPasswordTrue = false;
        //   }
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    // 检查是否绑定邮箱和手机号码
    $scope.gotoOpen = function() {
      if (!$rootScope.checkEmailAndMobile($scope.email, $scope.mobile)) {
        $scope.openTrusteeshipAccount = false;
      }
    }

    //检查请是否开通第三方托管账户
    $scope.checkRealNameAuth = function() {
      if (userAuth && userAuth.authStatus !== 2) {
        $scope.msg = '请先开通第三方托管账户';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
        return false;
      }
      return true;
    };

    $scope.reload = function() {
      window.location.reload();
    };


    $scope.openReservation = function() {
      $scope.msg = '6';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      var user = {
        'realName' : 'default',
        'idCardNo' : 'default'
      };
      window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/1');
    };

    //开通自动投标、自动债权转让
    $scope.goToTrustReservation = function() {
      if (!$scope.checkRealNameAuth()) { //检查请是否开通第三方托管账户
        return;
      }
      $scope.msg = '10';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      var user = {
        'realName' : 'default',
        'idCardNo' : 'default'
      };
      window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/1');
    }
    //开通自动还款
    $scope.goToAutoRepayment = function() {
      if (!$scope.checkRealNameAuth()) { //检查请是否开通第三方托管账户
        return;
      }
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

    $scope.enterpriseRegister = function(){
      window.open('/#!/righs-transfer/0/0/3');
    }
  });

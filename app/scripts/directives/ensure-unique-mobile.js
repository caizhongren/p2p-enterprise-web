/*
 * @Author: yuyang
 * @Date:   2017-02-23 14:13:07
 * @Funnction 校验手机号码是否存在
 */
'use strict';
angular.module('hongcaiApp').directive('ensureUniqueMobile', ['$http', 'DEFAULT_DOMAIN' , '$location', function($http, DEFAULT_DOMAIN, $location) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      //注册时校验手机号码是否存在 参数userType 账户类型  0:投资用户  1:企业对私账户  2: 企业对公账户 3:借款个人  4:宏金盈资金账户  5:宏金盈资产账户
      if ($location.path().split('/')[1] == 'registerMobile'){
        var userType = '&userType=1';
      }else {
        userType = '';
      }
      scope.$watch(attrs.ngModel, function() {
        var mobile = angular.element('#' + attrs.ensureUniqueMobile).val();
        if (mobile !== '') {
          $http({
            method: 'POST',
            url: DEFAULT_DOMAIN + '/siteUser/isUniqueMobile?mobile=' + mobile + userType
          }).success(function(data) {
            if (data.data.isUnique === 0) {
              ctrl.$setValidity('unique', true);
            } else if (data.data.isUnique === 1) {
              ctrl.$setValidity('unique', false);
            }
          }).error(function() {
            ctrl.$setValidity('unique', false);
          });
        }
      });
    }
  };
}]);

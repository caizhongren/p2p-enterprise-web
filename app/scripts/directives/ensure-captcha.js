/*
 * @Author: yuyang
 * @Date:   2017-02-23 14:13:07
 * @Funnction 检验图形验证码是否正确
 */

'use strict';
angular.module('hongcaiApp').directive('ensureCaptcha', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var captcha = angular.element('#' + attrs.ensureCaptcha).val();
        if(!captcha || captcha.length !== 4 ){
          ctrl.$setValidity('check', false);
          scope.piccha = false;
          return;
        }

        $http({
          method: 'POST',
          url: DEFAULT_DOMAIN + '/siteUser/checkPicCaptcha?captcha=' + captcha
        }).success(function(data) {
          if(data.ret === 1) {
            ctrl.$setValidity('check', true);
            scope.piccha = true;
            return true;
          } else {
            ctrl.$setValidity('check', false);
            scope.piccha = false;
            return false;
          }
        }).error(function() {
          ctrl.$setValidity('check', false);
          scope.piccha = false;
          return false;
        });
      });
    }
  };
}]);

'use strict';
angular.module('hongcaiApp').directive('checkPhone', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var phone = angular.element('#' + attrs.checkPhone).val();
        if (phone !== '') {
          $http({
            method: 'POST',
            url: DEFAULT_DOMAIN + '/siteUser/findAccount?account=' + phone
          }).success(function(data) {
            if (data.data.user) {
              console.log(data.data.user);
              scope.usermessage = data.data.user;
              ctrl.$setValidity('unique', true);
            } else if (!data.data.user) {
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

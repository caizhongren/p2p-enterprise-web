'use strict';
angular.module('hongcaiApp').directive('checkEmail', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var email = angular.element('#' + attrs.checkEmail).val();
        if (email !== '') {
          $http({
            method: 'POST',
            url: DEFAULT_DOMAIN + '/siteUser/findAccount?account=' + email
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

/* 检验密码是否正确*/
'use strict';
angular.module('hongcaiApp').directive('checkPassword', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function() {
				var password = angular.element('#' + attrs.checkPassword).val();
				if(password !== '') {
					$http({
						method: 'POST',
						url: DEFAULT_DOMAIN + '/siteUser/checkPassword?password=' + password
					}).success(function(response) {
						if(response.data.isTrue === 1) {
							ctrl.$setValidity('isPasswordTrue', true);
						} else if(response.data.isTrue === 0) {
							ctrl.$setValidity('isPasswordTrue', false);
						}
					}).error(function() {
						ctrl.$setValidity('isPasswordTrue', false);
					});
				}
			});
		}
	};
}]);
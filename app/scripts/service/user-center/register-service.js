'use strict';
angular.module('hongcaiApp')
  .factory('RegisterService', function($resource, RESTFUL_DOMAIN) {
    return {
      saveRegister: $resource(RESTFUL_DOMAIN + '/enterpriseUsers/register', {},{
      	save: {
	      method: 'POST',
	      params: {
	        mobile: '@mobile',
	        password: '@password',
	        picCaptcha: '@picCaptcha'
	      }
	    }
      })
    };
  });

'use strict';
angular.module('hongcaiApp')
  .factory('EnterpriseService', function($resource, $location, DEFAULT_DOMAIN) {
    return {
      getEnterpriseFiles: $resource(DEFAULT_DOMAIN + '/adminEnterprise/getEnterpriseFiles', {enterpriseId:'@enterpriseId'}),
      saveEnterprise: $resource(DEFAULT_DOMAIN + '/adminEnterprise/saveEnterprise', {}, {
        save: {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
      }),
      
    };
  });

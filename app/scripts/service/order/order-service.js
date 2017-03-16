
'use strict';
angular.module('hongcaiApp')
  .factory('OrderService', function($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      //下单成功
      transferAssignment: $resource(RESTFUL_DOMAIN + '/orders/:number/users/0/payment', {
        number: '@number'
      }, {
        'POST': {
          method: 'POST'
        }
      }),
    };
  });

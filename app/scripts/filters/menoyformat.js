'use strict';

/**
 * @ngdoc filter
 * @name p2pEnterpriseWebApp.filter:menoyFormat
 * @function
 * @description
 * # menoyFormat
 * Filter in the p2pEnterpriseWebApp.
 */
angular.module('hongcaiApp')
  .filter('menoyFormat', function () {
    return function (input, formatNo) {
      input = input || '';
      if(input.length > formatNo ){
        return (input/10000).toString() + '万';
      } else {
        return;
      }
    };
  });

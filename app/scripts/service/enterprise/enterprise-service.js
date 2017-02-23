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
      deleteFile: $resource(DEFAULT_DOMAIN + '/adminUploadFile/deleteFile', {}, {
        delete: {method: "POST",params: {
             categoryId:'@categoryId',
             category: '@category', 
             thumbnailFileId: '@thumbnailFileId', 
             thumbnailFileUrl: '@thumbnailFileUrl',
             originalFileId: '@originalFileId' ,
             originalFileUrl: '@originalFileUrl'
          }}
      }),

    };
  });

'use strict';
angular.module('hongcaiApp')
  .factory('EnterpriseService', function($resource, $location, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      getEnterpriseFiles: $resource(DEFAULT_DOMAIN + '/adminEnterprise/getEnterpriseFiles', {enterpriseId:'@enterpriseId'}),
      saveEnterprise: $resource(RESTFUL_DOMAIN + '/enterprises/',{}, {
        update: {
            method: "PUT",
            // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {
              userId: '@userId',
              name: '@name',
              legalName: '@legalName',
              legalIdNo: '@legalIdNo',
              legalRepresentative: '@legalRepresentative',
              bankLicense: '@bankLicense',
              registrationNo: '@registrationNo',
              orgNo: '@orgNo',
              taxNo: '@taxNo',
              registerCapital: "@registerCapital",
              background: '@background',
              businessScope: '@businessScope',
              businessState: '@businessState',
              address: '@address',
              contactName: '@contactName',
              contactMobile: '@contactMobile',
              contactEmail: '@contactEmail',
              registerDate: '@registerDate'
            }
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
      getEnterprise: $resource(RESTFUL_DOMAIN + '/enterprises/', {userId:'@userId'}),

    };
  });

'use strict';
angular.module('hongcaiApp')
  .factory('EnterpriseService', function($resource, $location, RESTFUL_DOMAIN) {
    return {
      //查询用户已上传的文件
      getEnterpriseFiles: $resource(RESTFUL_DOMAIN + '/enterprises/1/enterpriseFiles', {enterpriseId:'@enterpriseId'}),

      //保存信息
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

      //删除文件
      deleteFile: $resource(RESTFUL_DOMAIN + '/enterprises/deleteFile', {}, {
        update: {method: "PUT",params: {
             category: '@category', 
             thumbnailFileId: '@thumbnailFileId', 
             thumbnailFileUrl: '@thumbnailFileUrl',
             originalFileId: '@originalFileId' ,
             originalFileUrl: '@originalFileUrl'
          }}
      }),

      //上传文件
      uploadFile: $resource(RESTFUL_DOMAIN + '/enterprises/uploadFile', {}, {
          save: {
          method: 'POST',
          params: {
             category: '@category',
             categoryId: '@categoryId',
             fileType: '@fileType',
             archiveType: '@archiveType',
             description: '@description'
          }
        }
      }),

      //获取用户信息
      getEnterprise: $resource(RESTFUL_DOMAIN + '/enterprises/', {userId:'@userId'}),

      

    };
  });

      
'use strict';
angular.module('hongcaiApp')
  .factory('EnterpriseService', function($resource, $location, RESTFUL_DOMAIN) {
    return {
      //查询用户已上传的文件
      getEnterpriseFiles: $resource(RESTFUL_DOMAIN + '/enterprises/0/enterpriseFiles', {enterpriseId:'@enterpriseId'}),

      //保存信息
      saveEnterprise: $resource(RESTFUL_DOMAIN + '/enterprises/',null, {
        'update': {
            method: "PUT",
            // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
              userId: '@userId',
              name: '@name',
              legalName: '@legalName',
              legalIdNo: '@legalIdNo',
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
              registerDate: '@registerDate',
              legalIdType: '@legalIdType',
              cultureLevel: '@cultureLevel',
              maritalStatus: '@maritalStatus',
              idRegisterAddress: '@idRegisterAddress',
              industry: '@industry',
              workingDuration: '@workingDuration',
              mailingAddress: '@mailingAddress',
              phoneNumber: '@phoneNumber',
              unifiedCode: '@unifiedCode',
              enterpriseProperty: '@enterpriseProperty',
              keep: '@keep'
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
      uploadFile: $resource(RESTFUL_DOMAIN + '/enterpri ses/uploadFile', {}, {
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

      //法大大平台签约
      contract: $resource(RESTFUL_DOMAIN + '/enterprises/contract/:preProjectId', {
        preProjectId: '@preProjectId',
        token: '@token'
      }, {
        'post': {
          method: 'POST'
        }
      }),

      //法大大签章成功
      contractSuccess: $resource(RESTFUL_DOMAIN + '/enterprises/contract/:preProjectId', {}, {
        update: {
          method: 'PUT',
          params: {
            preProjectId: '@preProjectId'
          }
        }
      })

    };
  });

      
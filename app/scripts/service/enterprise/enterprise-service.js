'use strict';
angular.module('hongcaiApp')
  .factory('EnterpriseService', function($resource, $location, RESTFUL_DOMAIN) {
    return {
      //查询用户已上传的文件
      getEnterpriseFiles: $resource(RESTFUL_DOMAIN + '/enterprises/0/enterpriseFiles', {enterpriseId:'@enterpriseId'}),

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

      //居间人 账户总览
      getEnterpriseProjects: $resource(RESTFUL_DOMAIN + '/enterprise/enterpriseUsers/intermediaryAccountStat', {userId:'@userId'}),

      //居间人&借款方 审核中的项目
      getEnterpriseProjects: $resource(RESTFUL_DOMAIN + '/enterprise/enterpriseProjects/preProjects', {
        userId:'@userId',
        page: '@page',
        pageSize: '@pageSize',
        status: '@status'
      }),

      //居间人 待投资、还款完成 && 借款方 募集中\还款中\已结清的项目：
      getEnterpriseProjects: $resource(RESTFUL_DOMAIN + '/enterprise/enterpriseProjects/projects', {
        userId:'@userId',
        type: '@tyoe',
        page: '@page',
        pageSize: '@pageSize',
        status: '@status'
      }),

    };
  });

      
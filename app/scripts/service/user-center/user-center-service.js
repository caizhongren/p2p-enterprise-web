'use strict';
angular.module('hongcaiApp')
  .factory('UserCenterService', function($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
      yeepayRegister: $resource(RESTFUL_DOMAIN + '/users/0/yeepayRegister', {
        realName: '@realName',
        idNo: '@idNo'
      }, {
        'post':   {method:'POST'}
      }),
      yeepayEnterpriseRegister: $resource(DEFAULT_DOMAIN + '/enterpriseYeepay/enterpriseRegister', {
      }),
      yeepayRecharge: $resource(DEFAULT_DOMAIN + '/yeepay/recharge', {
        amount: '@amount'
      }),
      yeepayWithdraw: $resource(DEFAULT_DOMAIN + '/yeepay/withdraw', {
        amount: '@amount'
      }),
      bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
      unbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/unbindBankCard', {}),
      getUserAccount: $resource(DEFAULT_DOMAIN + '/siteAccount/userAccount'),
      getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserAvailableCash'),
      getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
      getOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
      getUserBalance: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserBalance'),
      sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/mobileCaptcha', {
        mobile: '@mobile',
        picCaptcha: '@picCaptcha'
      }),
      bindMobile: $resource(DEFAULT_DOMAIN + '/siteUser/bindMobile', {
        mobile: '@mobile',
        captcha: '@captcha'
      }),
      bindEmail: $resource(DEFAULT_DOMAIN + '/siteUser/bindEmail', {
        email: '@email'
      }),
      changePassword: $resource(DEFAULT_DOMAIN + '/siteUser/changePassword', {
        oldPassword: '@oldPassword',
        newPassword: '@newPassword',
        repeatNewPassword: '@repeatNewPassword'
      }),
      getUserBankCard: $resource(DEFAULT_DOMAIN + '/bank/getUserBankCard', {}),
      statisticsByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/statisticsByUser', {
        orderId: '@orderId'
      }),
      repayment: $resource(DEFAULT_DOMAIN + '/enterpriseYeepay/repayment', {
        projectId: '@projectId'
      }),
      getProjectByStatus: $resource(DEFAULT_DOMAIN + '/enterpriseProject/getProjectByStatus', {
        status: '@status'
      }),
      infoVerify: $resource(DEFAULT_DOMAIN + '/siteUser/infoVerify', {
        account: '@account',
        mobile: '@mobile',
        email: '$email'
      }),
      checkMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha', {
        mobile: '@mobile',
        captcha: '@captcha'
      }),
      resetMobilePassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetMobilePassword', {
        mobile: '@mobile',
        captcha: '@captcha',
        password: '@password'
      }),
      sendResetPwdEmail: $resource(DEFAULT_DOMAIN + '/siteUser/sendResetPwdEmail', {
        email: '@email'
      }),
      resetEmailPassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetEmailPassword', {
        uuid: '@uuid',
        etoken: '@etoken',
        password: '@password'
      }),
      getDealListByUser: $resource(DEFAULT_DOMAIN + '/siteUser/getDealListByUser', {
        dateInterval: '@dateInterval',
        type: '@type'
      }),
      getEnterpriseUserInfo: $resource(DEFAULT_DOMAIN + '/enterpriseUser/getEnterpriseUserInfo', {}),
      repaymentFundsProject: $resource(DEFAULT_DOMAIN + '/enterpriseFunds/repaymentFundsProject', {
        projectId: '@projectId'
      }),
      earlyRepaymentFundsProject: $resource(DEFAULT_DOMAIN + '/enterpriseFunds/earlyRepaymentFundsProject', {
        projectId: '@projectId'
      }),
      getFundsProjectByStatus: $resource(DEFAULT_DOMAIN + '/enterpriseFunds/getFundsProjectByStatus', {
      }),
      transferToPlatform: $resource(DEFAULT_DOMAIN + '/yeepay/transferToPlatform', {
        amount: '@amount'
      }),
      authorizeFundsProjectAutoRepayment: $resource(DEFAULT_DOMAIN + '/enterpriseFunds/authorizeAutoRepayment', {
        projectId: '@projectId'
      }),
      getNeedAuthorizeAutoRepaymentFundsProjectList: $resource(DEFAULT_DOMAIN + '/enterpriseFunds/getNeedAuthorizeAutoRepaymentFundsProjectList', {}),
      cgtActive: $resource(RESTFUL_DOMAIN + '/userAuths/cgtActive', {}, {
        'active':   {method:'POST'}
      }),
      getFundsUserAccount: $resource(DEFAULT_DOMAIN + '/enterpriseUser/getFundsUserAccount', {})
    };
  });

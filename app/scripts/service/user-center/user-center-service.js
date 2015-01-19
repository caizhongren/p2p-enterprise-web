'use strict';
hongcaiApp.factory('UserCenterService', function($resource, DEFAULT_DOMAIN) {
  return {
    userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
    yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {
      realName: '@realName',
      idNo: '@idNo'
    }),
    yeepayRecharge: $resource(DEFAULT_DOMAIN + '/yeepay/recharge', {
      amount: '@amount'
    }),
    yeepayWithdraw: $resource(DEFAULT_DOMAIN + '/yeepay/withdraw', {
      amount: '@amount'
    }),
    bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
    getUserCapital: $resource(DEFAULT_DOMAIN + '/siteUser/getUserCapitalById'),
    getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserAvailableCash'),
    getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
    getOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
    getUserBalance: $resource(DEFAULT_DOMAIN + '/siteUserCapital/getUserBalance'),
    sendMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/sendMobileCaptcha', {
      mobile: '@mobile'
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
    getEnterpriseUserInfo: $resource(DEFAULT_DOMAIN + '/enterpriseUser/getEnterpriseUserInfo', {}),
  };
});

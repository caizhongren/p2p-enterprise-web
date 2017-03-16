/*
 * @Author: yuyang
 * @Date:   2017-02-23 14:13:07
 * @Funnction 校验注册密码是否合法
 */

'use strict';
angular.module('hongcaiApp')
  .factory('checkPwdUtils', function($rootScope) {
    var pwdIllegal_regexp = /^[^~!@#$%^&*]+$/;
    var pwd_regexp1 = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
    return {
      showPwd1: function(newVal) {
        var msg = '';
        if (!pwdIllegal_regexp.test(newVal)) {
          msg = '密码含非法字符';
        } else if (newVal.length > 16) {
          msg = '密码6-16位，需包含字母和数字';
        }
        return msg;
      },
      showPwd2: function(newVal) {
        var msg = '';
        if (!pwdIllegal_regexp.test(newVal)) {
          msg = '密码含非法字符';
        } else if (!pwd_regexp1.test(newVal)) {
          msg = '密码6-16位，需包含字母和数字';
        }
        return msg;
      }
    }

  })
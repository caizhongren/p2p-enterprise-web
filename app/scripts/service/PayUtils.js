'use strict';
angular.module('hongcaiApp')
  .factory('PayUtils', function($rootScope, config) {
    return {

      newForm: function() {
        var f = document.createElement('form');
        document.body.appendChild(f);
        f.method = 'post';
        // f.target = '_blank';
        return f;
      },

      newFormGet: function() {
        var f = document.createElement('form');
        document.body.appendChild(f);
        f.method = 'get';
        f.target = '_blank';
        return f;
      },

      createElements: function(eForm, eName, eValue) {
        var e = document.createElement('input');
        eForm.appendChild(e);
        e.type = 'text';
        e.name = eName;
        if (!document.all) {
          e.style.display = 'none';
        } else {
          e.style.display = 'block';
          e.style.width = '0px';
          e.style.height = '0px';
        }
        e.value = eValue;
        return e;
      },

      /**
       * 跳转到托管方
       */
      redToTrusteeship: function(business, encrpyMsg){
        if (encrpyMsg && encrpyMsg.ret !== -1) {

          if(config.pay_company === 'yeepay'){
            var req = encrpyMsg.req;
            var sign = encrpyMsg.sign;
            var _f = this.newForm();
            this.createElements(_f, 'req', req);
            this.createElements(_f, 'sign', sign);
            _f.action = config.YEEPAY_ADDRESS + business;
            _f.submit();
          } else if (config.pay_company === 'cgt'){
            var serviceName = encrpyMsg.serviceName;
            var platformNo = encrpyMsg.platformNo;
            var userDevice = encrpyMsg.userDevice;
            var reqData = encrpyMsg.reqData;
            var keySerial = encrpyMsg.keySerial;
            var sign = encrpyMsg.sign;
            var _f = this.newForm();
            this.createElements(_f, 'serviceName', serviceName);
            this.createElements(_f, 'platformNo', platformNo);
            this.createElements(_f, 'userDevice', userDevice);
            this.createElements(_f, 'reqData', reqData);
            this.createElements(_f, 'keySerial', keySerial);
            this.createElements(_f, 'sign', sign);
            _f.action = config.CGT_ADDRESS;
            _f.submit();
          }
        } else {
          alert(encrpyMsg.msg);
        }
      },

      /**
       * 跳转到法大大
       */
      redToFdd: function(preProjectId, encrpyMsg){
        var _f = this.newFormGet();
        this.createElements(_f, 'app_id', encrpyMsg.app_id);
        this.createElements(_f, 'timestamp', encrpyMsg.timestamp);
        this.createElements(_f, 'batch_id', encrpyMsg.batch_id);
        this.createElements(_f, 'sign_data', JSON.stringify(encrpyMsg.sign_data));
        this.createElements(_f, 'customer_id', encrpyMsg.customer_id);
        this.createElements(_f, 'batch_title', encrpyMsg.batch_title);
        this.createElements(_f, 'msg_digest', encrpyMsg.msg_digest);
        this.createElements(_f, 'notify_url', encrpyMsg.notify_url);
        this.createElements(_f, 'return_url', config.domain + '/fdd-success/' + preProjectId);
        _f.action = encodeURI(config.FDD_ADDRESS);
        _f.submit();
      }

    };
  });

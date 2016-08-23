'use strict';
angular.module('hongcaiApp')
  .controller('UserCenterCtrl', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, PayUtils) {
    $scope.selectedDate = '2014-10-16T08:50:36.394Z'; // <- [object Date]
    $scope.selectedDateAsNumber = 509414400000; // <- [object Number]
    $scope.fromDate = new Date(2014, 9, 20);
    $scope.untilDate = new Date(2014, 10, 7);

    $scope.fromDateChanged = function() {
      $location.path('userCenter-investment/6');

    };

    $scope.untilDateChanged = function() {
      $location.path('userCenter-investment/6');

    };

    $scope.timestamp = new Date();
    var welcomeTime = $scope.timestamp.getHours();
    if (welcomeTime > 5 && welcomeTime < 9) {
      $scope.welcomeTip = '早安~';
    } else if (welcomeTime >= 9 && welcomeTime <= 11) {
      $scope.welcomeTip = '上午好~';
    } else if (welcomeTime >= 12 && welcomeTime <= 14) {
      $scope.welcomeTip = '中午好~';
    } else if (welcomeTime >= 15 && welcomeTime <= 18) {
      $scope.welcomeTip = '下午好~';
    } else {
      $scope.welcomeTip = '晚安~';
    }

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };



    $scope.bindBankCard = function() {
      UserCenterService.bindBankCard.get({}, function(response) {
        if (response && response.ret !== -1) {

          PayUtils.redToTrusteeship('toBindBankCard', response);

        } else {

        }
      });
    };

  });

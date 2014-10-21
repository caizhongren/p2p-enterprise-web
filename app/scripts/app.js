'use strict';
/**
 * @ngdoc overview
 * @name hongcaiApp
 * @description
 * #
 * 宏财JS库依赖以及程序路由主配置文件
 */
 var hongcaiApp = angular.module('hongcaiApp', [
 	'ngAnimate', 
 	'ngSanitize', 
 	'mgcrea.ngStrap', 
 	'ui.router',
 	'ngResource' 
 	]);

 hongcaiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
 	$stateProvider
 	.state('root', {
 		abstract: true,
 		views: {
 			'': {
 				templateUrl: 'views/root.html'
 			},
 			'header': {
 				templateUrl: 'views/header.html',
 				controller: 'LoginCtrl',
 				controllerUrl: 'scripts/controller/user-center/login-ctrl'
 			},
 			'footer': {
 				templateUrl: 'views/footer.html'
 			}
 		}
 	})
 	.state('root.main', {
 		url: '/',
 		views: {
 			'': {
 				templateUrl: 'views/main.html',
 				controller: 'MainCtrl',
 				controllerUrl: 'scripts/controller/main/main-ctrl'
 			},
 			'slider': {
 				templateUrl: 'views/slider.html'
 			},
 			'sponsor': {
 				templateUrl: 'views/project/project-sponsor-list.html'
 			}
 		}
 	})
 	.state('root.login', {
 		url: '/login',
 		views: {
 			'': {
 				templateUrl: 'views/login.html',
 				controller: 'LoginCtrl',
 				controllerUrl: 'scripts/controller/user-center/login-ctrl'
 			}
 		}
 	})
 	.state('root.registerMobile', {
 		url: '/register-mobile',
 		views: {
 			'': {
 				templateUrl: 'views/register/register-mobile.html', 
 				controller: 'RegisterMobileCtrl', 
 				controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
 			}
 		}
 	})
 	.state('root.registerMail', {
 		url: '/register-mail',
 		views: {
 			'': {
 				templateUrl: 'views/register/register-mail.html', 
 				controller: 'RegisterMailCtrl', 
 				controllerUrl: 'scripts/controller/register/register-mail-ctrl'
 			}
 		}
 	})
 	;

 	$urlRouterProvider.otherwise('/');
 	$locationProvider.html5Mode(true);
 	$locationProvider.hashPrefix('!');

 }]);

hongcaiApp.constant('DEFAULT_DOMAIN', "/enterprise/api/v1");


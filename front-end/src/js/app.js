
require("./vendor/angular-sanitize.min.js");
require("./vendor/angular-ui-router.min.js");
require("./controllers/mainCtrl.js");
require("./controllers/homeCtrl.js");
require("./controllers/activityCtrl.js");
require("./controllers/storeCtrl.js");
require("./controllers/chooseCtrl.js");
require("./controllers/styleCtrl.js");
require("./controllers/couponCtrl.js");

var App = angular.module('App', [
    'ui.router', 'ngSanitize', 'mainCtrls', 'homeCtrls', 'activityCtrls', 'storeCtrls', 'chooseCtrls', 'styleCtrls', 'couponCtrls'
]);

App.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.isCoupon = false;

        $rootScope.appID = '1112923508759171'; //正式  
        $rootScope.url = "http://www.gaptaiwan.com.tw/longlivesummer/"; //正式 
    }   
]);

App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) {
        $sceProvider.enabled(false);
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('gap', {
                url: '',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'template/main.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            //首頁 index
            .state('gap.home', {
                url: '/',
                templateUrl: 'template/home.html',
                controller: 'homeCtrl'
            })
            //活動辦法
            .state('gap.activity', {
                url: '/activity',
                templateUrl: 'template/activity.html',
                controller: 'activityCtrl'
            })
            //門市資訊
            .state('gap.store', {
                url: '/store',
                templateUrl: 'template/store.html',
                controller: 'storeCtrl'
            })
            //4種個風格
            .state('gap.choose', {
                url: '/choose',
                // abstract: true,
                views: {
                    '': {
                        templateUrl: 'template/choose.html',
                        controller: 'chooseCtrl'
                    }
                }
            })
            .state('gap.chill', {
                url: '/chill',
                templateUrl: 'template/chill.html',
                controller: 'styleCtrl'
            })
            .state('gap.vibrant', {
                url: '/vibrant',
                templateUrl: 'template/vibrant.html',
                controller: 'styleCtrl'
            })
            .state('gap.lively', {
                url: '/lively',
                templateUrl: 'template/lively.html',
                controller: 'styleCtrl'
            })
            .state('gap.carefree', {
                url: '/carefree',
                templateUrl: 'template/carefree.html',
                controller: 'styleCtrl'
            })
            //download coupon
            .state('gap.coupon', {
                url: '/coupon',
                templateUrl: 'template/coupon.html',
                controller: 'couponCtrl'
            })

    }
])

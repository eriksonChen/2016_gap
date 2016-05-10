var storeCtrls = angular.module('storeCtrls', []);

storeCtrls.controller('storeCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout', '$http',
    function($scope, $state, $stateParams, $rootScope, $timeout, $http) {
    	$('html, body').scrollTop(0);

        $scope.closeBtn = function(){
            $state.go('gap.home');
        }

        $scope.backBtn = function(){
            $state.go('gap.home');
        }

        $scope.add1 = function(){
        	console.log('add1');
        	$('.store').animate({
                scrollTop: $('.add1').offset().top - 20
            }, 500);
        }

        $scope.add2 = function(){
        	$('.store').animate({
                scrollTop: $('.add2').offset().top - 20
            }, 500);
        }

        gapage('m_stores_stores');
    }
]);
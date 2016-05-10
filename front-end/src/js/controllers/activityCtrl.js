var activityCtrls = angular.module('activityCtrls', []);

activityCtrls.controller('activityCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout', '$http',
    function($scope, $state, $stateParams, $rootScope, $timeout, $http) {
        $('html, body').scrollTop(0);
        $scope.closeBtn = function(){
        	$state.go('gap.home');
        }

        $scope.backBtn = function(){
        	$state.go('gap.home');
        }

        gapage('m_regulations_regulations');

    }
]);

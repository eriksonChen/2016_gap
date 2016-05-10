var chooseCtrls = angular.module('chooseCtrls', []);

chooseCtrls.controller('chooseCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout',
    function($scope, $state, $stateParams, $rootScope, $timeout) {
        $('.wrap').css('display', 'none');
        $('.wrap').fadeIn();
        $scope.chillBtn = function(){
        	$state.go('gap.chill');
            gaclick('m_click_game_');
        }

        $scope.vibrantBtn = function(){
        	$state.go('gap.vibrant');
            gaclick('m_click_game_vibrant');
        }

        $scope.livelyBtn = function(){
        	$state.go('gap.lively');
            gaclick('m_click_game_lively');
        }

        $scope.carefreeBtn = function(){
        	$state.go('gap.carefree');
            gaclick('m_click_game_carefree');
        }

        gapage('m_game-1_topic');

    }
]);

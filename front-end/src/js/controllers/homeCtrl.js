var homeCtrls = angular.module('homeCtrls', []);

homeCtrls.controller('homeCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout', '$http',
    function($scope, $state, $stateParams, $rootScope, $timeout, $http) {
        $('.wrap').css('display', 'none');
        $('.wrap').fadeIn();

        $scope.activityBtn = function() {
            $state.go('gap.activity');
            gaclick('m_meun_regulations');
        }

        $scope.storeBtn = function() {
            $state.go('gap.store');
            gaclick('m_meun_stores');
        }

        $scope.chooseBtn = function() {
            $state.go('gap.choose');
            gaclick('m_click_game_index');
        }

        gapage('m_game-0_index');

    }
]);

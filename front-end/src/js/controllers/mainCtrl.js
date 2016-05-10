var mainCtrls = angular.module('mainCtrls', []);

mainCtrls.controller('mainCtrl', ['$scope', '$state', '$rootScope', '$timeout',
    function($scope, $state, $rootScope, $timeout) {
        $('.loading').delay(1000).fadeOut();

        var num = Math.floor(Math.random() * 10);


        if (num < 2) {
            $scope.dollar = '75';
        } else if (num >= 2 && num < 5) {
            $scope.dollar = '50';
        } else {
            $scope.dollar = '25';
        }

        $scope.logoBtn = function() {
            $state.go('gap.home');
        }

        $scope.closePop = function() {
            $('.pop_cont').fadeOut('fast');
        }

        $scope.getCoupon = function() {
            $('.pop_cont').fadeOut('fast');
            $rootScope.isCoupon = true;
            $state.go('gap.coupon');
        }

        $scope.checkOrientation = function() {
            var mode = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
            if (mode === 'landscape') {
                $('.turn').css('display', 'block');
            } else {
                $('.turn').css('display', 'none');
            }
        };
        window.addEventListener("resize", $scope.checkOrientation, false);
        window.addEventListener("orientationchange", $scope.checkOrientation, false);
        $scope.checkOrientation();

    }
]);

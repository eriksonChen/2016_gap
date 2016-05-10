var styleCtrls = angular.module('styleCtrls', []);

styleCtrls.controller('styleCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout',
    function($scope, $state, $stateParams, $rootScope, $timeout) {
        var page = 0,
            wait = false,
            sw = $(window).width(),
            pageName = $state.$current.name,
            day1 = $('.day').eq(0),
            day2 = $('.day').eq(1);

        $('.page_cont').css('width', sw * 5 + 'px');
        $('.page_cont .chill, .page_cont .lively, .page_cont .vibrant, .page_cont .carefree').css('width', sw + 'px');

        $('.topic, .arrow').css('display', 'block');
        day1.css('display', 'block');

        switch(pageName) {
            case 'gap.chill':
                gapage('m_game-2-1_chill');
                break;
            case 'gap.vibrant':
                gapage('m_game-2-2_vibrant');
                break;
            case 'gap.lively':
                gapage('m_game-2-3_lively');
                break;
            case 'gap.carefree':
                gapage('m_game-2-4_carefree');
                break;
        }

        $('.loading').css('display', 'block');
        $('.loading').delay(1000).fadeOut(function() {
            $(".wrap").swipe({
                swipe: function(event, direction, distance, duration) {
                    event.preventDefault();
                    // if (wait) {
                    //     return;
                    // }
                    if (direction == "left") {
                        if (page >= 4) {
                            return;
                        }
                        page++;
                        $scope.swipeLeft();
                    }

                    if (direction == "right") {
                        if (page <= 0) {
                            return;
                        };
                        wait = true;
                        page--;
                        $scope.swipeRight();
                    }
                    if (page >= 4) {
                        $('.arrow, .topic').fadeOut();
                        day2.fadeOut('fast');
                    } else {
                        if (page >= 2) {
                            day1.fadeOut('fast', function() {
                                day2.fadeIn('fast');
                            });
                        } else {
                            day2.fadeOut('fast', function() {
                                day1.fadeIn('fast');
                            });
                        }
                        $('.arrow, .topic').fadeIn('fast');
                    }
                    $scope.changeDay();
                }
            });
        });



        $scope.changeDay = function() {
            var dist;
            if (page == 0) {
                dist = 0;
                TweenMax.to(day1, 0.7, { left: dist, ease: Expo.easeInOut });
            }
            if (page == 1) {
                dist = -sw;
                TweenMax.to(day1, 0.7, { left: dist, ease: Expo.easeInOut });
            }
            if (page == 2) {
                dist = 0;
                TweenMax.to(day2, 0.7, { left: dist, ease: Expo.easeInOut });
            }
            if (page == 3) {
                dist = -sw;
                TweenMax.to(day2, 0.7, { left: dist, ease: Expo.easeInOut });
            }
        }

        $scope.chooseBtn = function() {
            $state.go('gap.choose');
            gaclick('m_click_game_other-topic');
        }

        $scope.arrowBtn = function() {
            if (wait) {
                return;
            }
            page++;
            $scope.swipeLeft();
            if (page >= 4) {
                $('.arrow, .topic').fadeOut();
                day2.fadeOut('fast');
            } else {
                if (page >= 2) {
                    day1.fadeOut('fast', function() {
                        day2.fadeIn('fast');
                    });
                } else {
                    day2.fadeOut('fast', function() {
                        day1.fadeIn('fast');
                    });
                }
                $('.arrow, .topic').fadeIn('fast');
            }
            $scope.changeDay();
        }

        $scope.swipeLeft = function() {
            var dist = -(page * sw);
            wait = true;
            TweenMax.to($('.page_cont'), 0.7, {
                x: dist,
                ease: Expo.easeInOut,
                onComplete: function() {
                    wait = false;
                }
            });
        }

        $scope.swipeRight = function() {
            var dist = -(page * sw);
            wait = true;
            TweenMax.to($('.page_cont'), 0.7, {
                x: dist,
                ease: Expo.easeInOut,
                onComplete: function() {
                    wait = false;
                }
            });
        }

        $scope.couponBtn = function() {
            $('.pop_cont').fadeIn('fast');
            gaclick('m_click_game_get-coupon');
        }

    }
]);

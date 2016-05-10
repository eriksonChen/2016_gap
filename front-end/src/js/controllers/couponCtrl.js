var couponCtrls = angular.module('couponCtrls', []);

couponCtrls.controller('couponCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$timeout',
    function($scope, $state, $stateParams, $rootScope, $timeout) {
        $('.wrap').css('display', 'none');
        $('.wrap').fadeIn();
        if (!$rootScope.isCoupon) {
            $state.go('gap.home');
            return;
        }

        $timeout(function(){
        	alert("您可以「儲存」此圖當作優惠劵");
        }, 1000);

        //fb 分享
        var fb = {
            share_u: $rootScope.url, // $rootScope.url
            title: '盛放夏天｜跟著Gap去旅行！',
            des: '不只要好玩，Gap要你這個夏天玩得「很好看」！現在看夏日穿搭送治裝優惠，分享活動再抽精選飯店住宿券。快來跟我們一起放肆玩！',
            pic: $rootScope.url + 'img/fb/share_' + $scope.dollar + '.png'
        }

        var shareFb = function() {
            var share_fb = 'https://www.facebook.com/dialog/feed?' +
                "app_id=" + $scope.appID +
                "&display=popup&caption" +
                "&link=" + encodeURIComponent(fb.share_u + 'share.html') +
                "&redirect_uri=" + encodeURIComponent(fb.share_u + "form.html") +
                "&picture=" + encodeURIComponent(fb.pic) +
                "&description=" + encodeURIComponent(fb.des) +
                "&name=" + encodeURIComponent(fb.title);
            // window.open(share_fb, 'sharer', 'toolbar=0');
            window.open(share_fb, 'sharer');
        }

        $scope.fbBtn = function() {
        	shareFb();
            gaclick('m_click_game_fb-share');
        }

        $scope.backBtn = function(){
            $state.go('gap.home');
        }

        gapage('m_game-3_coupon');

    }
]);

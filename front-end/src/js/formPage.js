require("./vendor/ch.min.js");

var formApp = angular.module('formApp', []);

formApp.controller('formCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {

        //活動結束 ===================================
        /*self.close();
        return;*/
        //===========================================
        
        $('.logo, .form').css('display', 'none');
        $scope.phone = "";
        $scope.name = "";
        $scope.email = "";
        $scope.notice = false;
        var wait = false;

        var post_id = CH.paValue('post_id'),
            wait = false;

        // alert('post_id = '+post_id+'\n error_code='+CH.paValue('error_code'));

        if (post_id == "") {
            alert('要分享才有機會抽獎喔！');
            self.close();
            return;
        }

        gapage('m_game-4_lucky-draw');

        $('.logo, .form').css('display', 'block');

        $scope.infoBtn = function() {
            $('.rule').fadeIn('fast');
        }

        $scope.closeBtn = function() {
            $('.rule').fadeOut('fast');
        }

        $scope.cancelBtn = function() {
            self.close();
        }

        $scope.fansBtn = function() {
            gaclick('2_done_3_fanpage');
        }

        $scope.sendBtn = function() {
            if (wait) {
                return;
            }
            wait = true;
            var err = "";
            if (!CH.checktxt($scope.name)) {
                err += "請輸入您的真實姓名\n";
            }
            if (!CH.isValidCell($scope.phone)) {
                err += "請輸入正確手機號碼\n";
            }
            if (!CH.isValidMail($scope.email)) {
                err += "請輸入正確email\n";
            }
            if (!$scope.ischeck) {
                err += "請先同意本次活動的個資保密及隱私保護條款\n";
            }
            if (err.length > 0) {
                alert(err);
                wait = false;
                return;
            }

            gaclick('m_click_game_lucky-draw');

            function sumbitData() {
                $.ajax({
                    type: "POST",
                    url: 'api/sumbit.php',
                    dataType: 'json',
                    data: {
                        name: $scope.name,
                        phone: $scope.phone,
                        email: $scope.email
                    },
                    success: function(data) {
                        if (data.err === null) {
                            alert('資料上傳成功');
                            self.close();
                            setTimeout(function(){
                                location.href = './';

                            }, 3000);
                        } else {
                            alert(data.err);
                            wait = false;
                        }

                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert('資料上傳錯誤, 請稍後再試');
                        wait = false;
                    }
                })
            }

            sumbitData();
        }
    }
])

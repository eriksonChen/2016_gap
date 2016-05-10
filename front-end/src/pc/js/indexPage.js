
var gap = {
    map:0,
    init: function() {

        $('nav .btn_1').on('click', function(){
            $('html, body').animate({
                scrollTop: $('.how').offset().top
            }, 600);
        })
        $('nav .btn_2').on('click', function(){
            $('html, body').animate({
                scrollTop: $('section.find').offset().top
            }, 600);
        })
        $('nav .btn_3').on('click', function(){
            $('html, body').animate({
                scrollTop: $('section.activity').offset().top
            }, 800);
        })
        $('nav .btn_4').on('click', function(){
            $('html, body').animate({
                scrollTop: $('section.list').offset().top
            }, 1000);
        })

        $('ul.mapBtn li').on('click', function(){
            gap.mapTo($(this).index());
        })

        $('.list .top').on('click', function(){
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        })

        gapage('pc_index');

    },
    mapTo: function(map){
        if( map != gap.map ){

            $('.store .storeBlock').eq(gap.map).fadeOut('fast', function(){
                $('.store .storeBlock').eq(map).fadeIn('fast');
            });
            $('ul.mapBtn li').eq(gap.map).find('a').removeClass('focus');
            $('ul.mapBtn li').eq(map).find('a').addClass('focus');
            
            gap.map=map;
        }
    }

};


window.onload = function() {
    gap.init();
}

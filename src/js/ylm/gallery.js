var imageGallery = {
    gallery:function(){
        function NextImg() {
           if (current == imgMaxNum-1) {
               ShowImg(0);
               return false;
           }
           return ShowImg(current + 1);
        };
        function PrevImg() {
           if (current == 0) {
               ShowImg(imgMaxNum-1);
               return false;
           }
           return ShowImg(current - 1);
       };

        function ShowImg(index) {
           current = index;
           var curLnk = $carouselItems.eq(current).find("a");
           curLnk.parent().parent().children("li").removeClass("current");
           curLnk.parent().addClass("current");
           $('.gallery .panel-image').addClass('div-loading')
            $('.gallery .panel-image>a').attr("href", curLnk.attr("link"));
            $('.gallery .panel-image>a').attr("title", curLnk.attr("title"));
           $('.gallery .panel-image>a>img').attr("src", curLnk.attr("bimg"));
           $('.gallery .panel-image>a>img').attr("alt", curLnk.attr("title"));
           $('.gallery .panel-image .intro').find('div.logo').html(curLnk.children().filter('div').first().html());
           $('.gallery .panel-image .intro').find('div.text').html(curLnk.children().filter('div').last().html());
           return false;
        };
        var imgMaxNum = 8,
        $carouselEl = $( '.gallery .thumbs ul' ),
        $carouselItems = $carouselEl.children(),
        current = 0;

        $carouselEl.on( 'click.elastislide', 'li', function( event ) {
                var $item = $( this );
                var pos=$item.index();
                ShowImg(pos);
                event.preventDefault();
            });
        // 绑定载入事件
        $('.gallery .panel-image>a>img').bind("load", function () {
            $('.gallery .panel-image').removeClass('div-loading');
        });

        $('.gallery .panel-image .pre-btn').bind("click", function () {
            return PrevImg();;
        });
        $('.gallery .panel-image .next-btn').bind("click", function () {
            return NextImg();
        });
    },
    fade: function() {
        var Item = $('.item-wrapper').find('.item');
        var len = Item.length;
        var r = len;
        var dot = $('.focus span');
        var z = 0;
        var conLeft = $('.con-left');
        var preBtn = $('.pre-btn');
        var nextBtn = $('.next-btn');
        Item.each(function() {
            $(this).css('zIndex', r);
            r--;
            if ($(this).index() != 0){
                $(this).css('display', 'none');
            }
        });

        dot.mouseover(function() {
            var index = $(this).index();
            z = index;
            $(this).addClass('on').siblings().removeClass('on');
            Item.eq(z).fadeIn().siblings().fadeOut();
        });
        preBtn.click(function() {
            if (z == 0) {
                z = len;
            }
            z--;
            Item.eq(z).fadeIn().siblings().fadeOut();
            dot.eq(z).addClass('on').siblings().removeClass('on');
        });
        nextBtn.click(function() {
            if (z == len - 1) {
                z = -1;
            }
            z++;
            Item.eq(z).fadeIn().siblings().fadeOut();
            dot.eq(z).addClass('on').siblings().removeClass('on');
        });
    },
    //  3d轮播
    slide3D: function() {
        var container=$('.content');
        var oLi = $('.s-wrapper').find('li');
        var oPrev = $('.pre-btn');
        var oNext = $('.next-btn');
        var title = $('.title');
        var a = 0;
        var arr = [{
            zIndex: 280,
            left: 249,
            top: 0,
            opacity: 1,
            width: 360,
            height: 540
        }, {
            zIndex: 254,
            left: -7,
            top: 32,
            opacity: 0.91,
            width: 318,
            height: 477
        }, {
            zIndex: 190,
            left: -61,
            top: 108,
            opacity: 0.7,
            width: 216,
            height: 324
        }, {
            zIndex: 126,
            left: 95,
            top: 184,
            opacity: 0.5,
            width: 114,
            height: 171
        }, {
            zIndex: 100,
            left: 390,
            top: 216,
            opacity: 0.4,
            width: 72,
            height: 108
        }, {
            zIndex: 126,
            left: 642,
            top: 184,
            opacity: 0.5,
            width: 114,
            height: 171
        }, {
            zIndex: 190,
            left: 705,
            top: 108,
            opacity: 0.7,
            width: 216,
            height: 324
        }, {
            zIndex: 254,
            left: 540,
            top: 32,
            opacity: 0.91,
            width: 318,
            height: 477
        }];
        oLi.each(function(){
            n=$(this).index();
            $(this).css('zIndex', arr[n].zIndex);
            $(this).css('left', arr[n].left);
            $(this).css('top', arr[n].top);
            $(this).css('width',arr[n].width);
            $(this).css('height',arr[n].height);
            $(this).css('opacity', arr[n].opacity);
        });
        title.html(oLi.eq(0).find('a').attr('title'));
        title.attr('href', oLi.eq(0).find('a').attr('href'));
        oLi.click(function() {
            var index = $(this).index();
            if (a == index)
                return false;
            oLi.each(function() {
                var _this = $(this).index();
                var n = _this - index;
                if (n < 0) {
                    n = n + 8;
                }
                $(this).css('zIndex', arr[n].zIndex);
                $(this).animate({
                    left: arr[n].left,
                    top: arr[n].top,
                    width: arr[n].width,
                    height: arr[n].height,
                    opacity: arr[n].opacity
                });
            });
            a = index;
            title.html(oLi.eq(a).find('a').attr('title'));
            title.attr('href', oLi.eq(a).find('a').attr('href'));
        });
        oPrev.click(function() {
            if (a == 0) {
                a = 8;
            }
            a--;
            tab();
        });

        function tab() {
            oLi.each(function() {
                var _this = $(this).index();
                var n = _this - a;
                if (n < 0) {
                    n = n + 8;
                }
                $(this).css('zIndex', arr[n].zIndex);
                $(this).animate({
                    left: arr[n].left,
                    top: arr[n].top,
                    width: arr[n].width,
                    height: arr[n].height,
                    opacity: arr[n].opacity
                });
            });
            title.html(oLi.eq(a).find('a').attr('title'));
            title.attr('href', oLi.eq(a).find('a').attr('href'));
        }
        oNext.click(function() {
            move();
        });

        function move() {
            a++;
            if (a == 8) {
                a = 0;
            }
            tab();
        }
        clearInterval(timer);
        var timer = setInterval(move, 5000);
        container.on({
            'mouseenter': function() {
                clearInterval(timer);
            },
            'mouseleave': function() {
                timer = setInterval(move, 5000);
            }
        });
    }
};
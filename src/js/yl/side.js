var sideWrap = {
    toggle:function(side) {
        var top = document.documentElement.scrollTop || document.body.scrollTop,
        // visible = (top > 500 ? 'visible': 'hidden');
        visible = (top > 500 ? 'block': 'none');
        // side.style.visibility = visible;
        side.style.display = visible;
    },
    sideToggle:function(side,dis) {
        side.style.display = dis;
    },
    resize:function(side,maxSize,clz,nClz) {
        var body = document.documentElement || document.body;
        if (!body) {
            return;
        }
        var width = document.offsetWidth;
        if (width < maxSize) {
            side.className = nClz;
        } else {
            side.className = clz;
        }
    },
    create_side:function(className,innerHtml){
        var body = document.getElementById("extra-container"),
        firstChild = body.firstChild,
        wrap = document.createElement('div');
        wrap.className = className;
        wrap.innerHTML = innerHtml;
        firstChild ? firstChild.parentNode.insertBefore(wrap, firstChild) : body.appendChild(wrap);
        return wrap;
    },
    up_side:function(maxSize,ck,link){
        var _t=this,clz='side-btns-wrap',aClz='side-btns-wrap-resize',
        inner_html = '<div class="side-btns-top"><a href="'+link.feedback+'" target="_blank" title="反馈问题"  hidefocus><span class="icon-feedback mb-2"></span></a><a href="javascript:;" title="返回顶部"  hidefocus><span class="icon-up"></span></a></div>';
        side=_t.create_side(clz,inner_html),
        nClz = clz + ' ' + aClz,
        cookieName = ck.name || 'close_newsidxtop',
        domain = ck.domain || 'www.tduoduo.com',
        path = ck.path || '/',
        lnks = side.getElementsByTagName('a'),
        up_btn = lnks[1],
        // close_btn = lnks[2],
        display = cookie.getCookie(cookieName);
        if (display != '') {
            _t.sideToggle(side,'none');
            return;
        }
        _t.sideToggle(side,'none');
        _t.resize(side,maxSize,clz,nClz);
        addEvent(window, 'resize', function(e){_t.resize(side,maxSize,clz,nClz);});
        // addEvent(close_btn, 'click',
        //     function(e) {
        //         _t.sideToggle(side,'none');
        //         cookie.setCookie(cookieName, '1', 15 * 24, path, domain);
        //         if (window.event) {
        //             window.event.returnValue = false;
        //         } else {
        //             e.preventDefault();
        //         }
        //     });
        addEvent(window, 'scroll', function(e){_t.toggle(side);});
        addEvent(up_btn, 'click', toTop);
    },
    hongbao_side:function(maxSize,right){
        var _t=this,clz='side-right-wrap',aClz='side-right-wrap-resize';
        if(right.link=='true'){
          var inner_html='<a href="'+right.link_url+'">';
          inner_html=inner_html+'<img style="width:100px" src="'+right.link_img+'"/>';
          inner_html=inner_html+'</a>';
        }else{
          var inner_html='<div class="right-small"></div>';
          inner_html=inner_html+'<div class="tips"><img src="'+right.tips_img+'"/><div class="text">'+right.tips_txt+'</div></div>';
          // nav=nav+'</div>';
        }
        var side=_t.create_side(clz,inner_html),
        nClz = clz + ' ' + aClz,
        small = side.getElementsByClassName('right-small')[0],
        tips = side.getElementsByClassName('tips')[0];
        _t.resize(side,maxSize,clz,nClz);
        addEvent(window, 'resize', function(e){_t.resize(side,maxSize,clz,nClz);});
        if(right.link=='false'){
            _t.sideToggle(tips,'none');
            addEvent(small, 'mouseover', function(e) {
                _t.sideToggle(tips,'block');
            });
            addEvent(small, 'mouseout', function(e) {
                _t.sideToggle(tips,'none');
            });
    }

    },
    share_side:function(maxSize,share){
        var _t=this,clz='side-share-wrap',aClz='side-share-wrap-resize',
        // sina_url='http://service.weibo.com/share/share.php?url='+encodeURIComponent(share.url)+'&appkey=595885820&searchPic=false&title='+encodeURIComponent(share.title),
        sina_url='http://service.weibo.com/share/share.php?url='+encodeURIComponent(share.url)+'&appkey=595885820&pic='+encodeURIComponent(share.pics)+'&title='+encodeURIComponent(share.title),
        qzone_url='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(share.url)+'&title='+encodeURIComponent(share.title)+'&summary='+encodeURIComponent(share.summary)+'&pics='+encodeURIComponent(share.pics);
        var inner_html='<div class="side-share-box">';
        inner_html=inner_html+'<a class="weixin" href="" title="分享到微信"></a>';
        inner_html=inner_html+'<a class="tsina" href="'+sina_url+'" target="_blank" title="分享到微博"></a>';
        inner_html=inner_html+'<a class="qzone" href="'+qzone_url+'" target="_blank" title="分享到Qzone"></a>';
        inner_html=inner_html+'</div><div class="qrcode"><div class="arrow"></div><div class="qr-content"></div></div>';
        var side=_t.create_side(clz,inner_html),
        nClz = clz + ' ' + aClz,
        weixin=side.getElementsByClassName('weixin')[0],
        qrcode=side.getElementsByClassName('qrcode')[0];
        qr_content=side.getElementsByClassName('qr-content')[0];
        _t.resize(side,maxSize,clz,nClz);
        addEvent(window, 'resize', function(e){_t.resize(side,maxSize,clz,nClz);});
        addEvent(weixin, 'mouseover', function(e){
            if(qr_content.getElementsByTagName('canvas').length==0){
                jQuery(qr_content).qrcode({'text':share.url,'width':140,'height':140});
            }
            _t.sideToggle(qrcode,'block');
        });
        addEvent(weixin, 'mouseout', function(e){_t.sideToggle(qrcode,'none');});
        addEvent(weixin, 'click', function(e){
            if (window.event) {
                    window.event.returnValue = false;
                } else {
                    e.preventDefault();
                }
        });

    },
    temai_side:function(maxSize,temai){
        var _t=this,clz='side-temai-wrap',aClz='side-temai-wrap-resize';
        var inner_html='<div>';
        for(var k in temai){
          inner_html=inner_html+'<a href="'+temai[k][0]+'" class="nav" title="'+temai[k][1]+'频道" hidefocus>'+temai[k][1]+'</a>';
        }
        inner_html = inner_html+'<div class="nav-top"><i></i>顶部</div></div>';
        var side=_t.create_side(clz,inner_html),
        nClz = clz + ' ' + aClz,
        btn_top = side.getElementsByClassName('nav-top');
        _t.sideToggle(side,'none');
        _t.resize(side,maxSize,clz,nClz);
        addEvent(window, 'resize', function(e){_t.resize(side,maxSize,clz,nClz);});
        addEvent(window, 'scroll', function(e){
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top>100){
              _t.sideToggle(side,'block');
              $('.side-temai-wrap>div').show(300);
            }else{
              $('.side-temai-wrap>div').hide(300,function(){_t.sideToggle(side,'none');});

            }
        });
        addEvent(btn_top[0], 'click', toTop);

    }


},common={
    focus_us:function(){
        $('#focus-us').popover({
            container:'.yl-nav-header .right',
            trigger:'click',
            placement:'bottom',
            html: true,
            animation:true,
            template:'<div class="popover" style="max-width:500px;width:500px;" role="tooltip"><div class="arrow"></div><div class="popover-content clearfix" style="margin:20px 0"></div></div>',
            title:'谢谢关注',
            content:"<div style='float:left;border-right:solid 2px #dc3c00;margin-right:20px;'><p style='text-align:center;font-size:20px;'>特多多微信公众号</p><p><img src='http://www.tduoduo.com/static/ico/weixin.jpg'/></p></div><div style='float:left'>"+
                    "<dl style='font-size:16px;margin-top:65px;'>"+
            "<dt>微博关注:</dt><dd><a href='http://www.weibo.com/tduoduocom' target='_blank' class='btn btn-primary' rel='nofollow'>@特多多导购网</a></dd>"+
            "<dt>客服QQ:</dt><dd>3327620009</dd>"+
            "<dt>客服邮箱:</dt><dd>kefu@15yueliang.com</dd>"+
            "<dt>商务合作:</dt><dd>hezuo@15yueliang.com</dd>"+
            // "</dl>"
            "</div>"
        });
    },
    search_toggle:function(){
        $('.custom-search-toggle').on('click', function () {
                $('.offcanvas-search').toggleClass('open');
            })
    },
    sublist_toggle:function(){
        var toggle=document.getElementById('toggle');
        if(toggle != null){
            toggle.addEventListener('click', function (e) {
                  document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
                  document.getElementById('toggle').classList.toggle('x');
            });
        }
    },
    side_menu:function(){
        var menuLink = $('#menu-layout .menu-link'),menu_layout=$('#menu-layout');
        menuLink.click(function(e){
            if (menu_layout.hasClass('active')){
              menu_layout.removeClass('active');
              $('body').css({'left':'0'});
            }else{
              menu_layout.addClass('active');
              $('body').css({'left':'150px'});
            }
            e.preventDefault();
            e.stopPropagation();
        });
    },
    clear:function(){
        $(document).on('click',function(e){
            $('.ac-results').remove();
            if ($('#menu-layout').hasClass('active')){
              $('#menu-layout').removeClass('active');
              $('body').css({'left':'0'});
            }
        });
    },
    scroll_sidebar:function(){
        var b = $(".yl-scroll-sidebar");
        b.affix({
            offset: {
              top: function() {
                var c = b.offset().top,
                  // d = parseInt(b.children(0).css("margin-top"), 10),
                  e = $(".yl-nav-header").height();
                return this.top = c - e+50;
              },
              bottom: function() {
                return this.bottom = 327;
              }
            }
          });
    },
    setup:function(){
        _t=this;
        _t.side_menu();
        _t.sublist_toggle();
        _t.search_toggle();
        _t.clear();
        window.autocomplete = new Autocomplete({
          form_selector: '.yl-nav-header .search>form',
          minimum_length:1,
          delay:500
        });
        window.autocomplete.setup(window.location.hostname);
    },
    setup_quan:function(){
        _t=this;
        _t.side_menu();
        _t.clear();
        window.autocomplete = new Autocomplete({
          form_selector: '.search>form',
          minimum_length:1,
          delay:500
        })
        window.autocomplete.setup(window.location.hostname);
    }
};
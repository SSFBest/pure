
var common={

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
    clear:function(){
        $(document).on('click',function(e){
            $('.ac-results').remove();
            if ($('#menu-layout').hasClass('active')){
              $('#menu-layout').removeClass('active');
              $('body').css({'left':'0'});
            }
        });
    },

    setup:function(){
        _t=this;
        _t.side_menu();
        _t.sublist_toggle();
        _t.search_toggle();
        _t.clear();
        window.offcanvas_search = new Autocomplete({
          form_selector: '.offcanvas-search .search>form',
          minimum_length:1,
          delay:500
        });
        window.offcanvas_search.setup(window.location.hostname);
    }

};
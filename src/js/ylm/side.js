
var common={

    side_menu:function(){
        var menuLink = $('#menu-layout .menu-link'),
                menu_layout=$('#menu-layout');
        menuLink.click(function(e){
            if (menu_layout.hasClass('active')){
              menu_layout.removeClass('active');
            }else{
              menu_layout.addClass('active');
            }
            e.preventDefault();
            e.stopPropagation();
        })
    },
    clear:function(){
        $(document).on('click',function(e){
            $('.ac-results').remove();
            $('#menu-layout').removeClass('active');
        });
    },

    setup:function(){
        _t=this;
        _t.side_menu();
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
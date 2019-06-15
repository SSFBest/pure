var cookie = (function() {
    var co = {};
    co.getCookie = function(name) {
        name = name.replace(/([\.\[\]\$])/g, '\\\$1');
        var rep = new RegExp(name + '=([^;]*)?;', 'i');
        var co = document.cookie + ';';
        var res = co.match(rep);
        if (res) {
            return unescape(res[1]) || "";
        } else {
            return "";
        }
    };
    co.setCookie = function(name, value, expire, path, domain, secure) {
        var cstr = [];
        cstr.push(name + '=' + escape(value));
        if (expire) {
            var dd = new Date();
            var expires = dd.getTime() + expire * 3600000;
            dd.setTime(expires);
            cstr.push('expires=' + dd.toGMTString());
        }
        if (path) {
            cstr.push('path=' + path);
        }
        if (domain) {
            cstr.push('domain=' + domain);
        }
        if (secure) {
            cstr.push(secure);
        }
        document.cookie = cstr.join(';');
    };
    co.deleteCookie = function(name) {
        document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;';
    };
    return co;
})(),
toTop=function() {
    $("html,body").animate({
            "scrollTop": 0
        },
        1000,
        function() {});
},
addEvent = function(o, s, fn) {
        if (o.attachEvent) {
            o.attachEvent('on' + s, fn);
        } else {
            o.addEventListener(s, fn, false);
        }
        return o;
    },
loadScript=function(url,callback){
    var script=document.createElement("script");
    script.type="text/javascript";
    if(script.readyState){
        script.onreadystatechange=function(){
            if(script.readyState=="loaded"||script.readyState=="complete"){
                script.onreadystatechange=null;
                callback();
            }
        };
    }else{
        script.onload=function(){
            callback();
        };
    }
    script.src=url;
    document.getElementsByTagName("head")[0].appendChild(script);
},
notice_func=function(msg) {
            var s1 = "<div class='modal in'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close' ><span>×</span></button><h4 class='modal-title'>提示</h4></div><div class='modal-body'>",
            s2 = "</div></div></div></div>";
            $("body").append(s1 + msg + s2);
            // alert(s1 + msg + s2);
            $(".modal").fadeIn("normal",
            function() {
                setTimeout(function() {
                    $(".modal").fadeOut("fast",
                    function() {
                        $(this).remove();
                    });
                },
                1e3);
            });
},
notice_mask_func=function(msg) {

            var s1 = "<div class='modal in'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close' ><span>×</span></button><h4 class='modal-title'>提示</h4></div><div class='modal-body'>",
            s2 = "</div></div></div></div>";
            $("body").append(s1 + msg + s2);
            $('.modal').on('shown.bs.modal', function (e) {
                setTimeout(function() {
                    $('.modal').modal('hide');
                    $('.modal').remove();
                },
                1e3);
            }).modal('show');
        };
$(function(){
    var key=false;
    selectshow(".dropdown-toggle",".btn-group","open");
    tab(".nav-tabs li",".tab-pane","active");
    //滚动条美化
 /*   $(".sidebar").niceScroll({styler:"fb",cursorcolor:"#bec3c7", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', cursorborder: ''});
     $("html").niceScroll({styler:"fb",cursorcolor:"#bec3c7", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', cursorborder: '', zindex: '1000'});*/

    //左侧菜单导航
    $('.sidebar .sub-menu > a').click(function () {
        var last = $('.sub-menu.open', $('.sidebar'));
        last.removeClass("open");
        $('.arrow', last).removeClass("open");
        $('.sub', last).slideUp(200);
        var sub = $(this).next();
        if (sub.is(":visible")) {
            $('.arrow', $(this)).removeClass("open");
            $(this).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            $('.arrow', $(this)).addClass("open");
            $(this).parent().addClass("open");
            sub.slideDown(200);
        }
        /*var o = ($(this).offset());
        diff = 200 - o.top;
        if(diff>0)
            $(".sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $(".sidebar").scrollTo("+="+Math.abs(diff),500);*/
    });

    //placeholder兼容
    placeholder();
    $(".channel-link").click(function(){
        var rel=parseInt($(this).attr("rel"));
        $(this).parent().parent().hide();
        if(rel==0){
           $(".channel2").show();
        }else{
           $(".channel1").show();
        }
    });
    /*$(".cancel,.x").live("click",function(){
        if($(this).hasClass("disabledbg")||$(this).parent().parent().find("span").length<=2){
            return false;
        }else if($(this).parent().parent().hasClass("format")){
            $(this).parent().fadeOut("slow");
            $(this).parent().parent().find("span").eq($(this).parent().parent().find("span").length-2).addClass("line-last");
        }else{
            $(this).parent().fadeOut("slow");
        }
    });*/
    $('.encoded-btn').click(function(){
        $(this).hide();
        $('.encoded').hide();
        $('.encoded-edit').show();
    });
    $('.encoded-edit .btn-warning').click(function(){
        $('.encoded-btn').show();
        $('.encoded').show();
        $('.encoded-edit').hide();
    });
    /*$('.add a').click(function(){
        var formatAdd=$("#format-add").clone(true).removeClass("hide").removeAttr("id");
        $(this).parent().before(formatAdd);
    });*/
    $(".parameter-btn").click(function(){
        var customEdit=$('#custom-edit').clone().removeClass("hide").removeAttr("id");;
        $(this).parent().parent().find("div").append(customEdit);
    });
    /*$(".related-input").focus(function(){
        $(".pro-list").show();
    });*/
    /*$(".pro-list li a").click(function(){
        $(".related-input").val($(this).text());
        $(this).parent().parent().parent().hide();
    });*/
    $("th input[type='checkbox']").on("change",function(){
        if(!key){
            $(this).parent().parent().parent().parent().find("input[type='checkbox']").attr("checked",true);
            key=true;
        }else{
            $(this).parent().parent().parent().parent().find("input[type='checkbox']").attr("checked",false);
            key=false;
        }
    })
});
//select
function selectshow(a,b,classname){
    $(document).bind("click",function(){
        $(b).removeClass(classname);
    });
    $(a).bind("click",function(){
        $(b).removeClass(classname);
        $(this).parents(b).addClass(classname);
        return false;
    })
}
//Tab选项卡
function tab(a,b,classname){
    $(a).bind("click",function(){
        var index=$(this).index();
        var _parents=$(this).parents(".panel");
        $(this).addClass(classname).siblings().removeClass(classname);
        _parents.find(b).eq(index).addClass(classname).show().siblings().removeClass(classname).hide();
    })
}

//placeholder兼容
function placeholder(){
    //判断浏览器是否支持 placeholder属性
    function isPlaceholder() {
        var input = document.createElement('input');
        return 'placeholder' in input;
    }

    function changeToOriginalColor(self) {
        var index = $(self).index();
        var color = originalColor[$(self).index()];
        $(self).css('color', color);
    }

    if(!isPlaceholder()) {
        var texts = $(':text');
        var len = texts.length;
        var originalColor = [];
        for(var i = 0; i < len; i++) {
            var self = texts[i];
            var placeholder = $(self).attr('placeholder');
            if($(self).val() == "" && placeholder != null) {
                $(self).val(placeholder);
                originalColor[i] = $(self).css('color');
                $(self).css('color', '#666');
            }
        }
        texts.focus(function() {
            if($(this).attr('placeholder') != null && $(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
                changeToOriginalColor(this);
            }
        }).blur(function() {
            if($(this).attr('placeholder') != null && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder'));
                $(this).css('color', '#666');
            }
        });
    }
}

$(function() {
    var sub = $("#sub");
    var activedMenu;
    var activedSub;
    var mouseInSub = false;
    sub.on('mouseenter',function(){
        mouseInSub = true;
    }).on('mouseleave',function(){
        mouseInSub = false;
    })
    $('#test')
    .on('mouseenter',function(){
        sub.show();
    })
    .on('mouseleave',function(){
        sub.hide();
        $('.main li').removeClass('actived');
        $('#sub li').hide();
    })
    .on('mouseenter','.main li',function(){
        activedMenu = $(this)
        activedSub = $('#' + $(this).attr('data-id'));
        //获取鼠标当前坐标和上一次的坐标
        var pointsList = [];
        $(document).off('mousemove').on('mousemove',function(e){
            pointsList.push({
                x: e.pageX,
                y: e.pageY
            })
            if(pointsList.length > 2){
                pointsList.shift()
            }
            var p = pointsList[pointsList.length - 1];//当前位置
            var a = pointsList[0];//move前的位置
            var b = {
                x: sub.offset().left,
                y: sub.offset().top
            };//二级菜单左上角位置
            var c = {
                x: sub.offset().left,
                y: sub.offset().top + $('#sub').outerHeight()
            }//二级菜单左下角位置
 
            
            isPointInTrangele(p,a,b,c);


            //判断是否需要延迟
            if(needDelay(sub,a,p)){
                setTimeout(function(){
                    if(mouseInSub){
                        // console.log('a')
                        return
                    }
                    activedMenu.removeClass('actived');
                    $('#sub li').hide();
                    activedSub.show();
                },800)
            }else{
                if(mouseInSub){
                    return
                }
                activedMenu.removeClass('actived');
                $('#sub li').hide();
                activedSub.show();
            }
        })
    })
    .on('mouseleave','.main li',function(){
        $(this).removeClass('actived');
    })
    .on('mouseenter','#sub li',function(){
        $('[data-id=' + $(this).attr('id') + ']').addClass('actived');
    })
    .on('mouseleave','#sub li',function(){
        $('[data-id=' + $(this).attr('id') + ']').removeClass('actived');
    })
});

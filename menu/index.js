$(document).ready(function() {
    var sub = $('#sub')
    var activeRow;
    var activeMenu;
    var time;
    var mouseInSub = false;

    sub.on('mouseenter',function() {
        mouseInSub = true
    }).on('mouseleave',function() {
        mouseInSub = false;
    })

    var mouseTrack = [];

    var moveHandler = function(e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        })
        if(mouseTrack.length > 3) {
            mouseTrack.shift()
        }
    }

    $('#test')
        .on('mouseenter',function() {
            sub.removeClass('none')

            $(document).bind('mousemove',moveHandler)
        })
        .on('mouseleave',function() {
            sub.addClass('none')

            if(activeRow) {
                activeRow.removeClass('active');
                activeRow = null;
            }

            if (activeMenu) {
                activeMenu.addClass('none');
                activeMenu = null;
            }

            $(document).unbind('mousemove',moveHandler)
        })
        .on('mouseenter','li',function(e) {
            if(!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return
            }

            if(time) {
                clearTimeout(time)
            }
            
            //鼠标当前位置
            var currMousePos = mouseTrack[mouseTrack.length - 1];
            //鼠标之前位置
            var leftCorner = mouseTrack[mouseTrack.length - 2];

            var delay = needDelay(sub,leftCorner, currMousePos)

            if(delay) {
                time = setTimeout(function() {
                    if (mouseInSub) {
                        return
                    }
                    activeRow.removeClass('active');
                    activeMenu.addClass('none');
    
                    activeRow = $(e.target);
                    activeRow.addClass('active');
                    activeMenu = $('#' + activeRow.data('id'));
                    activeMenu.removeClass('none');
                    time = null;
                }, 800)
            }else {
                var preActiveRow = activeRow
                var preActiveMenu = activeMenu

                // activeRow = $(e.arget) 有bug
                activeRow = $(e.currentTarget)
                activeMenu = $('#' + activeRow.data('id'))

                preActiveRow.removeClass('active')
                preActiveMenu.addClass('none')

                activeRow.addClass('active')
                activeMenu.removeClass('none')
            }
            
            
        })
})
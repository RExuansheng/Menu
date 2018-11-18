function sameSign(a,b) {
    return (a ^ b) >= 0;
}

function vector (a,b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

//向量叉乘公式  判断点在不在三角形内（之前点与二级菜单左边框围成的三角形）
function vectorProduct(v1,v2) {
    return v1.x * v2.y - v2.x * v1.y
}

//P为鼠标当前位置 A为鼠标上一次位置  B为上边缘 C为下边缘
function isPointInTrangele(p,a,b,c) {
    var pa = vector(p,a),
        pb = vector(p,b),
        pc = vector(p,c);

    var t1 = vectorProduct(pa,pb),
        t2 = vectorProduct(pb,pc),
        t3 = vectorProduct(pc,pa);

    return sameSign(t1,t2) && sameSign(t2,t3);
}

function needDelay(element,leftCorner,currMousePos) {
    var offset = element.offset();

    var topLeft = {
        x: offset.left,
        y:offset.top
    }

    var bottomLeft = {
        x: offset.left,
        y: offset.top + element.height()
    }

    return isPointInTrangele(currMousePos,leftCorner,topLeft,bottomLeft)
}
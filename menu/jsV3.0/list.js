var i, txt = "";
var length = myObj.menu.length;

txt += "<ul>";
for (var a = 0; a < length; a++) {
    txt += "<li id=" + myObj.menu[a][0].id + ">";
    for (i in myObj.menu[a]) {
        txt += "<dl><dt><a href=" + myObj.menu[a][i].dtsrc + ">" + myObj.menu[a][i].name + "<i>&gt</i></dt>";
        for (j in myObj.menu[a][i].info) {
            txt += "<dd><a href=" + myObj.menu[a][i].ddsrc[j] + ">" + myObj.menu[a][i].info[j] + "</a></dd>";
        }
        txt += "</dl>";
    }
    txt += "</li>";
}
txt += "</ul>";
document.getElementById("sub").innerHTML = txt;
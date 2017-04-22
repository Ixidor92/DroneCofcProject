
myApp.onPageInit('textpage', function (page) {

    var el = document.getElementById('c2');
    var ctx = el.getContext('2d');
    var isDrawing;

   // console.log("IM HERE")



    

});

el.onmousedown = function (e) {
    console.log("HERE")
    isDrawing = true;
    ctx.moveTo(e.clientX, e.clientY);
};
el.onmousemove = function (e) {
    console.log("HERE")

    if (isDrawing) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
};
el.onmouseup = function () {
    console.log("HERE")

    isDrawing = false;
};
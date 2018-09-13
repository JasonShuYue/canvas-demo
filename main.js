var div = document.getElementById("canvas");

var brush = document.getElementById("brush");
var eraser = document.getElementById("eraser");
var clear = document.getElementById("clear");
var download = document.getElementById("download");

var context = div.getContext('2d');
var redBrush = document.getElementById("red");
var greenBrush = document.getElementById("green");
var blueBrush = document.getElementById("blue");
var blackBrush = document.getElementById("black");
var thinBrush = document.getElementById("thin");
var thickBrush = document.getElementById("thick");
var using = false;
var useErazer = false;
var lastPoint = {x:0, y: 0};    //上一个点的坐标
var lineWidth = 6;  //默认画笔宽度

//注意：优先判断是否支持可触屏。
if(document.body.ontouchstart !== undefined) {
    //  触屏设备
    listenToTouch(div);
} else {
    listenToMouse(div);
}

setCanvasSize(div);

//  点击画笔
brush.onclick = function(e) {
    useErazer = false;
    brush.classList.add("active");
    eraser.classList.remove("active");
}

//   点击橡皮擦
eraser.onclick = function(e) {
    useErazer = true;
    eraser.classList.add("active");
    brush.classList.remove("active");
}

//  点击清除
clear.onclick = function() {
    context.clearRect(0, 0, div.width, div.height);
}

//  点击下载
download.onclick = function() {
    console.log("aaa")
    var url = div.toDataURL('image/png');
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画儿';
    a.click();
}

window.onresize = function() {
    setCanvasSize(div);
}

redBrush.onclick = function() {
    context.fillStyle = "red";
    context.strokeStyle = "red";
    redBrush.classList.add('active');
    greenBrush.classList.remove('active');
    blueBrush.classList.remove('active');
    blackBrush.classList.remove('active');
}

greenBrush.onclick = function() {
    context.fillStyle = "green";
    context.strokeStyle = "green";
    greenBrush.classList.add('active');
    redBrush.classList.remove('active');
    blueBrush.classList.remove('active');
    blackBrush.classList.remove('active');
}

blueBrush.onclick = function() {
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    blueBrush.classList.add('active');
    greenBrush.classList.remove('active');
    redBrush.classList.remove('active');
    blackBrush.classList.remove('active');
}

blackBrush.onclick = function() {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    blackBrush.classList.add('active');
    greenBrush.classList.remove('active');
    redBrush.classList.remove('active');
    blueBrush.classList.remove('active');
}

thinBrush.onclick = function() {
    lineWidth = 6;
    thinBrush.classList.add("active");
    thickBrush.classList.remove("active");
}

thickBrush.onclick = function() {
    lineWidth = 12;
    thickBrush.classList.add("active");
    thinBrush.classList.remove("active");
}





function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0 , Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2, lineWidth) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function listenToMouse(target) {
    //  点击鼠标
    target.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        lastPoint = {x: x, y: y};
        using = true;
        if(useErazer) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            drawCircle(x, y, 2);
        }
    }

    //  滑动鼠标
    target.onmousemove = function(e) {
        if(using) {
            if(useErazer) {
                context.clearRect(lastPoint.x - 5, lastPoint.y - 5, 10, 10);
            } else {
                drawCircle(e.clientX, e.clientY, 2);
                drawLine(lastPoint.x, lastPoint.y, e.clientX, e.clientY, lineWidth);
            }
            lastPoint = {x: e.clientX, y: e.clientY};
        }
    }

    //  松开鼠标
    target.onmouseup = function(e) {
        using = false;
    }

}

function listenToTouch(target) {

    target.ontouchstart = function(e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        lastPoint = {x: x, y: y};
        using = true;
        if(useErazer) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            drawCircle(x, y, 2);
        }
    }

    target.ontouchmove = function(e) {
        if(using) {
            if(useErazer) {
                context.clearRect(lastPoint.x - 5, lastPoint.y - 5, 10, 10);
            } else {
                drawCircle(e.touches[0].clientX, e.touches[0].clientY, 2);
                drawLine(lastPoint.x, lastPoint.y, e.touches[0].clientX, e.touches[0].clientY, lineWidth);
            }
            lastPoint = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        }
    }

    target.ontouchend = function(e) {
        using = false;
    }
}

function setCanvasSize(target) {
    var pageWidth = document.documentElement.clientWidth || window.screen.width || document.body.clientWidth;
    var pageHeight = document.documentElement.clientHeight || window.screen.height || document.body.clientHeight;
    target.width = pageWidth;
    target.height = pageHeight;
}



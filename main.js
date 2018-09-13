
let div = document.getElementById("canvas");
let brush = document.getElementById("brush");
let eraser = document.getElementById("eraser");
let context = div.getContext('2d');
let redBrush = document.getElementById("red");
let greenBrush = document.getElementById("green");
let blueBrush = document.getElementById("blue");
let blackBrush = document.getElementById("black");
let using = false;
let useErazer = false;
let lastPoint = {x:0, y: 0};

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



//注意：优先判断是否支持可触屏。
if(document.body.ontouchstart !== undefined) {
    //  触屏设备
     listenToTouch(div);
} else {
    listenToMouse(div);
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
        let x = e.clientX;
        let y = e.clientY;
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
                drawLine(lastPoint.x, lastPoint.y, e.clientX, e.clientY, 6);
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
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
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
                drawLine(lastPoint.x, lastPoint.y, e.touches[0].clientX, e.touches[0].clientY, 6);
            }
            lastPoint = {x: e.touches[0].clientX, y: e.touches[0].clientY};
        }
    }

    target.ontouchend = function(e) {
        using = false;
    }
}

function setCanvasSize(target) {
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    target.width = pageWidth;
    target.height = pageHeight;
}


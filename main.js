
let div = document.getElementById("canvas");
let brush = document.getElementById("brush");
let erazer = document.getElementById("erazer");
let actions = document.getElementById("actions");
let context = div.getContext('2d');
let using = false;
let useErazer = false;
let lastPoint = {x:0, y: 0};
setCanvasSize(div);
context.fillStyle = "black";

window.onresize = function() {
    setCanvasSize(div);
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

function setCanvasSize(target) {
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    target.width = pageWidth;
    target.height = pageHeight;
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
                lastPoint = {x: e.clientX, y: e.clientY};
            } else {

                drawCircle(e.clientX, e.clientY, 2);
                drawLine(lastPoint.x, lastPoint.y, e.clientX, e.clientY, 6);
                lastPoint = {x: e.clientX, y: e.clientY};

            }
        }
    }

    //  松开鼠标
    target.onmouseup = function(e) {
        using = false;
    }

}

listenToMouse(div);
brush.onclick = function(e) {
    useErazer = false;
    actions.className = "actions";
}

erazer.onclick = function(e) {
    useErazer = true;
    actions.className = "actions x";
}
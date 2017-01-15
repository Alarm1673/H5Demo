/**
 * Created by zhangzilong on 17/1/14.
 */
var can;
var ctx;
var h,w;
var girlPic = new Image();
var starPic = new Image();
var num = 60;
var stars = [];
var lastTime;//上一次刷新的时间
var deltaTime;//两帧时间间隔
var switchy = false;

var life = 0;

function init(){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    w = can.width;
    h = can.height;
    document.addEventListener("mousemove",mousemove,false);

    girlPic.src = "img/girl.jpg";
    starPic.src = "img/star.png";

    for(var i = 0; i < num; i++){
        var obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }
    lastTime = Date.now();

    gameLoop();
}

document.body.onload =init();

function gameLoop(){
    /**循环定时调用
     * requestAnimationFrame听说会根据电脑设备来选择合适的定时,两帧之间的时间间隔不一致
     *  需要适配不同环境
     */
    window.requestAnimationFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    drawBackground();
    drawGirl();
    drawStar();
    aliveUpdate();
}

//绘制背景颜色
function drawBackground(){
    ctx.fillStyle = "#393550";
    ctx.fillRect(0,0,w,h);
}

//绘制girl
function drawGirl(){
    //drawImage(img,x,y)
    ctx.drawImage(girlPic, 100, 150, 600, 300);
}
function mousemove(e){
    if(e.offsetX || e.layerX){
        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;
        if(px > 100 && px < 700 && py > 150 && py < 450){
            switchy = true;
        }else{
            switchy = false;
        }
    }
}
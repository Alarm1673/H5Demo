/**
 * Created by zhangzilong on 17/1/14.
 */
var starObj = function(){
    this.x;
    this.y;
    this.picNum;
    this.timer;
    this.xSpeed;
    this.ySpeed;
}

starObj.prototype.init = function(){
    this.x = Math.random() * 600 + 100;
    this.y = Math.random() * 300 + 150;
    this.picNum = Math.floor(Math.random() * 7);
    this.timer = 0;
    this.xSpeed = Math.random() * 3 - 1.5;
    this.ySpeed = Math.random() * 3 - 1.5;
}
starObj.prototype.update = function () {
    this.x += this.xSpeed * deltaTime * 0.003;
    this.y += this.ySpeed * deltaTime * 0.003;
    //重生判断
    if(this.x < 100 || this.x > 700){
        this.init();
        return;
    }
    if(this.y < 150 || this.y > 450){
        this.init();
        return;
    }

    this.timer += deltaTime;
    if(this.timer > 50){
        this.picNum += 1;
        this.picNum %= 7;
        this.timer = 0;
    }
}

starObj.prototype.draw = function(){

    //save() 与restore()成对使用，只影响两者之间的内容
    ctx.save();
    //globalAlpha 全局透明度
    ctx.globalAlpha = life;
    ctx.drawImage(starPic,this.picNum * 7,0,7,7,this.x,this.y,7,7);
    //restore()
    ctx.restore();
}

//绘制星星
function drawStar(){
    //ctx.drawImage(starPic,300,400);
    for(var i = 0; i < num; i++){
        stars[i].update();
        stars[i].draw();
    }
}
//控制星星
function aliveUpdate(){
    if(switchy){
        life += 0.03 * deltaTime * 0.05;
        if(life > 1){
            life = 1;
        }
    }else{
        life -= 0.03 * deltaTime * 0.05;
        if(life < 0){
            life = 0;
        }
    }
}
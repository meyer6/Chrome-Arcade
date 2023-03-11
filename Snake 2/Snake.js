function Game_State_Display(){
    ctx.fillStyle="#000000"
    ctx.fillRect(0,0,510,510)
    ctx.fillStyle="#FF0000"
    ctx.fillRect(apple[0]*30,apple[1]*30,30,30)
    ctx.fillStyle="#FFFFFF"
    for(i=0;i<snake.length;i++){
        ctx.fillRect(snake[i][0]*30,snake[i][1]*30,30,30)
    }
}
function Apple(){
    var x=Math.floor(Math.random()*17)
    var y=Math.floor(Math.random()*17)
    if(In_Snake(x,y)==true){
        Apple()
    }else{
        apple=[x,y]
    }
}
function In_Snake(x,y){
    for(i=0;i<snake.length;i++){
        if(snake[i][0]==x && snake[i][1]==y){
            return true
        }
    }
    return false
}
function Move(){
    var x = snake[snake.length-1][0]+direction[0]
    var y = snake[snake.length-1][1]+direction[1]
    if(!(x>=0 && x<=16 && y>=0 && y<=16) || In_Snake(x,y)==true){
        death=true
    }
    if(death==false){
        snake.push([snake[snake.length-1][0]+direction[0],snake[snake.length-1][1]+direction[1]])
        if(snake[snake.length-1][0]==apple[0] && snake[snake.length-1][1]==apple[1]){
            Apple()
        }else{
            snake.shift()
        } 
    }
}
function Direction(){
    if(keys[65]==true && direction[0]==0){
        direction=[-1,0]
    }else if(keys[68]==true && direction[0]==0){
        direction=[1,0]
    }else if(keys[83]==true && direction[1]==0){
        direction=[0,1]
    }else if(keys[87]==true && direction[1]==0){
        direction=[0,-1]
    }
}
function Variable_Initialize(){
    snake = [[6,8],[7,8],[8,8]]
    direction = [1,0];
    death=false
    Apple();    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.body.addEventListener("keydown", function (e) {
    if(e.keyCode==32 && death==true){
        Variable_Initialize()
    }
    keys[e.keyCode]=true
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode]=false
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var keys=[]
Variable_Initialize()
var start = Date.now();
async function gameLoop(){
    if(Date.now()-start>100 && death==false){
        Direction()
        Move();
        Game_State_Display();
        start=Date.now();
    }else{
        await sleep(Math.max(100-(Date.now()-start),0));
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
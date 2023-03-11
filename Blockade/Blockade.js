function Game_State_Display(){
    ctx.fillStyle='#4a752c';
    ctx.fillRect(0, 0, 570, 570);
    ctx.fillStyle='#568a34';
    ctx.fillRect(0, 46, 570, 524);
    ctx.fillStyle='#000000';
    ctx.fillRect(21, 68, 528, 480);
    for(y=0;y<20;y++){
        for(x=0;x<22;x++){
            if((x+y)%2==0){
                ctx.fillStyle="#aad751";
                ctx.fillRect(x*24+21,y*24+68,24,24);
            }else{
                ctx.fillStyle="#a2d149";
            ctx.fillRect(x*24+21,y*24+68,24,24);
            }
        }
    }
    for(y=0;y<20;y++){
        for(x=0;x<22;x++){
            if(board[y][x]!=null){
                ctx.fillStyle=board[y][x];
                ctx.fillRect(x*24+21,y*24+68,24,24);
            }
        }
    }
}
function Move(){
    for(i=0;i<2;i++){
        if(0<=players[i][1]+players[i][3] && 19>=players[i][1]+players[i][3] && players[i][0]+players[i][2]>=0  &&  players[i][0]+players[i][2]<=21 && board[players[i][1]+players[i][3]][players[i][0]+players[i][2]]==null){
            players[i][0]=players[i][0]+players[i][2];
            players[i][1]=players[i][1]+players[i][3];
            board[players[i][1]][players[i][0]]="#FF0000";
        }else{
            death[i]=true
        }
    }
}
function Keys(){
    for(i=keys1.length-1;i>-1;i--){
        if(Date.now()-keys1[i][1]>401){
            keys1.splice(i,1);
        }
    }
    while(keys1.length>0 && moved[0]==false){
        var e=keys1[0][0];
        keys1.splice(0,1);
        if (e==68 && players[0][2]==0){
            players[0][2]=1;
            players[0][3]=0;
            moved[0]=true;
        }else if(e==65 && players[0][2]==0){
            players[0][2]=-1;
            players[0][3]=0;
            moved[0]=true;
        }else if(e==87 && players[0][3]==0){
            players[0][2]=0;
            players[0][3]=-1;
            moved[0]=true;
        }else if(e==83 && players[0][3]==0){
            players[0][2]=0;
            players[0][3]=1;
            moved[0]=true;
        }
    }
    for(i=keys2.length-1;i>-1;i--){
        if(Date.now()-keys2[i][1]>401){
            keys2.splice(i,1);
        }
    }
    while(keys2.length>0 && moved[0]==false){
        var e=keys2[0][0];
        keys2.splice(0,1);
        if(moved[1]==false){
            if(e==39 && players[1][2]==0){
                players[1][2]=1;
                players[1][3]=0;
                moved[1]=true;
            }else if(e==37 && players[1][2]==0){
                players[1][2]=-1;
                players[1][3]=0;
                moved[1]=true;
            }else if(e==38 && players[1][3]==0){
                players[1][2]=0;
                players[1][3]=-1;
                moved[1]=true;
            }else if(e==40 && players[1][3]==0){
                players[1][2]=0;
            players[1][3]=1;
            moved[1]=true;
            }
        }
    }
}
function Sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function Variable_Initialize(){
    keys1=[]
    keys2=[]
    board=[["#FF0000",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"#FF0000"]];
    players=[[0,0,1,0],[21,19,-1,0]];
    moved=[false,false];
    death=[false,false];
    start=Date.now();
}
document.body.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    if(e.keyCode==68 || e.keyCode==65 || e.keyCode==87 || e.keyCode==83){
        keys1.push([e.keyCode,Date.now()])
    }
    if(e.keyCode==37 || e.keyCode==38 || e.keyCode==39 || e.keyCode==40){
        keys2.push([e.keyCode,Date.now()])
    }
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
Variable_Initialize()
async function gameLoop(){
    if(death[0]==false && death[1]==false){
        if(Date.now()-start>200){
            start=Date.now();
            moved=[false,false];
            Keys();
            Move();
            Game_State_Display();
        }else{
            await Sleep(Math.max(200-(Date.now()-start),0));
        }
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
//smoother animations
// make it not look ugly

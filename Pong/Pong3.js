function Game_State_Display(){
	ctx.fillStyle='#000000';
	ctx.drawImage(img1,0,0,700,500,0,0,700,500);
	ctx.fillStyle='#FFFFFF';
	ctx.fillRect(15, player_pong2, 20, 110);
	ctx.fillRect(665, player_pong1, 20, 110);
	ctx.drawImage(img3,665,player_pong1);
	ctx.drawImage(img2,0,0,20, 110,15, player_pong2,20, 110);
	ctx.beginPath();
	ctx.arc(ball[0], ball[1], 8, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 40px PressStart2P-Regular';
		ctx.textAlign = "right";		
		ctx.fillText(player1_point, 320, 50);
		ctx.textAlign = "left";		
		ctx.fillText(player2_point, 380, 50);
	});	
	if (player1_point>=10){
		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 50px PressStart2P-Regular';
			ctx.textAlign = "center"
			if (player==1){		
				ctx.fillText("AI Won", 350, 250);
			}else{
				ctx.fillText("Player 1 Won", 350, 250);
			}
		});	
	}else if(player2_point>=10){
		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 50px PressStart2P-Regular';
			ctx.textAlign = "center";
			if (player==1){		
				ctx.fillText("Player 1 Won", 350, 250);
			}else{
				ctx.fillText("Player 2 Won", 350, 250);
			}
		});			
	}
	if(player==0){
		ctx.fillRect(255, 210, 190, 30);
		ctx.fillRect(255, 270, 190, 30);
		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 25px PressStart2P-Regular';
			ctx.fillStyle = "black";
			ctx.textAlign = "center";		
			ctx.fillText("1 Player", 350, 234);		
			ctx.fillText("2 Players", 350, 294);
		});		
	}	else{
		if (difficulty==0){
			ctx.fillRect(255, 175, 190, 30);
			ctx.fillRect(255, 235, 190, 30);
			ctx.fillRect(255, 295, 190, 30);
			f.load().then(function(font) { document.fonts.add(font)
				ctx.font = 'bold 25px PressStart2P-Regular';
				ctx.fillStyle = "black";
				ctx.textAlign = "center";	
				ctx.fillText("Easy", 350, 198);
				ctx.fillText("Medium", 350, 259);
				ctx.fillText("Hard", 350, 319);
			});			
		}
	}
}
function move_pong(){
	if (player==1){
		if ((keys[38] || keys[87])&& player_pong1>7){
			player_pong1=player_pong1-8
		}else if((keys[40] || keys[83]) &&player_pong1<391){
			player_pong1=player_pong1+8
		}
	}else{
		if (keys[38] && player_pong1>7){
			player_pong1=player_pong1-8
		}else if(keys[40] && player_pong1<391){
			player_pong1=player_pong1+8
		}
	}
	if (player==2){
		if (keys[87] && player_pong2>7){
			player_pong2=player_pong2-8
		}else if(keys[83] && player_pong2<391){
			player_pong2=player_pong2+8
		}
	}else{
		if(player_pong2>ball[1]){
			player_pong2=player_pong2-difficulty
		}else if(player_pong2+110<ball[1]){
			player_pong2=player_pong2+difficulty
		}
	}
}
function move_ball(){
	ball[0]=ball[0]+x_speed
	ball[1]=ball[1]+y_speed
}
function pong_movement(){
	if (ball[1]-8<0 && Math.sign(y_speed)*1==-1 || ball[1]+8>500 && Math.sign(y_speed)*1==1){
		y_speed=-y_speed
	} 
	if (ball[0]>=665 && ball[0]<=685 && ball[1]+8>=player_pong1 && ball[1]-8<=player_pong1+110 && x_speed>0){
		x_speed=x_speed*1.03
		y_speed=y_speed*1.03
		y_speed=(x_speed*(Math.tan(-((-34/25)*(ball[1]-player_pong1+1)+(1909/25)) * 0.6 *Math.PI / 180)))
		x_speed=-x_speed
	}else if (ball[0]>=15 && ball[0]<=35 && ball[1]+8>=player_pong2 && ball[1]-8<=player_pong2+110 && x_speed<0){
		x_speed=x_speed*1.03
		y_speed=y_speed*1.03
		y_speed=-(x_speed*(Math.tan(-((-34/25)*(ball[1]-player_pong2+1)+(1909/25)) * 0.6 * Math.PI / 180)))
		x_speed=-x_speed		
	}	
}
function death(){
	if(ball[0]>=695){
		player1_point=player1_point+1
		x_speed=7
		y_speed=0
		ball=[350,250]
	}else if(ball[0]<=5){
		player2_point=player2_point+1
		x_speed=-7
		y_speed=0
		ball=[350,250]
	}
}
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return [x,y]
}
document.body.addEventListener("keydown", function (e) {
		if(e.keyCode==66){
			window.location.href ='../Chrome_Arcade.html';
		}
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
document.addEventListener("click",  function (e) {
	const XY = getXY(canvas, e)
	if (player==0){
		if (XY[0]<=445 && XY[0]>=255 && XY[1]>=270 && XY[1]<=300){
			player=2
		}else if (XY[0]<=445 && XY[0]>=255 && XY[1]>=210 && XY[1]<=240){
			player=1
		}
	}else{
		if (difficulty==0){
			if (XY[0]<=445 && XY[0]>=255 && XY[1]>=175 && XY[1]<=205){
				difficulty=5
			}else if(XY[0]<=445 && XY[0]>=255 && XY[1]>=235 && XY[1]<=265){
				difficulty=7
			}else if(XY[0]<=445 && XY[0]>=255 && XY[1]>=295 && XY[1]<=325){
				difficulty=10
			}		
		}
	}
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var f = new FontFace('PressStart2P-Regular', 'url(HipopotamStudio-MrDodo-Regular.otf)');
var player1_point=0;
var player2_point=0;
keys=[];
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var img1 = new Image()
img1.src = "Board.png"
var img2 = new Image()
img2.src = "bat1.png"
var img3 = new Image()
img3.src = "bat2.png"
var player_pong1=192;
var player_pong2=192;
var x_speed=7;
var y_speed=0;
var ball=[350,250];
var player=0
var difficulty=0;
var previous=0;
var start=Date.now()
async function gameLoop(){
    if(Date.now()-start > 15){
		start = Date.now()
		if(player!==0){
			if (difficulty!==0){
				if (player1_point<10 && player2_point<10){
					console.log(start)
					move_pong();
					move_ball();
					pong_movement();
					death();
					console.log(start)
				}else{
					if (keys[32]){
						difficulty=0
						player=0;
						player1_point=0;
						player2_point=0;
						x_speed=7;
						y_speed=0;
						ball=[350,250];
					}
				}
			}
		}
		if(player==2){
			difficulty=1;
		}
		Game_State_Display();
    }else{
        await sleep(Math.max(15-(Date.now()-start),0));
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
function Game_State_Display(){
	ctx.drawImage(img1,0,0,300,300,0,0,300,300);
	for (y=0;y<3;y++){
	    for (x=0;x<3;x++){
	    	if (Board[y][x]!==null){
		    	if (Board[y][x]=="#000000"){
		    		ctx.drawImage(img2,x*97+15.5,y*97+15.5,75,75);
		    	}else{
					ctx.drawImage(img3,x*97+14.5,y*97+14.5,75,75);
		    	}
		    }
	    }
	}
	if(winner!==0 && winner!==1){
		ctx.lineWidth = 12;
		ctx.strokeStyle="#245fa7"
		ctx.beginPath();
		ctx.moveTo(startxy[0]*100+50, startxy[1]*100+50);
		ctx.lineTo((startxy[0]+((finalxy[0]-startxy[0])*frame))*100+50,(startxy[1]+((finalxy[1]-startxy[1])*frame))*100+50);
		ctx.stroke();
		ctx.closePath();
		frame=frame*1.1
		if (frame>1){
			frame=1;
		}
	}else if(winner==1){
		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 70px PressStart2P-Regular';
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText("Draw!", 150, 170);
		});	
	}
}
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
function Check_winner(){
	if(Board[0][0]==Board[0][1] && Board[0][0]==Board[0][2] && Board[0][0]!==null){
		winner=Board[0][0];
		startxy=[0,0]
		finalxy=[2,0]
	}else if(Board[1][0]==Board[1][1] && Board[1][0]==Board[1][2] && Board[1][0]!==null){
		winner=Board[1][0];
		startxy=[0,1]
		finalxy=[2,1]
	}else if(Board[2][0]==Board[2][1] && Board[2][0]==Board[2][2] && Board[2][0]!==null){
		winner=Board[2][0];
		startxy=[0,2]
		finalxy=[2,2]
	}else if(Board[0][0]==Board[1][0] && Board[0][0]==Board[2][0] && Board[0][0]!==null){
		winner=Board[0][0];
		startxy=[0,0]
		finalxy=[0,2]
	}else if(Board[0][1]==Board[1][1] && Board[0][1]==Board[2][1] && Board[0][1]!==null){
		winner=Board[0][1];
		startxy=[1,0]
		finalxy=[1,2]
	}else if(Board[0][2]==Board[1][2] && Board[0][2]==Board[2][2] && Board[0][2]!==null){
		winner=Board[0][2];
		startxy=[2,0]
		finalxy=[2,2]
	}else if(Board[0][0]==Board[1][1] && Board[0][0]==Board[2][2] && Board[0][0]!==null){
		winner=Board[0][0];
		startxy=[0,0]
		finalxy=[2,2]
	}else if(Board[0][2]==Board[1][1] && Board[0][2]==Board[2][0] && Board[0][2]!==null){
		winner=Board[0][2];
		startxy=[2,0]
		finalxy=[0,2]
	}
	var draw=true
	for (y=0;y<3;y++){
		for (x=0;x<3;x++){
			if(Board[y][x]==null){ 
				draw=false
			}
		}
	}
	if(draw==true && winner==0){
		winner=1
	}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener("click",  function (e) { 
	const XY = getXY(canvas, e);
	if (winner==0){
		if (move==0){
			if(XY[0]<300 && XY[1]<300 && Board[Math.floor((XY[1])/100)][Math.floor(XY[0]/100)]==null){
				Board[Math.floor((XY[1])/100)][Math.floor(XY[0]/100)]="#000000";
				move=move+1;
				move=move%2;
			}
		}else if(move==1){
			if(XY[0]<300 && XY[1]<300 && Board[Math.floor((XY[1])/100)][Math.floor(XY[0]/100)]==null){
				Board[Math.floor((XY[1])/100)][Math.floor(XY[0]/100)]="#777777";
				move=move+1;
				move=move%2;
			}
		}
	}
});
document.body.addEventListener("keydown", function (e) {
	if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
var keys=[];
var f = new FontFace('PressStart2P-Regular', 'url(OtomanopeeOne-Regular.ttf)');
var img1 = new Image()
img1.src = "Board.png"
var img2 = new Image()
img2.src = "Circle2.png"
var img3 = new Image()
img3.src = "Cross.png"
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var Board=[[null,null,null],
[null,null,null],
[null,null,null]];
var move=0;
var winner=0;
var startxy=[]
var finalxy=[]
var frame=0.05
function gameLoop(){
	sleep(200).then(() => {
		if(winner==0){
			Check_winner();
		}else if(keys[32]){
			Board=[[null,null,null],
			[null,null,null],
			[null,null,null]];
			move=0;
			winner=0;
			startxy=[]
			finalxy=[]
			frame=0.05
		}
		Game_State_Display();
	});
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
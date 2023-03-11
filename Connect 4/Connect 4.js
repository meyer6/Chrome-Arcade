function Game_State_Display(){
	ctx.fillStyle="#ebfdff";
	ctx.drawImage(img1,0,0,622,560,0,0,622,560);
	ctx.fillRect(0,0,622,75);
	for (y=0;y<6;y++){
	    for (x=0;x<7;x++){
    		ctx.fillStyle="#ebfdff";
			ctx.beginPath();
			ctx.arc(x*87+50, y*78+125, 35, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();	
	    	if (Board[y][x]!==null){
	    		ctx.fillStyle=Board[y][x];
				ctx.beginPath();
				ctx.arc(x*87+50, y*78+125, 35, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.closePath();
				if (Board[y][x]=="#eedb04"){
					ctx.strokeStyle="#a59501"
				}else{
					ctx.strokeStyle="#a70000";
				}
				ctx.beginPath();
				ctx.arc(x*87+50, y*78+125, 29, 0, 2 * Math.PI, false);
				ctx.lineWidth = 14;
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
	if (winner==null){	
		for (y=0;y<6;y++){
		    for (x=0;x<7;x++){
		    	if (prediction_Board[y][x]!==null){
		    		ctx.fillStyle=prediction_Board[y][x];
					ctx.beginPath();
					ctx.arc(x*87+50, y*78+125, 35, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.closePath();
				}
			}
		}	
		for (x=0;x<7;x++){
			if (Top_Board[x]!==null){
		    	ctx.fillStyle=Top_Board[x];
				ctx.beginPath();
				ctx.arc(x*87+50, 38, 35, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.closePath();
				if (Top_Board[x]=="#eedb04"){
					ctx.strokeStyle="#a59501"
				}else{
					ctx.strokeStyle="#a70000";
				}
				ctx.beginPath();
				ctx.arc(x*87+50, 38, 29, 0, 2 * Math.PI, false);
				ctx.lineWidth = 14;
				ctx.stroke();
				ctx.closePath();
			}		
		}
	}else{
		ctx.beginPath();
		if (winner=="#eedb04"){
			ctx.strokeStyle="#a70000"
		}else{
			ctx.strokeStyle="#a59501";
		}
		if(winner!==1){
			ctx.moveTo(startxy[0]*87+50, startxy[1]*78+125);
			ctx.lineTo(finalxy[0]*87+50, finalxy[1]*78+125);
			ctx.stroke();
		}
		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 70px PressStart2P-Regular';
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			if (winner=="#eedb04"){
				ctx.fillText("Yellow Won!", 311, 65);
			}else if(winner=="#dc0000"){
				ctx.fillText("Red Won!", 311, 65);
			}else if(winner==1){
				ctx.fillText("Draw!", 311, 65);
			}

		});	
	}
}
function prediction(){
	if (winner==null){
		prediction_Board=[[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null]]
		for (i=5;i>-1;i=i-1){
			if(Board[i][column]==null){
				prediction_Board[i][column]=colour2;
				break;
			}
		}
	}
}
function check_winner(){
	var repetition=0;
	for (y=0;y<6;y++){
		var previous_piece=null;
		for (x=0;x<7;x++){
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x-3,y]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]
		}
	}
	for (x=0;x<7;x++){
		var previous_piece=null;
		for (y=0;y<6;y++){
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x,y-3]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]
		}
	}
	repetition=0;
	for (i=0;i<4;i++){
		x=-1;
		var previous_piece=null;
		for (y=i;y<6;y++){
			x=x+1;
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x-3,y-3]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]
		}
	}
	repetition=0;
	for (i=1;i<4;i++){
		y=-1;
		var previous_piece=null;
		for (x=i;x<7;x++){
			y=y+1;
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x-3,y-3]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]
		}
	}
	repetition=0;
	for (i=0;i<4;i++){
		x=7;
		var previous_piece=null;
		for (y=i;y<6;y++){
			x=x-1;
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x+3,y-3]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]     
		}
	}
	repetition=0;
	for (i=5;i>2;i=i-1){
		y=-1;
		var previous_piece=null;
		for (x=i;x>-1;x=x-1){
			y=y+1;
			if(Board[y][x]!==null){
				if (previous_piece==Board[y][x]){
					var repetition=repetition+1
					if(repetition==3){
						winner=Board[y][x]
						finalxy=[x,y]
						startxy=[x+3,y-3]
					}
				}else{
					repetition=0
				}
			}
			var previous_piece=Board[y][x]
		}
	}
	var draw=true
	for (y=0;y<6;y++){
		for (x=0;x<7;x++){
			if(Board[y][x]==null){ 
				draw=false
			}
		}
	}
	if (draw==true && winner==null){
		winner=1
	}
}
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener("click",  function (e) {
	if (winner==null){
		const XY = getXY(canvas, e);
		var column2=Math.floor(XY[0]/88.9)
		if(XY[0]<=622){
			for (i=5;i>-1;i=i-1){
				if(Board[i][column2]==null){
					Board[i][column2]=colour;
					column=column2
					move=(move+1)%2
					if (move==0){
						colour="#dc0000"
						colour2="#ff6961"
					}else{
						colour="#eedb04"
						colour2="#FDFD96"
					}
					check_winner()
					Top_Board[Math.floor(e.clientX/88.9)]=colour
					break;
				}
			}
		}
	}
});
document.addEventListener("mousemove",  function (e) {
	if (winner==null){
		if(e.clientX<622){
			column=Math.floor(e.clientX/88.9)
			Top_Board=[null,null,null,null,null,null,null,null];
			Top_Board[Math.floor(e.clientX/88.9)]=colour
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
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var Top_Board=[null,null,null,null,null,null,null];
var Board=[[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null]];
var prediction_Board=[[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null]];
var f = new FontFace('PressStart2P-Regular', 'url(Bungee-Regular.ttf)');
var column=4;
var colour="#dc0000"
var colour2="#ff7063"
var move=0;
var winner=null
var keys=[];
var img1 = new Image()
img1.src = "Board1.png"
function gameLoop(){
	sleep(200).then(() => {
		if (keys[32] && winner!==null){
			Top_Board=[null,null,null,null,null,null,null];
			Board=[[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null]];
			prediction_Board=[[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null]];
			column=4;
			colour="#dc0000";
			colour2="#ff7063";
			move=0;
			moved=false;
			winner=null;		
		}
		prediction();
		Game_State_Display();
	});
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
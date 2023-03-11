function Game_State_Display(){
	ctx.drawImage(img,0,0)
	for (y=0;y<6;y++){
	    for (x=0;x<8;x++){
	    	if (square_board[y][x]!=null){
		    	if(square_board[y][x]=="r"){
					ctx.fillStyle='#854E0B';
				}else{
					ctx.fillStyle='#21691B';
		    	}
		    	ctx.fillRect(x*76+39, y*76+39, 76, 76); 
		    }
		}
	}
	for (y=0;y<7;y++){
	    for (x=0;x<9;x++){
			for (i=0;i<4;i++){
				if (board[y][x][i] != "_"){
					if(board[y][x][i]=="r"){
						ctx.fillStyle='#D17D17';
					}else{
						ctx.fillStyle='#4EC244';
					}
					if (i==0 && y!=0){
						ctx.fillRect(x*76+39-5, (y-1)*76+39, 11, 76); 
					}else if (i==1 && x!=8){
						ctx.fillRect(x*76+39, y*76+39-5, 76, 11);  
					}else if (i==2 && y!=6){
						ctx.fillRect(x*76+39-5, y*76+39, 11, 76);  
					}else if (i==3 && x!=0){
						ctx.fillRect((x-1)*76+39, y*76+39-5, 76, 11);
					}
				}
			}
		}
	}
	if (clicked[0]!=9){
		if("r"==String.fromCharCode((move*16)+98)){
			ctx.strokeStyle='#D17D17';
		}else{
			ctx.strokeStyle='#4EC244';
		}
	    ctx.lineWidth = 10;
	    ctx.beginPath();
	    ctx.moveTo(clicked[0]*76+39, clicked[1]*76+39);
	    ctx.lineTo(mouse_pos[0], mouse_pos[1]);
	    ctx.stroke();		
	}
	ctx.fillStyle='#d93f5e';
	for (y=0;y<7;y++){
	    for (x=0;x<9;x++){ 	
			ctx.beginPath();
			ctx.arc(x*76+39, y*76+39, 13, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
		}
	}
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 20px Yomogi-Regular';
		ctx.fillStyle = "#041831";
		ctx.textAlign = "left";		
		ctx.fillText("Player 1: "+points[0], 42, 562);
		ctx.textAlign = "right";		
		ctx.fillText("Player 2: "+points[1], 640, 562);
		ctx.textAlign = "center";
		if (filled!=true){
			if(move==0){
				ctx.fillText("Turn: Player 1", 342, 562);
		    }else{
		    	ctx.fillText("Turn: Player 2", 342, 562);
		    }
		}else{
			if(points[0]>points[1]){
				ctx.fillText("Player 1 Wins", 342, 562);
			}else if(points[1]>points[0]){
				ctx.fillText("Player 2 Wins", 342, 562);
			}else{
				ctx.fillText("Draw", 342, 562);
			}
		}		
		
	});
}
function filled_squares(){
	var play_again=false
	filled=true
	for (y=0;y<6;y++){
	    for (x=0;x<8;x++){	
	    	if(board[y][x][1]!="_" && board[y][x][2]!="_" && board[y+1][x+1][0]!="_" && board[y+1][x+1][3]!="_" && square_board[y][x]==null){
	    		points[move]=points[move]+1
	    		square_board[y][x]=String.fromCharCode((move*16)+98)
	    		play_again=true
	    	}
	    	if(square_board[y][x]==null){
	    		filled=false
	    	}
	    }
	}  
	if (play_again==false){
		move=(move+1)%2
	}  
}
function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}
document.addEventListener("mousedown",  function (e) {
	XY = getXY(canvas, e);
	if(XY[1]<531){
		if((XY[0]-39)%76<=25 || (XY[0]-39)%76>=51){
			if((XY[1]-39)%76<=25 || (XY[1]-39)%76>=51){
				if(board[Math.round((XY[1]-39)/76)][Math.round((XY[0]-39)/76)].indexOf("_")!=-1){
					clicked=[Math.round((XY[0]-39)/76),Math.round((XY[1]-39)/76)]
				}
			}
		}
	}
});
document.addEventListener("mousemove",  function (e) {
	XY = getXY(canvas, e);
	mouse_pos=[XY[0],XY[1]]
});
document.addEventListener("mouseup",  function (e) {
	XY = getXY(canvas, e);
	if(XY[1]<531){
		if((XY[0]-39)%76<=25 || (XY[0]-39)%76>=51){
			if((XY[1]-39)%76<=25 || (XY[1]-39)%76>=51){
				if((Math.round(((XY[0]-39)/76)-clicked[0])**2)+((Math.round((XY[1]-39)/76)-clicked[1])**2)==1){
					if((Math.round(((XY[0]-39)/76)-clicked[0]))==0 && ((Math.round((XY[1]-39)/76)-clicked[1]))==-1){
						var i=0
						var i2=2
					}else if((Math.round(((XY[0]-39)/76)-clicked[0]))==1 && ((Math.round((XY[1]-39)/76)-clicked[1]))==0){
						var i=1
						var i2=3
					}else if((Math.round(((XY[0]-39)/76)-clicked[0]))==0 && ((Math.round((XY[1]-39)/76)-clicked[1]))==1){
						var i=2
						var i2=0
					}else if((Math.round(((XY[0]-39)/76)-clicked[0]))==-1 && ((Math.round((XY[1]-39)/76)-clicked[1]))==0){
						var i=3
						var i2=1
					}
					if(board[clicked[1]][clicked[0]][i]=="_"){
						board[clicked[1]][clicked[0]] = board[clicked[1]][clicked[0]].replaceAt(i,String.fromCharCode((move*16)+98))
						board[Math.round((XY[1]-39)/76)][Math.round((XY[0]-39)/76)] = board[Math.round((XY[1]-39)/76)][Math.round((XY[0]-39)/76)].replaceAt(i2,String.fromCharCode((move*16)+98))
						filled_squares();
						past_board.push(JSON.parse(JSON.stringify(board)))
						past_square_board.push(JSON.parse(JSON.stringify(square_board)))
						past_points.push(JSON.parse(JSON.stringify(points)))
						past_move.push(JSON.parse(JSON.stringify(move)))
						window.localStorage.setItem('dots_board',JSON.stringify(board));
						window.localStorage.setItem('dots_square_board',JSON.stringify(square_board));
						window.localStorage.setItem('dots_points',JSON.stringify(points));
						window.localStorage.setItem('dots_past_board',JSON.stringify(past_board));
						window.localStorage.setItem('dots_past_square_board',JSON.stringify(past_square_board));
						window.localStorage.setItem('dots_past_points',JSON.stringify(past_points));
						window.localStorage.setItem('dots_past_move',JSON.stringify(past_move));
						window.localStorage.setItem('dots_move',JSON.stringify(move));
					}
				}
			}
		}
		clicked=[9,9]
	}
});
document.addEventListener("keydown",  function (e) {
	if(filled==true &&  e.keyCode==32 || e.keyCode==82){
		board=[["r__r","r___","r___","r___","r___","r___","r___","r___","rr__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["__rr","__r_","__r_","__r_","__r_","__r_","__r_","__r_","_rr_"]];
		square_board=[[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null]]
		points=[0,0]
		filled = false
		move=0	
		past_board=[JSON.parse(JSON.stringify(board))]
		past_square_board=[JSON.parse(JSON.stringify(square_board))]
		past_points=[JSON.parse(JSON.stringify(points))]	
		past_move=[0]
	}else if(e.keyCode==65 && past_board.length>1 || e.keyCode==37 && past_board.length>1){
		board=JSON.parse(JSON.stringify(past_board[past_board.length-2]))
		square_board=JSON.parse(JSON.stringify(past_square_board[past_square_board.length-2]))
		points=JSON.parse(JSON.stringify(past_points[past_points.length-2]))
		move=JSON.parse(JSON.stringify(past_move[past_move.length-2]))
		past_square_board.pop()
		past_board.pop()
		past_points.pop()
		past_move.pop()
		filled=false
	}else if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var img = new Image()
img.src="board.png"
if (typeof(Storage) !== "undefined") {
	board=JSON.parse(window.localStorage.getItem('dots_board'));
	if (board!=null){
		var square_board=JSON.parse(window.localStorage.getItem('dots_square_board'));
		var points=JSON.parse(window.localStorage.getItem('dots_points'))
		var past_board=JSON.parse(window.localStorage.getItem('dots_past_board'));
		var past_square_board=JSON.parse(window.localStorage.getItem('dots_past_square_board'));
		var past_points=JSON.parse(window.localStorage.getItem('dots_past_points'));
		var move=JSON.parse(window.localStorage.getItem('dots_move'));
		var past_move=JSON.parse(window.localStorage.getItem('dots_past_move'));
		var filled = false
		filled_squares();
	}else{
		var board=[["r__r","r___","r___","r___","r___","r___","r___","r___","rr__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["____r","____","____","____","____","____","____","____","_r__"],
		["__rr","__r_","__r_","__r_","__r_","__r_","__r_","__r_","_rr_"]];
		var square_board=[[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null]]
		var points=[0,0]
		var move=0
		var past_move=[0]
		var past_board=[JSON.parse(JSON.stringify(board))]
		var past_square_board=[JSON.parse(JSON.stringify(square_board))]
		var past_points=[JSON.parse(JSON.stringify(points))]
		var filled = false
	}
}
var f = new FontFace('Yomogi-Regular', 'url(Yomogi-Regular.ttf)');
var filled = false
var clicked=[9,9]
var mouse_pos=[0,0]
var end=0;
var start=0;
var move_finished=false;
function gameLoop() {
	if (move_finished==true){
	    move_finished=false;
	    start=Date.now();
	}else{
	    end=Date.now();
	    if (end-start>=30){
	    	move_finished=true;
	    	Game_State_Display();
		}
	}
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
function Game_State_Display(){
	ctx.drawImage(img,0,0)
	for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
    		if(board[x+y*8]=="1"){
    			drawCircle(x*65.5+14+33,y*65.5+33+42, 26, "#ebf0ef", "#ebf0ef", 0)
    		}else if(board[x+y*8]=="0"){
    			drawCircle(x*65.5+14+33,y*65.5+33+42, 26, "#141414", "#141414", 0)
    		}
		}
	}
	if(moving[0]!=-1){
		if(move=="1"){
			drawCircle(moving[2],moving[3], 26, "#ebf0ef", "#ebf0ef", 0)
		}else if(move=="0"){
			drawCircle(moving[2],moving[3], 26, "#141414", "#141414", 0)
		}
	}
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 20px Yomogi-Regular';
		ctx.fillStyle = "white";
		ctx.textAlign = "left";		
		ctx.fillText("Black: ", 25, 28);
	});
}
function drawCircle(x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
    	ctx.stroke()
  }
}
function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
function Change_Board(board,index,change){
	board=board.slice(0,index)+change.toString()+board.slice(index+1,board.length)
	return board
}
function Set_Board(){
	board="2222222222222222222222222222222222222222222222222222222222222222"
	for(i=0;i<4;i++){
		for(a=0;a<3;a++){
			var b = (a+1)%2
			board=Change_Board(board,i*2+(a+1)%2+a*8,"1")
			board=Change_Board(board,i*2+a%2+40+a*8,"0")
		}
	}	
}
function Check_XY(x,y){

	return x>=0 && x<8 && y>=0 && y<8
}
function Move(move,x,y,pass){
	if(pass==false){
		change=parseInt(move*2-1)
	}
	var moves = [];
	if(board[x+y*8]==move || pass){
		for(var i=-1;i<=1;i=i+2){
			if(Check_XY(x+i,y+change) && board[(x+i)+(y+change)*8]=="2"){
				moves.push([x,y,x+i,y+change])
			}else if(Check_XY(x+i,y+change) && board[(x+i)+(y+change)*8]!=move){
				if(Check_XY(x+2*i,y+change*2) && board[(x+2*i)+(y+change*2)*8]=="2"){
					moves.push([x,y,x+2*i,y+change*2,x+i,y+change])
					var moves_2 = Move(move,x-2,y+change*2,true)
					moves=moves.concat(moves_2)
				}
			}
		}
	}
	if(Is_King(x,y)!=-1 && pass==false){
		change=-1*change
		var moves_2 = Move(move,x,y,true)
		moves=moves.concat(moves_2)		
	}
	return moves
}
function Is_King(x,y){
	for(var i=0;i<kings.length;i++){
		if(kings[i][0]==x && kings[i][1]==y){
			return i
		}
	}
	return -1
}
function All_Moves(move){
	var moves=[];
	for(var x=0;x<8;x++){
		for(var y=0;y<8;y++){
			moves=moves.concat(Move(move,x,y,false))
		}		
	}
	var jump_available=false;
	for(var i=0;i<moves.length;i++){
		if(moves[i].length==6){
			jump_available=true
		}
	}
	if(jump_available==true){
		for(var a=moves.length-1;a>=0;a--){
			if(moves[a].length!=6){
				moves.splice(a,1)
			}
		}	
	}
	return moves
}
document.addEventListener("mousedown",  function (e) {
	XY = getXY(canvas, e);
	possible_moves=[]
	var x = Math.floor((XY[0]-14)/65)
	var y = Math.floor((XY[1]-42)/65)
	for(var i=0;i<moves.length;i++){
		if(moves[i][0]==x && moves[i][1]==y){
			possible_moves.push(moves[i])
		}
	}
	if(board[x+y*8]==move){
		moving=[x,y,XY[0],XY[1]]
		board=Change_Board(board,x+y*8,"2")
	}
});
document.addEventListener("mousemove",  function (e) {
	XY = getXY(canvas, e);
	if(moving[0]!=-1){
		moving=[moving[0],moving[1],XY[0],XY[1]]
	}
	Game_State_Display()
});
document.addEventListener("mouseup",  function (e) {
	console.log(kings)
	XY = getXY(canvas, e);
	var x = Math.floor((XY[0]-14)/65)
	var y = Math.floor((XY[1]-42)/65)
	var moved = false
	for(var i=0;i<possible_moves.length;i++){
		if(possible_moves[i][2]==x && possible_moves[i][3]==y){
			board=Change_Board(board,possible_moves[i][2]+possible_moves[i][3]*8,move)
			var pass=true
			if(possible_moves[i].length==6){
				board=Change_Board(board,possible_moves[i][4]+possible_moves[i][5]*8,"2")
				if(Is_King(possible_moves[i][4],possible_moves[i][5])!=-1){
					kings.shift(Is_King(possible_moves[i][4],possible_moves[i][5]))
				}
				moves = Move(move,possible_moves[i][2],possible_moves[i][3],false)
				for(var a=moves.length-1;a>=0;a--){
					if(moves[a].length!=6){
						moves.splice(a,1)
					}
				}
				if(moves.length!=0){
					pass=false
				}
			}
			if(Is_King(moving[0],moving[1])!=-1){
				var index = Is_King(moving[0],moving[1])
				kings[index][0]=x
				kings[index][1]=y
			}
			if((possible_moves[i][3]==0 || possible_moves[i][3]==7) && Is_King(possible_moves[i][2],possible_moves[i][3])==-1){
				kings.push([possible_moves[i][2],possible_moves[i][3]])
			}
			moved=true
			if(pass==true){
				move=((parseInt(move)+1)%2).toString()
				moves = All_Moves(move)
			}
		}
	}
	if (moved==false && moving[0]!=-1){
		board=Change_Board(board,moving[0]+moving[1]*8,move)
	}
	moving[0]=-1
	Game_State_Display()
});
document.addEventListener("keydown",  function (e) {
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var img = new Image()
img.src="board.png"
var f = new FontFace('Yomogi-Regular', 'url(Yomogi-Regular.ttf)');
Set_Board()
var kings = [];
var move = "0";
var moves = All_Moves(move)
var possible_moves=[]
var moving=[-1,0,0,0]
img.addEventListener('load', function() {
   Game_State_Display();
}, false);

function Game_State_Display(){
	ctx.drawImage(img,0,0)
	for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
	    	if (board[y][x]!=null){
	    		if(board[y][x]=="w"){
	    			drawCircle(x*65.5+14+33,y*65.5+33+42, 26, "#ebf0ef", "#ebf0ef", 0)
	    		}else{
	    			drawCircle(x*65.5+14+33,y*65.5+33+42, 26, "#141414", "#141414", 0)
	    		}
			}
		}
	}
	ctx.fillStyle='#777777';
	for(i=0;i<possible_moves.length;i++){
		if(possible_moves[i][possible_moves[i].length-2]==Math.floor((mouse_pos[0]-14)/65) && possible_moves[i][possible_moves[i].length-1]==Math.floor((mouse_pos[1]-42)/65)){
			ctx.fillStyle="#2d9689"
			ctx.fillRect(Math.floor((mouse_pos[0]-14)/65)*65.5+14,Math.floor((mouse_pos[1]-42)/65)*65.5+42,65.5,65.5)
		}
		drawCircle(possible_moves[i][possible_moves[i].length-2]*65.5+14+33, possible_moves[i][possible_moves[i].length-1]*65.5+42+33, 9, "#105454", "#105454", 0)
	}
	if (past_moves.length>0){
		drawCircle(past_moves[past_moves.length-1][0]*65.5+14+33, past_moves[past_moves.length-1][1]*65.5+42+33, 5, "#de0000", "#de0000", 0)
	}
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 20px Yomogi-Regular';
		ctx.fillStyle = "white";
		ctx.textAlign = "left";		
		ctx.fillText("Black: "+points[0], 25, 28);
		ctx.textAlign = "right";		
		ctx.fillText("White: "+points[1], 528, 28);
		ctx.textAlign = "center";
		if (finish!=true){
			if(colour=="w"){
				ctx.fillText("Turn: White", 276, 28);
		    }else{
		    	ctx.fillText("Turn: Black", 276, 28);
		    }
		}else{
			if(points[0]>points[1]){
				ctx.fillText("Winner: Black", 276, 28);
			}else if(points[1]>points[0]){
				ctx.fillText("Winner: White", 276, 28);
			}else{
				ctx.fillText("Draw", 276, 28);
			}
		}		
		
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
function count_points(){
	points=[0,0]
	for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
	    	if (board[y][x]!=null){
	    		if (board[y][x]=="b"){
	    			points[0]=points[0]+1   	
	    		}else{
					points[1]=points[1]+1 
	    		}
	    	}
	    }
	}
	if(points[0]+points[1]==64){
		finish=true
	}
}
function moves(x,y){
	var potential_moves=[x,y]
	for(i=1;i<8-x;i++){
		if(board[y][x+i]!=null && board[y][x+i]!=colour){
			potential_moves.push(x+i,y)
		}else if (potential_moves.length>2 && board[y][x+i]==null){
			potential_moves.push(x+i,y)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<x+1;i++){
		if(board[y][x-i]!=null && board[y][x-i]!=colour){
			potential_moves.push(x-i,y)
		}else if (potential_moves.length>2 && board[y][x-i]==null){
			potential_moves.push(x-i,y)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<8-y;i++){
		if(board[y+i][x]!=null && board[y+i][x]!=colour){
			potential_moves.push(x,y+i)
		}else if (potential_moves.length>2 && board[y+i][x]==null){
			potential_moves.push(x,y+i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<y+1;i++){
		if(board[y-i][x]!=null && board[y-i][x]!=colour){
			potential_moves.push(x,y-i)
		}else if (potential_moves.length>2 && board[y-i][x]==null){
			potential_moves.push(x,y-i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<Math.min(x,y)+1;i++){
		if(board[y-i][x-i]!=null && board[y-i][x-i]!=colour){
			potential_moves.push(x-i,y-i)
		}else if (potential_moves.length>2 && board[y-i][x-i]==null){
			potential_moves.push(x-i,y-i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<Math.min(8-x,8-y);i++){
		if(board[y+i][x+i]!=null && board[y+i][x+i]!=colour){
			potential_moves.push(x+i,y+i)
		}else if (potential_moves.length>2 && board[y+i][x+i]==null){
			potential_moves.push(x+i,y+i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<Math.min(x+1,8-y);i++){
		if(board[y+i][x-i]!=null && board[y+i][x-i]!=colour){
			potential_moves.push(x-i,y+i)
		}else if (potential_moves.length>2 && board[y+i][x-i]==null){
			potential_moves.push(x-i,y+i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
	potential_moves=[x,y]
	for(i=1;i<Math.min(y+1,8-x);i++){
		if(board[y-i][x+i]!=null && board[y-i][x+i]!=colour){
			potential_moves.push(x+i,y-i)
		}else if (potential_moves.length>2 && board[y-i][x+i]==null){
			potential_moves.push(x+i,y-i)
			possible_moves.push(potential_moves)
			break;
		}else{
			break;
		}
	}
}
function all(){
	for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
	    	if(board[y][x]==colour){
	    		moves(x,y)   	
	    	}
	    }
	}
}
function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
document.addEventListener("mousedown",  function (e) {
	XY = getXY(canvas, e);
	clicked=[XY[0],XY[1]]
});
document.addEventListener("mousemove",  function (e) {
	XY = getXY(canvas, e);
	mouse_pos=[XY[0],XY[1]]
});
document.addEventListener("mouseup",  function (e) {
	XY = getXY(canvas, e);
	if (Math.floor((clicked[0]-14)/65.5)==Math.floor((XY[0]-14)/65.5) && Math.floor((clicked[1]-42)/65.5)==Math.floor((XY[1]-42)/65.5)){
		var moved=false
		for(i=0;i<possible_moves.length;i++){
			if(possible_moves[i][possible_moves[i].length-2]==Math.floor((clicked[0]-14)/65.5) && possible_moves[i][possible_moves[i].length-1]==Math.floor((clicked[1]-42)/65.5)){
				moved=true
				for(a=1;a<possible_moves[i].length-2;a=a+2){ 
					board[possible_moves[i][a+2]][possible_moves[i][a+1]]=colour
				}
			}
		}
		if (moved==true){
			if(colour=="b"){
				colour="w"
			}else{
				colour="b"
			}
			possible_moves=[]
			all()
			if (possible_moves.length==0){
				if(colour=="b"){
					colour="w"
				}else{
					colour="b"
				}
				possible_moves=[]
				all()	
				if (possible_moves.length==0){
					finish=true;
				}			
			}
			count_points()
			past_board.push(JSON.parse(JSON.stringify(board)))
			past_moves.push([Math.floor((XY[0]-14)/65.5),Math.floor((XY[1]-42)/65.5)])
		}
		window.localStorage.setItem('othello_board',JSON.stringify(board));
		window.localStorage.setItem('othello_past_board',JSON.stringify(past_board));
		window.localStorage.setItem('othello_past_moves',JSON.stringify(past_moves));
		window.localStorage.setItem('othello_finish',JSON.stringify(finish));
		window.localStorage.setItem('othello_colour',colour);
	}
	clicked=[700,700]
});
document.addEventListener("keydown",  function (e) {
	if(e.keyCode==32 && finish==true || e.keyCode==82){
		past_board=[]
		board=[[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,"w","b",null,null,null],
		[null,null,null,"b","w",null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null]];
		past_moves=[]
		finish=false
		colour="b"
		possible_moves=[]
		past_board=[JSON.parse(JSON.stringify(board))]
		all()
		count_points()
	}else if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}else if(e.keyCode==65 && past_board.length>1 || e.keyCode==37 && past_board.length>1){
		board=JSON.parse(JSON.stringify(past_board[past_board.length-2]))
		past_board.pop()
		past_moves.pop()
		possible_moves=[]
		if(colour=="b"){
			colour="w"
		}else{
			colour="b"
		}
		all()
		if (possible_moves.length==0){
			if(colour=="b"){
				colour="w"
			}else{
				colour="b"
			}
			possible_moves=[]
			all()
		}
		finish=false
		count_points()
	}
	window.localStorage.setItem('othello_board',JSON.stringify(board));
	window.localStorage.setItem('othello_past_board',JSON.stringify(past_board));
	window.localStorage.setItem('othello_past_moves',JSON.stringify(past_moves));
	window.localStorage.setItem('othello_finish',JSON.stringify(finish));
	window.localStorage.setItem('othello_colour',colour);
});
if (typeof(Storage) !== "undefined") {
	board=JSON.parse(window.localStorage.getItem('othello_board'));
	if (board!=null){
		past_board=JSON.parse(window.localStorage.getItem('othello_past_board'));
		past_moves=JSON.parse(window.localStorage.getItem('othello_past_moves'));
		finish=JSON.parse(window.localStorage.getItem('othello_finish'));
		colour=window.localStorage.getItem('othello_colour')
	}else{
		var board=[[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,"w","b",null,null,null],
		[null,null,null,"b","w",null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null]];
		var finish=false
		var colour="b"
		var past_board=[JSON.parse(JSON.stringify(board))]
		var past_moves=[]
	}
}
var mouse_pos=[0,0]
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var img = new Image()
img.src="board.png"
var f = new FontFace('Yomogi-Regular', 'url(Yomogi-Regular.ttf)');
var possible_moves=[]
var points=[0,0]
all()
count_points()
var clicked=[700,700]
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
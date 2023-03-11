function Game_State_Display(){
	ctx.drawImage(board_img,0,0)
    for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
	    	if (board[y][x]!=null){
    			var img = new Image()
				img.src=board[y][x]+".svg"
                ctx.drawImage(img,x*70,y*70,70,70)
	    	}
	    }
	}
    if (current_piece[0]!=-1){
        var img = new Image()
        img.src=current_piece[2]+".svg"
        ctx.drawImage(img,mouse_pos[0]-35,mouse_pos[1]-35,70,70)
    }
    if(possible_moves!=[]){ 
        ctx.fillStyle = "#000000"
        for(var i=0;i<possible_moves.length;i++){
            ctx.fillRect(possible_moves[i][0]*70+17,possible_moves[i][1]*70+17,35,35)
        }
    }
}
function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
function Move_Check(p_moves,x,y,piece){
    p_moves.push([x,y])
    if(board[y][x] != null && board[y][x][0]!=piece[0]){
        return [true, p_moves]
    }else if(board[y][x] != null && board[y][x][0]==piece[0]){
        p_moves.pop() 
        return [true, p_moves]
    }
    return [false, p_moves]
}
function Get_Moves(x,y,piece){
    possible_moves = []
    if(piece[1]=="Q" || piece[1]=="R"){
        for(var x1=1;x1<8-x;x1++){
            var a = Move_Check(possible_moves,x+x1,y,piece)
            possible_moves = a[1]
            if(a[0] == true){
                break
            }
        }
        for(var x1=-1;x1>-x-1;x1--){
            var a = Move_Check(possible_moves,x+x1,y,piece)
            possible_moves = a[1]
            if(a[0] == true){
                break
            }
        }
        for(var y1=1;y1<8-y;y1++){
            var a = Move_Check(possible_moves,x,y+y1,piece)
            possible_moves = a[1]
            if(a[0] == true){
                break
            }
        }
        for(var y1=-1;y1>-y-1;y1--){
            var a = Move_Check(possible_moves,x,y+y1,piece)
            possible_moves = a[1]
            if(a[0] == true){
                break
            }
        }
    }
}
function In_Array(x,y,arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i][0] == x && arr[i][1] == y){
            return true
        }
    }
    return false
}
document.addEventListener("mousedown",  function (e) {
	XY = getXY(canvas, e);
    x = Math.floor(XY[0] / 70)
    y = Math.floor(XY[1] / 70)
    if(x>=0 && x<8 && y>=0 && y<8 && board[y][x] != null && String.fromCharCode(((move)*21)+98)!=board[y][x][0]){
        current_piece = [x,y,board[y][x]]
        Get_Moves(x,y,board[y][x])
        board[y][x] = null
    }
    Game_State_Display();
});
document.addEventListener("mouseup",  function (e) {
    XY = getXY(canvas, e);
    x = Math.floor(XY[0] / 70)
    y = Math.floor(XY[1] / 70)
    if(current_piece[0]!=-1){
        console.log(x,y,possible_moves)
        if(In_Array(x,y,possible_moves)){
            board[y][x] = current_piece[2]
            move = (move + 1) % 2
        }else{
            board[current_piece[1]][current_piece[0]] = current_piece[2]
        }
        possible_moves = []
        current_piece = [-1,-1,""]
    }
    Game_State_Display();
});
document.addEventListener("mousemove",  function (e) {
    mouse_pos = getXY(canvas, e);
    Game_State_Display();
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var board_img = new Image()
board_img.src="Board.png"

var board=[["bR8","bN","bB8","bQ8","bK2","bB8","bN","bR8"],
		["bP","bP","bP","bP","bP","bP","bP","bP"],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		["wP","wP","wP",null,"wP","wP","wP","wP"],
		["wR8","wN","wB8","wQ8","wK2","wB8","wN","wR8"]];

var current_piece = [-1,-1,""]
var mouse_pos = [0,0]
var possible_moves = []
var move = 0
board_img.addEventListener('load', function() {
    Game_State_Display();
 }, false);
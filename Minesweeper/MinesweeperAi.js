function Game_State_Display(){
	ctx.fillStyle="#000000"
	ctx.fillRect(0,0,500,500)
	for (var x=0;x<20;x++){
		for (var y=0;y<20;y++){
			ctx.fillStyle="#FFFFFF"
			ctx.fillRect(x*25+1,y*25+1,23,23)
			if(seen_board[x+y*20]!="." && seen_board[x+y*20]!=board[x+y*20]){
				ctx.fillStyle="#FFF000"
				ctx.fillRect(x*25+1,y*25+1,23,23)
			}
    		ctx.fillStyle="#000000"
    		if(seen_board[x+y*20]=="."){
				ctx.fillStyle="#ff0000"
				ctx.fillRect(x*25+1,y*25+1,23,23)
    		}else if(seen_board[x+y*20]!="0"){
				
				ctx.font = 'bold 100px ';
				ctx.textAlign = "center";
				ctx.fillText(seen_board[x+y*20],x*25+12,y*25+20)
			}else{
				ctx.fillRect(x*25+1,y*25+1,23,23)
			}

		}
	}
}
function Print_Board(board){
	for(y=0;y<20;y++){
		console.log(board.slice(y*20,(y+1)*20))
	}
	console.log("____________________________")
}
function Change_Board(board,index,change){
	board=board.slice(0,index)+change.toString()+board.slice(index+1,board.length)
	return board
}
function Choose_Square(index){
	if (board[index]=="b"){
		console.log("lost",index)
		lost=true
	}else{
		seen_board=Change_Board(seen_board,index,board[index])
		var x=index%20
		var y=Math.floor(index/20)
		for (var x1=-1;x1<=1;x1++){
			for (var y1=-1;y1<=1;y1++){
				if(!(x1==0 && y1==0)){
					if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="."){
						if(board[index]=="0" || (board[index]!="0" && board[x+x1+(y+y1)*20]=="0")){
							Choose_Square(x+x1+(y+y1)*20)
						}
					}
				}
			}
		}
	}
}
function Ai(){
	var prob_board=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
	var change=true
	while (change==true && lost==false){
		change=false
		for (var x=0;x<20;x++){
			for (var y=0;y<20;y++){
				if(seen_board[x+y*20]!="." && seen_board[x+y*20]!="0" && seen_board[x+y*20]!="b"){
					var count_1=0
					for (var x1=-1;x1<=1;x1++){
						for (var y1=-1;y1<=1;y1++){
							if(!(x1==0 && y1==0)){
								if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="b"){
									count_1++
								}
							}
						}
					}
					if(count_1==parseInt(seen_board[x+y*20])){
						for (var x1=-1;x1<=1;x1++){
							for (var y1=-1;y1<=1;y1++){
								if(!(x1==0 && y1==0)){
									if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="."){
										Choose_Square(x+x1+(y+y1)*20)
										console.log("picked",x+x1,y+y1)
										change=true
									}
								}
							}
						}
					}
				}	
			}
		}
	}
	var change=false
	for (var x=0;x<20;x++){
		for (var y=0;y<20;y++){
			if(seen_board[x+y*20]!="." && seen_board[x+y*20]!="0"){
				var count_1=0
				var count_2=0
				for (var x1=-1;x1<=1;x1++){
					for (var y1=-1;y1<=1;y1++){
						if(!(x1==0 && y1==0)){
							if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="b"){
								count_1++
							}else if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="."){
								count_2++
							}
						}
					}
				}
				for (var x1=-1;x1<=1;x1++){
					for (var y1=-1;y1<=1;y1++){
						if(!(x1==0 && y1==0)){
							if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && seen_board[x+x1+(y+y1)*20]=="."){
								if(prob_board[y+y1][x+x1]+100*((seen_board[x+y*20]-count_1)/count_2)!=NaN){
									prob_board[y+y1][x+x1]=prob_board[y+y1][x+x1]+100*((seen_board[x+y*20]-count_1)/count_2)
								}
								if(100*((seen_board[x+y*20]-count_1)/count_2)==100 && lost==false){
									seen_board=Change_Board(seen_board,x+x1+(y+y1)*20,"b")
									prob_board[y+y1][x+x1]=0
									change=true
									console.log("Placed bomb 1",x+x1,(y+y1))
								}
							}
						}
					}
				}
			}
		}
	}
	if(change==false && Solved()==false){
		largest=[0,0,-1]
		for (var x=0;x<20;x++){
			for (var y=0;y<20;y++){
				if(prob_board[y][x]>largest[0]){
					largest=[prob_board[y][x],x,y]
				}
			}
		}
		if(largest[2]!=-1){
			seen_board=Change_Board(seen_board,largest[1]+largest[2]*20,"b")
			console.log("Placed bomb 2",largest[1],largest[2])
		}
	}
	if (lost==true){
		console.log(prob_board)
	}
}
function Solved(){
	return seen_board==board
}

function Start_Board(){
	var bombs=50;
	while(bombs>=0){
		var x=Math.floor(Math.random() * 20);
		var y=Math.floor(Math.random() * 20);
		if(board[x+y*20]!="b"){
			board = Change_Board(board,x+y*20,"b")
			bombs--
		}
	}
	for (var x=0;x<20;x++){
		for (var y=0;y<20;y++){
			if(board[x+y*20]!="b"){
				var count=0
				for (var x1=-1;x1<=1;x1++){
					for (var y1=-1;y1<=1;y1++){
						if(!(x1==0 && y1==0)){
							if (x+x1>=0 && x+x1<20 && y+y1>=0 && y+y1<20 && board[x+x1+(y+y1)*20]=="b"){
								count++
							}
						}
					}
				}
				board = Change_Board(board,x+y*20,count)
			}
		}		
	}
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var lost=false
var board = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
var seen_board = "................................................................................................................................................................................................................................................................................................................................................................................................................";
Start_Board()
Choose_Square(board.indexOf("0"))
count=0
while(Solved()==false && lost==false && count<1000){
	Ai()
	Print_Board(seen_board)
	count++
}
Print_Board(board)
Print_Board(seen_board)
console.log(count,lost,Solved())
Game_State_Display()
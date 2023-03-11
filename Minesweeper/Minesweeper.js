async function Game_State_Display(){
	if(death==true){
		var index=Math.min(Math.floor((Date.now()-death_time)/150)-1,mines.length-1)
		if(index>=0){
			uncovered_board=uncovered_board.slice(0,mines[index][0])+"1"+uncovered_board.slice(mines[index][0]+1,uncovered_board.length)
		}
	}
	f.load().then(async function(font) { document.fonts.add(font)
		ctx.fillStyle="#4a752c";
		ctx.fillRect(0,0,500,50);
		for(i=0;i<mines.length;i++){
			ctx.fillStyle=mines[i][1];
			var x=mines[i][0]%20;
			var y=Math.floor(mines[i][0]/20);
			ctx.fillRect(x*25,y*25+50,25,25);
			drawCircle(ctx, x*25+12.5, y*25+50+12.5, 6, mines[i][2], mines[i][2], 0);
		}
		for(y=0;y<20;y++){
			for(x=0;x<20;x++){
				if(board[x+y*20]!="b"){
					if((x+y)%2==0){
						ctx.fillStyle="#e5c29f";
					}else{
						ctx.fillStyle="#d7b899";
					}
					ctx.fillRect(x*25,y*25+50,25,25);

					if(board[x+y*20]!="0"){
						ctx.fillStyle=colours2[parseInt(board[x+y*20])-1];
						ctx.font = 'bold 15px PressStart2P-Regular';
						ctx.textAlign = "center";
						ctx.fillText(board[x+y*20],x*25+12.5,y*25+19+50)
					}
				}
				if(uncovered_board[x+y*20]!="1"){
					if((x+y)%2==0){
						ctx.fillStyle="#aad751";
					}else{
						ctx.fillStyle="#a2d149";
					}
					ctx.fillRect(x*25,y*25+50,25,25);
				}
				if(uncovered_board[x+y*20]=="2"){
					ctx.drawImage(flag, x*25,y*25+50);
				}
			}
		}
		for(y=0;y<20;y++){
			for(x=0;x<20;x++){
				if(board[x+y*20]!="0" && uncovered_board[x+y*20]=="1" && board[x+y*20]!="b"){
					ctx.strokeStyle="#7ca234";
					ctx.lineWidth=2
					if(x-1>=0 && uncovered_board[x-1+y*20]!="1" || x-1>=0 && board[x-1+y*20]=="b"){
						ctx.beginPath();
						ctx.moveTo(x*25, y*25+50-1);
						ctx.lineTo(x*25, y*25+50+26);
						ctx.stroke();
					}
					if(x+1<=19 && uncovered_board[x+1+y*20]!="1" || x+1<=19 && board[x+1+y*20]=="b"){
						ctx.beginPath();
						ctx.moveTo(x*25+25, y*25+50-1);
						ctx.lineTo(x*25+25, y*25+50+26);
						ctx.stroke();
					}
					if(y+1<=19 && uncovered_board[x+(y+1)*20]!="1" || y+1<=19 && board[x+(y+1)*20]=="b"){
						ctx.beginPath();
						ctx.moveTo(x*25-1, y*25+25+50);
						ctx.lineTo(x*25+26, y*25+25+50);
						ctx.stroke();
					}
					if(y-1>=0 && uncovered_board[x+(y-1)*20]!="1" || y-1>=0 && board[x+(y-1)*20]=="b"){
						ctx.beginPath();
						ctx.moveTo(x*25-1, y*25+50);
						ctx.lineTo(x*25+26, y*25+50);
						ctx.stroke();
					}
				}
			}
		}
		ctx.drawImage(clock, 100, 7);
		ctx.fillStyle="#FFFFFF"
		ctx.font = 'bold 20px PressStart2P-Regular';
		ctx.textAlign = "left"
		ctx.fillText(Math.floor((Date.now()-death_time)/1000).toString(),143,34)

		if(death==true){
			await Sleep(100);
			Game_State_Display();
		}else{
			await Sleep(750);
			Game_State_Display();			
		}
	});
}
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth){
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
function Start_Board(x_,y_){
	var bombs=60;
	while(bombs>=0){
		x=Math.floor(Math.random() * 20);
		y=Math.floor(Math.random() * 20);
		if(board[x+y*20]!="b" && x!=x_ && y!=y_){
			board=board.slice(0,x+y*20)+"b"+board.slice(1+x+y*20,401)
			bombs--
			var r = Math.floor(Math.random() * 8);
			mines.push([x+y*20,colours[r][0],colours[r][1]])
			for(x_c=-1;x_c<2;x_c++){
				for(y_c=-1;y_c<2;y_c++){
					if(x+x_c>=0 && x+x_c<=19 && y+y_c>=0 && y+y_c<=19 && board[x+x_c+(y+y_c)*20]!="b"){
						board=board.slice(0,x+x_c+(y+y_c)*20)+(parseInt(board[x+x_c+(y+y_c)*20])+1).toString()+board.slice(1+x+x_c+(y+y_c)*20,401)
					}
				}
			}
		}
	}
}
function in_past_check(x,y){
	for(i=0;i<past.length;i=i+2){
		if(past[i]==x && past[i+1]==y){
			return true
		}
	}
	return false
}
function add_0(x,y){
	past.push(x)
	past.push(y)
	for(var x_c=-1;x_c<2;x_c++){
		for(var y_c=-1;y_c<2;y_c++){
			if(x+x_c>=0 && x+x_c<=19 && y+y_c>=0 && y+y_c<=19){
				uncovered_board=uncovered_board.slice(0,x+x_c+(y+y_c)*20)+"1"+uncovered_board.slice(x+x_c+1+(y+y_c)*20,401);
				if(board[x+x_c+(y+y_c)*20]=="0" && !(in_past_check(x+x_c,y+y_c))){
					add_0(x+x_c,y+y_c)
				}
			}
		}
	}
}
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getXY(canvas, event){
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return [x,y]
}
document.addEventListener("click",  function (e) {
    const XY = getXY(canvas, e)
    console.log(e.button)
	XY[1]=XY[1]-50
    if(XY[0]>=0 && XY[1]>=0 && XY[1]<=500 && XY[0]<=500 && death==false){
    	var x = Math.floor(XY[0]/25);
		var y = Math.floor(XY[1]/25);
	    if(e.button==0 && keys[32]==true){
			if(uncovered_board[x+y*20]=="2"){
				uncovered_board=uncovered_board.slice(0,x+y*20)+"0"+uncovered_board.slice(x+y*20+1,401);
			}else if(uncovered_board[x+y*20]=="0"){
				uncovered_board=uncovered_board.slice(0,x+y*20)+"2"+uncovered_board.slice(x+y*20+1,401);
			}
		}else if(e.button==0 && keys[32]==false){
			if(uncovered_board[x+y*20]=="0"){
			    if(board=="0".repeat(400)){
			    	Start_Board(x,y);
			    }
			    uncovered_board=uncovered_board.slice(0,x+y*20)+"1"+uncovered_board.slice(x+y*20+1,401);
				if(board[x+y*20]=="0"){
					add_0(x,y)
					past=[];
				}else if(board[x+y*20]=="b"){
					death=true;
					death_time=Date.now();
				}
			}
		}
	}
	Game_State_Display();
});
document.body.addEventListener("keydown", function (e) {
	if(e.keyCode==32 && death==true){
		Variable_Initialize();
	}
	keys[e.keyCode]=true;
});
document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode]=false;
});
function Variable_Initialize(){
	death = false;
	board = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
	uncovered_board = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
	past=[];
	mines=[];
	death_time=Date.now();
	Game_State_Display();
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var flag = new Image()
flag.src = "flag.png"
var clock = new Image()
clock.src = "clock.png"
var keys=[];
keys[32]=false
var f = new FontFace('PressStart2P-Regular', 'url(Helvetica-Neue.otf)');
var colours=[["#b648f2","#762f9d"],["#ed44b5","#9a2c76"],["#48e6f1","#2f969d"],["#4885ed","#2f569a"],["#f4840d","#9f5608"],["#f4c20d","#9f7e08"],["#db3236","#8e2123"],["#008744","#00582c"]];
var colours2=["#2179d0","#388e3c","#d32f2f","#7e249c","#ff8d32","#0098a5","#424242","#9f9e9e"]
Variable_Initialize();
function Game_State_Display(){
	ctx.drawImage(img1,0,0,500,500,0,0,500,500);
	for (y=0;y<4;y++){
	    for (x=0;x<4;x++){
	    	if (Board[y][x]!==null){
		    	if (Board[y][x]<2049){
		    		var img2 = new Image()
						img2.src = Board[y][x].toString()+".png"
					if (frame>10){
						frame=10;
					}
					if(yBoard[y][x]!==null){
						ydeviation=(10-frame)*(yBoard[y][x]*(-121/10));
					}else{
						ydeviation=0;
					}
					if(xBoard[y][x]!==null){
						xdeviation=(10-frame)*(xBoard[y][x]*(-121/10));
					}else{
						xdeviation=0;
					}
		    		ctx.drawImage(img2,0,0,640,640,x*121+15+xdeviation,y*121+15+ydeviation,107,107);
		    	}else{
		    		var img2 = new Image()
					img2.src = "4096.png"
					var xa=x
					var ya=y
		    		ctx.drawImage(img2,0,0,640,640,x*121+15,y*121+15,107,107);	
					f.load().then(function(font) { document.fonts.add(font)
					ctx.font = 'bold 30px PressStart2P-Regular';
					ctx.fillStyle = "white";
					ctx.textAlign = "center";
					ctx.fillText(Board[ya][xa], xa*121+15+53,ya*121+15+64);
					});						    		
		    	}
		    }
	    }
	}
	frame=frame+2.5
}
function Check_Death(){
	Death=true
		full=true
		for (y=0;y<4;y++){
		    for (x=0;x<4;x++){
		    	if (Board[y][x]==null){
		    		Death=false
		    	}
		    }
		}
	for (i=0;i<4;i++){
		y=-1
		for (x=i;x>-1;x=x-1){
			y=y+1
			if (y+1<4 && Board[y][x]==Board[y+1][x]){
				Death=false;
			}else if(x+1<4 && Board[y][x]==Board[y][x+1]){
				Death=false;
			}
		}
	}
	for (i=1;i<4;i++){
		y=4
		for (x=i;x<4;x=x+1){
			y=y-1
			if (y+1<4 && Board[y][x]==Board[y+1][x]){
				Death=false;
			}else if(x+1<4 && Board[y][x]==Board[y][x+1]){
				Death=false;
			}
		}
	}
}
function Move_Up(){
	for (x=0;x<4;x++){
		for (y=0;y<4;y++){
			if(Board[y][x]!==null){
				var number=Board[y][x]
				var i=1;
				while (y-(i)!==-1 && Board[y-i][x]==null){
					Board[y-(i-1)][x]=null;
					Board[y-i][x]=number;
					yBoard[y-(i-1)][x]=null;
					yBoard[y-i][x]=-i;
					var i=i+1;
				}
				if(y-i!==-1 && Board[y-i][x]==number){
					Board[y-(i-1)][x]=null;
					Board[y-i][x]=number*2;
					yBoard[y-(i-1)][x]=null;
					yBoard[y-i][x]=-i;
				}
			}
		}
	}
}
function Move_Down(){
	for (x=0;x<4;x++){
		for (y=3;y>-1;y=y-1){
			if(Board[y][x]!==null){
				var number=Board[y][x]
				var i=1;
				while (y+(i)!==4 && Board[y+i][x]==null){
					Board[y+(i-1)][x]=null;
					Board[y+i][x]=number;
					yBoard[y+(i-1)][x]=null;
					yBoard[y+i][x]=i;
					var i=i+1;
				}
				if(y+(i)!==4 && Board[y+i][x]==number){
					Board[y+(i-1)][x]=null;
					Board[y+i][x]=number*2;
					yBoard[y+(i-1)][x]=null;
					yBoard[y+i][x]=i;
				}
			}
		}
	}
}
function Move_Left(){
	for (y=0;y<4;y++){
		for (x=0;x<4;x++){
			if(Board[y][x]!==null){
				var number=Board[y][x]
				var i=1;
				while (x-(i)!==-1 && Board[y][x-i]==null){
					Board[y][x-(i-1)]=null;
					Board[y][x-i]=number;
					xBoard[y][x-(i-1)]=null;
					xBoard[y][x-i]=-i;
					var i=i+1;
				}
				if(x-(i)!==-1 && Board[y][x-i]==number){
					Board[y][x-(i-1)]=null;
					Board[y][x-i]=number*2;
					xBoard[y][x-(i-1)]=null;
					xBoard[y][x-i]=-i;
				}
			}
		}
	}
}
function Move_Right(){
	for (y=0;y<4;y++){
		for (x=3;x>-1;x=x-1){
			if(Board[y][x]!==null){
				var number=Board[y][x]
				var i=1;
				while (x+(i)!==4 && Board[y][x+i]==null){
					Board[y][x+(i-1)]=null;
					Board[y][x+i]=number;
					xBoard[y][x+(i-1)]=null;
					xBoard[y][x+i]=i;
					var i=i+1;
				}
				if(x+(i)!==4 && Board[y][x+i]==number){
					Board[y][x+(i-1)]=null;
					Board[y][x+i]=number*2;
					xBoard[y][x+(i-1)]=null;
					xBoard[y][x+i]=i;
				}
			}
		}
	}
}
function Spawn2(){
	if (Death==false){
		full=true;
		for (y=0;y<4;y++){
	    for (x=0;x<4;x++){
	    	if (Board[y][x]==null){
	    		full=false;
	    	}
	    }
		}
		if (full==false){
			var ya=Math.floor(Math.random() * 4);
			var xa=Math.floor(Math.random() * 4);
			while(Board[ya][xa]!==null ){
				var ya=Math.floor(Math.random() * 4);
				var xa=Math.floor(Math.random() * 4);			
			}
			var sd=(Math.floor(Math.random() * 11));
			if (sd<10){
				Board[ya][xa]=2;
			}else{
				Board[ya][xa]=4;
			}
		}
	}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}	
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
if (typeof(Storage) !== "undefined") {
	var Board=window.localStorage.getItem('Board');
	console.log(Board)
	if (Board==null){
		var Board=[[null,null,null,null],
		[null,null,null,null],
		[null,null,null,null],
		[null,null,null,null]];
	}else{
		var Board=JSON.parse(window.localStorage.getItem('Board'));
		console.log(Board)
	}
}
var f = new FontFace('PressStart2P-Regular', 'url(ClearSans-Bold.ttf)');
var img1 = new Image()
img1.src = "Board.png"
var keys=[];
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var xBoard=[[null,null,null,null],
[null,null,null,null],
[null,null,null,null],
[null,null,null,null]];
var yBoard=[[null,null,null,null],
[null,null,null,null],
[null,null,null,null],
[null,null,null,null]];
var Death=false;
var previous_Board=[[null,null,null,null],
[null,null,null,null],
[null,null,null,null],
[null,null,null,null]];
Spawn2();
Spawn2();
var frame=0;
var end2=0
var start2=0
var move_finished2=false
function gameLoop() {
	if (move_finished2==true){
	    move_finished2=false;
	    start2=Date.now();
	}else{
	    end2=Date.now();
	    if (end2-start2>=10){
	    	window.localStorage.setItem('Board',JSON.stringify(Board));
	    	move_finished2=true
			if (Death==false){
				keys[32]=false;
				if(keys[87] || keys[38]){
					frame=0;
					xBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					yBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					previous_Board = JSON.parse(JSON.stringify( Board ));
					Move_Up();
					keys[87]=false;
					keys[38]=false;
					Check_Death();
					Spawn2();
				}else if(keys[83] || keys[40]){
					xBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					yBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					previous_Board = JSON.parse(JSON.stringify( Board ));
					Move_Down();
					frame=0;
					keys[83]=false;
					keys[40]=false;
					Check_Death();
					Spawn2();
				}else if(keys[65] || keys[37]){
					xBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					yBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					previous_Board = JSON.parse(JSON.stringify( Board ));
					Move_Left();
					frame=0;
					keys[65]=false;
					keys[37]=false
					Check_Death();
					Spawn2();
				}else if(keys[68] || keys[39]){
					xBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					yBoard=[[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null],
					[null,null,null,null]];
					keys[68]=false
					keys[39]=false
					previous_Board = JSON.parse(JSON.stringify( Board ));
					Move_Right();
					frame=0;
					Check_Death();
					Spawn2();			
				}
			}else if(keys[32]){
				keys=[]
				Board=[[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]];
				Death=false;
				previous_Board=[[]]
				Spawn2();
				Spawn2();			
			}
			Game_State_Display();
		}
	}
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
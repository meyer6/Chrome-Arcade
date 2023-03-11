class Snake{
	constructor(head,direction){
		this.head=head;
		this.direction=direction;
	}
	spawn(){

		Board[this.head[0]][this.head[1]]='#42b0f5'
	}
	move_forward(){
		if (move_finished==true){
            move_finished=false;
            start=Date.now();
        }else{
            end=Date.now();
            if (end-start>=120){
				if (keys[87] && this.direction[0]!==1){
					this.direction=[-1,0];
					keys[87]=false;

				}else if (keys[83] && this.direction[0]!==-1){
					this.direction=[1,0];
					keys[83]=false;

				}else if (keys[68] && this.direction[1]!==-1){
					this.direction=[0,1];
					keys[68]=false;

				}else if (keys[65] && this.direction[1]!==1){
					this.direction=[0,-1];
					keys[65]=false;

				}
                move_finished=true;
                if (Death==false && this.head[0]+(1*this.direction[0])>-1 && this.head[0]+(1*this.direction[0])<17 && this.head[1]+(1*this.direction[1])>-1 && this.head[1]+(1*this.direction[1])<17){
                	if (Board[this.head[0]+(1*this.direction[0])][this.head[1]+(1*this.direction[1])]==null|| Board[this.head[0]+(1*this.direction[0])][this.head[1]+(1*this.direction[1])]=="#f03c2b"){
		                Board[this.head[0]][this.head[1]]=null;
		                this.head=[this.head[0]+(1*this.direction[0]),this.head[1]+(1*this.direction[1])]

						if (this.head[0]==apple[0] && this.head[1]==apple[1]){
							points=points+1
							var ya=Math.floor(Math.random() * 17);
							var xa=Math.floor(Math.random() * 17);
							while(Board[ya][xa]!==null || ya==16){
								var ya=Math.floor(Math.random() * 17);
								var xa=Math.floor(Math.random() * 17);			
							}
							apple=[ya,xa];
							console.log(apple)
							Board[apple[0]][apple[1]]="#f03c2b"
							body.push([ (body[body.length-1][0]) - (body_direction[body_direction.length-1][0])  , (body[body.length-1][1]) - (body_direction[body_direction.length-1][1]) ])
							body_direction.push([body_direction[body_direction.length-1]])
						}
		                body_direction.splice(0, 0, this.direction);
		                body_direction.splice(body_direction.length-1, 1);
						for (i=0;i<body.length;i++){
							Board[body[i][0]][body[i][1]]=null;
							body[i][0]=body[i][0]+body_direction[i][0]
							body[i][1]=body[i][1]+body_direction[i][1]
						} 
		                for (i=0;i<body.length;i++){
		                	if (body.length<37){
		                		colour=body_colours[i]
		                	}else{
		                		var colour=body_colours[Math.floor((36/body.length)*i)]
		                	}
		                	Board[body[i][0]][body[i][1]]=colour;
	                	}
	                }else{
	                	Death=true;
	                }
	            }else{
	            	Death=true;
	            }
            }
        }
	}
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
}
function roundRect(x, y, w, h, radius)
{
	var canvas = document.getElementById("Screen");
	var ctx = canvas.getContext('2d');
	var r = x + w;
	var b = y + h;
	ctx.beginPath();
	ctx.strokeStyle="#4D6BF9";
	ctx.lineWidth="8";
	ctx.moveTo(x+radius, y);
	ctx.lineTo(r-radius, y);
	ctx.quadraticCurveTo(r, y, r, y+radius);
	ctx.lineTo(r, y+h-radius);
	ctx.quadraticCurveTo(r, b, r-radius, b);
	ctx.lineTo(x+radius, b);
	ctx.quadraticCurveTo(x, b, x, b-radius);
	ctx.lineTo(x, y+radius);
	ctx.quadraticCurveTo(x, y, x+radius, y);
	ctx.stroke();
}
function Game_State_Display(){
	var canvas = document.getElementById("Screen");
	var ctx = canvas.getContext('2d');
	ctx.fillStyle='#4a752c';
	ctx.fillRect(0, 0, 550, 31);
	ctx.fillStyle='#568a34';
	ctx.fillRect(0, 31, 550, 550);
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 20px PressStart2P-Regular';
		ctx.fillStyle = "black";
		ctx.textAlign = "center";		
		ctx.fillText("Score: "+points, 115, 22);

	});	
	for (y=0;y<17;y=y+2){
	    for (x=0;x<17;x=x+2){
			ctx.fillStyle='#aad751';
			ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
	    }
	}
	for (y=1;y<17;y=y+2){
	    for (x=1;x<17;x=x+2){
			ctx.fillStyle='#aad751';
			ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
	    }
	}
	for (y=0;y<17;y=y+2){
	    for (x=1;x<17;x=x+2){
			ctx.fillStyle='#a2d149';
			ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
	    }
	}
	for (y=1;y<17;y=y+2){
	    for (x=0;x<17;x=x+2){
			ctx.fillStyle='#a2d149';
			ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
	    }
	}

	for (y=0;y<17;y++){
	    for (x=0;x<17;x++){
	    	if (Board[y][x]!==null){
	    		if (Board[y][x]=='#f03c2b'){
	    			const img = new Image()
					img.src = "apple.png"
					ctx.drawImage(img,0,0,128,128,x*(30)+13,y*(30)+12+31,40,40);
	    		}else{
					ctx.fillStyle=Board[y][x];
					ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
				}
			}
	    }
	}
	if (Death==true){
		var posX = (canvas.width / 2) - 100;
		var posY = (canvas.height / 2) - 100;

		ctx.roundRect(127, 172, 300, 220,30);

		ctx.fillStyle = 'rgba(77,193,249, 1)';
		ctx.fill();		
		roundRect(127, 172, 300, 220,30);

		f.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 40px PressStart2P-Regular';
			ctx.textAlign = "center";
			ctx.fillStyle = "#000000";		
			ctx.fillText("Game Over!", 277, 235);
			ctx.fillText("Press Space", 277, 295);
			ctx.fillText("to Restart!", 277, 355);
		});	
	}
	if (typeof(Storage) !== "undefined") {
		strscore=points.toString();
	    var High_Score=window.localStorage.getItem('High_score')
	    var int_High_Score=parseInt(High_Score);
	    if (points>int_High_Score){
	    	window.localStorage.setItem('High_score', strscore);
	   	}
	}
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 20px PressStart2P-Regular';
		ctx.fillStyle = "black";
		ctx.textAlign = "center";		
		ctx.fillText("High Score: "+High_Score, 400, 22);
	});		
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
if (typeof(Storage) !== "undefined") {
	var High_Score=window.localStorage.getItem('High_score')
	if (High_Score==null){
		var Board=[[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
		var points=0;
		var body=[[7,7]];
		var body_direction=[[0,1]];
		var ya=Math.floor(Math.random() * 17);
		var xa=Math.floor(Math.random() * 17);
		while(Board[ya][xa]!==null || ya==16){
			var ya=Math.floor(Math.random() * 17);
			var xa=Math.floor(Math.random() * 17);			
		}
		Board[ya][xa]="#f03c2b"
		let Snake_class1=new Snake([7,7],[0,1])
		var Snake_class_array=[Snake_class1];
		Snake_class=Snake_class_array[0]
		var apple=[ya,xa];
		window.localStorage.setItem('High_score', "0");
	}else{
		var High_Score=window.localStorage.getItem('High_score')
		Board=JSON.parse(window.localStorage.getItem('Board'));
		var body=JSON.parse(window.localStorage.getItem('body'));
		var body_direction=JSON.parse(window.localStorage.getItem('body_direction'));
		var points=parseInt(window.localStorage.getItem('points'))
		var apple=JSON.parse(window.localStorage.getItem('apple'));
		var head=JSON.parse(window.localStorage.getItem('head'));
		var direction=JSON.parse(window.localStorage.getItem('direction'));
		let Snake_class1=new Snake(head,direction)
		var Snake_class_array=[Snake_class1];
		Snake_class=Snake_class_array[0]
		Board[apple[0]][apple[1]]="#f03c2b"
	}
}
var keys=[];
var keyup=false;
var keyup2=false;
var f = new FontFace('PressStart2P-Regular', 'url(Yomogi-Regular.ttf)');
var Death=false;
var move_finished=true;
var start=0;
var end=0;
var i=0;
var body_colours=["#3c3ffa","#3d44fa","#3d48fa","#3e4df9","#3e52f9","#3f56f9","#3f5bf9","#405ff8","#4063f8","#4168f8","#416cf8","#4271f7","#4275f7","#4379f7","#437df7","#4482f6","#4486f6","#458af6","#458ef6","#4692f6","#4696f5","#479af5","#479ef5","#48a2f5","#48a6f4","#49aaf4","#49aef4","#4ab2f4","#4ab5f4","#4bb9f3","#4bbdf3","#4cc1f3","#4cc4f3","#4dc8f2","#4dcbf2","#4ecff2"]

Snake_class.spawn();
function gameLoop(){
	sleep(50).then(() => { 
		if (points==288){
			points=289;
			death=true;
		}	
		if(Death==false){
			keys[32]=false;
			Snake_class.move_forward();
			window.localStorage.setItem('points',points.toString());
			window.localStorage.setItem('Board',JSON.stringify(Board));
			window.localStorage.setItem('body',JSON.stringify(body));
			window.localStorage.setItem('body_direction',JSON.stringify(body_direction));
			window.localStorage.setItem('apple',JSON.stringify(apple));
			window.localStorage.setItem('head',JSON.stringify(Snake_class.head));
			window.localStorage.setItem('direction',JSON.stringify(Snake_class.direction));	
			Game_State_Display();
		}else{
			if (keys[32]){
				keys[32]=false;
				body=[[7,7]];
				body_direction=[[0,1]];
				var d=0
				for (i=0;i<17;i++){
					for (d=0;d<17;d++){
						Board[d][i]=null;
					}
				}
				points=0
				let Snake_class2=new Snake([7,7],[0,1])
				Snake_class_array=[Snake_class2];
				Snake_class=Snake_class_array[0]
				Snake_class.spawn();
				ya=Math.floor(Math.random() * 17);
				xa=Math.floor(Math.random() * 17);
				while(Board[ya][xa]!==null || ya==16){
					ya=Math.floor(Math.random() * 17);
					xa=Math.floor(Math.random() * 17);			
				}
				apple=[ya,xa];
				Board[ya][xa]="#f03c2b"
				Death=false;
			}
		}
	});
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
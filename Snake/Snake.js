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
            if (end-start>=100){
            	var del=0
            	for(i=0;i<backlog.length;i++){
            		if (end-backlog[i][2]>250 || this.direction[0]**2==backlog[i][0]**2){
            			del++
            		}else{
            			break;
            		}
            	}
            	for(i=0;i<del;i++){
            		backlog.shift()
            	}
            	if (backlog.length!=0){
            		this.direction=JSON.parse(JSON.stringify([backlog[0][0],backlog[0][1]]))
            		backlog.shift();
            	}
            	frame=1;
		        move_finished=true;
		        if (Death==false && this.head[0]+(1*this.direction[0])>-1 && this.head[0]+(1*this.direction[0])<17 && this.head[1]+(1*this.direction[1])>-1 && this.head[1]+(1*this.direction[1])<17){
		        	if (Board[this.head[0]+(1*this.direction[0])][this.head[1]+(1*this.direction[1])]==null|| Board[this.head[0]+(1*this.direction[0])][this.head[1]+(1*this.direction[1])]=="#f03c2b"){
			            Board[this.head[0]][this.head[1]]=null;
			            this.head=[this.head[0]+(1*this.direction[0]),this.head[1]+(1*this.direction[1])]
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
			            for (i=0;i<body_direction.length;i++){
			            	Board_directionx[body[i][0]][body[i][1]]=body_direction[i][1]
			            	Board_directiony[body[i][0]][body[i][1]]=body_direction[i][0]
			            }
				        if (this.head[0]==apple[0] && this.head[1]==apple[1]){
				        	img = images[Math.floor(Math.random()*images.length)];
				        	points=points+1
							var ya=Math.floor(Math.random() * 17);
							var xa=Math.floor(Math.random() * 17);
							while(Board[ya][xa]!==null || ya==16){
								var ya=Math.floor(Math.random() * 17);
								var xa=Math.floor(Math.random() * 17);			
							}
							apple=[ya,xa];
							Board[apple[0]][apple[1]]="#f03c2b"
							body.push([ (body[body.length-1][0]) - (body_direction[body_direction.length-1][0])  , (body[body.length-1][1]) - (body_direction[body_direction.length-1][1]) ])
							body_direction.push([body_direction[body_direction.length-1]])
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
	if (frame>5){
		frame=5;
	}
	for (y=0;y<17;y++){
	    for (x=0;x<17;x++){
	    	if (Board[y][x]!==null){
				var y_deviation=Board_directiony[y][x]
				var x_deviation=Board_directionx[y][x]
				var x_deviation2=0
				var y_deviation2=0
				if (y_deviation==-1){
					y_deviation2=30
				}else if (y_deviation==1){
					y_deviation2=-30
				}
				if (x_deviation==-1){
					x_deviation2=30
				}else if (x_deviation==1){
					x_deviation2=-30
				}
			    for (i=1;i<body.length-1;i++){	
					if (y==body[i][0] && x==body[i][1]){
						var index=i
					}
				}
	    		if (y==body[0][0] && x==body[0][1]){
	    			if (body_direction[0][0]==0 && body_direction[0][1]==1){
		    			var headr = new Image()
						headr.src = "headr.png"
						ctx.drawImage(headr,0,0,128,128,x*(30)+18+6*frame*x_deviation+x_deviation2,y*(30)+8+31+6*frame*y_deviation+y_deviation2,128,128);
	    			}
	    			if (body_direction[0][0]==0 && body_direction[0][1]==-1){
		    			var headl = new Image()
						headl.src = "headl.png"
						ctx.drawImage(headl,0,0,128,128,x*(30)+18-30+6*frame*x_deviation+x_deviation2,y*(30)+9+31+6*frame*y_deviation+y_deviation2,128,128);
	    			}
	    			if (body_direction[0][0]==1 && body_direction[0][1]==0){
		    			var headd = new Image()
						headd.src = "headd.png"
						ctx.drawImage(headd,0,0,128,128,x*(30)+18-9+6*frame*x_deviation+x_deviation2,y*(30)+8+41+6*frame*y_deviation+y_deviation2,128,128);
	    			}
	    			if (body_direction[0][0]==-1 && body_direction[0][1]==0){
		    			var headu = new Image()
						headu.src = "headu.png"
						ctx.drawImage(headu,0,0,128,128,x*(30)+17-9+6*frame*x_deviation+x_deviation2,y*(30)+8+11+6*frame*y_deviation+y_deviation2,128,128);
	    			}
	    		}else if (Board[y][x]=='#f03c2b'){
					ctx.drawImage(img,0,0,128,128,x*(30)+13,y*(30)+12+31,40,40);
	    		}else if(y==body[body.length-1][0] && x==body[body.length-1][1]){
					ctx.beginPath();
					if (body_direction[body_direction.length-1]!==body_direction[body_direction.length]){
						var y_deviation=Board_directiony[body[body.length-2][0]][body[body.length-2][1]]
						var x_deviation=Board_directionx[body[body.length-2][0]][body[body.length-2][1]]
						var x_deviation2=0
						var y_deviation2=0
						if (y_deviation==-1){
							y_deviation2=30
						}else if (y_deviation==1){
							y_deviation2=-30
						}
						if (x_deviation==-1){
							x_deviation2=30
						}else if (x_deviation==1){
							x_deviation2=-30
						}						 
					} 
					ctx.fillStyle = Board[y][x];
					ctx.arc(x*(30)+15+18+6*frame*x_deviation+x_deviation2+x_deviation*15, y*(30)+18+15+31+6*frame*y_deviation+y_deviation2+y_deviation*15, 15, 0, 2 * Math.PI, false);
					ctx.fill();
 					ctx.fillRect(x* (30)+18+6*frame*body_direction[body_direction.length-2][1], y*(30)+18+31+6*frame*body_direction[body_direction.length-2][0], 30, 30);	
 	    		}else if(body_direction[index][0]!=body_direction[index-1][0] && body_direction[index][1]!=body_direction[index-1][1]){
	    			if((y+x)%2==0){
						ctx.fillStyle='#aad751';
						ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);
	    			}else{
						ctx.fillStyle='#a2d149';
						ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);	    				
	    			}
	    			if(body_direction[index][0]==0 && body_direction[index][1]==1 && body_direction[index-1][0]==-1 && body_direction[index-1][1]==0){
	    				var start_radians=0
	    				var end_radians=0.5
	    				var x_change=0
	    				var y_change=0
	    			}else if(body_direction[index][0]==1 && body_direction[index][1]==0 && body_direction[index-1][0]==0 && body_direction[index-1][1]==-1){
	    				var start_radians=0
	    				var end_radians=0.5
	    				var x_change=0
	    				var y_change=0
	    			}else if(body_direction[index][0]==0 && body_direction[index][1]==1 && body_direction[index-1][0]==1 && body_direction[index-1][1]==0){
	    				var start_radians=1.5
	    				var end_radians=2
	    				var x_change=0
	    				var y_change=1
	    			}else if(body_direction[index][0]==-1 && body_direction[index][1]==0 && body_direction[index-1][0]==0 && body_direction[index-1][1]==-1){
	    				var start_radians=1.5
	    				var end_radians=2
	    				var x_change=0
	    				var y_change=1
	    			}else if(body_direction[index][0]==0 && body_direction[index][1]==-1 && body_direction[index-1][0]==1 && body_direction[index-1][1]==0){
	    				var start_radians=1
	    				var end_radians=1.5
	    				var x_change=1
	    				var y_change=1
	    			}else if(body_direction[index][0]==-1 && body_direction[index][1]==0 && body_direction[index-1][0]==0 && body_direction[index-1][1]==1){
	    				var start_radians=1
	    				var end_radians=1.5
	    				var x_change=1
	    				var y_change=1
	    			}else if(body_direction[index][0]==1 && body_direction[index][1]==0 && body_direction[index-1][0]==0 && body_direction[index-1][1]==1){
	    				var start_radians=0.5
	    				var end_radians=1
	    				var x_change=1
	    				var y_change=0
	    			}else if(body_direction[index][0]==0 && body_direction[index][1]==-1 && body_direction[index-1][0]==-1 && body_direction[index-1][1]==0){
	    				var start_radians=0.5
	    				var end_radians=1
	    				var x_change=1
	    				var y_change=0
	    			}
	    			ctx.beginPath();
					ctx.fillStyle = Board[y][x];
					ctx.moveTo(x*(30)+18+x_change*30, y*(30)+18+31+y_change*30);
					ctx.arc(x*(30)+18+x_change*30, y*(30)+18+31+y_change*30,30, Math.PI*start_radians, Math.PI*end_radians, false);
					ctx.lineTo(x*(30)+18+x_change*30, y*(30)+18+31+y_change*30);
					ctx.fill();
				}else{
					ctx.fillStyle = Board[y][x];
					ctx.fillRect(x*(30)+18, y*(30)+18+31, 30, 30);	
				}
			}
		}
	}
	frame=frame+1
	if (Death==true){
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 31, 550, 551);
		ctx.globalAlpha =1;
		ctx.drawImage(Death_Screen,147,147+15)
		f1.load().then(function(font) { document.fonts.add(font)
			ctx.font = 'bold 25px OtomanopeeOne-Regular';
			ctx.fillStyle = "black";
			ctx.textAlign = "center";		
			ctx.fillText(points, 229, 263+15);
			ctx.fillText(High_Score, 228+86, 263+15);
		});	
	}
	if (typeof(Storage) !== "undefined") {
		strscore=points.toString();
	    var High_Score=window.localStorage.getItem('Snake_High_score')
	    var int_High_Score=parseInt(High_Score);
	    if (points>int_High_Score){
	    	window.localStorage.setItem('Snake_High_score', strscore);
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
	if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}
    keys[e.keyCode] = true;
    if (Death==false){
		if (keys[87] && Snake_class.direction[0]!==1 || keys[38] && Snake_class.direction[0]!==1){
			keys[87]=false;
		 	keys[38]=false;
		 	backlog.push([-1,0,Date.now()])
		}else if (keys[83] || keys[40]){
			keys[83]=false;
			keys[40]=false;
			backlog.push([1,0,Date.now()])
		}else if (keys[68]|| keys[39]){
			keys[68]=false;
			keys[39]=false;
			backlog.push([0,1,Date.now()])
		}else if (keys[65] || keys[37] ){
			keys[65]=false;		
			keys[37]=false;
			backlog.push([0,-1,Date.now()])
		}
	}
});
if (typeof(Storage) !== "undefined") {
	var High_Score=window.localStorage.getItem('Snake_High_score')
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
		var Death=false;
		var body=[[7,7],[7,6],[7,5],[7,4]];
		var body_direction=[[0,1],[0,1],[0,1],[0,1]];
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
		window.localStorage.setItem('Snake_High_score', "0");
	}else{
		var High_Score=window.localStorage.getItem('Snake_High_score');
		var Death=window.localStorage.getItem('Snake_Death');
		if (Death=="true"){
			Death=true
		}else{
			Death=false
		}
		Board=JSON.parse(window.localStorage.getItem('Snake_Board'));
		var body=JSON.parse(window.localStorage.getItem('Snake_body'));
		var body_direction=JSON.parse(window.localStorage.getItem('Snake_body_direction'));
		var points=parseInt(window.localStorage.getItem('Snake_points'))
		var apple=JSON.parse(window.localStorage.getItem('Snake_apple'));
		var head=JSON.parse(window.localStorage.getItem('Snake_head'));
		var direction=JSON.parse(window.localStorage.getItem('Snake_direction'));
		let Snake_class1=new Snake(head,direction)
		var Snake_class_array=[Snake_class1];
		Snake_class=Snake_class_array[0]
		Board[apple[0]][apple[1]]="#f03c2b"
	}
}
var backlog=[]
var turned=false
var frame=0;
var Board_directionx=[[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
var Board_directiony=[[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
var keys=[];
var keyup=false;
var keyup2=false;
var f = new FontFace('PressStart2P-Regular', 'url(Yomogi-Regular.ttf)');
var f1 = new FontFace('OtomanopeeOne-Regular', 'url(OtomanopeeOne-Regular.ttf)');
var move_finished=true;
var start=0;
var end=0;
var i=0;
var body_colours=["#3c3ffa","#3d44fa","#3d48fa","#3e4df9","#3e52f9","#3f56f9","#3f5bf9","#405ff8","#4063f8","#4168f8","#416cf8","#4271f7","#4275f7","#4379f7","#437df7","#4482f6","#4486f6","#458af6","#458ef6","#4692f6","#4696f5","#479af5","#479ef5","#48a2f5","#48a6f4","#49aaf4","#49aef4","#4ab2f4","#4ab5f4","#4bb9f3","#4bbdf3","#4cc1f3","#4cc4f3","#4dc8f2","#4dcbf2","#4ecff2"]
var Death_Screen = new Image()
Death_Screen.src = "Death_Screen.png"
var img1 = new Image()
img1.src = "apple_01.png"
var img2 = new Image()
img2.src = "apple_02.png"
var img3 = new Image()
img3.src = "apple_03.png"
var img4 = new Image()
img4.src = "apple_04.png"
var img5 = new Image()
img5.src = "apple_05.png"
var img6 = new Image()
img6.src = "apple_06.png"
var img7 = new Image()
img7.src = "apple_07.png"
var img8 = new Image()
img8.src = "apple_08.png"
var img9 = new Image()
img9.src = "apple_09.png"
images=[img1,img2,img3,img4,img5,img6,img7,img8,img9]
var img = images[Math.floor(Math.random()*images.length)];

Snake_class.spawn();
for (i=0;i<body_direction.length;i++){
	Board_directionx[body[i][0]][body[i][1]]=body_direction[i][1]
	Board_directiony[body[i][0]][body[i][1]]=body_direction[i][0]
}
var once=false;
function gameLoop(){
	if (once==true || keys[87] || keys[38]|| keys[39]|| keys[37]|| keys[40] || keys[83] || keys[65] || keys[68] || keys[32]){
		once=true;
		sleep(20).then(() => { 
			if (points==284){
				points=285;
				Death=true;
			}	
			window.localStorage.setItem('Snake_points',points.toString());
			window.localStorage.setItem('Snake_Death',Death.toString());
			window.localStorage.setItem('Snake_Board',JSON.stringify(Board));
			window.localStorage.setItem('Snake_body',JSON.stringify(body));
			window.localStorage.setItem('Snake_body_direction',JSON.stringify(body_direction));
			window.localStorage.setItem('Snake_apple',JSON.stringify(apple));
			window.localStorage.setItem('Snake_head',JSON.stringify(Snake_class.head));
			window.localStorage.setItem('Snake_direction',JSON.stringify(Snake_class.direction));	
			if(Death==false){
				keys[32]=false;
				Snake_class.move_forward();
				Board[apple[0]][apple[1]]="#f03c2b"
				Game_State_Display();
			}else{
				if (keys[32]){
					keys[32]=false;
					keys=[]
					body=[[7,7],[7,6],[7,5],[7,4]];
					body_direction=[[0,1],[0,1],[0,1],[0,1]];
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
					while(Board[ya][xa]!==null){
						ya=Math.floor(Math.random() * 17);
						xa=Math.floor(Math.random() * 17);			
					}
					apple=[ya,xa];
					Board[ya][xa]="#f03c2b"
					Death=false;
				}
			}
		});
	}else{
		Game_State_Display();
	}
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
class cactus{
	constructor(width,height,width2,height2,x,img){
	    this.width=width
	    this.height=height
	    this.width2=width2
	    this.height2=height2
	    this.x=x
	    this.img=img
	}
	spawn(x2){
		this.x=x2;
	}
	move_left(){
		this.x=this.x-speed;
	}
}
function Game_State_Display(){
	ctx.drawImage(background,background_deviation, 0, 900 ,200 ,0 ,0, 900 ,200)
	if (rex_state>3){
		rex_state=1
	}
	if (death==false && start2==true){
		path_deviation=path_deviation+speed;
		if (path_deviation>3900-speed){
			path_deviation=0;
		}
		background_deviation=background_deviation+3
		if(background_deviation==900){
			background_deviation=0
		}
	}else{
		rex_state=4
	}

	var img1 = new Image()
	if (dinosaur_y==125 || death==true){
		img1.src = "trex"+(Math.floor(rex_state)).toString()+".png"
	}else{
		img1.src = "trex1.png"
	}
	ctx.drawImage(img1,0,0,88,94,30,dinosaur_y,60,65);
	ctx.fillStyle="#000000";
	rex_state=rex_state+0.5

	ctx.drawImage(path,path_deviation, 0, 900 ,24 ,0 ,170, 900 ,24)


	var img2 = new Image()
	img2.src =current_piece.img
	ctx.drawImage(img2,0, 0, current_piece.width2 ,current_piece.height2 ,current_piece.x ,190-current_piece.height,current_piece.width,current_piece.height);

	var img2 = new Image()
	img2.src =current_piece2.img
	ctx.drawImage(img2,0, 0, current_piece2.width2 ,current_piece2.height2 ,current_piece2.x ,190-current_piece2.height,current_piece2.width,current_piece2.height);

	var img2 = new Image()
	img2.src=current_piece3.img
	ctx.drawImage(img2,0, 0, current_piece3.width2 ,current_piece3.height2 ,current_piece3.x ,190-current_piece3.height,current_piece3.width,current_piece3.height);
	if (death==true){
		ctx.drawImage(game_over,295,62.5,190,75);
	}
	if (points>high_score){
		high_score=points;
	}
	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = '15px PressStart2P-Regular';
		ctx.fillStyle = "#535353"
		ctx.textAlign = "right"
		ctx.fillText("HI "+high_score+" P "+points, 760, 25);
	});	
}
function Jump(){
	if (jump_state>-10){
		change=0.4*(jump_state*-jump_state)*Math.sign(jump_state)
		dinosaur_y=dinosaur_y+change
		jump_state=jump_state-1

	}
}
function Death(){
	if (dinosaur_y>190-current_piece.height-45 || dinosaur_y>190-current_piece2.height-45 || dinosaur_y>190-current_piece3.height-45){
		if(current_piece.x<70 && current_piece.x+current_piece.width>50){
			death=true;
		}else if(current_piece2.x<70 && current_piece2.x+current_piece2.width>50){
			death=true;
		}else if(current_piece3.x<70 && current_piece3.x+current_piece3.width>50){
			death=true;
		}
	}
}
function getXY(canvas, event){ 
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return [x,y]
}
document.addEventListener("click",  function (e) {
	const XY = getXY(canvas, e)
	if (death==true){
		points=0
		keys[32]=false
		death=false
		speed=10
		jump_state=-10
		dinosaur_y=125

		current_piece=cactus_array[Math.floor(Math.random()*cactus_array.length)];
		current_piece.spawn(1300);

		current_piece2=cactus_array[Math.floor(Math.random()*cactus_array.length)];
		while (current_piece2==current_piece){
			current_piece2=cactus_array[Math.floor(Math.random()*cactus_array.length)];
		}	
		current_piece2.spawn(900);

		current_piece3=cactus_array[Math.floor(Math.random()*cactus_array.length)];
		while (current_piece3==current_piece || current_piece3==current_piece2){
			current_piece3=cactus_array[Math.floor(Math.random()*cactus_array.length)];
		}	
		current_piece3.spawn(500);
		path_deviation=0
		deviation1=speed*25*(Math.floor(Math.random() * 125) + 100)/100
		deviation2=speed*25*(Math.floor(Math.random() * 125) + 100)/100
		deviation3=speed*25*(Math.floor(Math.random() * 125) + 100)/100
	}
});
document.body.addEventListener("keydown", function (e) {
	if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}
  keys[e.keyCode] = true;
});
let large_cactus1=new cactus(35,70,50,100,1000,"LargeCactus1.png");
let large_cactus2=new cactus(35,70,50,100,1000,"LargeCactus2.png");
let large_cactus3=new cactus(35,70,50,100,1000,"LargeCactus3.png");
let large_cactus4=new cactus(105,70,150,100,1000,"LargeCactus4.png");
let small_cactus1=new cactus(23,50,34,70,1000,"SmallCactus1.png");
let small_cactus2=new cactus(23,50,34,70,1000,"SmallCactus2.png");
let small_cactus3=new cactus(23,50,34,70,1000,"SmallCactus3.png");
let small_cactus4=new cactus(23,50,34,70,1000,"SmallCactus4.png");
let small_cactus5=new cactus(47,50,68,70,1000,"SmallCactus5.png");

var f = new FontFace('PressStart2P-Regular', 'url(PressStart2P-Regular.ttf)');
var cactus_array=[large_cactus1,large_cactus2,large_cactus3,large_cactus4,small_cactus1,small_cactus2,small_cactus3,small_cactus4,small_cactus5];
var keys=[];
var death=false;
var rex_state=2;
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var background = new Image()
background.src ="Background2.png"
var game_over = new Image()
game_over.src ="Game Over.png"
var path = new Image()
path.src ="Path.png"
var end=0;
var start=0;
var move_finished=false;
var path_deviation=0
var background_deviation=0
var points=window.localStorage.getItem('Dino_points');
if (points==null || typeof(Storage) == "undefined"){
	var speed=10;
	var points=0;
	var high_score=0
	var jump_state=-10;
	var dinosaur_y=125;
	var start=true
	var current_piece=cactus_array[Math.floor(Math.random()*cactus_array.length)];
	current_piece.spawn(1300);

	var current_piece2=cactus_array[Math.floor(Math.random()*cactus_array.length)];
	while (current_piece2==current_piece){
		current_piece2=cactus_array[Math.floor(Math.random()*cactus_array.length)];
	}	
	current_piece2.spawn(900);

	var current_piece3=cactus_array[Math.floor(Math.random()*cactus_array.length)];
	while (current_piece3==current_piece || current_piece3==current_piece2){
		current_piece3=cactus_array[Math.floor(Math.random()*cactus_array.length)];
	}	
	current_piece3.spawn(500);
	start2=true
}else{
	var start2=false
	var points=parseInt(window.localStorage.getItem('Dino_points'));
	var high_score=parseInt(window.localStorage.getItem('Dino_high_score'));
	var speed=parseInt(window.localStorage.getItem('Dino_speed'));
	var jump_state=parseInt(window.localStorage.getItem('Dino_jump_state'));
	var dinosaur_y=parseInt(window.localStorage.getItem('Dino_dinosaur_y'));
	var current_piece4=JSON.parse(window.localStorage.getItem('Dino_current_piece'));
	var current_piece24=JSON.parse(window.localStorage.getItem('Dino_current_piece2'));
	var current_piece34=JSON.parse(window.localStorage.getItem('Dino_current_piece3'));

	var current_piece=new cactus(current_piece4.width,current_piece4.height,current_piece4.width2,current_piece4.height2,current_piece4.x,current_piece4.img);
	var current_piece2=new cactus(current_piece24.width,current_piece24.height,current_piece24.width2,current_piece24.height2,current_piece24.x,current_piece24.img);
	var current_piece3=new cactus(current_piece34.width,current_piece34.height,current_piece34.width2,current_piece34.height2,current_piece34.x,current_piece34.img);
}


var deviation1=speed*25*(Math.floor(Math.random() * 125) + 100)/100
var deviation2=speed*25*(Math.floor(Math.random() * 125) + 100)/100
var deviation3=speed*25*(Math.floor(Math.random() * 125) + 100)/100
Death();
function game_loop() {
	if (move_finished==true){
	    move_finished=false;
	    start=Date.now();
	}else{
	    end=Date.now();
	    if (end - start>=10){
	    	move_finished=true
				window.localStorage.setItem('Dino_current_piece',JSON.stringify(current_piece));
				window.localStorage.setItem('Dino_current_piece2',JSON.stringify(current_piece2));
				window.localStorage.setItem('Dino_current_piece3',JSON.stringify(current_piece3));
	    	window.localStorage.setItem('Dino_points',points.toString());
	    	window.localStorage.setItem('Dino_high_score',high_score.toString());
	    	window.localStorage.setItem('Dino_speed',speed.toString());
	    	window.localStorage.setItem('Dino_jump_state',jump_state.toString());
	    	window.localStorage.setItem('Dino_dinosaur_y',dinosaur_y.toString());
	    	if (death==false && start2==true){
	    		if (dinosaur_y<125 && dinosaur_y>120){
	    			dinosaur_y=125
	    		}
		    	if (keys[32] && dinosaur_y==125){
		    		keys[32]=false
		    		jump_state=9
				}else if(keys[32]){
					keys[32]=false
				}
				if (current_piece.x<=-100 && 1000-current_piece2.x>deviation1 && 1000-current_piece3.x>deviation1){
					current_piece=cactus_array[Math.floor(Math.random()*cactus_array.length)];
					while (current_piece==current_piece3 || current_piece==current_piece2){
						current_piece=cactus_array[Math.floor(Math.random()*cactus_array.length)];
					}
					current_piece.spawn(1000);
					speed=speed*1.01	
					deviation1=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation2=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation3=speed*25*(Math.floor(Math.random() * 125) + 100)/100
				}
				if (current_piece2.x<=-100 && 1000-current_piece3.x>deviation2 && 1000-current_piece.x>deviation2){
					while (current_piece2==current_piece3 || current_piece2==current_piece){
						current_piece2=cactus_array[Math.floor(Math.random()*cactus_array.length)];
					}
					current_piece2.spawn(1000);
					speed=speed*1.01	
					deviation1=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation2=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation3=speed*25*(Math.floor(Math.random() * 125) + 100)/100
				}
				if (current_piece3.x<=-100 && 1000-current_piece.x>deviation3 && 1000-current_piece2.x>deviation3){
					while (current_piece3==current_piece2 || current_piece3==current_piece){
						current_piece3=cactus_array[Math.floor(Math.random()*cactus_array.length)];
					}				
					current_piece3.spawn(1000);
					speed=speed*1.01		
					deviation1=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation2=speed*25*(Math.floor(Math.random() * 125) + 100)/100
					deviation3=speed*25*(Math.floor(Math.random() * 125) + 100)/100
				}
				if (speed>46){
					speed=46;
				}
				current_piece.move_left();
				current_piece2.move_left();
				current_piece3.move_left();
				Jump();
				points=points+1
				Death();
			}
			if(start2==false && keys[32]){
				keys[32]=false;
				start2=true;
			}
	    	Game_State_Display();
	    }
	}
	window.requestAnimationFrame(game_loop);
}
window.requestAnimationFrame(game_loop);
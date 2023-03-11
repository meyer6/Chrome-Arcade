function Game_State_Display(){
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,500,550)	
	ctx.fillStyle="#000000";
	ctx.fillRect(50,bird_y,50,50)
}
function Jump(){
	if (jump_state>-1 ){
		change=-Math.sign(jump_state)*(-jump_state)*(-jump_state)
		if (change>25){
			change=25
		}else if(change<-25){
			change=-25
		}
		change=change*1.2
		gravity=3;
		bird_y=bird_y+change
		jump_state=jump_state-1
	}
}
function Gravity(){
	if (jump_state<0){
		if (gravity<6){
			gravity=gravity*1.2
		}
		bird_y=bird_y+gravity  
	}
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
var gravity=3;
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var keys=[]
var jump_state=-1;
var bird_y=200;
var end=0;
var start=0;
var move_finished=false;
function gameLoop() {
	if (move_finished==true){
	    move_finished=false;
	    start=Date.now();
	}else{
	    end=Date.now();
	    if (end-start>=10){
	    	if (keys[32]){
	    		keys[32]=false;
	    		jump_state=5;
			}else if(keys[32]){
				keys[32]=false;
			}
			Jump();
			Gravity();
	    	Game_State_Display();
		}
	}
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
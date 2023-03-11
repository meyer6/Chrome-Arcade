class Bat{
    constructor(x, img, moveSpeed, moveKeys){
        this.x = x
        this.y = 194
        this.moveSpeed = moveSpeed

        this.img = new Image()
        this.img.src = img

        this.moveSpeed = moveSpeed
        this.moveKeys = moveKeys
        this.score = 0
    }
    moveUp(moveKey2){
        if (keys[this.moveKeys[0]] == true || keys[moveKey2] == true){
            this.y = Math.max(this.y - this.moveSpeed, 0)
        }
    }
    moveDown(moveKey2){
        if (keys[this.moveKeys[1]] == true || keys[moveKey2] == true){
            this.y = Math.min(this.y + this.moveSpeed, HEIGHT - PADDLE_HEIGHT)
        }
    }
    ai(move){
        if (Math.sign(ball.xSpeed) == 1){
            if(this.y + 42 > HEIGHT / 2){
                this.y = this.y - this.moveSpeed
            }else if(this.y + 58 < HEIGHT / 2){
                this.y = this.y + this.moveSpeed
            }
        }else{
            var x_ = ball.x
            var y_ = ball.y
            var ySpeed_ = ball.ySpeed
            var i = 0
            while (x_ > this.x && i < 80){
                i++
                x_ += ball.xSpeed
                y_ += ySpeed_
                if (y_ < 8 && Math.sign(ySpeed_) == -1 || y_ > HEIGHT - 8 && Math.sign(ySpeed_) == 1){
                    ySpeed_ = -ySpeed_
                }
            }
            if(this.y > y_ - 10){
                this.y = this.y - this.moveSpeed
            }else if(this.y + 100 < y_){
                this.y = this.y + this.moveSpeed
            }
        }
        // if(this.y > ball.y){
		// 	this.y = this.y - this.moveSpeed
		// }else if(this.y + 110 < ball.y){
		// 	this.y = this.y + this.moveSpeed
		// }
    }
}
class Ball{
    constructor(){
        this.x = 350
        this.y = 250
        this.xSpeed = 9
        this.ySpeed = 0
    }
    move(){
        this.x += this.xSpeed
        this.y += this.ySpeed
        if (this.y < 8 && Math.sign(this.ySpeed) == -1 || this.y > HEIGHT - 8 && Math.sign(this.ySpeed) == 1){
            this.ySpeed = -this.ySpeed
        }
        this.checkBatCollisions()
        this.checkWallCollision()
    }
    checkBatCollisions(){
        for (var i=0; i<bats.length; i++){
            if (this.x > bats[i].x - 4 && this.x < bats[i].x + PADDLE_WIDTH + 4 && this.y > bats[i].y - 6 && this.y < bats[i].y + PADDLE_HEIGHT + 6){
                if (Math.sign(this.xSpeed) == 1 && this.x > 350 || Math.sign(this.xSpeed) == -1 && this.x < 350){
                    this.xSpeed = -this.xSpeed * 1.03
                    this.ySpeed = (this.xSpeed*(Math.tan(-((-34/25)*(this.y-bats[i].y+1)+(1909/25)) * 0.6 * Math.PI / 180)))*this.xSpeed/Math.abs(this.xSpeed)
                }
            }
        }
    }
    checkWallCollision(){
        if (this.x < 0 || this.x > WIDTH){
            if (this.x < 0){
                bats[1].score++
                this.xSpeed = -8
            }else{
                bats[0].score++
                this.xSpeed = 8
            }
            this.x = 350
            this.y = 250
            this.ySpeed = 0
        }
    }
}
function gameStateDisplay(){
	ctx.fillStyle='#000000';
	ctx.drawImage(board,0,0,700,500);

    for (i=0; i<bats.length; i++){
        ctx.drawImage(bats[i].img, bats[i].x, bats[i].y);
    }

    ctx.fillStyle='#FFFFFF';
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();

	f.load().then(function(font) { document.fonts.add(font)
		ctx.font = 'bold 40px PressStart2P-Regular';
		ctx.textAlign = "right";		
		ctx.fillText(bats[0].score, 320, 50);
		ctx.textAlign = "left";		
		ctx.fillText(bats[1].score, 380, 50);

        ctx.font = 'bold 25px PressStart2P-Regular';
        ctx.fillStyle='#FFFFFF';
        ctx.textAlign = "center";
        if(chooseGameMode == 0){
            ctx.fillRect(255, 210, 190, 30);
            ctx.fillRect(255, 270, 190, 30);
            ctx.fillStyle = "black";
            ctx.fillText("1 Player", 350, 234);		
            ctx.fillText("2 Players", 350, 294);
        }else{
            if (chooseDifficulty == true){
                ctx.fillRect(255, 175, 190, 30);
                ctx.fillRect(255, 235, 190, 30);
                ctx.fillRect(255, 295, 190, 30);
                ctx.fillStyle = "black";
                ctx.fillText("Easy", 350, 198);
                ctx.fillText("Medium", 350, 259);
                ctx.fillText("Hard", 350, 319);
            }
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 'bold 50px PressStart2P-Regular';
        if (bats[0].score >= 10){
            if (chooseGameMode == 2){		
                ctx.fillText("AI Won", 350, 250);
            }else{
                ctx.fillText("Player 1 Won", 350, 250);
            }
        }else if(bats[1].score >= 10){
            ctx.fillText("Player 2 Won", 350, 250);
        }
    })
}
function getXY(canvas, event){ 
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const x = event.clientX - rect.left
    return [x,y]
}
document.addEventListener("click",  function (e) {
	const XY = getXY(canvas, e)
	if (chooseGameMode == 0){
		if (XY[0] <= 445 && XY[0] >= 255 && XY[1] >= 270 && XY[1] <= 300){
			chooseGameMode = 1
		}else if (XY[0] <= 445 && XY[0] >= 255 && XY[1] >= 210 && XY[1] <= 240){
			chooseGameMode = 2
            chooseDifficulty = true
		}
	}else{
		if (chooseDifficulty == true){
            chooseDifficulty = false
			if (XY[0] <= 445 && XY[0] >= 255 && XY[1] >= 175 && XY[1] <= 205){
				bats[0].moveSpeed = 2
			}else if(XY[0] <= 445 && XY[0] >= 255 && XY[1] >= 235 && XY[1] <= 265){
				bats[0].moveSpeed = 3
			}else if(XY[0] <= 445 && XY[0] >= 255 && XY[1] >= 295 && XY[1] <= 325){
				bats[0].moveSpeed = 4
			}else{
                chooseDifficulty = true
            }
		}
	}
});
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    if (e.keyCode == 32 && bats[0].score >= 10 || e.keyCode == 32 && bats[1].score >= 10){
        initialize()
    }
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function initialize(){
    bats = [new Bat(15, "bat1.png", 8, [87, 83]), new Bat(665, "bat2.png", 8, [38, 40])]
    ball = new Ball()

    chooseGameMode = 0
    chooseDifficulty = false
}
var f = new FontFace('PressStart2P-Regular', 'url(HipopotamStudio-MrDodo-Regular.otf)');
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var keys=[];

var board = new Image()
board.src = "Board.png"

var WIDTH = 700
var HEIGHT = 500
var BALL_RADIUS = 8
var PADDLE_HEIGHT = 110
var PADDLE_WIDTH = 20

initialize()

var start = Date.now()
gameStateDisplay();
async function gameLoop(){
    if(Date.now()-start > 15){
		start = Date.now()
        if(chooseGameMode == 1 || chooseGameMode == 2 && chooseDifficulty == false){
            if (bats[0].score < 10 && bats[1].score < 10){
                for (var i=0; i<bats.length; i++){
                    if (chooseGameMode != 2 || i!=0){
                        if (chooseGameMode == 2){
                            bats[i].moveDown(83)
                            bats[i].moveUp(87)
                        }else{
                            bats[i].moveDown()
                            bats[i].moveUp()
                        }
                    }else{
                        bats[i].ai()
                    }
                }
                ball.move()
            }
        }
        gameStateDisplay();
    }else{
        await sleep(Math.max(15-(Date.now()-start),0));
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
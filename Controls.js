			var canvas = document.getElementById("Screen");
			var ctx = canvas.getContext("2d");
			ctx.font = "15px Times New Roman";
			ctx.fillStyle = "#000000"
			ctx.fillText("Controls:", 10, 10);
			ctx.fillText("Menu - Click on desired game", 10, 30);
			ctx.fillText("Return to Menu - B", 10, 50);
			ctx.fillText("-----------------------", 10, 70);
			ctx.fillText("Chess:", 10, 90);
			ctx.fillText("Remove End Screen - Space", 10, 110);
			ctx.fillText("-----------------------", 10, 130);
			ctx.fillText("Snake:", 10, 150);
			ctx.fillText("Left - A/left arrow", 10, 170);
			ctx.fillText("Right - D/right arrow", 10, 190);
			ctx.fillText("Up- W/up arrow", 10, 210);
			ctx.fillText("Down - S/down arrow", 10, 230);
			ctx.fillText("Play Again - Space", 10, 250);
			ctx.fillText("-----------------------", 10, 270);
			ctx.fillText("2048:", 10, 290);
			ctx.fillText("Left - A/left arrow", 10, 310);
			ctx.fillText("Right - D/right arrow", 10, 330);
			ctx.fillText("Up - W/up arrow", 10, 350);
			ctx.fillText("Down - S/down arrow", 10, 370);
			ctx.fillText("Play Again - Space ", 10, 390);
			ctx.fillText("-----------------------", 10, 410);
			ctx.fillText("Tetris:", 10, 430);
			ctx.fillText("Left - A/left arrow", 10, 450);
			ctx.fillText("Right - D/right arrow", 220, 10);
			ctx.fillText("Rotate - W/up arrow", 220, 30);
			ctx.fillText("Soft Drop - S/down arrow", 220, 50);
			ctx.fillText("Hold - C", 220, 70);
			ctx.fillText("Hard Drop - Space", 220, 90);
			ctx.fillText("Play Again - Space", 220, 110);
			ctx.fillText("Start Over - R", 220, 130);
			ctx.fillText("-----------------------", 220, 150);
			ctx.fillText("Pong:", 220, 170);
			ctx.fillText("Up- W/up arrow", 220, 190);
			ctx.fillText("Down - S/down arrow", 220, 210);
			ctx.fillText("Play Again - Space", 220, 230);
			ctx.fillText("-----------------------", 220, 250);
			ctx.fillText("Dino Game:", 220, 270);
			ctx.fillText("Jump - Space", 220, 290);
			ctx.fillText("-----------------------", 220, 310);
			ctx.fillText("Connect 4:", 220, 330);
			ctx.fillText("Play Again - Space", 220, 350);
			ctx.fillText("-----------------------", 220, 370);
			ctx.fillText("Tic Tac Toe:", 220, 390);
			ctx.fillText("Play Again - Space", 220, 410);
			document.body.addEventListener("keydown", function (e) {
				if(e.keyCode==66){
					window.location.href ='Chrome_Arcade.html';
				}
			});
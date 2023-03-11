var canvas = document.getElementById("Screen");
var ctx = canvas.getContext("2d");
ctx.font = "15px Times New Roman";
ctx.fillStyle = "#000000"
ctx.fillText("Credits:", 10, 10);
ctx.fillText("Logo - Sahenn Arya", 10, 30);
ctx.fillText("Menu Screen - Sahenn Arya", 10, 50);
ctx.fillText("Snake Death Screen - Sahenn Arya", 10, 70);
ctx.fillText("Snake Head - Sahenn Arya", 10, 90);
ctx.fillText("Connect 4 Background Gradient - Sahenn Arya", 10, 110);
ctx.fillText("Guidance on Chess End Screens - Sahenn Arya", 10, 130);
ctx.fillText("Colour Choice in Tetris - Sahenn Arya", 10, 150);
ctx.fillText("Minor Pong Details - Sahenn Arya", 10, 170);
ctx.fillText("Dots & Boxes Background - Sahenn Arya", 10, 190);
ctx.fillText("Tic Tac Toes Background & Pieces - Deep Patel", 10, 210);
ctx.fillText("Reported Bugs - Sahenn Arya, Neil Nair, Deep Patel", 10, 230);
ctx.fillText("                         - Elias Botiz, Arnav Patel", 10, 250);
ctx.fillText("Managerial Upsaleman/Goatbag - Deep Patel", 10, 270);
document.body.addEventListener("keydown", function (e) {
	if(e.keyCode==66){
		window.location.href ='Chrome_Arcade.html';
	}
});
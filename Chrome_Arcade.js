function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext("2d");
base_image = new Image();
base_image.src = 'Games.png';
base_image.onload = () => ctx.drawImage(base_image, 0, 0);
document.addEventListener("mouseup",  function (e) {
	XY = getXY(canvas, e);
	if (XY[0]<108 && XY[0]>27 && XY[1]<270 && XY[1]>190){
		window.location.href = 'Chess/Chess.html';
	}else if (XY[0]<250 && XY[0]>170 && XY[1]<270 && XY[1]>190){
		window.location.href = 'Snake/Snake.html';
	}else if (XY[0]<393 && XY[0]>313 && XY[1]<270 && XY[1]>190){
		window.location.href = '2048/2048.html';
	}else if (XY[0]<108 && XY[0]>27 && XY[1]<400 && XY[1]>320){
		window.location.href = 'Tetris/Metris.html';
	}else if (XY[0]<250 && XY[0]>170 && XY[1]<400 && XY[1]>320){
		window.location.href = 'Pong/Pong.html';
	}else if (XY[0]<393 && XY[0]>313 && XY[1]<400 && XY[1]>320){
		window.location.href = 'Tic Tac Toe/Tic Tac Toe.html';
	}else if (XY[0]<108 && XY[0]>27 && XY[1]<544 && XY[1]>464){
		window.location.href = 'Dinosaur Game/Dinosaur Game.html';
	}else if (XY[0]<250 && XY[0]>170 && XY[1]<544 && XY[1]>464){
		window.location.href = 'Connect 4/Connect 4.html';
	}else if (XY[0]<393 && XY[0]>313 && XY[1]<544 && XY[1]>464){
		window.location.href = 'Othello/Othello.html';
	}else if (XY[0]<390 && XY[0]>321 && XY[1]<564 && XY[1]>550){
		window.location.href = 'Controls.html';
	}else if (XY[0]<240 && XY[0]>185 && XY[1]<563 && XY[1]>550){
		window.location.href = 'Credits.html';
	}
});
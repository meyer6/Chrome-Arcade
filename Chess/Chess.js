function Game_State_Display(){
	ctx.drawImage(board_img,0,0)
	if(previous_squares[0][0]!=8){
		if((previous_squares[0][0]+previous_squares[0][1])%2==0){
			ctx.fillStyle='#d0d46c';    
		}else{
			ctx.fillStyle='#b0a43c'; 
		}
		ctx.fillRect(previous_squares[0][0]*70, previous_squares[0][1]*70, 70, 70);	
		if((previous_squares[1][0]+previous_squares[1][1])%2==0){
			ctx.fillStyle='#d0d46c';    
		}else{
			ctx.fillStyle='#b0a43c'; 
		}
		ctx.fillRect(previous_squares[1][0]*70, previous_squares[1][1]*70, 70, 70);	
	}
	var black_killed=-1
	var white_killed=-1
	var points=0
	for (i=0;i<killed_pieces.length;i++){
		var img = new Image()
		img.src=killed_pieces[i]+".svg"
		if(killed_pieces[i][0]=="w"){
			white_killed++
			ctx.drawImage(img,574+(white_killed%4)*40,7+Math.floor(white_killed/4)*40+5,40,40)
		}else{
			black_killed++
			ctx.drawImage(img,574+(black_killed%4)*40,390+Math.floor(black_killed/4)*40-10,40,40)	
		}	
		((((killed_pieces[i][0].charCodeAt())-98)/10.5)-1)
		if(killed_pieces[i][1]=="Q"){
			points=points+9*((((killed_pieces[i][0].charCodeAt())-98)/10.5)-1)	
		}else if(killed_pieces[i][1]=="R"){
			points=points+5*((((killed_pieces[i][0].charCodeAt())-98)/10.5)-1)	
		}else if(killed_pieces[i][1]=="B" || killed_pieces[i][1]=="N"){
			points=points+3*((((killed_pieces[i][0].charCodeAt())-98)/10.5)-1)	
		}else if(killed_pieces[i][1]=="P"){
			points=points+1*((((killed_pieces[i][0].charCodeAt())-98)/10.5)-1)	
		}
	}
	f.load().then(function(font) {   document.fonts.add(font)
		ctx.font = 'bold 20px Italianno-SourceSansPro-Regular';
		ctx.fillStyle = "#ababaa";
		if(Math.sign(points)*1==-1){
			ctx.fillText("+"+-points,574+((black_killed+1)%4)*40+3,390+Math.floor((black_killed+1)/4)*40+17);
		}else if (Math.sign(points)*1==1){
			ctx.fillText("+"+points,574+((white_killed+1)%4)*40+3,7+Math.floor((white_killed+1)/4)*40+32);
		}
	});
	if (check_mate!=null || check==true){
		var img = new Image()
		img.src="check_mate.png"
		ctx.drawImage(img,0, 0, 650, 650, king_coord[0]*70, king_coord[1]*70+2, 70 ,70)	
	}
	for (y=0;y<8;y++){
	    for (x=0;x<8;x++){
	    	if (board[y][x]!=null){
	    		if (y!=promotion[1] || x!=promotion[0]){
    				var img = new Image()
					img.src=board[y][x]+".svg"
					ctx.drawImage(img,x*70,y*70,70,70)
				}   
	    	}
	    }
	}
	if (check_mate!=null || stale_mate==true || draw!=null || resign!=null){
		if (display==true){
			if (check_mate!=null){
				var img = new Image()				
				img.src=check_mate+"_checkmate.png"
				ctx.drawImage(img,140,175)
			}else if (stale_mate==true){
				var img = new Image()
				img.src="stalemate.png"
				ctx.drawImage(img,140,175)
			}else if (draw!=null){
				var img = new Image()
				img.src=draw+".png"
				ctx.drawImage(img,140,175)
			}else if (resign!=null){
				var img = new Image()
				img.src=resign+"_resign.png"
				ctx.drawImage(img,140,175)
			}	
		}
	}

	if (promotion[0]==8){
		for(i=0;i<possible_moves.length;i++){
			if (current_piece!=null){
				if(possible_moves[i][0]==Math.floor(moving_piece_coord[0]/70) && possible_moves[i][1]==Math.floor(moving_piece_coord[1]/70)){
					ctx.fillStyle = 'rgba(104,108,68,0.65)';
					ctx.fillRect(possible_moves[i][0]*70,possible_moves[i][1]*70,70,70);					
				}else{
					drawCircle(ctx,possible_moves[i][0]*70+35, possible_moves[i][1]*70+35, 10, "#686c44", "#686c44", 0)
				}
			}else{
				drawCircle(ctx,possible_moves[i][0]*70+35, possible_moves[i][1]*70+35, 10, "#686c44", "#686c44", 0)
			}
		}
		ctx.fillStyle = 'rgba(104,108,68,0.65)';
		ctx.fillRect(current_piece_coord[0]*70,current_piece_coord[1]*70,70,70);
		if (current_piece!=null){
			var img = new Image()
			img.src=current_piece+".svg"
			ctx.drawImage(img,moving_piece_coord[0]-35 ,moving_piece_coord[1]-35,70,70)
		}
	}else{
		for (i=0;i<4;i++){
			if (Math.floor(XY[1]/70)==(promotion[1]-Math.sign(promotion[1]-1)*i) && Math.floor(XY[0]/70)==promotion[0]){
				ctx.fillStyle='#cc682d';  
				ctx.fillRect(promotion[0]*70,(promotion[1]-Math.sign(promotion[1]-1)*i)*70, 70, 70);
			}else{
				drawCircle(ctx,promotion[0]*70+35, (promotion[1]-Math.sign(promotion[1]-1)*i)*70+35, 33, "#9b9b9b", "#9b9b9b", 0)
			}
		}
		var img = new Image()
		img.src=String.fromCharCode((promotion[1]-7)*-3+98)+"Q8.svg"
		ctx.drawImage(img,promotion[0]*70+5, (promotion[1]-Math.sign(promotion[1]-1)*0)*70+5, 60 ,60);		
		var img = new Image()
		img.src=String.fromCharCode((promotion[1]-7)*-3+98)+"R8.svg"
		ctx.drawImage(img,promotion[0]*70+5, (promotion[1]-Math.sign(promotion[1]-1)*1)*70+5, 60 ,60);	
		var img = new Image()
		img.src=String.fromCharCode((promotion[1]-7)*-3+98)+"B8.svg"
		ctx.drawImage(img,promotion[0]*70+5, (promotion[1]-Math.sign(promotion[1]-1)*2)*70+5, 60 ,60);	
		var img = new Image()
		img.src=String.fromCharCode((promotion[1]-7)*-3+98)+"N.svg"
		ctx.drawImage(img,promotion[0]*70+5, (promotion[1]-Math.sign(promotion[1]-1)*3)*70+5, 60 ,60);		
	}
}
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
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
function moves(g){
	g=parseInt(g)
	if(current_piece[1]=="Q" || current_piece[1]=="B" || current_piece[1]=="K"){
		x=current_piece_coord[0];
		for (y=current_piece_coord[1]+1;y<current_piece_coord[1]+g;y++){
			x=x+1
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		x=current_piece_coord[0];
		for (y=current_piece_coord[1]+1;y<current_piece_coord[1]+g;y++){
			x=x-1
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		x=current_piece_coord[0];
		for (y=current_piece_coord[1]-1;y>current_piece_coord[1]-g;y=y-1){
			x=x-1
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		x=current_piece_coord[0];
		for (y=current_piece_coord[1]-1;y>current_piece_coord[1]-g;y=y-1){
			x=x+1
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
	}
	if(current_piece[1]=="Q" || current_piece[1]=="R" || current_piece[1]=="K"){
		y=current_piece_coord[1]
		for (x=current_piece_coord[0]+1;x<current_piece_coord[0]+g;x++){
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		y=current_piece_coord[1]
		for (x=current_piece_coord[0]-1;x>current_piece_coord[0]-g;x--){
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		x=current_piece_coord[0]
		for (y=current_piece_coord[1]-1;y>current_piece_coord[1]-g;y--){
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
		x=current_piece_coord[0]
		for (y=current_piece_coord[1]+1;y<current_piece_coord[1]+g;y++){
			if (y<0 || x<0 || y>7 || x>7){
				break;
			}else if(board[y][x]!=null){
				if (board[y][x][0]!=current_piece[0]){
					possible_moves.push([x,y])
				}
				break;
			}
			possible_moves.push([x,y])
		}
	}
	if (current_piece[1]=="N"){
		for(x=-2;x<3;x=x+1){
			for(y=-2;y<3;y=y+1){
				if (x!=0 && y!=0 && x*Math.sign(x)!=y*Math.sign(y) && y+current_piece_coord[1]>-1 && x+current_piece_coord[0]>-1 && y+current_piece_coord[1]<8 && x+current_piece_coord[0]<8){
					if(board[y+current_piece_coord[1]][x+current_piece_coord[0]]==null || board[y+current_piece_coord[1]][x+current_piece_coord[0]][0]!=current_piece[0]){
						possible_moves.push([x+current_piece_coord[0],y+current_piece_coord[1]])
					}
				}
			}
		}
	}
	if (current_piece=="bP"){
		if(board[current_piece_coord[1]+1][current_piece_coord[0]]==null){
			possible_moves.push([current_piece_coord[0],current_piece_coord[1]+1])
			if(current_piece_coord[1]==1 && board[current_piece_coord[1]+2][current_piece_coord[0]]==null){
				possible_moves.push([current_piece_coord[0],current_piece_coord[1]+2])
			}
		}
		if (board[current_piece_coord[1]+1][current_piece_coord[0]+1]!=null && board[current_piece_coord[1]+1][current_piece_coord[0]+1][0]!=current_piece[0]){
			possible_moves.push([current_piece_coord[0]+1,current_piece_coord[1]+1])
		}
		if (board[current_piece_coord[1]+1][current_piece_coord[0]-1]!=null && board[current_piece_coord[1]+1][current_piece_coord[0]-1][0]!=current_piece[0]){
			possible_moves.push([current_piece_coord[0]-1,current_piece_coord[1]+1])
		}
		if (en_passant==current_piece_coord[0]+1 || en_passant==current_piece_coord[0]-1){
			if (current_piece_coord[1]==4){
				possible_moves.push([en_passant,5])
			}
		}
	}
	if (current_piece=="wP"){
		if(board[current_piece_coord[1]-1][current_piece_coord[0]]==null){
			possible_moves.push([current_piece_coord[0],current_piece_coord[1]-1])
			if(current_piece_coord[1]==6 && board[current_piece_coord[1]-2][current_piece_coord[0]]==null){
				possible_moves.push([current_piece_coord[0],current_piece_coord[1]-2])
			}
		}
		if (board[current_piece_coord[1]-1][current_piece_coord[0]+1]!=null && board[current_piece_coord[1]-1][current_piece_coord[0]+1][0]!=current_piece[0]){
			possible_moves.push([current_piece_coord[0]+1,current_piece_coord[1]-1])
		}
		if (board[current_piece_coord[1]-1][current_piece_coord[0]-1]!=null && board[current_piece_coord[1]-1][current_piece_coord[0]-1][0]!=current_piece[0]){
			possible_moves.push([current_piece_coord[0]-1,current_piece_coord[1]-1])
		}
		if (en_passant==current_piece_coord[0]+1 || en_passant==current_piece_coord[0]-1){
			if (current_piece_coord[1]==3){
				possible_moves.push([en_passant,2])
			}
		}
	}
	if (board[7][1]==null && board[7][2]==null && board[7][3]==null && check==false){
		white_castle[2]=true
	}else{
		white_castle[2]=false
	}	
	if (board[7][6]==null && board[7][5]==null && check==false){
		white_castle[3]=true
	}else{
		white_castle[3]=false
	}	
	if (board[0][1]==null && board[0][2]==null && board[0][3]==null && check==false){
		black_castle[2]=true
	}else{
		black_castle[2]=false
	}	
	if (board[0][6]==null && board[0][5]==null && check==false){
		black_castle[3]=true
	}else{
		black_castle[3]=false
	}
	for (i=1;i<4;i++){
		for (d=0;d<all_moves.length;d++){
			if (all_moves[d][0]==i && all_moves[d][1]==7){
				white_castle[2]=false
			}
		}
	}
	for (i=5;i<7;i++){
		for (d=0;d<all_moves.length;d++){
			if (all_moves[d][0]==i&& all_moves[d][1]==7){
				white_castle[3]=false
			}
		}
	}
	for (i=1;i<4;i++){
		for (d=0;d<all_moves.length;d++){
			if (all_moves[d][0]==i && all_moves[d][1]==0){
				black_castle[2]=false
			}
		}
	}
	for (i=5;i<7;i++){
		for (d=0;d<all_moves.length;d++){
			if (all_moves[d][0]==i && all_moves[d][1]==0){
				black_castle[3]=false
			}
		}
	}
	if (current_piece[1]=="K"){
		if (check!=true && current_piece[0]=="w" && white_castle[0]==true && white_castle[2]==true){
			possible_moves.push([2,7])
		}
		if (check!=true && current_piece[0]=="w" && white_castle[1]==true && white_castle[3]==true){
			possible_moves.push([6,7])
		}
		if (check!=true && current_piece[0]=="b" && black_castle[0]==true && black_castle[2]==true){
			possible_moves.push([2,0])
		}
		if (check!=true && current_piece[0]=="b" && black_castle[1]==true && black_castle[3]==true){
			possible_moves.push([6,0])
		}
		for(i=0;i<all_moves.length;i++){
			for(h=0;h<possible_moves.length;h++){
				if (possible_moves[h][0]==all_moves[i][0] && possible_moves[h][1]==all_moves[i][1]){
					possible_moves.splice(h,1); 
				}
			}
		}	
	}
	var pinned=false
	for(i=0;i<pins.length;i++){
		if (current_piece_coord[0]==pins[i][0] && current_piece_coord[1]==pins[i][1]){
			pinned=true
		}
	}
	var possible_moves_check=[[]]
	if (check==true && pinned==true){
		possible_moves=[[]]
	}else if(pinned==true){
		var a=[]
		a.push(-1)
		for(i=0;i<pin_block.length;i++){
			if (board[pin_block[i][1]][pin_block[i][0]]!=null){
				if (board[pin_block[i][1]][pin_block[i][0]]==current_piece){
					a.push(i)
					break;
				}else if(board[pin_block[i][1]][pin_block[i][0]][0]==current_piece[0]){
					a=[]
					a.push(i)
				}
			}
		}
		for(i=a[0]+1;i<a[1];i++){
			for(h=0;h<possible_moves.length;h++){
				if (possible_moves[h][0]==pin_block[i][0] && possible_moves[h][1]==pin_block[i][1]){
					possible_moves_check.push([possible_moves[h][0],possible_moves[h][1]])
				}
			}
		}
		if (double_check==true){
			possible_moves=[[]]
		}
		possible_moves=JSON.parse(JSON.stringify(possible_moves_check))		
	}else if (check==true && current_piece[1]!="K"){
		for(i=0;i<block.length;i++){
			for(h=0;h<possible_moves.length;h++){
				if (possible_moves[h][0]==block[i][0] && possible_moves[h][1]==block[i][1]){
					possible_moves_check.push([possible_moves[h][0],possible_moves[h][1]])
				}
			}
		}
		if (double_check==true){
			possible_moves=[[]]
		}
		possible_moves=JSON.parse(JSON.stringify(possible_moves_check))
	}else if(check==true && current_piece[1]=="K"){
		for(i=0;i<all_moves.length;i++){
			for(h=0;h<possible_moves.length;h++){
				if (possible_moves[h][0]==all_moves[i][0] && possible_moves[h][1]==all_moves[i][1]){
					possible_moves.splice(h,1); 
				}
			}
		}		
	}
}
function potential_moves_qkbr(x,y,x2,y2,x_add,y_add){
	if (y<0 || x<0 || y>7 || x>7){
		return false
	}else if(board[y][x]!=null && board[y][x][0]==board[y2][x2][0]){
		if (potential_pin.length==0){
			all_moves.push([x,y])
		}
		potential_pin=[]
		return false
	}else if(board[y][x]!=null && board[y][x][0]!=board[y2][x2][0]){
		if (potential_pin.length==0){
			all_moves.push([x,y])
		}
		if(board[y][x][1]=="K"){
			if (check==true && potential_pin.length==0){
				double_check=true;
				potential_block=[[]]
			}
			if(potential_pin.length==0){
				check=true
				all_moves.push([x+x_add,y+y_add])
				block=JSON.parse(JSON.stringify(potential_block))
				block.push([x2,y2])
				block.shift()
			}else{
				for (i=1;i<potential_block.length;i++){
					pin_block.push(JSON.parse(JSON.stringify(potential_block[i])))
				}
				pin_block.push([x2,y2],[potential_pin[0],potential_pin[1]])
				pin_block.shift()
			}
			pins.push([JSON.parse(JSON.stringify(potential_pin))[0],JSON.parse(JSON.stringify(potential_pin))[1]])
			return false
		}else if(potential_pin.length==0){
			potential_pin.push(x)
			potential_pin.push(y)
		}else{
			potential_pin=[]
			return false
		}
	}else{
		potential_block.push([x,y])
		if (potential_pin.length==0){
			all_moves.push([x,y])
		}
	}
	return true
}
function potential_moves(g,x2,y2){
	g=parseInt(g)
	potential_pin=[]
	potential_block=[[]]
	if(board[y2][x2][1]=="Q" || board[y2][x2][1]=="B" || board[y2][x2][1]=="K"){
		x=x2;
		for (y=y2+1;y<y2+g;y++){
			x=x+1
			pass=potential_moves_qkbr(x,y,x2,y2,1,1)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		x=x2;
		for (y=y2+1;y<y2+g;y++){
			x=x-1
			pass=potential_moves_qkbr(x,y,x2,y2,-1,1)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		x=x2;
		for (y=y2-1;y>y2-g;y--){
			x=x-1
			pass=potential_moves_qkbr(x,y,x2,y2,-1,-1)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		x=x2;
		for (y=y2-1;y>y2-g;y--){
			x=x+1
			pass=potential_moves_qkbr(x,y,x2,y2,1,-1)
			if (pass==false){
				break;
			}
		}
	}
	if(board[y2][x2][1]=="Q" || board[y2][x2][1]=="R" || board[y2][x2][1]=="K"){
		potential_pin=[]
		potential_block=[[]]	
		x=x2;
		for (y=y2-1;y>y2-g;y--){
			pass=potential_moves_qkbr(x,y,x2,y2,0,-1)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		y=y2;
		for (x=x2-1;x>x2-g;x--){
			pass=potential_moves_qkbr(x,y,x2,y2,-1,0)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		x=x2;
		for (y=y2+1;y<y2+g;y++){
			pass=potential_moves_qkbr(x,y,x2,y2,0,1)
			if (pass==false){
				break;
			}
		}
		potential_pin=[]
		potential_block=[[]]	
		y=y2;
		for (x=x2+1;x<x2+g;x++){
			pass=potential_moves_qkbr(x,y,x2,y2,1,0)
			if (pass==false){
				break;
			}
		}
	}
	potential_pin=[]
	potential_block=[[]]
	if(board[y2][x2][1]=="N"){	
		for(x=-2;x<3;x=x+1){
			for(y=-2;y<3;y=y+1){
				if (x!=0 && y!=0 && x*Math.sign(x)!=y*Math.sign(y) && y+y2>-1 && x+x2>-1 && y+y2<8 && x+x2<8){
					all_moves.push([x+x2,y+y2])
					if (board[y+y2][x+x2]!=null && board[y+y2][x+x2][1]=="K" && board[y+y2][x+x2][0]!=board[y2][x2][0]){
						block.push([x2,y2])
						if(check==true){
							double_check=true
						}
						check=true
					}
				}
			}
		}
	}	
	potential_pin=[]
	potential_block=[[]]
	if(board[y2][x2][1]=="P"){
		if (board[y2][x2][0]=="b"){
			if(y2+1<8 && x2-1>-1 && board[y2+1][x2-1]=="wK2"){
				if(check==true){
					double_check=true
				}
				check=true;
				block.push([x2,y2])
			}else if(y2+1<8 && x2+1<8 && board[y2+1][x2+1]=="wK2"){
				if(check==true){
					double_check=true
				}
				check=true;
				block.push([x2,y2])
			}
			all_moves.push([x2+1,y2+1])
			all_moves.push([x2-1,y2+1])
		}else if (board[y2][x2][0]=="w"){
			if(y2-1>-1 && x2-1>-1 && board[y2-1][x2-1]=="bK2"){
				if(check==true){
					double_check=true
				}
				check=true;				block.push([x2,y2])
			}else if(y2-1>-1 && x2+1<8 && board[y2-1][x2+1]=="bK2"){
				if(check==true){
					double_check=true
				}
				check=true;
				block.push([x2,y2])
			}
			all_moves.push([x2+1,y2-1])
			all_moves.push([x2-1,y2-1])
		}
	}
	if (double_check==true){
		block=[[]]
	}
}
function all(colour){
	for (v=0;v<8;v++){
	    for (j=0;j<8;j++){
	    	if (board[j][v]!=null && board[j][v][0]==colour){
	    		potential_moves(board[j][v][2],v,j)
	    	}
	    }
	}
}
function check_mate_f(colour){
	possible_moves2=[]
	for (v=0;v<8;v++){
	    for (j=0;j<8;j++){
	    	if (board[j][v]!=null && board[j][v][0]!=colour){
	    		possible_moves=[]
	    		if (board[j][v][1]=="K"){
	    			king_coord=[v,j]
	    		}
	    		current_piece_coord=[v,j]
	    		current_piece=board[j][v]
	    		moves(board[j][v][2])
	    		if (possible_moves.length>0){
		    		for (i=0; i<possible_moves.length; i++){
						if (possible_moves[i].length!=0){
							possible_moves2.push(possible_moves[i])
						}
					}
				}
	    	}
	    }
	}
	possible_moves=[]
	if (check==true && possible_moves2.length==0){
		check_mate=colour;
	}else if (check==false && possible_moves2.length==0){
		stale_mate=true;
	}else if (board.toString().indexOf("Q")==-1 && board.toString().indexOf("R")==-1 && board.toString().indexOf("P")==-1){
		if (board.toString().indexOf("wB")==-1 || board.toString().indexOf("wB", board.toString().indexOf("wB")+1)==-1){
			if (board.toString().indexOf("bB")==-1 || board.toString().indexOf("bB", board.toString().indexOf("bB")+1)==-1 ){
				if (board.toString().indexOf("wN")==-1 || board.toString().indexOf("wN", board.toString().indexOf("wN")+1)==-1 ){
					if (board.toString().indexOf("bN")==-1 || board.toString().indexOf("bN", board.toString().indexOf("bN")+1)==-1 ){
						if (board.toString().indexOf("wB")==-1 || board.toString().indexOf("wN")==-1 ){
							if (board.toString().indexOf("bB")==-1 || board.toString().indexOf("bN")==-1 ){
								stale_mate=true;
							}
						}
					}
				}
			}
		}
	}
	var threefold=0
	var board_backup=JSON.parse(JSON.stringify(past_boards))
	board_backup.push(board);
	for (i=0;i<board_backup.length;i++){
		board_backup[i]=JSON.stringify(board_backup[i])
	}
	for (a=0;a<board_backup.length;a++){
		var matches_check=[a]
		for (i=0;i<board_backup.length;i++){
			if(a!=i && board_backup[a]==board_backup[i]){
				matches_check.push(i)
			}
		}
		if (matches_check.length==3){
			threefold=12
			break;
		}
	}
	if (threefold==12 ){
		draw="threefold"
	}else if (move_rule_50==50){
		draw="50_move_rule"
	}
	current_piece=null	
	current_piece_coord=[-8,-8]
}
function getXY(canvas, event){ 
	const rect = canvas.getBoundingClientRect()
	const y = event.clientY - rect.top
	const x = event.clientX - rect.left
	return [x,y]
}
function variable_reset(){
	potential_pin=[]
	potential_block=[[]]
	pins=[]
	block=[[]]
	pin_block=[[]]
	check=false
	double_check=false
	all_moves=[[]]
	board[current_piece_coord[1]][current_piece_coord[0]]=null
	if(promotion[0]==8){
		if(board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]!=null){
			killed_pieces.push(board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)])
		}
		board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]=current_piece;
	}
	move=(move+1)%2
	all(current_piece[0])
}
document.addEventListener("keydown",  function (e) {
	if (e.keyCode==32){
		if (check_mate!=null || stale_mate==true || draw!=null || resign!=null){
			display=false
		}
	}else if(e.keyCode==66){
		window.location.href ='../Chrome_Arcade.html';
	}
});
document.addEventListener("mousedown",  function (e) {
	XY = getXY(canvas, e);
	if (Math.floor(XY[0]/70)<8 && Math.floor(XY[1]/70)<8 && board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]!=null && promotion[0]==8){
		if(move==0 && board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)][0]=="w" || move==1 && board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)][0]=="b"){
			if (check_mate==null && resign==null && stale_mate==false && draw==null){
				current_piece=board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]
				current_piece_coord=[Math.floor(XY[0]/70),Math.floor(XY[1]/70)]
				moving_piece_coord=[XY[0],XY[1]];
				moves(parseInt(current_piece[2]));
			}
		}
	}else if (XY[0]<640 && XY[0]>590 && XY[1]<300 && XY[1]>260){
		if (past_boards.length!=0 && check_mate==null && resign==null && stale_mate==false && draw==null){
			board=JSON.parse(JSON.stringify(past_boards[past_boards.length-1]))
			previous_squares=JSON.parse(JSON.stringify(past_previous_squares[past_previous_squares.length-1]))
			white_castle=JSON.parse(JSON.stringify(past_white_castle[past_white_castle.length-1]))
			black_castle=JSON.parse(JSON.stringify(past_black_castle[past_black_castle.length-1]))
			en_passant=JSON.parse(JSON.stringify(past_en_passant[past_en_passant.length-1]))
			killed_pieces=JSON.parse(JSON.stringify(past_killed_pieces[past_killed_pieces.length-1]))		
			move_rule_50=JSON.parse(JSON.stringify(past_move_rule_50[past_move_rule_50.length-1]))		
			move=(move+1)%2
			all_moves=[[]]
			check_mate=null
			stale_mate=false
			check=false
			all(String.fromCharCode((((move%2))*21)+98))
			past()
			past_move_rule_50.pop()
			past_killed_pieces.pop()
			past_black_castle.pop()
			past_en_passant.pop()	
			past_white_castle.pop()
			past_previous_squares.pop()	
			past_boards.pop()
			check_mate_f(String.fromCharCode((((move%2))*21)+98))
		}
	}else if (XY[0]<720 && XY[0]>680 && XY[1]<230 && XY[1]>190){
		resign="black"
	}else if (XY[0]<720 && XY[0]>680 && XY[1]<370 && XY[1]>330){
		resign="white"
	}else if(XY[0]<720 && XY[0]>680 && XY[1]<300 && XY[1]>260){
		if (check_mate!=null || stale_mate==true || draw!=null || resign!=null){
			display=true
			past_boards=[]
			past_previous_squares=[]
			past_white_castle=[]
			past_black_castle=[]
			past_en_passant=[]
			past_killed_pieces=[]
			board=[["bR8","bN","bB8","bQ8","bK2","bB8","bN","bR8"],
			["bP","bP","bP","bP","bP","bP","bP","bP"],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			["wP","wP","wP","wP","wP","wP","wP","wP"],
			["wR8","wN","wB8","wQ8","wK2","wB8","wN","wR8"]];
			white_castle=[true,true,false,false]
			black_castle=[true,true,false,false]
			previous_squares=[[8,8],[8,8]]
			move=0;
			en_passant=8
			killed_pieces=[]
			check_mate=null
			stale_mate=false
			draw=null
			resign=null
			display=true
			check=false
			move_rule_50=0
			past_move_rule_50=[]
			past()
		}
	}
	if (XY[0]<645 && XY[0]>595 && XY[1]<255 && XY[1]>205){
		if (draw_clicks!=3){
			draw_clicks=draw_clicks+3
		}
	}else if (XY[0]<645 && XY[0]>595 && XY[1]<375 && XY[1]>325){
		if (draw_clicks!=2){
			draw_clicks=draw_clicks+2
		}	
	}else{
		draw_clicks=0
	}
	if (draw_clicks==5){
		draw="agree"
		draw_clicks=0
	}
});
function past(){	
	past_boards_2=JSON.parse(JSON.stringify(past_boards))
	past_previous_squares_2=JSON.parse(JSON.stringify(past_previous_squares))
	past_white_castle_2=JSON.parse(JSON.stringify(past_white_castle))
	past_black_castle_2=JSON.parse(JSON.stringify(past_black_castle))
	past_en_passant_2=JSON.parse(JSON.stringify(past_en_passant))
	past_killed_pieces_2=JSON.parse(JSON.stringify(past_killed_pieces))
	past_move_rule_50_2=JSON.parse(JSON.stringify(past_move_rule_50))
	past_boards_2.push(JSON.parse(JSON.stringify(board)))
	past_previous_squares_2.push(JSON.parse(JSON.stringify(previous_squares)))
	past_white_castle_2.push(JSON.parse(JSON.stringify(white_castle)))
	past_black_castle_2.push(JSON.parse(JSON.stringify(black_castle)))
	past_en_passant_2.push(JSON.parse(JSON.stringify(en_passant)))
	past_killed_pieces_2.push(JSON.parse(JSON.stringify(killed_pieces)))
	past_move_rule_50_2.push(JSON.parse(JSON.stringify(move_rule_50)))
	window.localStorage.setItem('Chess_past_boards',JSON.stringify(past_boards_2));
	window.localStorage.setItem('Chess_past_previous_squares',JSON.stringify(past_previous_squares_2));
	window.localStorage.setItem('Chess_past_white_castle',JSON.stringify(past_white_castle_2));
	window.localStorage.setItem('Chess_past_black_castle',JSON.stringify(past_black_castle_2));
	window.localStorage.setItem('Chess_move',JSON.stringify(move));
	window.localStorage.setItem('Chess_past_en_passant',JSON.stringify(past_en_passant_2));
	window.localStorage.setItem('Chess_past_killed_pieces',JSON.stringify(past_killed_pieces_2));
	window.localStorage.setItem('Chess_past_move_rule_50',JSON.stringify(past_move_rule_50_2));
}
document.addEventListener("mousemove",  function (e) {
	XY = getXY(canvas, e);
	if (current_piece!=null){
		moving_piece_coord=[XY[0],XY[1]];
	}
});
function variable_reset2(){
	previous_squares[0]=current_piece_coord
	previous_squares[1]=[Math.floor(XY[0]/70),Math.floor(XY[1]/70)]
	if(board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]!=null){
		killed_pieces.push(board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)])
	}
}
document.addEventListener("mouseup",  function (e) {
	XY = getXY(canvas, e);
	if (promotion[0]!=8){
		if (Math.floor(XY[0]/70)==promotion[0]){
			if(Math.floor(XY[1]/70)==promotion[1]-Math.sign(promotion[1]-1)*0){
				variable_reset()
				variable_reset2()
				board[promotion[1]][promotion[0]]=String.fromCharCode((promotion[1]-7)*-3+98)+"Q8"
				all(current_piece[0])
			}
			if(Math.floor(XY[1]/70)==promotion[1]-Math.sign(promotion[1]-1)*1){
				variable_reset()
				variable_reset2()				
				board[promotion[1]][promotion[0]]=String.fromCharCode((promotion[1]-7)*-3+98)+"R8"
				all(current_piece[0])
			}
			if(Math.floor(XY[1]/70)==promotion[1]-Math.sign(promotion[1]-1)*2){
				variable_reset()
				variable_reset2()
				board[promotion[1]][promotion[0]]=String.fromCharCode((promotion[1]-7)*-3+98)+"B8"
				all(current_piece[0])
			}
			if(Math.floor(XY[1]/70)==promotion[1]-Math.sign(promotion[1]-1)*3){
				variable_reset()
				variable_reset2()
				board[promotion[1]][promotion[0]]=String.fromCharCode((promotion[1]-7)*-3+98)+"N"
				all(current_piece[0])
			}

		}
		check_mate_f(current_piece[0])
		promotion=[8,8]
		current_piece=null
		current_piece_coord=[-1,-1];
		moving_piece_coord=[-1,-1];
	}
	if (current_piece!=null){
		var available=false
		for (i=0;i<possible_moves.length;i++){
			if(Math.floor(XY[0]/70)==possible_moves[i][0] && Math.floor(XY[1]/70)==possible_moves[i][1]){
				available=true
			}
		}if (available==true){
			past_previous_squares.push(JSON.parse(JSON.stringify(previous_squares)))
			past_boards.push(JSON.parse(JSON.stringify(board)))
			past_white_castle.push(JSON.parse(JSON.stringify(white_castle)))
			past_black_castle.push(JSON.parse(JSON.stringify(black_castle)))
			past_en_passant.push(JSON.parse(JSON.stringify(en_passant)))
			past_killed_pieces.push(JSON.parse(JSON.stringify(killed_pieces)))
			past_move_rule_50.push(JSON.parse(JSON.stringify(move_rule_50)))
			if (board[current_piece_coord[1]][current_piece_coord[0]]=="wK2"){
				if (white_castle[0]==true && Math.floor(XY[0]/70)==2){
					board[7][0]=null
					board[7][3]="wR8"
				}else if (white_castle[1]==true && Math.floor(XY[0]/70)==6){
					board[7][7]=null
					board[7][5]="wR8"
				}
				white_castle[0]=false
				white_castle[1]=false
			}else if(board[current_piece_coord[1]][current_piece_coord[0]]=="wR8"){
				white_castle[(Math.floor(XY[0]/70)-1)/5]=false
			}	
			if (board[current_piece_coord[1]][current_piece_coord[0]]=="bK2"){
				if (black_castle[0]==true && Math.floor(XY[0]/70)==2){
					board[0][0]=null
					board[0][3]="bR8"
				}else if (black_castle[1]==true && Math.floor(XY[0]/70)==6){
					board[0][7]=null
					board[0][5]="bR8"
				}
				black_castle[0]=false
				black_castle[1]=false
			}else if(board[current_piece_coord[1]][current_piece_coord[0]]=="bR8"){
				black_castle[(Math.floor(XY[0]/70)-1)/5]=false
			}	
			en_passant=0
			if (board[current_piece_coord[1]][current_piece_coord[0]][1]=="P"){
				if ((current_piece_coord[1]-(Math.floor(XY[1]/70)))*(Math.sign(current_piece_coord[1]-(Math.floor(XY[1]/70))))==2){
					en_passant=current_piece_coord[0]
				}else if (board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]==null &&(current_piece_coord[0]-Math.floor(XY[0]/70))**2==1 && board[Math.floor(XY[1]/70)+(current_piece_coord[1]-Math.floor(XY[1]/70))][Math.floor(XY[0]/70)]!=null){
					killed_pieces.push(board[Math.floor(XY[1]/70)+(current_piece_coord[1]-Math.floor(XY[1]/70))][Math.floor(XY[0]/70)])
					board[Math.floor(XY[1]/70)+(current_piece_coord[1]-Math.floor(XY[1]/70))][Math.floor(XY[0]/70)]=null
				}else if(Math.floor(XY[1]/70)==0 || Math.floor(XY[1]/70)==7){
					promotion[0]=Math.floor(XY[0]/70)
					promotion[1]=Math.floor(XY[1]/70)
				}	
			}
			if(promotion[0]==8){
				previous_squares[0]=current_piece_coord
				previous_squares[1]=[Math.floor(XY[0]/70),Math.floor(XY[1]/70)]
				if (current_piece[1]=="P" || board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)]!=null && board[Math.floor(XY[1]/70)][Math.floor(XY[0]/70)][1]!="P"){
					move_rule_50=0
				}else{
					move_rule_50++
				}
				variable_reset()
				check_mate_f(current_piece[0])
			}else{
				move_rule_50=0
			}
			past()
		}else{
			board[current_piece_coord[1]][current_piece_coord[0]]=current_piece
		} 
		if(promotion[0]==8){
			possible_moves=[]
			current_piece=null
			current_piece_coord=[-1,-1];
			moving_piece_coord=[-1,-1];
		}			
	}
});
if (typeof(Storage) !== "undefined") {
	var past_previous_squares=[]
	var past_white_castle=[]
	var past_black_castle=[]
	var past_en_passant=[]
	var past_killed_pieces=[]
	var past_move_rule_50=[]

	var past_boards=JSON.parse(window.localStorage.getItem('Chess_past_boards'));
	if (past_boards!=null){
		if (past_boards.length!=0){
			var past_previous_squares=JSON.parse(window.localStorage.getItem('Chess_past_previous_squares'));
			var past_white_castle=JSON.parse(window.localStorage.getItem('Chess_past_white_castle'));
			var past_black_castle=JSON.parse(window.localStorage.getItem('Chess_past_black_castle'));
			var past_en_passant=JSON.parse(window.localStorage.getItem('Chess_past_en_passant'));
			var past_killed_pieces=JSON.parse(window.localStorage.getItem('Chess_past_killed_pieces'));
			var past_move_rule_50=JSON.parse(window.localStorage.getItem('Chess_past_move_rule_50'));
			var move=JSON.parse(window.localStorage.getItem('Chess_move'));
			var board=past_boards[past_boards.length-1];
			var white_castle=past_white_castle[past_white_castle.length-1];
			var black_castle=past_black_castle[past_black_castle.length-1];
			var previous_squares=past_previous_squares[past_previous_squares.length-1];
			var en_passant=past_en_passant[past_en_passant.length-1];
			var killed_pieces=past_killed_pieces[past_killed_pieces.length-1];
			var move_rule_50=past_move_rule_50[past_move_rule_50.length-1];
			past_boards.pop();
			past_previous_squares.pop();
			past_white_castle.pop();
			past_black_castle.pop();
			past_en_passant.pop();
			past_killed_pieces.pop();
			past_move_rule_50.pop();
		}
	}
	if(past_boards==null || past_boards.length==0){
		var move_rule_50=0
		var past_boards=[]
		var board=[["bR8","bN","bB8","bQ8","bK2","bB8","bN","bR8"],
		["bP","bP","bP","bP","bP","bP","bP","bP"],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		["wP","wP","wP","wP","wP","wP","wP","wP"],
		["wR8","wN","wB8","wQ8","wK2","wB8","wN","wR8"]];
		var white_castle=[true,true,false,false]
		var black_castle=[true,true,false,false]
		var previous_squares=[[8,8],[8,8]]
		var move=0;
		var en_passant=8
		var killed_pieces=[]
	}
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var f = new FontFace('Italianno-SourceSansPro-Regular', 'url(SourceSansPro-Regular.ttf)');
var board_img = new Image()
board_img.src="Board.png"
var display=true
var draw_clicks=0
var draw=null
var resign=null
var check_mate=null
var stale_mate=false
var king_coord=[8,8]
var XY=0
var promotion=[8,8]
var current_piece=null
var current_piece_coord=[-1,-1];
var moving_piece_coord=[-1,-1];
var possible_moves=[[]]
var possible_moves2=[]
var potential_pin=[]
var potential_block=[[]]
var pin_block=[[]]
var pins=[]
var block=[[]]
var check=false
var double_check=false
var all_moves=[[]]
all(String.fromCharCode((((move%2))*21)+98))
check_mate_f(String.fromCharCode((((move%2))*21)+98))
setInterval(onTimerTick, 20);
function onTimerTick() {    	
	Game_State_Display()
}
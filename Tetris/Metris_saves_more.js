var f = new FontFace('PressStart2P-Regular', 'url(PressStart2P-Regular.ttf)');
var keys=[]
var start=0;
var end=0;
var move_finished=false
var keyup=false;
var keyup2=false;
var size=0;
var once=1;
document.body.addEventListener("keydown", function (e) {
	if (e.keyCode==87 || e.keyCode==38){
		keyup=false;
	}
	if (e.keyCode==32 ){
		keyup2=false;
	}
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
	if (e.keyCode==87){
		keyup=true;
	}
	if (e.keyCode==32){
		keyup=true;
	}
	if (e.keycode!==32 || e.keyCode!==67){
		keys[e.keyCode] = false;
	}
});
var Death=false;
function block_resets(colour){
	if (colour=='#0464C8'){
		return([[1,4],[1,5],[2,4],[3,4]])
	}
	if (colour=='#F4A800'){
		return([[1,4],[1,5],[2,5],[3,5]])
	}
	if (colour=='#00D0E2'){
		return([[0,4],[1,4],[2,4],[3,4]])
	}
	if (colour=='#FFEF26'){
		return([[2,4],[2,5],[3,4],[3,5]])
	}
	if (colour=='#D50A00'){
		return([[1,5],[2,5],[2,4],[3,4]])
	}
	if (colour=='#00E831'){
		return([[1,4],[2,5],[2,4],[3,5]])
	}
	if (colour=='#9B01B9'){
		return([[1,4],[3,4],[2,4],[2,5]])
	}
}
class piece{
	constructor(colour,colour2,start,end,move_finished,block1,block2,block3,block4,block1_reset,block2_reset,block3_reset,block4_reset){
	    this.colour=colour;
	    this.colour2=colour2
	    this.block1=block1;
	    this.block2=block2;
	    this.block3=block3;
	    this.block4=block4;
	    this.block1_reset=block1_reset;
	    this.block2_reset=block2_reset;
	    this.block3_reset=block3_reset;
	    this.block4_reset=block4_reset;
	    this.move_finished=move_finished;
	    this.start=start;
	    this.end=end;
	}
    holding(){
    	holding_board=[[null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null]];
        holding_board[this.block1_reset[0]][this.block1_reset[1]-2]=this.colour;
        holding_board[this.block2_reset[0]][this.block2_reset[1]-2]=this.colour;
        holding_board[this.block3_reset[0]][this.block3_reset[1]-2]=this.colour;
        holding_board[this.block4_reset[0]][this.block4_reset[1]-2]=this.colour;
        Board[this.block1[0]][this.block1[1]]=null;
        Board[this.block2[0]][this.block2[1]]=null;
        Board[this.block3[0]][this.block3[1]]=null;
        Board[this.block4[0]][this.block4[1]]=null;
    }
    next_piece_spawn(){
    	next_piece_board=[[null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null]];
        next_piece_board[this.block1_reset[0]][this.block1_reset[1]-2]=this.colour;
        next_piece_board[this.block2_reset[0]][this.block2_reset[1]-2]=this.colour;
        next_piece_board[this.block3_reset[0]][this.block3_reset[1]-2]=this.colour;
        next_piece_board[this.block4_reset[0]][this.block4_reset[1]-2]=this.colour;
    }
    spawn_piece(){
    	let reset_list=block_resets(this.colour);
    	this.block1=reset_list[0];
    	this.block2=reset_list[1];
    	this.block3=reset_list[2];
    	this.block4=reset_list[3];
        Board[this.block1[0]][this.block1[1]]=this.colour;
        Board[this.block2[0]][this.block2[1]]=this.colour;
        Board[this.block3[0]][this.block3[1]]=this.colour;
        Board[this.block4[0]][this.block4[1]]=this.colour;
    }
    soft_drop_piece(){
        if (this.move_finished==true){
            this.move_finished=false;
            this.start=Date.now();
        }else{
            this.end=Date.now();
            if (this.end-this.start>=400){
                this.move_finished=true;

	            Board[this.block1[0]][this.block1[1]]=null;
	            Board[this.block2[0]][this.block2[1]]=null;
	            Board[this.block3[0]][this.block3[1]]=null;
	            Board[this.block4[0]][this.block4[1]]=null;
	            var checker=false;
	            if (this.block1[0]+1<22){
	            	if ((this.block2[0])+1<22){
		            	if (this.block3[0]+1<22){
		            		if (this.block4[0]+1<22){
			                	if (Board[this.block1[0]+1][(this.block1[1])]==null){
			                		if(Board[this.block2[0]+1][this.block2[1]]==null){ 
			                    		if(Board[this.block3[0]+1][this.block3[1]]==null){
			                     			if(Board[this.block4[0]+1][this.block4[1]]==null){
			                     				checker=true
			                     				if	(keys[83]==false || keys[40]==false || once==1){
								                    this.block1[0]=this.block1[0]+1;
								                    this.block2[0]=this.block2[0]+1;
								                    this.block3[0]=this.block3[0]+1;
								                    this.block4[0]=this.block4[0]+1;
								                }
							                }
							            }
							        }
			                	}
			                }
		                }
		            }
	            }
	            if (checker==false){
	            	moving=false;
	            }
	            Board[this.block1[0]][this.block1[1]]=this.colour;
	            Board[this.block2[0]][this.block2[1]]=this.colour;
	            Board[this.block3[0]][this.block3[1]]=this.colour;
	            Board[this.block4[0]][this.block4[1]]=this.colour;
            }
        }
	}
    prediction_function(){
        var a=0;
        Board[this.block1[0]][this.block1[1]]=null;
        Board[this.block2[0]][this.block2[1]]=null;
        Board[this.block3[0]][this.block3[1]]=null;
        Board[this.block4[0]][this.block4[1]]=null;
        var Break=false;
        var i=0;
        for (i=0;i<22;i++){
            if (this.block1[0]+i<22 && this.block2[0]+i<22 && this.block3[0]+i<22 && this.block4[0]+i<22 && Break==false){
                if (Board[this.block1[0]+i][(this.block1[1])]==null && Board[this.block2[0]+i][this.block2[1]]==null &&
                    Board[this.block3[0]+i][this.block3[1]]==null && Board[this.block4[0]+i][this.block4[1]]==null){
                    a=i;
                }else{
                    Break=true;
                }
            }
        }    
        var y=0;
        var x=0;         
        for (y=0;y<22;y++){
            for (x=0;x<10;x++){
                prediction[y][x]=null;
            }
        }
        prediction[this.block1[0]+a][this.block1[1]]=this.colour2;
        prediction[this.block2[0]+a][this.block2[1]]=this.colour2;
        prediction[this.block3[0]+a][this.block3[1]]=this.colour2;
        prediction[this.block4[0]+a][this.block4[1]]=this.colour2;
        Board[this.block1[0]][this.block1[1]]=this.colour;
        Board[this.block2[0]][this.block2[1]]=this.colour;
        Board[this.block3[0]][this.block3[1]]=this.colour;
        Board[this.block4[0]][this.block4[1]]=this.colour;
    }
	move(){
        if (move_finished==true){
            move_finished=false;
            start=Date.now();
        }else{
            end=Date.now();
            if (end-start>=60){
                move_finished=true;
               	Board_directionx=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]] ;
				Board_directiony=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]] ;
				if (slept==0){
					slept=1;
					i=0;
					var x_done1=false
					var x_done2=false
					var y_done=false
				    if (a_press>=3){
				    	a_press=0
			            Board[this.block1[0]][this.block1[1]]=null;
			            Board[this.block2[0]][this.block2[1]]=null;
			            Board[this.block3[0]][this.block3[1]]=null;
			            Board[this.block4[0]][this.block4[1]]=null;
			            if (this.block1[1]-1>-1){
			            	if ((this.block2[1])-1>-1){
				            	if (this.block3[1]-1>-1){
				            		if (this.block4[1]-1>-1){
					                	if (Board[this.block1[0]][(this.block1[1]-1)]==null){
					                		if(Board[this.block2[0]][this.block2[1]-1]==null){ 
					                    		if(Board[this.block3[0]][this.block3[1]-1]==null){
					                     			if(Board[this.block4[0]][this.block4[1]-1]==null){
					                     				frame=1;
					                     				x_done1=true
									                    this.block1[1]=this.block1[1]-1;
									                    this.block2[1]=this.block2[1]-1;
									                    this.block3[1]=this.block3[1]-1;
									                    this.block4[1]=this.block4[1]-1;
									                    Board_directionx[this.block1[0]][this.block1[1]]=-1;
					                     				Board_directionx[this.block2[0]][this.block2[1]]=-1;
					                     				Board_directionx[this.block3[0]][this.block3[1]]=-1;
					                     				Board_directionx[this.block4[0]][this.block4[1]]=-1;
									                }
									            }
									        }
					                	}
					                }
				                }
				            }
			            }
			            Board[this.block1[0]][this.block1[1]]=this.colour;
			            Board[this.block2[0]][this.block2[1]]=this.colour;
			            Board[this.block3[0]][this.block3[1]]=this.colour;
			            Board[this.block4[0]][this.block4[1]]=this.colour;  
				    }
				    if (d_press>=3){
				    	d_press=0
			            Board[this.block1[0]][this.block1[1]]=null;
			            Board[this.block2[0]][this.block2[1]]=null;
			            Board[this.block3[0]][this.block3[1]]=null;
			            Board[this.block4[0]][this.block4[1]]=null;
			            if (this.block1[1]+1<10){
			            	if ((this.block2[1])+1<10){
				            	if (this.block3[1]+1<10){
				            		if (this.block4[1]+1<10){
					                	if (Board[this.block1[0]][(this.block1[1]+1)]==null){
					                		if(Board[this.block2[0]][this.block2[1]+1]==null){ 
					                    		if(Board[this.block3[0]][this.block3[1]+1]==null){
					                     			if(Board[this.block4[0]][this.block4[1]+1]==null){
					                     				frame=1;
					                     				x_done2=true
									                    this.block1[1]=this.block1[1]+1;
									                    this.block2[1]=this.block2[1]+1;
									                    this.block3[1]=this.block3[1]+1;
									                    this.block4[1]=this.block4[1]+1;
									                    Board_directionx[this.block1[0]][this.block1[1]]=1;
					                     				Board_directionx[this.block2[0]][this.block2[1]]=1;
					                     				Board_directionx[this.block3[0]][this.block3[1]]=1;
					                     				Board_directionx[this.block4[0]][this.block4[1]]=1;
									                }
									            }
									        }
					                	}
					                }
				                }
				            }
			            }
			            Board[this.block1[0]][this.block1[1]]=this.colour;
			            Board[this.block2[0]][this.block2[1]]=this.colour;
			            Board[this.block3[0]][this.block3[1]]=this.colour;
			            Board[this.block4[0]][this.block4[1]]=this.colour;
			        }
				    if (s_press!==0){
				    	s_press=0
			            Board[this.block1[0]][this.block1[1]]=null;
			            Board[this.block2[0]][this.block2[1]]=null;
			            Board[this.block3[0]][this.block3[1]]=null;
			            Board[this.block4[0]][this.block4[1]]=null;
			            if (this.block1[0]+1<22){
			            	if ((this.block2[0])+1<22){
				            	if (this.block3[0]+1<22){
				            		if (this.block4[0]+1<22){
					                	if (Board[this.block1[0]+1][(this.block1[1])]==null){
					                		if(Board[this.block2[0]+1][this.block2[1]]==null){ 
					                    		if(Board[this.block3[0]+1][this.block3[1]]==null){
					                     			if(Board[this.block4[0]+1][this.block4[1]]==null){
					                     				frame=1;
					                     				y_done=true
									                    this.block1[0]=this.block1[0]+1;
									                    this.block2[0]=this.block2[0]+1;
									                    this.block3[0]=this.block3[0]+1;
									                    this.block4[0]=this.block4[0]+1;
									                    Board_directiony[this.block1[0]][this.block1[1]]=1;
					                     				Board_directiony[this.block2[0]][this.block2[1]]=1;
					                     				Board_directiony[this.block3[0]][this.block3[1]]=1;
					                     				Board_directiony[this.block4[0]][this.block4[1]]=1;
									                }
									            }
									        }
					                	}
					                }
				                }
				            }
			            }
			            Board[this.block1[0]][this.block1[1]]=this.colour;
			            Board[this.block2[0]][this.block2[1]]=this.colour;
			            Board[this.block3[0]][this.block3[1]]=this.colour;
			            Board[this.block4[0]][this.block4[1]]=this.colour;
			        
				    }
				    if (w_press!==0){
				    	w_press=0
		                Board[this.block1[0]][this.block1[1]]=null
		                Board[this.block2[0]][this.block2[1]]=null
		                Board[this.block3[0]][this.block3[1]]=null
		                Board[this.block4[0]][this.block4[1]]=null
		                var potential_block3=this.block3
		                var block1_matrix=[(this.block1[0]-this.block3[0]),(this.block1[1]-this.block3[1])];
		                var block1_matrix=[block1_matrix[0]*0+1*block1_matrix[1],-1*block1_matrix[0]+0*block1_matrix[1]];
		                var potential_block1=[this.block3[0]+block1_matrix[0],this.block3[1]+block1_matrix[1]];

		                var block2_matrix=[(this.block2[0]-this.block3[0]),(this.block2[1]-this.block3[1])];
		                var block2_matrix=[block2_matrix[0]*0+1*block2_matrix[1],-1*block2_matrix[0]+0*block2_matrix[1]];
		                var potential_block2=[this.block3[0]+block2_matrix[0],this.block3[1]+block2_matrix[1]];

		                var block4_matrix=[(this.block4[0]-this.block3[0]),(this.block4[1]-this.block3[1])];
		                var block4_matrix=[block4_matrix[0]*0+1*block4_matrix[1],-1*block4_matrix[0]+0*block4_matrix[1]];
		                var potential_block4=[this.block3[0]+block4_matrix[0],this.block3[1]+block4_matrix[1]];
		                var i=0;
		                var finished=false;
		                for (i=0;i>-3;i=i-1){
		                	if (finished==false){
				                if (potential_block1[0]<22 && potential_block2[0]<22 && potential_block4[0]<22  && this.block3[0]<22){
				                   if (potential_block1[1]-i<10 && potential_block2[1]-i<10 && potential_block4[1]-i<10 && this.block3[1]-i<10){
				                       if(potential_block2[1]-i>-1 && potential_block4[1]-i>-1 && potential_block1[1]-i>-1 && this.block3[1]-i>-1){
				                            if (Board[potential_block1[0]][(potential_block1[1]-i)]==null && Board[potential_block2[0]][potential_block2[1]-i]==null && Board[potential_block4[0]][potential_block4[1]-i]==null && Board[this.block3[0]][this.block3[1]-i]==null){    
			                                	finished=true;  
			                                    this.block1=[potential_block1[0],potential_block1[1]-i];
			                                    this.block2=[potential_block2[0],potential_block2[1]-i];
			                                    this.block3=[this.block3[0],(this.block3[1]-i)]
			                                    this.block4=[potential_block4[0],potential_block4[1]-i];
				                            }
				                        }
				                    }
				                }
				            }
		                }
		                var i=0;
		                for (i=0;i<3;i++){
		                	if (finished==false){
				                if (potential_block1[0]<22 && potential_block2[0]<22 && potential_block4[0]<22  && this.block3[0]<22){
				                   if (potential_block1[1]-i<10 && potential_block2[1]-i<10 && potential_block4[1]-i<10 && this.block3[1]-i<10){
				                       if(potential_block2[1]-i>-1 && potential_block4[1]-i>-1 && potential_block1[1]-i>-1 && this.block3[1]-i>-1){
				                            if (Board[potential_block1[0]][(potential_block1[1]-i)]==null && Board[potential_block2[0]][potential_block2[1]-i]==null && Board[potential_block4[0]][potential_block4[1]-i]==null && Board[this.block3[0]][this.block3[1]-i]==null){    
			                                	finished=true;  
			                                    this.block1=[potential_block1[0],potential_block1[1]-i];
			                                    this.block2=[potential_block2[0],potential_block2[1]-i];
			                                    this.block3=[this.block3[0],(this.block3[1]-i)]
			                                    this.block4=[potential_block4[0],potential_block4[1]-i];
				                            }
				                        }
				                    }
				                }
				            }
		                }

		                Board[this.block1[0]][this.block1[1]]=this.colour
		                Board[this.block2[0]][this.block2[1]]=this.colour
		                Board[this.block3[0]][this.block3[1]]=this.colour
		                Board[this.block4[0]][this.block4[1]]=this.colour
		            }
				    if (space_press!==0){
				    	space_press=0
		            	var i=0;
		            	while (i<22){
		            		i=i+1;
				            Board[this.block1[0]][this.block1[1]]=null;
				            Board[this.block2[0]][this.block2[1]]=null;
				            Board[this.block3[0]][this.block3[1]]=null;
				            Board[this.block4[0]][this.block4[1]]=null;
				            var checker=false;
				            if (this.block1[0]+1<22){
				            	if ((this.block2[0])+1<22){
					            	if (this.block3[0]+1<22){
					            		if (this.block4[0]+1<22){
						                	if (Board[this.block1[0]+1][(this.block1[1])]==null){
						                		if(Board[this.block2[0]+1][this.block2[1]]==null){ 
						                    		if(Board[this.block3[0]+1][this.block3[1]]==null){
						                     			if(Board[this.block4[0]+1][this.block4[1]]==null){	
										                    this.block1[0]=this.block1[0]+1;
										                    this.block2[0]=this.block2[0]+1;
										                    this.block3[0]=this.block3[0]+1;
										                    this.block4[0]=this.block4[0]+1;
										                    checker=true;
										                }
										            }
										        }
						                	}
						                }
					                }
					            }
				            }
				            if (checker==false){
				            	moving=false;
				            }
				            Board[this.block1[0]][this.block1[1]]=this.colour;
				            Board[this.block2[0]][this.block2[1]]=this.colour;
				            Board[this.block3[0]][this.block3[1]]=this.colour;
				            Board[this.block4[0]][this.block4[1]]=this.colour;    
				        }   
			        }
			        if (x_done1==true && y_done==true){
				        Board_directionx[this.block1[0]][this.block1[1]]=-1;
	     				Board_directionx[this.block2[0]][this.block2[1]]=-1;
	     				Board_directionx[this.block3[0]][this.block3[1]]=-1;
	     				Board_directionx[this.block4[0]][this.block4[1]]=-1;
	     			}else if(x_done2==true && y_done==true){
               			Board_directionx=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]] ;
				        Board_directionx[this.block1[0]][this.block1[1]]=1;
	     				Board_directionx[this.block2[0]][this.block2[1]]=1;
	     				Board_directionx[this.block3[0]][this.block3[1]]=1;
	     				Board_directionx[this.block4[0]][this.block4[1]]=1;	     				
	     			}
			    }
			}
		}
	}
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}
function Game_State_Display(){
	var canvas = document.getElementById("Screen");
	var ctx = canvas.getContext('2d');
	ctx.fillStyle='#171717';    
	ctx.fillRect(0, 0, 311, 559); // create rectangle
	ctx.fillStyle='#171717';    
	ctx.fillRect(311, 0, 248, 559);
	ctx.fillStyle='#7BD3F6';    
	ctx.fillRect(311, 1, 247, 557); // create rectangle  
	ctx.fillStyle='#171717';    
	ctx.fillRect(341, 195, 187, 156);
	ctx.fillRect(341, 380, 187, 156);
	ctx.fillRect(341, 20, 187, 63);
	ctx.fillRect(341, 107, 187, 63);
	for (y=0;y<2;y++){
	    for (x=0;x<6;x++){
			ctx.fillStyle='#171717';    
			ctx.fillRect((x*(30+1))+342, (((y)*(30+1))+21), 30, 30); 
	    }
	}
	for (y=0;y<2;y++){
	    for (x=0;x<6;x++){
			ctx.fillStyle='#171717';    
			ctx.fillRect((x*(30+1))+342, (((y)*(30+1))+108), 30, 30); 
	    }
	}
	for (y=0;y<5;y++){
	    for (x=0;x<6;x++){
			ctx.fillStyle='#171717';    
			ctx.fillRect((x*(30+1))+342, (((y)*(30+1))+196), 30, 30); 
	    }
	}
	for (y=0;y<5;y++){
	    for (x=0;x<6;x++){
	    	if (holding_board[y][x]!=null){
			ctx.fillStyle=holding_board[y][x];    
			ctx.roundRect((x*(30+1))+342, (((y)*(30+1))+196), 30, 30,5).fill(); 
	    	}
	    }
	}
	for (y=0;y<5;y++){
	    for (x=0;x<6;x++){
			ctx.fillStyle='#171717';    
			ctx.fillRect((x*(30+1))+342, (((y)*(30+1))+381), 30, 30); 
	    }
	}
	for (y=0;y<5;y++){
	    for (x=0;x<6;x++){
	    	if (next_piece_board[y][x]!=null){
			ctx.fillStyle=next_piece_board[y][x];    
			ctx.roundRect((x*(30+1))+342, (((y)*(30+1))+381), 30, 30,5).fill(); 
	    	}
	    }
	}
	for (y=4;y<22;y++){
	    for (x=0;x<10;x++){
			ctx.fillStyle='#171717';    
			ctx.fillRect((x*(30+1))+1, (((y-4)*(30+1))+1), 30, 30); 
	    }
	}
	for (y=4;y<22;y++){
	    for (x=0;x<10;x++){
	    	if (prediction[y][x]!=null){
			ctx.fillStyle=prediction[y][x];    
			ctx.roundRect((x*(30+1))+1, (((y-4)*(30+1))+1), 30, 30,5).fill(); 
	    	}
	    }
	}
	if (frame>3){
		frame=3;
	}
	for (y=4;y<22;y++){
	    for (x=0;x<10;x++){
	    	if (Board[y][x]!=null){
				var y_deviation=Board_directiony[y][x]
				var x_deviation=Board_directionx[y][x]
				ctx.fillStyle=Board[y][x]; 
				if (x_deviation!== null || y_deviation!== null){
					var x_deviation2=0
					var y_deviation2=0
					if (y_deviation==1){
						y_deviation2=-30
					}
					if (x_deviation==-1){
						x_deviation2=30
					}else if (x_deviation==1){
						x_deviation2=-30
					}
					ctx.roundRect((x*(30+1))+1+10*frame*x_deviation+x_deviation2, (((y-4)*(30+1))+1)+10*frame*y_deviation+y_deviation2, 30, 30,5).fill(); 
			    }else{
					ctx.roundRect((x*(30+1))+1, (((y-4)*(30+1))+1), 30, 30,5).fill();
			    }
			}
	    }
	}
	frame=frame+1
	f.load().then(function(font) {   document.fonts.add(font)
		if (score>=100000){
			ctx.font = 'bold 25px PressStart2P-Regular';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";		
			ctx.fillText(score, 434, 155);
		}else{
			ctx.font = 'bold 30px PressStart2P-Regular';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";		
			ctx.fillText(score, 434, 158);
		}

	});		
	f.load().then(function(font) {   document.fonts.add(font)
		ctx.font = 'bold 17px PressStart2P-Regular';
		ctx.fillStyle = "white";
		ctx.textAlign = "center";		
		ctx.fillText('High Score', 434, 45);

	});	
	f.load().then(function(font) {   document.fonts.add(font)
		ctx.font = 'bold 19px PressStart2P-Regular';
		ctx.fillStyle = "white";
		ctx.textAlign = "center";		
		if (typeof(Storage) !== "undefined") {
			var High_Score=window.localStorage.getItem('user')
			ctx.fillText(High_Score, 434, 75);
		}else{
			ctx.fillText('Unavailable', 434, 75);
		}
	});
	var y=0;
	var x=0;
	var hold_full=false
	for (y=0;y<4;y++){
	    for (x=0;x<4;x++){
	    	if(holding_board[y][x]!==null){
	    		hold_full=true;
	    	}
	    }
	}
	if (hold_full==false){
		f.load().then(function(font) {   document.fonts.add(font)		
			ctx.font = 'bold 17px PressStart2P-Regular';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";		
			ctx.fillText('Press C to', 434, 235);
			ctx.fillText('hold and', 434, 266);
			ctx.fillText('Space to', 434, 297);
			ctx.fillText('hard drop', 434, 328);
		});	
	}

}
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
function clear_line(){             
	var Delete=true;
	var b=0;
	for (y=0;y<22;y++){
	    for (x=0;x<10;x++){
	        if (Board[y][x]==null){
	            Delete=false;
	        }
	    }
	    if (Delete==true){
	        Board.splice(y,1)
	        Board.unshift([null,null,null,null,null,null,null,null,null,null]);
	    	b=b+1;
	    }
	    Delete=true;
	}
    if (b==1){
        score=score+75;
    }
    if (b==2){
        score=score+225;
    }
    if (b==3){
        score=score+525;
    }
    if (b==4){
        score=score+1125;
    }
    score=score+22;
	if (typeof(Storage) !== "undefined") {
		strscore=score.toString();
	    var High_Score=window.localStorage.getItem('user')
	    var int_High_Score=parseInt(High_Score);
	    if (score>int_High_Score){
	    	window.localStorage.clear();
	    	window.localStorage.setItem('user', strscore);
	   	}
	} 
	var as=0;
    for (as=0;as<10;as++){
        if (Board[3][as]!==null){
            Death=true
        }
    }

}

var frame=0;
var type=0;
var Board_directionx=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]] ;
var Board_directiony=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]] ;
var prediction=[[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null]] ;
var holding_board=[[null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null]];
var next_piece_board=[[null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null]];              

purple="#9B01B9";
lightBlue="#00D0E2";
green="#00E831";
darkBlue="#0464C8";
red="#D50A00";
orange="#F4A800";
yellow="#FFEF26";
run=true;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var slept=0;
var slept2=0;

var holding=false;
var score=0;
holding_change=true;
let RightL=new piece(darkBlue,"#8ab2e0",0,0,true,[],[],[],[],[1,4],[1,5],[2,4],[3,4]);
let LeftL=new piece(orange,"#fdd3bb",0,0,true,[],[],[],[],[1,4],[1,5],[2,5],[3,5]);
let Line=new piece(lightBlue,"#c1e3fe",0,0,true,[],[],[],[],[2,3],[2,4],[2,5],[2,6]);
let Square=new piece(yellow,"#fdf6dc",0,0,true,[],[],[],[],[2,4],[2,5],[3,4],[3,5]);
let LeftS=new piece(red,"#fccccc",0,0,true,[],[],[],[],[1,5],[2,5],[2,4],[3,4]);
let RightS=new piece(green,"#c9dece",0,0,true,[],[],[],[],[1,4],[2,5],[2,4],[3,5]);
let Pyramid=new piece(purple,"#cfb6e5",0,0,true,[],[],[],[],[1,4],[3,4],[2,4],[2,5]);
var Pieces_joined=[RightL,LeftL,Line,Square,Pyramid,RightS,LeftS];
var Held_piece_class=null;
if (typeof(Storage) !== "undefined") {
	var colour3=window.localStorage.getItem('colour3')
	if (colour3==null){
		var Board=[[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null]] ;
		var Current_piece = Pieces_joined[Math.floor(Math.random()*Pieces_joined.length)];
		var Next_piece=Pieces_joined[Math.floor(Math.random()*Pieces_joined.length)];
		moving=false
		var High_Score=window.localStorage.getItem('user')
		if (High_Score==null){
			window.localStorage.setItem('user', "0");
		}
	}else{
		moving=true
		var Board=JSON.parse(window.localStorage.getItem('Board'));
		var score=(JSON.parse(window.localStorage.getItem('score')))[0];
		var colour=window.localStorage.getItem('colour');
		var colour2=window.localStorage.getItem('colour2');
		var block1=JSON.parse(window.localStorage.getItem('Block1'));
		var block2=JSON.parse(window.localStorage.getItem('Block2'));
		var block3=JSON.parse(window.localStorage.getItem('Block3'));
		var block4=JSON.parse(window.localStorage.getItem('Block4'));
		var block1_reset=JSON.parse(window.localStorage.getItem('block1_reset'));
		var block2_reset=JSON.parse(window.localStorage.getItem('block2_reset'));
		var block3_reset=JSON.parse(window.localStorage.getItem('block3_reset'));
		var block4_reset=JSON.parse(window.localStorage.getItem('block4_reset'));
		var Current_piece=new piece(colour,colour2,0,0,true,block1,block2,block3,block4,block1_reset,block2_reset,block3_reset,block4_reset);

		var holding1=window.localStorage.getItem('holding5')
		if (holding1=='true'){
			var colour1=window.localStorage.getItem('colour1');
			var colour21=window.localStorage.getItem('colour21');
			var block11=JSON.parse(window.localStorage.getItem('Block11'));
			var block21=JSON.parse(window.localStorage.getItem('Block21'));
			var block31=JSON.parse(window.localStorage.getItem('Block31'));
			var block41=JSON.parse(window.localStorage.getItem('Block41'));
			var block1_reset1=JSON.parse(window.localStorage.getItem('block1_reset1'));
			var block2_reset1=JSON.parse(window.localStorage.getItem('block2_reset1'));
			var block3_reset1=JSON.parse(window.localStorage.getItem('block3_reset1'));
			var block4_reset1=JSON.parse(window.localStorage.getItem('block4_reset1'));
			var Held_piece_class=new piece(colour1,colour21,0,0,true,block11,block21,block31,block41,block1_reset1,block2_reset1,block3_reset1,block4_reset1);
			console.log(Held_piece_class)
			Held_piece_class.holding();
		}
		var colour3=window.localStorage.getItem('colour3');
		var colour23=window.localStorage.getItem('colour23');
		var block13=JSON.parse(window.localStorage.getItem('Block13'));
		var block23=JSON.parse(window.localStorage.getItem('Block23'));
		var block33=JSON.parse(window.localStorage.getItem('Block33'));
		var block43=JSON.parse(window.localStorage.getItem('Block43'));
		var block1_reset3=JSON.parse(window.localStorage.getItem('block1_reset3'));
		var block2_reset3=JSON.parse(window.localStorage.getItem('block2_reset3'));
		var block3_reset3=JSON.parse(window.localStorage.getItem('block3_reset3'));
		var block4_reset3=JSON.parse(window.localStorage.getItem('block4_reset3'));
		var Next_piece=new piece(colour3,colour23,0,0,true,block13,block23,block33,block43,block1_reset3,block2_reset3,block3_reset3,block4_reset3);
	}
}else{
	var Board=[[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null]] ;
	var Current_piece = Pieces_joined[Math.floor(Math.random()*Pieces_joined.length)];
	moving=false
}
var rty=true;
var holding_move_done=false;
Game_State_Display();
var a_press=0;
var d_press=0;
var w_press=0;
var s_press=0;
var space_press=0;
var myVar = setInterval(myTimer, 20);
function myTimer() {
	window.localStorage.setItem('Board',JSON.stringify(Board));
	var score_array=[score]
	window.localStorage.setItem('score',JSON.stringify(score_array));
	window.localStorage.setItem('colour',Current_piece.colour);
	window.localStorage.setItem('colour2',Current_piece.colour2);
	window.localStorage.setItem('Block1',JSON.stringify(Current_piece.block1));
	window.localStorage.setItem('Block2',JSON.stringify(Current_piece.block2));
	window.localStorage.setItem('Block3',JSON.stringify(Current_piece.block3));
	window.localStorage.setItem('Block4',JSON.stringify(Current_piece.block4));
	window.localStorage.setItem('block1_reset',JSON.stringify(Current_piece.block1_reset));
	window.localStorage.setItem('block2_reset',JSON.stringify(Current_piece.block2_reset));
	window.localStorage.setItem('block3_reset',JSON.stringify(Current_piece.block3_reset));
	window.localStorage.setItem('block4_reset',JSON.stringify(Current_piece.block4_reset));
	if (Held_piece_class!==null){
		window.localStorage.setItem('colour1',Held_piece_class.colour);
		window.localStorage.setItem('colour21',Held_piece_class.colour2);
		window.localStorage.setItem('Block11',JSON.stringify(Held_piece_class.block1));
		window.localStorage.setItem('Block21',JSON.stringify(Held_piece_class.block2));
		window.localStorage.setItem('Block31',JSON.stringify(Held_piece_class.block3));
		window.localStorage.setItem('Block41',JSON.stringify(Held_piece_class.block4));
		window.localStorage.setItem('block1_reset1',JSON.stringify(Held_piece_class.block1_reset));
		window.localStorage.setItem('block2_reset1',JSON.stringify(Held_piece_class.block2_reset));
		window.localStorage.setItem('block3_reset1',JSON.stringify(Held_piece_class.block3_reset));
		window.localStorage.setItem('block4_reset1',JSON.stringify(Held_piece_class.block4_reset));
		window.localStorage.setItem('holding5',true);
	}else{
		window.localStorage.setItem('holding5',false);
	}
	window.localStorage.setItem('colour3',Next_piece.colour);
	window.localStorage.setItem('colour23',Next_piece.colour2);
	window.localStorage.setItem('Block13',JSON.stringify(Next_piece.block1));
	window.localStorage.setItem('Block23',JSON.stringify(Next_piece.block2));
	window.localStorage.setItem('Block33',JSON.stringify(Next_piece.block3));
	window.localStorage.setItem('Block43',JSON.stringify(Next_piece.block4));
	window.localStorage.setItem('block1_reset3',JSON.stringify(Next_piece.block1_reset));
	window.localStorage.setItem('block2_reset3',JSON.stringify(Next_piece.block2_reset));
	window.localStorage.setItem('block3_reset3',JSON.stringify(Next_piece.block3_reset));
	window.localStorage.setItem('block4_reset3',JSON.stringify(Next_piece.block4_reset));
	if (keys[65] || keys[37]){
		a_press=a_press+1;
	}
	if (keys[68] || keys[39]){
		d_press=d_press+1;
	}
	if (keyup==false){
		if (keys[87] || keys[38]){
			keyup=true;
			w_press=1;
		}
	}
	if (keys[82] ){
		Death=true;
	}		
	if (keys[83] || keys[40]){
		once=0;
		s_press=s_press+1;
	}
	if (keys[32] ){
		keys[32]=false
		keyup2=true;
		space_press=1;
	}
	if (keys[67] && moving==true && Held_piece_class==null && holding_move_done==false){
		keys[67]=false;
	    holding=true;
	    Held_piece_class=Current_piece;
	    moving=false;
	    Held_piece_class.holding()
	    holding_move_done=true;
	}else if (keys[67] && moving==true  && Held_piece_class!==null && holding_move_done==false){
		keys[67]=false
        a=Held_piece_class;
        Held_piece_class=Current_piece;
        Current_piece=a;
        moving=false;
        Held_piece_class.holding()
        holding_change=false;
        holding_move_done=true;
    }
	if (moving==false){			
        if (holding_change==true){
            clear_line()
            Current_piece=Next_piece;
            var Pieces_joined=[RightL,LeftL,Line,Square,Pyramid,RightS,LeftS];
            Next_piece=Pieces_joined[Math.floor(Math.random()*Pieces_joined.length)];
            Next_piece.next_piece_spawn();
            Current_piece.spawn_piece();
            holding_move_done=false;
        }
        if (holding_change==false){
        	Current_piece.spawn_piece();
        	Next_piece.next_piece_spawn();
            holding_change=true;
        }
		moving=true;
		space_press=0
	}
	slept=0;
	slept2=0;
	Next_piece.next_piece_spawn();
	Current_piece.move();
	Current_piece.soft_drop_piece();
	Current_piece.prediction_function()
	Game_State_Display();
	if (Death==true){
		holding_change==true;
		holding=false;
		Held_piece_class=null;
		holding_board=[[null,null,null,null,null,null],
          [null,null,null,null,null,null],
          [null,null,null,null,null,null],
          [null,null,null,null,null,null],
          [null,null,null,null,null,null]];
		Death=false
		score=0;
	    Board=[[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null]] ;	
    }
}
class Piece{
    constructor(colour,blocks){
        this.colour=colour;
        this.blocks=blocks;
    }
    Soft_Drop(){
        if(frame%18==0){
            Remove(this.blocks)
            this.blocks=Change(this.blocks,0,1)
            Add(this.blocks,this.colour)
        }
    }
    Hard_Drop(){
        Remove(this.blocks)
        for(var i=0;i<22;i++){
            this.blocks=Change(this.blocks,0,1)
        }
        Add(this.blocks,this.colour)
        Move_Reset()
    }
    Left(){
        Remove(this.blocks)
        this.blocks=Change(this.blocks,-1,0)
        Add(this.blocks,this.colour)
    }
    Right(){
        Remove(this.blocks)
        this.blocks=Change(this.blocks,1,0)
        Add(this.blocks,this.colour)
    }
    Rotate(){
        Remove(this.blocks)
        var new_blocks=[]
        for(var i=0;i<4;i++){
            var x=this.blocks[i*2]-this.blocks[2];
            var y=this.blocks[i*2+1]-this.blocks[3];
            var x1=-y+this.blocks[2]
            var y1=x+this.blocks[3]
            new_blocks.push(x1)
            new_blocks.push(y1)
        }
        console.log(new_blocks)
        var finished=false
        for(var i=0;i<3;i++){
            if(finished==false){
                if(board[(new_blocks[0]+i)+new_blocks[1]*10]=="0" && new_blocks[0]+i>-1 && new_blocks[0]+i<10){
                    if(board[(new_blocks[2]+i)+new_blocks[3]*10]=="0" && new_blocks[2]+i>-1 && new_blocks[2]+i<10){
                        if(board[(new_blocks[4]+i)+new_blocks[5]*10]=="0" && new_blocks[4]+i>-1 && new_blocks[4]+i<10){
                            if(board[(new_blocks[6]+i)+new_blocks[7]*10]=="0" && new_blocks[6]+i>-1 && new_blocks[6]+i<10){
                                console.log(new_blocks[0],i)
                                for(var a=0;a<8;a=a+2){
                                    new_blocks[a]=new_blocks[a]+i
                                }
                                this.blocks=new_blocks 
                                finished=true                     
                            }
                        }
                    }
                }
            }
        }
        for(var i=0;i>-3;i--){
            if(finished==false){
                if(board[(new_blocks[0]+i)+new_blocks[1]*10]=="0" && new_blocks[0]+i>-1 && new_blocks[0]+i<10){
                    if(board[(new_blocks[2]+i)+new_blocks[3]*10]=="0" && new_blocks[2]+i>-1 && new_blocks[2]+i<10){
                        if(board[(new_blocks[4]+i)+new_blocks[5]*10]=="0" && new_blocks[4]+i>-1 && new_blocks[4]+i<10){
                            if(board[(new_blocks[6]+i)+new_blocks[7]*10]=="0" && new_blocks[6]+i>-1 && new_blocks[6]+i<10){
                                console.log(new_blocks[0],i)
                                for(var a=0;a<8;a=a+2){
                                    new_blocks[a]=new_blocks[a]+i
                                }
                                this.blocks=new_blocks 
                                finished=true                     
                            }
                        }
                    }
                }
            }
        }    
        Add(this.blocks,this.colour)
    }
    Predict(){
        var change_reset=change
        var blocks_reset=JSON.parse(JSON.stringify(this.blocks))
        Remove(this.blocks)
        for(var i=0;i<22;i++){
            this.blocks=Change(this.blocks,0,1)
        }
        prediction=JSON.parse(JSON.stringify(this.blocks))
        prediction.push(this.colour)
        change=change_reset
        this.blocks=JSON.parse(JSON.stringify(blocks_reset))
        Add(this.blocks,this.colour)
    }
}
function Game_State_Display(){
    ctx.fillStyle="#171717";
    ctx.fillRect(0,0,559,559);
    ctx.fillStyle='#7BD3F6';    
    ctx.fillRect(311, 1, 247, 557);  
    ctx.fillStyle='#171717';    
    ctx.fillRect(341, 195, 187, 156);
    ctx.fillRect(341, 380, 187, 156);
    ctx.fillRect(341, 20, 187, 63);
    ctx.fillRect(341, 107, 187, 63);
    ctx.fillStyle=colours2[prediction[8]-1]
    for(i=0;i<4;i++){
        ctx.roundRect(prediction[i*2]*31+1,(prediction[i*2+1]-4)*31+1,30,30,5).fill();
    }
    for(x=0;x<10;x++){
        for(y=4;y<22;y++){
            if(board[x+y*10]!=0){
                ctx.fillStyle=colours1[parseInt(board[x+y*10])-1]
                var moving=false
                for(i=0;i<4;i++){
                    if(x==current_piece.blocks[i*2] && y==current_piece.blocks[i*2+1]){
                        moving=true
                    }
                }
                if(moving==true){
                    if(move_y==0){
                        ctx.roundRect(x*31+1-move*(3-frame%3)*10,(y-4)*31+1,30,30,5).fill();
                    }else{
                        ctx.roundRect(x*31+1-move*(3-frame%3)*10,(y-4)*31+1-(3-frame%3)*10,30,30,5).fill();
                    }
                }else{
                    ctx.roundRect(x*31+1,(y-4)*31+1,30,30,5).fill();
                }
            }
        }        
    }
    if(holding_piece!=0){
        ctx.fillStyle=colours1[holding_piece.colour-1]
        for(i=0;i<4;i++){
            if(holding_piece.colour==3){
                ctx.roundRect((holding_piece.blocks[i*2+1]-4)*31+1+496,holding_piece.blocks[i*2]*31+1+132,30,30,5).fill();
            }else{
                ctx.roundRect(holding_piece.blocks[i*2]*31+1+280,(holding_piece.blocks[i*2+1]-4)*31+1+320,30,30,5).fill();
            }
        }        
    }
    ctx.fillStyle=colours1[next_piece.colour-1]
    for(i=0;i<4;i++){
        if(next_piece.colour==3){
            ctx.roundRect((next_piece.blocks[i*2+1]-4)*31+1+496,next_piece.blocks[i*2]*31+1+318,30,30,5).fill();
        }else{
            ctx.roundRect(next_piece.blocks[i*2]*31+1+280,(next_piece.blocks[i*2+1]-4)*31+1+506,30,30,5).fill();
        }
    } 
    f.load().then(function(font) {   document.fonts.add(font)
        ctx.fillStyle = "white";
        ctx.textAlign = "center";    
        if (points>=100000){
            ctx.font = 'bold 25px PressStart2P-Regular';
            ctx.fillText(points.toString(), 434, 155);
        }else{
            ctx.font = 'bold 30px PressStart2P-Regular';
            ctx.fillText(points.toString(), 434, 158);
        }
        ctx.font = 'bold 17px PressStart2P-Regular';
        ctx.fillText('High Score', 434, 45);
        if(holding_piece==0){
            ctx.fillText('Press C to', 434, 235);
            ctx.fillText('hold and', 434, 266);
            ctx.fillText('Space to', 434, 297);
            ctx.fillText('hard drop', 434, 328);
        }
        ctx.font = 'bold 19px PressStart2P-Regular';
        ctx.fillText(high_score.toString(), 434, 75);
    }); 
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
function Remove(blocks){
    for(var i=0;i<4;i++){
        board=Board_Change(blocks[i*2],blocks[i*2+1],0)
    }   
}
function Change(blocks,x,y){
    for(var i=0;i<4;i++){
        if(board[blocks[i*2]+x+(blocks[i*2+1]+y)*10]!=0 || blocks[i*2]+x<0 || blocks[i*2]+x>=10){
            if(x==0 && y==1){
                change=true
            }
            return blocks
        }
    }
    for(var i=0;i<4;i++){
        blocks[i*2]=blocks[i*2]+x;
        blocks[i*2+1]=blocks[i*2+1]+y;
    }
    move=move+x
    return blocks
}
function Add(blocks,colour){
    for(var i=0;i<4;i++){
        board=Board_Change(blocks[i*2],blocks[i*2+1],colour)
    }
}
function Board_Change(x,y,change){
    return board.slice(0,x+y*10)+change+board.slice(x+y*10+1,220)
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function New_Piece(){
    Pieces_joined=[[1,[4,1,4,2,4,3,5,3]], [2,[5,1,5,2,5,3,4,3]], [3,[4,0,4,1,4,2,4,3]], [4,[4,2,4,3,5,2,5,3]], [5,[4,1,4,2,5,2,5,3]], [6,[5,1,5,2,4,2,4,3]], [7,[4,1,4,2,4,3,5,2]]]
    var random=Math.floor(Math.random()*Pieces_joined.length)
    var next_piece_reset=next_piece
    next_piece=new Piece(Pieces_joined[random][0], Pieces_joined[random][1]);
    Pieces_joined=[[1,[4,1,4,2,4,3,5,3]], [2,[5,1,5,2,5,3,4,3]], [3,[4,0,4,1,4,2,4,3]], [4,[4,2,4,3,5,2,5,3]], [5,[4,1,4,2,5,2,5,3]], [6,[5,1,5,2,4,2,4,3]], [7,[4,1,4,2,4,3,5,2]]]
    current_piece=new Piece(Pieces_joined[next_piece_reset.colour-1][0], Pieces_joined[next_piece_reset.colour-1][1]);
}
function Remove_Line(){
    var lines_removed=0
    for(y=4;y<22;y++){
        if(board.slice(y*10,(y+1)*10).indexOf("0")==-1){
            board="0000000000"+board.slice(0,y*10)+board.slice((y+1)*10,220)
            lines_removed++
        }
    }
    if (lines_removed==1){
        points=points+75;
    }else if (lines_removed==2){
        points=points+225;
    }else if (lines_removed==3){
        points=points+525;
    }else if (lines_removed==4){
        points=points+1125;
    }    
}
function Death(){
    if(board.slice(0,40)!="0000000000000000000000000000000000000000"){
        death=true
    }
}
document.body.addEventListener("keydown", function (e) {
    if(keys[32]!=true && e.keyCode==32 && death==false){
        current_piece.Hard_Drop()
    }else if(keys[32]!=true && e.keyCode==32 && death==true){
        Start()
    }
    if(keys[67]!=true && e.keyCode==67 && held==false){
        Remove(current_piece.blocks);
        var holding_piece_reset=holding_piece
        Pieces_joined=[[1,[4,1,4,2,4,3,5,3]], [2,[5,1,5,2,5,3,4,3]], [3,[4,0,4,1,4,2,4,3]], [4,[4,2,4,3,5,2,5,3]], [5,[4,1,4,2,5,2,5,3]], [6,[5,1,5,2,4,2,4,3]], [7,[4,1,4,2,4,3,5,2]]]
        holding_piece=new Piece(Pieces_joined[current_piece.colour-1][0], Pieces_joined[current_piece.colour-1][1]);
        if(holding_piece_reset==0){
            New_Piece();
        }else{
            Pieces_joined=[[1,[4,1,4,2,4,3,5,3]], [2,[5,1,5,2,5,3,4,3]], [3,[4,0,4,1,4,2,4,3]], [4,[4,2,4,3,5,2,5,3]], [5,[4,1,4,2,5,2,5,3]], [6,[5,1,5,2,4,2,4,3]], [7,[4,1,4,2,4,3,5,2]]]
            current_piece=new Piece(Pieces_joined[holding_piece_reset.colour-1][0], Pieces_joined[holding_piece_reset.colour-1][1]);
        }
        held=true
    }
    if( e.keyCode==87){
        current_piece.Rotate()
    }
    keys[e.keyCode]=true
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode]=false
});
function Start(){
    Pieces_joined=[[1,[4,1,4,2,4,3,5,3]], [2,[5,1,5,2,5,3,4,3]], [3,[4,0,4,1,4,2,4,3]], [4,[4,2,4,3,5,2,5,3]], [5,[4,1,4,2,5,2,5,3]], [6,[5,1,5,2,4,2,4,3]], [7,[4,1,4,2,4,3,5,2]]]
    random=Math.floor(Math.random()*Pieces_joined.length)
    next_piece=new Piece(Pieces_joined[random][0], Pieces_joined[random][1]);
    board = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    change=false
    death=false
    held=false
    prediction=[0,0,0,0,0,0,0,0,1]
    holding_piece=0
    points=0
    New_Piece();   
}
function Save(){
    window.localStorage.setItem('Tetris_board',JSON.stringify(board))
    window.localStorage.setItem('Tetris_change',JSON.stringify(change))
    window.localStorage.setItem('Tetris_held',JSON.stringify(held))
    window.localStorage.setItem('Tetris_death',JSON.stringify(death))
    window.localStorage.setItem('Tetris_high_score',JSON.stringify(high_score))
    window.localStorage.setItem('Tetris_points',JSON.stringify(points))
    window.localStorage.setItem('Tetris_next_piece_colour',JSON.stringify(next_piece.colour))
    window.localStorage.setItem('Tetris_next_piece_blocks',JSON.stringify(next_piece.blocks))
    window.localStorage.setItem('Tetris_current_piece_colour',JSON.stringify(current_piece.colour))
    window.localStorage.setItem('Tetris_current_piece_blocks',JSON.stringify(current_piece.blocks))
    if(holding_piece==0){
        window.localStorage.setItem('Tetris_holding_piece_colour',JSON.stringify(0))
        window.localStorage.setItem('Tetris_holding_piece_blocks',JSON.stringify(0))
    }else{
        window.localStorage.setItem('Tetris_holding_piece_colour',JSON.stringify(holding_piece.colour))
        window.localStorage.setItem('Tetris_holding_piece_blocks',JSON.stringify(holding_piece.blocks))
    }
}
function Move_Reset(){
    change=false;
    held=false
    Death();
    Remove_Line()
    New_Piece()
    points=points+22
    current_piece.Predict()
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var f = new FontFace('PressStart2P-Regular', 'url(PressStart2P-Regular.ttf)');
var keys=[]
var colours1 = ["#0464C8","#F4A800","#00D0E2","#FFEF26","#D50A00","#00E831","#9B01B9"]
var colours2 = ["#8ab2e0","#fdd3bb","#c1e3fe","#fdf6dc","#fccccc","#c9dece","#cfb6e5"]
//window.localStorage.clear();
if (typeof(Storage) !== "undefined") {
    var board=window.localStorage.getItem('Tetris_board')
    if (board==null){
        Start();
        high_score=0
    }else{
        var board=JSON.parse(window.localStorage.getItem('Tetris_board'));
        var change=JSON.parse(window.localStorage.getItem('Tetris_change'));
        var held=JSON.parse(window.localStorage.getItem('Tetris_held'));
        var death=JSON.parse(window.localStorage.getItem('Tetris_death'));
        var high_score=JSON.parse(window.localStorage.getItem('Tetris_high_score'));
        var points=JSON.parse(window.localStorage.getItem('Tetris_points'));
        var next_piece_colour=JSON.parse(window.localStorage.getItem('Tetris_next_piece_colour'));
        var next_piece_blocks=JSON.parse(window.localStorage.getItem('Tetris_next_piece_blocks'));
        var current_piece_colour=JSON.parse(window.localStorage.getItem('Tetris_current_piece_colour'));
        var current_piece_blocks=JSON.parse(window.localStorage.getItem('Tetris_current_piece_blocks'));
        var holding_piece_colour=JSON.parse(window.localStorage.getItem('Tetris_holding_piece_colour'));
        var holding_piece_blocks=JSON.parse(window.localStorage.getItem('Tetris_holding_piece_blocks'));
        next_piece=new Piece(next_piece_colour,next_piece_blocks)
        current_piece=new Piece(current_piece_colour,current_piece_blocks)
        if(holding_piece_colour==0){
            holding_piece=0
        }else{
           holding_piece=new Piece(holding_piece_colour,holding_piece_blocks) 
        }
        prediction=[0,0,0,0,0,0,0,0,1]
    }
}
var start=Date.now();
var frame=0            
var move=0
var move_y=0
Game_State_Display();
async function gameLoop(){
    if(Date.now()-start>17 && death==false){
        if(frame%3==0){
            move=0
            move_y=0
            if(keys[65]==true){
                current_piece.Left()
            }
            if(keys[68]==true){
                current_piece.Right()
            }
            if(keys[83]==true){
                move_y=1
                frame=0
            }
            current_piece.Predict()
            current_piece.Soft_Drop()
            start=Date.now();
            if(change==true){
                Move_Reset()
            }
            if(points>high_score){
                high_score=points
            }
            Save()
        }
        Game_State_Display();
        frame++
    }else{
        await sleep(Math.max(17-(Date.now()-start),0));
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
//keys
//samuel graham leight
function Game_State_Display(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,570,570);
    ctx.fillStyle="#FFFFFF";
    ctx.lineWidth = 20;
    for(i=0;i<2;i++){
        if(i==0){
            ctx.strokeStyle="#4034eb"
        }else{
            ctx.strokeStyle="#fffff1"
        }
        ctx.beginPath();
        ctx.moveTo(jets[i][0]-jets[i][2]*2.7, jets[i][1]-jets[i][3]*2.7);
        ctx.lineTo(jets[i][0]+jets[i][2]*2.7, jets[i][1]+jets[i][3]*2.7);
        ctx.stroke();
    }
        ctx.fillStyle="#FFFFFe";
        ctx.fillRect(unpicked_powerups[1]-5,unpicked_powerups[2]-5,10,10)           
    for(i=0;i<bullets1.length;i++){
        drawCircle(bullets1[i][0],bullets1[i][1], bullets1[i][5], "#FFFFFF", "#FFFFFF", bullets1[i][5])
    }
    for(i=0;i<bullets2.length;i++){
        drawCircle(bullets2[i][0],bullets2[i][1], bullets2[i][5], "#FFFFFF", "#FFFFFF", bullets2[i][5])
    }
    for(i=0;i<2;i++){
        ctx.lineWidth = 20;
        if(laser[i][0]==true && Date.now()-laser[i][1]<500){
            ctx.strokeStyle="#FFFB00"
            ctx.beginPath();
            ctx.moveTo(jets[i][0]+jets[i][2]*2.7, jets[i][1]+jets[i][3]*2.7);
            ctx.lineTo(jets[i][0]+jets[i][2]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))), jets[i][1]+jets[i][3]*Math.abs((570/(Math.min(jets[i][2],jets[i][3])))));
            ctx.stroke();
        }else if(laser[i][0]==true && Date.now()-laser[i][1]<1400){
            ctx.strokeStyle="#FF0000"
            ctx.beginPath();
            ctx.moveTo(jets[i][0]+jets[i][2]*2.7, jets[i][1]+jets[i][3]*2.7);
            ctx.lineTo(jets[i][0]+jets[i][2]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))), jets[i][1]+jets[i][3]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))));
            ctx.stroke();
        }else{
           laser[i][0]=false 
        }
    }
    for(i=0;i<2;i++){
        var imgData = ctx.getImageData(jets[i][0], jets[i][1], 1, 1);
        imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
        if (imgData!=jets[i][5] && imgData!=undefined && imgData!="#000000"){
            hit(i,imgData)
        }
        for(a=-1;a<=1;a=a+0.1){
            var imgData = ctx.getImageData(jets[i][0]+jets[i][2]*a*2.7, jets[i][1]+jets[i][3]*a*2.7, 1, 1);
            imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
            if (imgData!=jets[i][5] && imgData!=undefined && imgData!="#000000"){
                hit(i,imgData)
            }
        }
        for(a=-1;a<=1;a=a+0.1){
            var imgData = ctx.getImageData(jets[i][0]+jets[i][3]*a*2.7, jets[i][1]+jets[i][2]*a*2.7, 1, 1);
            imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
            if (imgData!=jets[i][5] && imgData!=undefined && imgData!="#000000"){
                hit(i,imgData)
            }
        } 
    }
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function drawCircle(x, y, radius, fill, stroke, strokeWidth) {
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
function hit(i,colour){
    if(colour=="#fffffe"){
        if (picked_powerups.length==0 || picked_powerups.length!=0 && i!=picked_powerups[0][1] && picked_powerups.length!=2){
            picked_powerups.push([unpicked_powerups[0],i])
            unpicked_powerups=[]
        }
    }
    if(colour=="#ffffff" || colour=="#ff0000"){
        if(invincibility[i][0]==false){
            death[i]=true
            console.log(i)
        }
    }
    if(colour=="#fffff1"){
        if(invincibility[0][0]==false && invincibility[1][0]==true){
            console.log("0")
            death[0]=true
        }
        if(invincibility[1][0]==false  && invincibility[0][0]==true){
            death[1]=true
            console.log("1")
        }
    }
}
function bullet(){
    if(keys[32] && bullets1.length==0 || keys[32] && Date.now()-bullets1[bullets1.length-1][4]>500 && bullets1.length<5){
        if(Date.now()-laser[0][1]>1400){
            bullets1.push([jets[0][0]+jets[0][2]*3,jets[0][1]+jets[0][3]*3,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),3])
        }
    }
    if(keys[38] && bullets2.length==0 || keys[38] && Date.now()-bullets2[bullets2.length-1][4]>500 && bullets2.length<5){
        if(Date.now()-laser[1][1]>1400){
            bullets2.push([jets[1][0]+jets[1][2]*3,jets[1][1]+jets[1][3]*3,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),3])
        }
    }
    while (bullets1.length!=0 && Date.now()-bullets1[0][4]>4000){
        bullets1.shift();       
    }
    while (bullets2.length!=0 && Date.now()-bullets2[0][4]>4000){
        bullets2.shift();
    }
    for(i=0;i<bullets1.length;i++){
        if(Date.now()-bullets1[i][4]<200 && bullets1[i][5]!=3.1 && bullets1[i][5]!=3.2 && bullets1[i][5]!=5 && bullets1[i][5]!=6){
            bullets1[i][2]=jets[0][2]*1.8     
            bullets1[i][3]=jets[0][3]*1.8 
        }
    }
    for(i=0;i<bullets2.length;i++){
        if(Date.now()-bullets2[i][4]<200 && bullets2[i][5]!=3.1 && bullets2[i][5]!=3.2 && bullets2[i][5]!=5 && bullets2[i][5]!=6){
            bullets2[i][2]=jets[1][2]*1.8      
            bullets2[i][3]=jets[1][3]*1.8  
        }
    } 
    for(i=0;i<bullets1.length;i++){
        bullets1[i][0]=((bullets1[i][0]+bullets1[i][2])+570)%570
        bullets1[i][1]=((bullets1[i][1]+bullets1[i][3])+570)%570
    }
    for(i=0;i<bullets2.length;i++){
        bullets2[i][0]=((bullets2[i][0]+bullets2[i][2])+570)%570
        bullets2[i][1]=((bullets2[i][1]+bullets2[i][3])+570)%570
    }
}
function move(){
    for(i=0;i<2;i++){
        if(laser[i][0]==false){
            jets[i][0]=((jets[i][0]+jets[i][2])+570)%570
            jets[i][1]=((jets[i][1]+jets[i][3])+570)%570
        }
    }
}
function angle(){
    if(Date.now()-laser[0][1]>1400 || Date.now()-laser[0][1]<500){
        if(keys[68]){
            jets[0][4]=jets[0][4]+7;
            turn(0);
        }
        if(keys[65]){
            jets[0][4]=jets[0][4]-7;
            turn(0);
        }
    }
    if(Date.now()-laser[1][1]>1400 || Date.now()-laser[1][1]<500){
        if(keys[39]){
            jets[1][4]=jets[1][4]+7;
            turn(1);
        }
        if(keys[37]){
            jets[1][4]=jets[1][4]-7;
            turn(1);
        }
    }
}
function turn(i){
    jets[i][2]=Math.cos(jets[i][4]*(Math.PI/180))*4
    jets[i][3]=Math.sin(jets[i][4]*(Math.PI/180))*4
}
function unpicked_powers(){
    var end2=Date.now();
    if (end2-start2>=3000 && unpicked_powerups.length<1){
        start2=Date.now();
        unpicked_powerups=[power_ups[Math.floor(Math.random()*power_ups.length)],Math.floor(Math.random()*560),Math.floor(Math.random()*560)];
    }else if(unpicked_powerups.length>=1){
        start2=Date.now();
    }
}
function powerups(){
    var index=[]
    for(i=0;i<picked_powerups.length;i++){
        if(picked_powerups[i][0]=="Big_Ball" && picked_powerups[i][1]==0 && keys[32]){
            bullets1.push([jets[0][0]+jets[0][2]*5,jets[0][1]+jets[0][3]*5,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),10])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Fast_Shooting" && picked_powerups[i][1]==0 && keys[32] && (bullets1.length==0 || Date.now()-bullets1[bullets1.length-1][4]>200)){
            bullets1.push([jets[0][0]+jets[0][2]*3,jets[0][1]+jets[0][3]*3,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),2])
            for(a=bullets1.length-1;a>-1;a--){
                if(bullets1[a][5]==2){
                    var index2=a
                }
            }
            if (index2!=undefined && Date.now()-bullets1[index2][4]>3000){
                index.push(i)
            }
        }
        if(picked_powerups[i][0]=="Fast_bullet" && picked_powerups[i][1]==0 && keys[32]){
            bullets1.push([jets[0][0]+jets[0][2]*3,jets[0][1]+jets[0][3]*3,jets[0][2]*4,jets[0][3]*4,Date.now(),3.1])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Laser" && picked_powerups[i][1]==0 && keys[32]){
            laser[0][0]=true
            laser[0][1]=Date.now()
            index.push(i)
        }
        if(picked_powerups[i][0]=="Triple_Shot" && picked_powerups[i][1]==0 && keys[32]){
            var angle=jets[0][4]
            var x1=Math.cos((angle+25)*(Math.PI/180))*4
            var y1=Math.sin((angle+25)*(Math.PI/180))*4
            var x2=Math.cos((angle-25)*(Math.PI/180))*4
            var y2=Math.sin((angle-25)*(Math.PI/180))*4     
            bullets1.push([jets[0][0]+jets[0][2]*4,jets[0][1]+jets[0][3]*4,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),6])
            bullets1.push([jets[0][0]+jets[0][2]*4,jets[0][1]+jets[0][3]*4,x1*1.8,y1*1.8,Date.now(),5])
            bullets1.push([jets[0][0]+jets[0][2]*4,jets[0][1]+jets[0][3]*4,x2*1.8,y2*1.8,Date.now(),5])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Flank_Shot" && picked_powerups[i][1]==0 && keys[32]){
            var angle=jets[0][4]
            var x1=Math.cos((angle+180)*(Math.PI/180))*4
            var y1=Math.sin((angle+180)*(Math.PI/180))*4   
            bullets1.push([jets[0][0]-jets[0][2]*4,jets[0][1]-jets[0][3]*4,x1*1.8,y1*1.8,Date.now(),6])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Homing_Missile" && picked_powerups[i][1]==0 && keys[32]){
            bullets1.push([jets[0][0]+jets[0][2]*3,jets[0][1]+jets[0][3]*3,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),3.2])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Invincibility" && picked_powerups[i][1]==0 && invincibility[0][0]==false){
            invincibility[0][0]=true
            invincibility[0][1]=Date.now()
        }else if(picked_powerups[i][0]=="Invincibility" && picked_powerups[i][1]==0 && invincibility[0][0]==true && Date.now()-invincibility[0][1]>6000){
            invincibility[0][0]=false
            index.push(i)
        }

        if(picked_powerups[i][0]=="Big_Ball" && picked_powerups[i][1]==1 && keys[38]){
            bullets2.push([jets[1][0]+jets[1][2]*5,jets[1][1]+jets[1][3]*5,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),10])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Fast_Shooting" && picked_powerups[i][1]==1 && keys[38] && (bullets2.length==0 || Date.now()-bullets2[bullets2.length-1][4]>200)){
            bullets2.push([jets[1][0]+jets[1][2]*3,jets[1][1]+jets[1][3]*3,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),2])
            for(a=bullets2.length-1;a>-1;a--){
                if(bullets2[a][5]==2){
                    var index2=a
                }
            }
            if (index2!=undefined && Date.now()-bullets2[index2][4]>3000){
                index.push(i)
            }
        }
        if(picked_powerups[i][0]=="Fast_bullet" && picked_powerups[i][1]==1 && keys[38]){
            bullets2.push([jets[1][0]+jets[1][2]*3,jets[1][1]+jets[1][3]*3,jets[1][2]*4,jets[1][3]*4,Date.now(),3.1])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Laser" && picked_powerups[i][1]==1 && keys[38]){
            laser[1][0]=true
            laser[1][1]=Date.now()
            index.push(i)
        }
        if(picked_powerups[i][0]=="Triple_Shot" && picked_powerups[i][1]==1 && keys[38]){
            var angle=jets[1][4]
            var x1=Math.cos((angle+25)*(Math.PI/180))*4
            var y1=Math.sin((angle+25)*(Math.PI/180))*4
            var x2=Math.cos((angle-25)*(Math.PI/180))*4
            var y2=Math.sin((angle-25)*(Math.PI/180))*4     
            bullets2.push([jets[1][0]+jets[1][2]*4,jets[1][1]+jets[1][3]*4,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),6])
            bullets2.push([jets[1][0]+jets[1][2]*4,jets[1][1]+jets[1][3]*4,x1*1.8,y1*1.8,Date.now(),5])
            bullets2.push([jets[1][0]+jets[1][2]*4,jets[1][1]+jets[1][3]*4,x2*1.8,y2*1.8,Date.now(),5])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Flank_Shot" && picked_powerups[i][1]==1 && keys[38]){
            var angle=jets[1][4]
            var x1=Math.cos((angle+180)*(Math.PI/180))*4
            var y1=Math.sin((angle+180)*(Math.PI/180))*4   
            bullets2.push([jets[1][0]-jets[1][2]*4,jets[1][1]-jets[1][3]*4,x1*1.8,y1*1.8,Date.now(),6])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Homing_Missile" && picked_powerups[i][1]==1 && keys[38]){
            bullets2.push([jets[1][0]+jets[1][2]*3,jets[1][1]+jets[1][3]*3,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),3.2])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Invincibility" && picked_powerups[i][1]==1 && invincibility[1][0]==false){
            invincibility[1][0]=true
            invincibility[1][1]=Date.now()
        }else if(picked_powerups[i][0]=="Invincibility" && picked_powerups[i][1]==1 && invincibility[1][0]==true && Date.now()-invincibility[1][1]>6000){
            invincibility[1][0]=false
            index.push(i)
        }
    }
    for(i=0;i<index.length;i++){
        picked_powerups.splice(index,1)
    }
}
function homing_missile_f1(){
    for(i=0;i<bullets1.length;i++){
        if(bullets1[i][5]==3.2){
            var angle=Math.atan((bullets1[i][3]/bullets1[i][2]))*(180/Math.PI)
            if(Math.sign(bullets1[i][3])==-1 && Math.sign(bullets1[i][2])==1){
                angle=360+angle
            }else if(Math.sign(bullets1[i][3])==-1 && Math.sign(bullets1[i][2])==-1){
                angle=180+angle
            }else if(Math.sign(bullets1[i][3])==1 && Math.sign(bullets1[i][2])==-1){
                angle=180+angle
            }
            var x=bullets1[i][0]
            var y=bullets1[i][1]
            var coords=[]
            coords.push([jets[1][0],jets[1][1]])    
            coords.push([jets[1][0]-570,jets[1][1]])
            coords.push([jets[1][0]+570,jets[1][1]])
            coords.push([jets[1][0],jets[1][1]-570])
            coords.push([jets[1][0],jets[1][1]+570]) 
            coords.push([jets[1][0]+570,jets[1][1]+570])
            coords.push([jets[1][0]-570,jets[1][1]-570]) 
            coords.push([jets[1][0]+570,jets[1][1]-570])
            coords.push([jets[1][0]-570,jets[1][1]+570]) 
            var smallest=[100000,0]
            for(z=0;z<coords.length;z++){
                var length=((x-coords[z][0])**2+(y-coords[z][1])**2)**(1/2)
                if(length<smallest[0]){
                    smallest[0]=length
                    smallest[1]=z
                }
            }
            var a=(coords[smallest[1]][1]-y)
            var b=(coords[smallest[1]][0]-x)
            var angle2=Math.atan(a/b)*(180/Math.PI)
            if(Math.sign(a)==-1 && Math.sign(b)==1){
                angle2=360+angle2
            }else if(Math.sign(a)==-1 && Math.sign(b)==-1){
                angle2=180+angle2
            }else if(Math.sign(a)==1 && Math.sign(b)==-1){
                angle2=180+angle2
            }
            if (smallest[0]>100){
                var change=8.5
            }else{
                var change=3.5
            }
            if(360-Math.abs(angle2-angle)>Math.abs(angle2-angle)){
                if(angle2>angle){
                    angle=angle+change
                }else{
                    angle=angle-change
                }
            }else{
                if(angle2<angle){
                    angle=angle+change
                }else{
                    angle=angle-change
                }
            }
            var x1=Math.cos((angle)*(Math.PI/180))*4
            var y1=Math.sin((angle)*(Math.PI/180))*4
            bullets1[i][2]=x1*1.6
            bullets1[i][3]=y1*1.6
        }
    }
}
function ai_f1(i){
    var angle=jets[0][4]
    var x=jets[0][0]
    var y=jets[0][1]
    var coords=[]
    coords.push([jets[1][0],jets[1][1]])    
    coords.push([jets[1][0]-570,jets[1][1]])
    coords.push([jets[1][0]+570,jets[1][1]])
    coords.push([jets[1][0],jets[1][1]-570])
    coords.push([jets[1][0],jets[1][1]+570]) 
    coords.push([jets[1][0]+570,jets[1][1]+570])
    coords.push([jets[1][0]-570,jets[1][1]-570]) 
    coords.push([jets[1][0]+570,jets[1][1]-570])
    coords.push([jets[1][0]-570,jets[1][1]+570]) 
    var smallest=[100000,0]
    for(z=0;z<coords.length;z++){
        var length=((x-coords[z][0])**2+(y-coords[z][1])**2)**(1/2)
        if(length<smallest[0]){
            smallest[0]=length
            smallest[1]=z
        }
    }
    var a=(coords[smallest[1]][1]+jets[1][3]*2-y)
    var b=(coords[smallest[1]][0]+jets[1][2]*2-x)
    var angle2=Math.atan(a/b)*(180/Math.PI)
    if(Math.sign(a)==-1 && Math.sign(b)==1){
        angle2=360+angle2
    }else if(Math.sign(a)==-1 && Math.sign(b)==-1){
        angle2=180+angle2
    }else if(Math.sign(a)==1 && Math.sign(b)==-1){
        angle2=180+angle2
    }
    if(360-Math.abs(angle2-angle)>Math.abs(angle2-angle)){
        if(angle2>angle){
            jets[0][4]=jets[0][4]+1.75
        }else{
            jets[0][4]=jets[0][4]-1.75
        }
    }else{
        if(angle2<angle){
            jets[0][4]=jets[0][4]+1.75
        }else{
            jets[0][4]=jets[0][4]-1.75
        }
    }
    turn(0);
    if(Math.abs(jets[0][4]-angle)<=2 && Date.now()-ai_time>1000 && i==3){
        keys[32]=true
        ai_time=Date.now()
    }else{
        keys[32]=false
    }
}
function homing_missile_f2(){
    for(i=0;i<bullets2.length;i++){
        if(bullets2[i][5]==3.2){
            var angle=Math.atan((bullets2[i][3]/bullets2[i][2]))*(180/Math.PI)
            if(Math.sign(bullets2[i][3])==-1 && Math.sign(bullets2[i][2])==1){
                angle=360+angle
            }else if(Math.sign(bullets2[i][3])==-1 && Math.sign(bullets2[i][2])==-1){
                angle=180+angle
            }else if(Math.sign(bullets2[i][3])==1 && Math.sign(bullets2[i][2])==-1){
                angle=180+angle
            }
            var x=bullets2[i][0]
            var y=bullets2[i][1]
            var coords=[]
            coords.push([jets[0][0],jets[0][1]])    
            coords.push([jets[0][0]-570,jets[0][1]])
            coords.push([jets[0][0]+570,jets[0][1]])
            coords.push([jets[0][0],jets[0][1]-570])
            coords.push([jets[0][0],jets[0][1]+570]) 
            coords.push([jets[0][0]+570,jets[0][1]+570])
            coords.push([jets[0][0]-570,jets[0][1]-570]) 
            coords.push([jets[0][0]+570,jets[0][1]-570])
            coords.push([jets[0][0]-570,jets[0][1]+570]) 
            var smallest=[100000,0]
            for(z=0;z<coords.length;z++){
                var length=((x-coords[z][0])**2+(y-coords[z][1])**2)**(1/2)
                if(length<smallest[0]){
                    smallest[0]=length
                    smallest[1]=z
                }
            }
            var a=(coords[smallest[1]][1]-y)
            var b=(coords[smallest[1]][0]-x)
            var angle2=Math.atan(a/b)*(180/Math.PI)
            if(Math.sign(a)==-1 && Math.sign(b)==1){
                angle2=360+angle2
            }else if(Math.sign(a)==-1 && Math.sign(b)==-1){
                angle2=180+angle2
            }else if(Math.sign(a)==1 && Math.sign(b)==-1){
                angle2=180+angle2
            }
            if (smallest[0]>100){
                var change=8.5
            }else{
                var change=3.5
            }
            if(360-Math.abs(angle2-angle)>Math.abs(angle2-angle)){
                if(angle2>angle){
                    angle=angle+change
                }else{
                    angle=angle-change
                }
            }else{
                if(angle2<angle){
                    angle=angle+change
                }else{
                    angle=angle-change
                }
            }
            var x1=Math.cos((angle)*(Math.PI/180))*4
            var y1=Math.sin((angle)*(Math.PI/180))*4
            bullets2[i][2]=x1*1.4
            bullets2[i][3]=y1*1.4
        }
    }
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var keys=[];
var start=Date.now();
var start2=Date.now()
var jets=[[50,185,4,0,0,"#4034eb"],[520,385,-4,0,180,"#fffff1"]];
var bullets1=[]
var bullets2=[]
var unpicked_powerups=[]
var picked_powerups=[]
var laser=[[false,0],[false,0]]
var homing_missile_1=[[false,0,0]]
var power_ups=["Big_Ball","Laser","Fast_Shooting","Homing_Missile","Triple_Shot","Fast_bullet","Invincibility","Flank_Shot"]
var death=[false,false]
var invincibility=[[false,0],[false,0]]
var ai_time=Date.now()
function gameLoop(){
    end=Date.now();
    if (end-start>=18 && death[0]!=true && death[1]!=true){
    	start=Date.now();
        for(i=0;i<4;i++){
            ai_f1(i)
        }
        move();
        unpicked_powers();
        powerups();
        homing_missile_f1();
        homing_missile_f2();
        bullet();
        angle();
        Game_State_Display();
        for(i=0;i<picked_powerups.length;i++){
            console.log(picked_powerups[i])
        }
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
//land mines
//better ai
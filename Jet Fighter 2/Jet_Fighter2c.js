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
    if(started!="Joined"){     
        for(i=0;i<bullets1.length;i++){
            drawCircle(bullets1[i][0],bullets1[i][1], bullets1[i][5], "#FFFFFF", "#FFFFFF", bullets1[i][5])
        }
        for(i=0;i<bullets2.length;i++){
            drawCircle(bullets2[i][0],bullets2[i][1], bullets2[i][5], "#FFFFFF", "#FFFFFF", bullets2[i][5])
        }
    }else{
        for(i=0;i<bullets.length;i++){
            drawCircle(bullets[i][0],bullets[i][1], bullets[i][2], "#FFFFFF", "#FFFFFF", bullets[i][2])
        }        
    }
    for(i=mines.length-1;i>=0;i--){
        var colour=mine_colours[Math.floor((mines[i][2])*39/6000)]
        var pass=true
        if(mines[i][2]>=200){
            for(x=-6;x<=6;x=x+3){
                for(y=-6;y<=6;y=y+3){
                    var imgData = ctx.getImageData(mines[i][0]+x, mines[i][1]+y, 1, 1);
                    imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
                    if(imgData!=undefined && imgData!="#000000" && imgData!="#fffb00"){
                        pass=false
                    }
                }
            }
        }
        if(mines[i][2]>=6000 || pass==false){
            drawCircle(mines[i][0],mines[i][1], 22, "#FFFFF2", "#FFFFF2", 22)
            mines.splice(i,1)
        }else{
            drawCircle(mines[i][0],mines[i][1], Math.abs(6*Math.min((mines[i][2]),300)/300), "#FFFFF2", "#FFFFF2", Math.abs(6*Math.min((mines[i][2]),300)/300))
            drawCircle(mines[i][0],mines[i][1], Math.abs(3.5*Math.min((mines[i][2]),300)/300), colour, colour, Math.abs(3.5*Math.min((mines[i][2]),300)/300))
        }
    }
    if(started!="Joined"){     
        for(i=bullets1.length-1;i>-1;i--){
            var imgData = ctx.getImageData(bullets1[i][0], bullets1[i][1], 1, 1);
            imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
            if(imgData=="#fffff2"){
                bullets1.splice(i,1)
            }
        }
        for(i=bullets2.length-1;i>-1;i--){
            var imgData = ctx.getImageData(bullets2[i][0], bullets2[i][1], 1, 1);
            imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
            if(imgData=="#fffff2"){
                bullets2.splice(i,1)
            }
        }
    }else{
        for(i=bullets.length-1;i>-1;i--){
            var imgData = ctx.getImageData(bullets[i][0], bullets[i][1], 1, 1);
            imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
            if(imgData=="#fffff2"){
                bullets.splice(i,1)
            }        
        }        
    }
    for(i=0;i<2;i++){
        ctx.lineWidth = 20;
        if(laser[i][0]==true && laser[i][1]<500){
            ctx.strokeStyle="#FFFB00"
            ctx.beginPath();
            ctx.moveTo(jets[i][0]+jets[i][2]*2.7, jets[i][1]+jets[i][3]*2.7);
            ctx.lineTo(jets[i][0]+jets[i][2]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))), jets[i][1]+jets[i][3]*Math.abs((570/(Math.min(jets[i][2],jets[i][3])))));
            ctx.stroke();
        }else if(laser[i][0]==true && laser[i][1]<1400){
            ctx.strokeStyle="#FF0000"
            ctx.beginPath();
            ctx.moveTo(jets[i][0]+jets[i][2]*2.7, jets[i][1]+jets[i][3]*2.7);
            ctx.lineTo(jets[i][0]+jets[i][2]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))), jets[i][1]+jets[i][3]*(570/Math.abs((Math.min(jets[i][2],jets[i][3])))));
            ctx.stroke();
        }else{
           laser[i][0]=false 
        }
    }
    if(started!="Joined"){
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
    if(started=="false"){
        ctx.fillStyle = "#FFFDD0";
        ctx.fillRect(0, 0, 570, 570);
        ctx.fillStyle = "#000000";
        ctx.fillRect(220, 240, 130, 35);
        ctx.fillRect(220, 280, 130, 35);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";   
        ctx.fillText("2 Players", 285, 270);
        ctx.fillText("Online", 285, 310);
    }else if(started=="Online"){
        ctx.fillStyle = "#FFFDD0";
        ctx.fillRect(0, 0, 570, 570);
        ctx.fillStyle = "#000000";
        ctx.fillRect(220, 240, 130, 35);
        ctx.fillRect(220, 280, 130, 35);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";   
        ctx.fillText("Host", 285, 270);
        ctx.fillText("Join", 285, 310);       
    }else if(started=="Host"){
        ctx.fillStyle = "#FFFDD0";
        ctx.fillRect(0, 0, 570, 570);
        ctx.fillStyle = "#000000";
        ctx.fillRect(220, 280, 130, 35);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";   
        ctx.fillText(randomstring, 285, 310);
    }else if(started=="Join"){
        ctx.fillStyle = "#FFFDD0";
        ctx.fillRect(0, 0, 570, 570);
        ctx.fillStyle = "#000000";
        ctx.fillRect(220, 280, 130, 35);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";   
        ctx.fillText(id, 285, 310);
    }
    if(death[0]==true || death[1]==true){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(235, 235, 100, 100);
    }
}
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return [x,y]
}
document.addEventListener("click",  function (e) {
    const XY = getXY(canvas, e)
    if (started=="false"){
        if (XY[0]>=220 && XY[0]<=350 && XY[1]>=240 && XY[1]<=275){
            started="2 Players"
            start2=Date.now();
        }else if(XY[0]>=220 && XY[0]<=350 && XY[1]>=280 && XY[1]<=315){
            started="Online"
        }
    }else if(started=="Online"){
        if (XY[0]>=220 && XY[0]<=350 && XY[1]>=240 && XY[1]<=275){
            started="Host"
            randomstring = Math.random().toString(36).slice(-8);
            console.log(randomstring)
            peerjsPeer = new Peer(randomstring);
            peerjsPeer.on('connection', function(conn1) {
                conn=conn1
                console.log("Connected")
                started="Hosting"
                start2=Date.now();
            });
        }else if(XY[0]>=220 && XY[0]<=350 && XY[1]>=280 && XY[1]<=315){
            started="Join"
            peer = new Peer();
            peer.on('open', function(id) {
                connected=true
            });
        }        
    }
    if(death[0]==true || death[1]==true){
        if (XY[0]>=235 && XY[0]<=335 && XY[1]>=235 && XY[1]<=335){
            jets=[[50,185,4,0,0,"#4034eb"],[520,385,-4,0,180,"#fffff1"]];
            bullets1=[]
            bullets2=[]
            unpicked_powerups=[]
            picked_powerups=[]
            laser=[[false,200000],[false,200000]]
            power_ups=["Laser","Homing_Missile","Big_Ball","Triple_Shot","Fast_bullet","Invincibility","Flank_Shot","Fast_Shooting"]           
            death=[false,false]
            invincibility=[[false,0],[false,0]]
            mines=[]
            start2=Date.now();
        }
    }
});
function send(peerID){
    conn.on('data', function(data) {
        console.log("Recieved Data")
        external_data=data
        depackage_data()
    });
    conn.send(JSON.stringify(keys));
}
function send1(){
    conn.on('data', function(data) {
        console.log("Recieved Data")
        keys2=JSON.parse(data)
    });
    conn.send(package_data());

}
function package_data(){
    j_p=""
    for(a=0;a<2;a++){
        for(b=0;b<4;b++){
            j_p=j_p+(Math.round(jets[a][b]*10)/10).toString()+","
        }
    }
    bullets=""
    for(i=0;i<bullets1.length;i++){
        bullets=bullets+Math.round(bullets1[i][0]).toString()+","+Math.round(bullets1[i][1]).toString()+","+Math.round(bullets1[i][5]).toString()+","
    }
    for(i=0;i<bullets2.length;i++){
        bullets=bullets+Math.round(bullets2[i][0]).toString()+","+Math.round(bullets2[i][1]).toString()+","+Math.round(bullets2[i][5]).toString()+","
    }
    u_p=""
    if(unpicked_powerups.length!=0){
        u_p=u_p+Math.round(unpicked_powerups[1]).toString()+","+Math.round(unpicked_powerups[2]).toString()+","
    }
    l_p=laser[0][0].toString().slice(0,1)+","+Math.round(laser[0][1]).toString()+","+laser[1][0].toString().slice(0,1)+","+Math.round(laser[1][1]).toString()+","
    
    m_p=""
    for(i=0;i<mines.length;i++){
        m_p=m_p+Math.round(mines[i][0])+","+Math.round(mines[i][1])+","+Math.round(mines[i][2]) +","
    }
    var data=JSON.stringify([j_p,bullets,u_p,l_p,m_p])
    return data
}
function depackage_data(){
    external_data=JSON.parse(external_data)
    jets=[[0,0,0,0],[0,0,0,0]]
    var count=0
    var indexes=0
    for(i=0;i<external_data[0].length;i++){
        if(external_data[0][i]==","){
            jets[Math.floor(count/4)][count%4]= parseFloat(external_data[0].slice(indexes,i))
            indexes=i+1
            count=count+1 
        }
    }
    bullets=[]
    var indexes=0
    for(i=0;i<external_data[1].length;i++){
        if(external_data[1][i]==","){
            if(bullets.length!=0 && bullets[bullets.length-1][1]==-20){
                bullets[bullets.length-1][1]=parseFloat(external_data[1].slice(indexes,i))
            }else if(bullets.length!=0 && bullets[bullets.length-1][2]==-20){
                bullets[bullets.length-1][2]=parseFloat(external_data[1].slice(indexes,i))
            }else{
                bullets.push([parseFloat(external_data[1].slice(indexes,i)),-20,-20])
            }
            indexes=i+1
        }
    }
    unpicked_powerups=["w"]
    var indexes=0
    for(i=0;i<external_data[2].length;i++){
        if(external_data[2][i]==","){
            unpicked_powerups.push(parseFloat(external_data[2].slice(indexes,i)))
            indexes=i+1
        }       
    }
    laser=[[false,0],[false,0]]
    var count=0
    var indexes=0
    for(i=0;i<external_data[3].length;i++){
        if(external_data[3][i]==","){
            if(count%2==1){
                laser[Math.floor(count/2)][count%2]=parseFloat(external_data[3].slice(indexes,i))
            }else{
                if(external_data[3][i-1]=="f"){
                    laser[Math.floor(count/2)][count%2]=false
                }else{
                    laser[Math.floor(count/2)][count%2]=true
                }
            }
            indexes=i+1
            count=count+1 
        }
    }
    mines=[]
    var indexes=0
    for(i=0;i<external_data[4].length;i++){
        if(external_data[4][i]==","){
            if(mines.length!=0 && mines[mines.length-1][1]==-20){
                mines[mines.length-1][1]=parseFloat(external_data[4].slice(indexes,i))
            }else if(mines.length!=0 && mines[mines.length-1][2]==-20){
                mines[mines.length-1][2]=parseFloat(external_data[4].slice(indexes,i))
            }else{
                mines.push([parseFloat(external_data[4].slice(indexes,i)),-20,-20])
            }
            indexes=i+1
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
    if(colour=="#ffffff" || colour=="#ff0000" || colour=="#fffff2"){
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
        if(laser[0][1]>1400){
            bullets1.push([jets[0][0]+jets[0][2]*3,jets[0][1]+jets[0][3]*3,jets[0][2]*1.8,jets[0][3]*1.8,Date.now(),3])
        }
    }
    if(keys2[38] && bullets2.length==0 || keys2[38] && Date.now()-bullets2[bullets2.length-1][4]>500 && bullets2.length<5){
        if(laser[1][1]>1400){
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
            jets[i][0]=((jets[i][0]+jets[i][2]*1.1)+570)%570
            jets[i][1]=((jets[i][1]+jets[i][3]*1.1)+570)%570
        }
    }
}
function angle(){
    if(laser[0][1]>1400 || laser[0][1]<500){
        if(keys[68]){
            jets[0][4]=jets[0][4]+7;
            turn(0);
        }
        if(keys[65]){
            jets[0][4]=jets[0][4]-7;
            turn(0);
        }
    }
    if(laser[1][1]>1400 || laser[1][1]<500){
        if(keys2[39]){
            jets[1][4]=jets[1][4]+7;
            turn(1);
        }
        if(keys2[37]){
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
            laser[0][1]=0
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

        if(picked_powerups[i][0]=="Big_Ball" && picked_powerups[i][1]==1 && keys2[38]){
            bullets2.push([jets[1][0]+jets[1][2]*5,jets[1][1]+jets[1][3]*5,jets[1][2]*1.8,jets[1][3]*1.8,Date.now(),10])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Fast_Shooting" && picked_powerups[i][1]==1 && keys2[38] && (bullets2.length==0 || Date.now()-bullets2[bullets2.length-1][4]>200)){
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
        if(picked_powerups[i][0]=="Fast_bullet" && picked_powerups[i][1]==1 && keys2[38]){
            bullets2.push([jets[1][0]+jets[1][2]*3,jets[1][1]+jets[1][3]*3,jets[1][2]*4,jets[1][3]*4,Date.now(),3.1])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Laser" && picked_powerups[i][1]==1 && keys2[38]){
            laser[1][0]=true
            laser[1][1]=0
            index.push(i)
        }
        if(picked_powerups[i][0]=="Triple_Shot" && picked_powerups[i][1]==1 && keys2[38]){
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
        if(picked_powerups[i][0]=="Flank_Shot" && picked_powerups[i][1]==1 && keys2[38]){
            var angle=jets[1][4]
            var x1=Math.cos((angle+180)*(Math.PI/180))*4
            var y1=Math.sin((angle+180)*(Math.PI/180))*4   
            bullets2.push([jets[1][0]-jets[1][2]*4,jets[1][1]-jets[1][3]*4,x1*1.8,y1*1.8,Date.now(),6])
            index.push(i)
        }
        if(picked_powerups[i][0]=="Homing_Missile" && picked_powerups[i][1]==1 && keys2[38]){
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
    laser[0][1]=laser[0][1]+27
    laser[1][1]=laser[1][1]+27
    
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
            if(360-Math.abs(angle2-angle)>Math.abs(b)){
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
            if(360-Math.abs(angle2-angle)>Math.abs(b)){
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
function mine(){
    var frequency=[[0,0],[0,0]]
    for(i=0;i<mines.length;i++){
        frequency[mines[i][3]][0]=frequency[mines[i][3]][0]+1
        frequency[mines[i][3]][1]=i
        mines[i][2]=mines[i][2]+35
    }
    if(keys[87] && frequency[0][0]==0 || keys[87] && mines[frequency[0][1]][2]>1000 && frequency[0][0]<2){
        mines.push([jets[0][0]-jets[0][2]*4,jets[0][1]-jets[0][3]*4,0,0])
    }
    if(keys2[40] && frequency[1][0]==0 || keys2[40] && mines[frequency[1][1]][2]>1000 && frequency[1][0]<2){
        mines.push([jets[1][0]-jets[1][2]*4,jets[1][1]-jets[1][3]*4,0,1])
    }   
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    if(started=="Join"){
        if(e.keyCode==13 && connected==true){
            conn = peer.connect(id);
            console.log(conn)
            conn.on('open', function(conn1) {
                console.log("Connected")
                started="Joined"
                start2=Date.now();
            });
        }else if(e.keyCode==8){
            id=id.substring(0, id.length - 1);
        }else{
            abc="abcdefghijklmnopqrstuvwxyz1234567890"
            if(abc.indexOf(String.fromCharCode(e.keyCode).toLowerCase())!=-1){
                id=id+String.fromCharCode(e.keyCode).toLowerCase()
            }
        }
    }else if(started=="2 Players"){
        if(e.keyCode>=37 && e.keyCode<=40){
            keys2[e.keyCode] = true;
        }
    }else if(started=="Hosting"){
        if(e.keyCode==37){
            keys[65] = true;
        }else if(e.keyCode==38){
            keys[32] = true;
        }else if(e.keyCode==39){
            keys[68] = true;
        }else if(e.keyCode==40){
            keys[87] = true;
        }
    }else if(started=="Joined"){
        if(e.keyCode==65){
            keys[37] = true;
        }else if(e.keyCode==32){
            keys[38] = true;
        }else if(e.keyCode==68){
            keys[39] = true;
        }else if(e.keyCode==87){
            keys[40] = true;
        }
    }
});
document.body.addEventListener("keyup", function (e) {
    if(started=="2 Players"){
        if(e.keyCode>=37 && e.keyCode<=40){
            keys2[e.keyCode] = false;
        }else{
            keys[e.keyCode] = false;
        }
    }else if(started=="Hosting"){
        keys[e.keyCode] = false
        if(e.keyCode==37){
            keys[65] = false;
        }if(e.keyCode==38){
            keys[32] = false;
        }else if(e.keyCode==39){
            keys[68] = false;
        }else if(e.keyCode==40){
            keys[87] = false;
        }
    }else if(started=="Joined"){
        keys[e.keyCode] = false
        if(e.keyCode==65){
            keys[37] = false;
        }else if(e.keyCode==32){
            keys[38] = false;
        }else if(e.keyCode==68){
            keys[39] = false;
        }else if(e.keyCode==87){
            keys[40] = false;
        }
    }
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');
var keys=[];
var keys2=[];
var start=Date.now();
var start2=Date.now();
var start3=Date.now();
var jets=[[50,185,4,0,0,"#4034eb"],[520,385,-4,0,180,"#fffff1"]];
var bullets1=[]
var bullets2=[]
var bullets=[]
var unpicked_powerups=[]
var picked_powerups=[]
var laser=[[false,200000],[false,200000]]
var power_ups=["Laser",,"Homing_Missile","Big_Ball","Triple_Shot","Fast_bullet","Invincibility","Flank_Shot","Fast_Shooting"]//
var death=[false,false]
var invincibility=[[false,0],[false,0]]
var mines=[]
var mine_colours=["#fffe00","#fff900","#fff500","#fff000","#ffeb00","#ffe700","#ffe200","#ffdd00","#ffd800","#ffd300","#ffce00","#ffca00","#ffc500","#ffc000","#ffbb00","#ffb600","#ffb100","#ffab00","#ffa600","#ffa100","#ff9c00","#ff9600","#ff9100","#ff8c00","#ff8600","#ff8000","#ff7b00","#ff7500","#ff6f00","#ff6900","#ff6200","#ff5c00","#ff5500","#ff4e00","#ff4600","#ff3e00","#ff3400","#ff2900","#ff1b00","#ff0000"]
var started="false";
var peerjsPeer="";
var randomstring="";
var external_data=[]
var id=""
var connected=false
async function gameLoop(){
    if(Date.now()-start>25 && death[0]!=true && death[1]!=true){
    	start=Date.now();
        if(started!="false" && started!="Online" && started!="Host" && started!="Join" && started!="Joined"){
            move();
            unpicked_powers();
            powerups();
            homing_missile_f1();
            homing_missile_f2();
            bullet();
            mine();
            angle();
            for(i=0;i<picked_powerups.length;i++){
                console.log(picked_powerups[i])
            }
        }
        if(started=="Joined"){
            send(id)
        }else if(started=="Hosting"){
            send1()
        }
        Game_State_Display();
    }else{
        await sleep(Math.max(25-(Date.now()-start),0));
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);


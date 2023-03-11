function Game_State_Display(){
	if (death[0]==false && death[1]==false){
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,570,570)
	    for(i=0;i<unpicked_power_ups.length;i++){
			ctx.fillStyle="#FFFFFe";
			ctx.fillRect(unpicked_power_ups[i][1]-5,unpicked_power_ups[i][2]-5,10,10)	    	
	    }
		ctx.lineWidth = 20;
	    for(i=0;i<2;i++){
	    	if(i==0){
	    		ctx.strokeStyle="#4034eb"
	    	}else{
	    		ctx.strokeStyle="#fffff1"
	    	}
		    ctx.beginPath();
		    ctx.moveTo(jet[i][0]-jet[i][2]*2, jet[i][1]-jet[i][3]*2);
		    ctx.lineTo(jet[i][0]+jet[i][2]*2, jet[i][1]+jet[i][3]*2);
		    ctx.stroke();
		}
		for(i=0;i<jet_1_bullets.length;i++){
			var imgData = ctx.getImageData(Math.floor(jet_1_bullets[i][0]), Math.floor(jet_1_bullets[i][1]), 1, 1);
			imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
			if(Date.now()-jet_1_bullets[i][4]>=500 || imgData=="#fffff1"){
				if(jet_1_bullets[i].length==6){
					drawCircle(jet_1_bullets[i][0],jet_1_bullets[i][1], jet_1_bullets[i][5], "#FFFFFF", "#FFFFFF", jet_1_bullets[i][5])
				}else{
					drawCircle(jet_1_bullets[i][0],jet_1_bullets[i][1], 3, "#FFFFFF", "#FFFFFF", 3)
				}
			}
		}
		for(i=0;i<jet_2_bullets.length;i++){
			var imgData = ctx.getImageData(Math.floor(jet_2_bullets[i][0]), Math.floor(jet_2_bullets[i][1]), 1, 1);
			imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
			if(Date.now()-jet_2_bullets[i][4]>=500 || imgData=="#4034eb"){
				if(jet_2_bullets[i].length==6){
					drawCircle(jet_2_bullets[i][0],jet_2_bullets[i][1], jet_2_bullets[i][5], "#FFFFFF", "#FFFFFF", jet_2_bullets[i][5])
				}else{
					drawCircle(jet_2_bullets[i][0],jet_2_bullets[i][1], 3, "#FFFFFF", "#FFFFFF", 3)
				}	
			}	
		}
		if(laser_1.length>0){
			if(Date.now()-laser_1<500){
	    		ctx.strokeStyle="#FFF001"
			}else if (Date.now()-laser_1<1400){
	    		ctx.strokeStyle="#FF0001"
			}else{
				laser_1=[]
			}
			ctx.lineWidth = 20;
		    ctx.beginPath();
		    ctx.moveTo(jet[0][0]+jet[0][2]*2, jet[0][1]+jet[0][3]*2);
		    ctx.lineTo(jet[0][0]+jet[0][2]*Math.abs((570/Math.min(jet[0][2],jet[0][3]))), jet[0][1]+jet[0][3]*Math.abs((570/Math.min(jet[0][2],jet[0][3]))));
		    ctx.stroke();
		}
		if(laser_2.length>0){
			if(Date.now()-laser_2<500){
	    		ctx.strokeStyle="#FFF000"
			}else if (Date.now()-laser_2<1400){
	    		ctx.strokeStyle="#FF0000"
			}else{
				laser_2=[] 
			}
			ctx.lineWidth = 20;
		    ctx.beginPath();
		    ctx.moveTo(jet[1][0], jet[1][1]);
		    ctx.lineTo(jet[1][0]+jet[1][2]*Math.abs((570/Math.min(jet[1][2],jet[1][3]))), jet[1][1]+jet[1][3]*Math.abs((570/Math.min(jet[1][2],jet[1][3]))));
		    ctx.stroke();
		}
		for(i=0;i<2;i++){
			if(Date.now()-invisibility[i]>10000){
				var imgData = ctx.getImageData(jet[i][0]+jet[i][2]*1.1, jet[i][1]+jet[i][3]*1.1, 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#ffffff" || imgData=="#ff000"+i.toString()){
					death[i]=true
				}
				var imgData = ctx.getImageData(jet[i][0]-jet[i][2]*1.1, jet[i][1]-jet[i][3]*1.1, 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#ffffff" || imgData=="#ff000"+i.toString()){
					death[i]=true
				}	
				var x_change=4/(Math.cos((angle[i]%45)*(Math.PI/180)))
				var y_change=(100-x_change**2)**(1/2)
				if(x_change==4){
					x_change=0
					y_change=9
				}else if(y_change==4){
					x_change=9
					y_change=0
				}
				var imgData = ctx.getImageData(Math.floor(jet[i][0]+x_change), Math.floor(jet[i][1]+y_change), 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#ffffff" || imgData=="#ff000"+i.toString()){
					death[i]=true
				}	
				var imgData = ctx.getImageData(Math.floor(jet[i][0]-x_change), Math.floor(jet[i][1]-y_change), 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#ffffff" || imgData=="#ff000"+i.toString()){
					death[i]=true
				}
			}		
		}
		for(i=0;i<jet_1_bullets.length;i++){
			if(jet_1_bullets[i].length==6){
				drawCircle(jet_1_bullets[i][0],jet_1_bullets[i][1], jet_1_bullets[i][5], "#FFFFFF", "#FFFFFF", jet_1_bullets[i][5])
			}else{
				drawCircle(jet_1_bullets[i][0],jet_1_bullets[i][1], 3, "#FFFFFF", "#FFFFFF", 3)
			}
		}
		for(i=0;i<jet_2_bullets.length;i++){
			if(jet_2_bullets[i].length==6){
				drawCircle(jet_2_bullets[i][0],jet_2_bullets[i][1], jet_2_bullets[i][5], "#FFFFFF", "#FFFFFF", jet_2_bullets[i][5])
			}else{
				drawCircle(jet_2_bullets[i][0],jet_2_bullets[i][1], 3, "#FFFFFF", "#FFFFFF", 3)
			}		
		}
	    for(i=0;i<2;i++){
	    	ctx.lineWidth=20
	    	if(i==0){
	    		ctx.strokeStyle="#4034eb"
	    	}else{
	    		ctx.strokeStyle="#fffff1"
	    	}
		    ctx.beginPath();
		    ctx.moveTo(jet[i][0]-jet[i][2]*2, jet[i][1]-jet[i][3]*2);
		    ctx.lineTo(jet[i][0]+jet[i][2]*2, jet[i][1]+jet[i][3]*2);
		    ctx.stroke();
		}
		if(Date.now()-invisibility[0]>10000){
			for(i=0;i<jet_1_bullets.length;i++){
				var imgData = ctx.getImageData(jet_1_bullets[i][0], jet_1_bullets[i][1], 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#fffff1"){
					death[1]=true
				}else if(imgData=="#4034eb"){
					death[0]=true
				}
			}
		}
		if(Date.now()-invisibility[1]>10000){
			for(i=0;i<jet_2_bullets.length;i++){
				var imgData = ctx.getImageData(jet_2_bullets[i][0], jet_2_bullets[i][1], 1, 1);
				imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
				if(imgData=="#fffff1"){
					death[1]=true
				}else if(imgData=="#4034eb"){
					death[0]=true
				}
			}
		}
		var picked_2=false
		var picked_1=false
		for(i=0;i<picked_power_ups.length;i++){ 
			if (picked_power_ups[i][1]==1){
				picked_2=true
			}else{
				picked_1=true
			}
		}
		for(i=0;i<unpicked_power_ups.length;i++){
			var imgData = ctx.getImageData(unpicked_power_ups[i][1], unpicked_power_ups[i][2], 1, 1);
			imgData=rgbToHex(imgData.data[0],imgData.data[1],imgData.data[2])
			if(imgData=="#4034eb" && picked_1==false){
				if(unpicked_power_ups[i][0]=="Invincibility"){
					invisibility[0]==Date.now()
				}else{
					picked_power_ups.push([unpicked_power_ups[i][0],0])
				}
				unpicked_power_ups.splice(i, 1)
			}else if (imgData=="#fffff1" && picked_2==false){
				if(unpicked_power_ups[i][0]=="Invincibility"){
					invisibility[1]==Date.now()
				}else{
					picked_power_ups.push([unpicked_power_ups[i][0],1])
				}
				unpicked_power_ups.splice(i, 1)
			}
		}	
	}
	if(death[0]==true){
		console.log("JOY WINS")
	}
	if(death[1]==true){
		console.log("MEYER WINS")
	}
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
function getTanFromDegrees(degrees) {
  return Math.tan(degrees * Math.PI / 180);
}
function angle_f(a){
	if (a==0 || a==1){
		angle[a]=(angle[a]+360)%360
		if (angle[a]<90){
			jet[a][2]=(4/((getTanFromDegrees(angle[a])**2+1)**(1/2)))
			jet[a][3]=(16-(jet[a][2]**2))**(1/2)
		}else if (angle[a]<180){
			jet[a][2]=-(4/((getTanFromDegrees(angle[a])**2+1)**(1/2)))
			jet[a][3]=(16-(jet[a][2]**2))**(1/2)			
		}else if (angle[a]<270){
			jet[a][2]=-(4/((getTanFromDegrees(angle[a])**2+1)**(1/2)))
			jet[a][3]=-((16-(jet[a][2]**2))**(1/2))		
		}else{
			jet[a][2]=(4/((getTanFromDegrees(angle[a])**2+1)**(1/2)))
			jet[a][3]=-((16-(jet[a][2]**2))**(1/2))			
		}
	}
}
function direction(){
	if (keys[65]){
		if(laser_1.length>0 && Date.now()-laser_1>500 && Date.now()-laser_1<1400){
		}else{
			angle[0]=angle[0]-7
			angle_f(0)
		}
	}
	if(keys[68]){
		if(laser_1.length>0 && Date.now()-laser_1>500 && Date.now()-laser_1<1400){
		}else{
			angle[0]=angle[0]+7
			angle_f(0)
		}
	}
	if(keys[37]){
		if(laser_2.length>0 && Date.now()-laser_2>500 && Date.now()-laser_2<1400){
		}else{
			angle[1]=angle[1]-7
			angle_f(1)
		}
	}if(keys[39]){
		if(laser_2.length>0 && Date.now()-laser_2>500 && Date.now()-laser_2<1400){
		}else{
			angle[1]=angle[1]+7
			angle_f(1)
		}
	}
}
function missile(){
	for(i=0;i<jet_1_bullets.length;i++){
		if(jet_1_bullets[i].length>5 && jet_1_bullets[i][5]==3){
			var angle_2=Math.atan((-jet_1_bullets[i][1]+jet[1][1])/(-jet_1_bullets[i][0]+jet[1][0]))*180/Math.PI
			var angle_1=Math.atan((jet_1_bullets[i][3])/(jet_1_bullets[i][2]))*180/Math.PI
			if(Math.sign(-jet_1_bullets[i][1]+jet[1][1])*1==1 && Math.sign(-jet_1_bullets[i][0]+jet[1][0])*1==-1){
				angle_2=angle_2+180
			}else if(Math.sign(-jet_1_bullets[i][1]+jet[1][1])*1==-1 && Math.sign(-jet_1_bullets[i][0]+jet[1][0])*1==-1){
				angle_2=angle_2+180
			}
			if(Math.sign(jet_1_bullets[i][3])*1==1 && Math.sign(jet_1_bullets[i][2])*1==-1){
				angle_1=angle_1+180
			}else if(Math.sign(jet_1_bullets[i][3])*1==-1 && Math.sign(jet_1_bullets[i][2])*1==-1){
				angle_1=angle_1+180
			}
			angle_1=(angle_1+360)%360
			angle_2=(angle_2+360)%360
			if (angle_1<angle_2){
				angle_1=angle_1+5
			}else{
				angle_1=angle_1-5
			}
			if (angle_1<90){
				jet_1_bullets[i][2]=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_1_bullets[i][3]=(16-(jet_1_bullets[i][2])**2)**(1/2)	
			}else if (angle_1<180){
				jet_1_bullets[i][2]=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_1_bullets[i][3]=(16-(jet_1_bullets[i][2])**2)**(1/2)			
			}else if (angle_1<270){
				jet_1_bullets[i][2]=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_1_bullets[i][3]=-((16-(jet_1_bullets[i][2])**2)**(1/2))		
			}else{
				jet_1_bullets[i][2]=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_1_bullets[i][3]=-((16-(jet_1_bullets[i][2])**2)**(1/2))			
			}
			jet_1_bullets[i][2]=jet_1_bullets[i][2]*1.8	
			jet_1_bullets[i][3]=jet_1_bullets[i][3]*1.8
		}
	}
	for(i=0;i<jet_2_bullets.length;i++){
		if(jet_2_bullets[i].length>5 && jet_2_bullets[i][5]==3){
			var angle_2=Math.atan((-jet_2_bullets[i][1]+jet[0][1])/(-jet_2_bullets[i][0]+jet[0][0]))*180/Math.PI
			var angle_1=Math.atan((jet_2_bullets[i][3])/(jet_2_bullets[i][2]))*180/Math.PI
			if(Math.sign(-jet_2_bullets[i][1]+jet[0][1])*1==1 && Math.sign(-jet_2_bullets[i][0]+jet[0][0])*1==-1){
				angle_2=angle_2+180
			}else if(Math.sign(-jet_2_bullets[i][1]+jet[0][1])*1==-1 && Math.sign(-jet_2_bullets[i][0]+jet[0][0])*1==-1){
				angle_2=angle_2+180
			}
			if(Math.sign(jet_2_bullets[i][3])*1==1 && Math.sign(jet_2_bullets[i][2])*1==-1){
				angle_1=angle_1+180
			}else if(Math.sign(jet_2_bullets[i][3])*1==-1 && Math.sign(jet_2_bullets[i][2])*1==-1){
				angle_1=angle_1+180
			}
			angle_1=(angle_1+360)%360
			angle_2=(angle_2+360)%360
			if (angle_1<angle_2){
				angle_1=angle_1+4
			}else{
				angle_1=angle_1-4
			}
			if (angle_1<90){
				jet_2_bullets[i][2]=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_2_bullets[i][3]=(16-(jet_2_bullets[i][2])**2)**(1/2)	
			}else if (angle_1<180){
				jet_2_bullets[i][2]=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_2_bullets[i][3]=(16-(jet_2_bullets[i][2])**2)**(1/2)			
			}else if (angle_1<270){
				jet_2_bullets[i][2]=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_2_bullets[i][3]=-((16-(jet_2_bullets[i][2])**2)**(1/2))		
			}else{
				jet_2_bullets[i][2]=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
				jet_2_bullets[i][3]=-((16-(jet_2_bullets[i][2])**2)**(1/2))			
			}
			jet_2_bullets[i][2]=jet_2_bullets[i][2]*1.8	
			jet_2_bullets[i][3]=jet_2_bullets[i][3]*1.8
		}
	}
}
function shoot(){
	if (jet_1_bullets.length==0 && keys[32] && laser_1.length==0 || laser_1.length==0 && jet_1_bullets.length<5 && jet_1_bullets.length>0 && keys[32] && Date.now()-jet_1_bullets[jet_1_bullets.length-1][4]>500){
		jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*1.8,jet[0][3]*1.8, Date.now()]);
	}
	while (jet_1_bullets.length>0 && Date.now()-(jet_1_bullets[0][4])>4000){
		jet_1_bullets.shift();
	}
	for(i=0;i<jet_1_bullets.length;i++){
		jet_1_bullets[i][0]=(jet_1_bullets[i][0]+570)%570
		jet_1_bullets[i][1]=(jet_1_bullets[i][1]+570)%570
	}

	if (jet_2_bullets.length==0 && keys[38] && laser_2.length==0 || laser_2.length==0 && jet_2_bullets.length<5 && jet_2_bullets.length>0 && keys[38] && Date.now()-jet_2_bullets[jet_2_bullets.length-1][4]>500){
		jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*1.8,jet[1][3]*1.8, Date.now()]);
	}
	while (jet_2_bullets.length>0 && Date.now()-(jet_2_bullets[0][4])>4000){
		jet_2_bullets.shift();
	}
	for(i=0;i<jet_2_bullets.length;i++){
		jet_2_bullets[i][0]=(jet_2_bullets[i][0]+570)%570
		jet_2_bullets[i][1]=(jet_2_bullets[i][1]+570)%570
	}
}
function move(){
	for(i=0;i<2;i++){
		if(laser_1.length>0 && i==0 && Date.now()-laser_1>500 && Date.now()-laser_1<1400 || laser_2.length>0 && i==1 && Date.now()-laser_2>500 && Date.now()-laser_2<1400){
		}else{
			jet[i][0]=(jet[i][0]+jet[i][2]+570)%570
			jet[i][1]=(jet[i][1]+jet[i][3]+570)%570
		}
	}
	for(i=0;i<jet_1_bullets.length;i++){
		if(Date.now()-jet_1_bullets[i][4]<200 && jet_1_bullets[i].length==5){
			jet_1_bullets[i][2]=jet[0][2]*2
			jet_1_bullets[i][3]=jet[0][3]*2
		}
		jet_1_bullets[i][0]=jet_1_bullets[i][2]+jet_1_bullets[i][0]
		jet_1_bullets[i][1]=jet_1_bullets[i][3]+jet_1_bullets[i][1]			
	}
	for(i=0;i<jet_2_bullets.length;i++){
		if(Date.now()-jet_2_bullets[i][4]<200 && jet_2_bullets[i].length==5){
			jet_2_bullets[i][2]=jet[1][2]*1.8
			jet_2_bullets[i][3]=jet[1][3]*1.8
		}
		jet_2_bullets[i][0]=jet_2_bullets[i][2]+jet_2_bullets[i][0]
		jet_2_bullets[i][1]=jet_2_bullets[i][3]+jet_2_bullets[i][1]			
	}
}
function triple_angle(b){
	var angle_1=angle[b]-25
	angle_1=(angle_1+360)%360
	if (angle_1<90){
		var x_change=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
		var y_change=(16-(x_change)**2)**(1/2)	
	}else if (angle_1<180){
		var x_change=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
		var y_change=(16-(x_change)**2)**(1/2)			
	}else if (angle_1<270){
		var x_change=-(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
		var y_change=-((16-(x_change)**2)**(1/2))		
	}else{
		var x_change=(4/((getTanFromDegrees(angle_1)**2+1)**(1/2)))
		var y_change=-((16-(x_change)**2)**(1/2))			
	}
	var angle_2=angle[b]+25
	angle_2=(angle_2+360)%360
	if (angle_2<90){
		var x_change_2=(4/((getTanFromDegrees(angle_2)**2+1)**(1/2)))
		var y_change_2=(16-(x_change_2)**2)**(1/2)
	}else if (angle_2<180){
		var x_change_2=-(4/((getTanFromDegrees(angle_2)**2+1)**(1/2)))
		var y_change_2=(16-(x_change_2)**2)**(1/2)			
	}else if (angle_2<270){
		var x_change_2=-(4/((getTanFromDegrees(angle_2)**2+1)**(1/2)))
		var y_change_2=-((16-(x_change_2)**2)**(1/2))		
	}else{
		var x_change_2=(4/((getTanFromDegrees(angle_2)**2+1)**(1/2)))
		var y_change_2=-((16-(x_change_2)**2)**(1/2))			
	}
	return [x_change,y_change,x_change_2,y_change_2]
}
function power_up(){
	for(i=0;i<picked_power_ups.length;i++){
		if (picked_power_ups[i][0]=="Laser" && keys[32] && picked_power_ups[i][1]==0){
			laser_1=[Date.now()];
			picked_power_ups.splice(i,1)
			jet_1_bullets=[]
		}else if (picked_power_ups[i][0]=="Laser" && keys[38] && picked_power_ups[i][1]==1){
			laser_2=[Date.now()];
			picked_power_ups.splice(i,1)
			jet_2_bullets=[]
		}
		if(keys[32] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Big_Ball" && picked_power_ups[i][1]==0){
			jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*1.8,jet[0][3]*1.8, Date.now(),10]);
			picked_power_ups.splice(i,1)
		}
		if(keys[32] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Triple_Shot" && picked_power_ups[i][1]==0){
			var values=triple_angle(0)
			var x_change=values[0];var y_change=values[1];var x_change_2=values[2];var y_change_2=values[3];
			jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*1.8,jet[0][3]*1.8, Date.now(),5]);
			jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,x_change*1.8,y_change*1.8, Date.now(),5]);
			jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,x_change_2*1.8,y_change_2*1.8, Date.now(),5]);
			picked_power_ups.splice(i,1)
		}
		if(keys[32] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Fast_Shooting" && picked_power_ups[i][1]==0){
			if(picked_power_ups[i][0]=="Fast_Shooting" && Date.now()-fast_shooting_time_1>4000){
				fast_shooting_time_1=Date.now()
			}
			if(Date.now()-fast_shooting_time_1<3000){
				if(jet_1_bullets.length==0 || Date.now()-jet_1_bullets[jet_1_bullets.length-1][4]>200){
					jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*1.8,jet[0][3]*1.8, Date.now(),2]);
				}
			}else{
				picked_power_ups.splice(i,1)
			}
		}
		if(keys[32] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Fast_bullet" && picked_power_ups[i][1]==0){
			if(jet_1_bullets.length==0 || Date.now()-jet_1_bullets[jet_1_bullets.length-1][4]>200){
				jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*4,jet[0][3]*4, Date.now(),3.1]);
				picked_power_ups.splice(i,1)
			}
		}		
		if(keys[32] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Homing_Missile" && picked_power_ups[i][1]==0){
			if(jet_1_bullets.length==0 || Date.now()-jet_1_bullets[jet_1_bullets.length-1][4]>200){
				jet_1_bullets.push([jet[0][0]+jet[0][2]*2,jet[0][1]+jet[0][3]*2,jet[0][2]*1.8,jet[0][3]*1.8, Date.now(),3]);
				picked_power_ups.splice(i,1)
			}
		}
		if(keys[38] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Big_Ball" && picked_power_ups[i][1]==1){
			jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*1.8,jet[1][3]*1.8, Date.now(),10]);
			picked_power_ups.splice(i,1)
		}
		if(keys[38] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Fast_Shooting" && picked_power_ups[i][1]==1){
			if(picked_power_ups[i][0]=="Fast_Shooting" && Date.now()-fast_shooting_time_2>4000){
				fast_shooting_time_2=Date.now()
			}
			if(Date.now()-fast_shooting_time_2<3000){
				if(jet_2_bullets.length==0 || Date.now()-jet_2_bullets[jet_2_bullets.length-1][4]>200){
					jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*1.8,jet[1][3]*1.8, Date.now(),2]);
				}
			}else{
				picked_power_ups.splice(i,1)
			}
		}
		if(keys[38] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Fast_bullet" && picked_power_ups[i][1]==1){
			if(jet_2_bullets.length==0 || Date.now()-jet_2_bullets[jet_2_bullets.length-1][4]>200){
				jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*4,jet[1][3]*4, Date.now(),3.1]);
				picked_power_ups.splice(i,1)
			}
		}
		if(keys[38] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Triple_Shot" && picked_power_ups[i][1]==1){
			var values=triple_angle(1)
			var x_change=values[0];var y_change=values[1];var x_change_2=values[2];var y_change_2=values[3];
			jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*1.8,jet[1][3]*1.8, Date.now(),5]);
			jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,x_change*1.8,y_change*1.8, Date.now(),5]);
			jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,x_change_2*1.8,y_change_2*1.8, Date.now(),5]);
			picked_power_ups.splice(i,1)
		}
		if(keys[38] && picked_power_ups.length==1 && picked_power_ups[i][0]=="Homing_Missile" && picked_power_ups[i][1]==1){
			if(jet_2_bullets.length==0 || Date.now()-jet_2_bullets[jet_2_bullets.length-1][4]>200){
				jet_2_bullets.push([jet[1][0]+jet[1][2]*2,jet[1][1]+jet[1][3]*2,jet[1][2]*1.8,jet[1][3]*1.8, Date.now(),3]);
				picked_power_ups.splice(i,1)
			}
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
var death = [false,false]
var angle=[0,180]
var jet=[[200,200,4,0],[200,300,-4,0]]
var jet_1_bullets=[]
var jet_2_bullets=[]
var fast_shooting_time_1=Date.now()
var fast_shooting_time_2=Date.now()
var laser_1=[]
var laser_2=[]
var invisibility=[0,0]
var keys=[]
var power_ups=["Big_Ball","Laser","Fast_Shooting","Homing_Missile","Triple_Shot","Fast_bullet","Invincibility"]
var unpicked_power_ups=[]
var picked_power_ups=[]
var start2=Date.now()
var end=0;
var start=Date.now();
function gameLoop() {
    end=Date.now();
    if (end-start>=18){
    	start=Date.now();
    	direction();
    	power_up();
    	shoot();
    	missile();
    	move();
    	Game_State_Display();
    	console.log(picked_power_ups[0])
	}
	end=Date.now();
    if (end-start2>=8000){
    	start2=Date.now();
    	unpicked_power_ups.push([power_ups[Math.floor(Math.random()*power_ups.length)],Math.floor(Math.random()*570),Math.floor(Math.random()*570)]);
    }
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
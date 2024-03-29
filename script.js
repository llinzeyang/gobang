
var me,over,context,wins,count,myWin,computerWin,chessBoard;
var chessBox=document.getElementById("chessBox");
var newGBtn=document.getElementById("NG");
var scoreMe=document.getElementById("mee");
var scoreCop=document.getElementById("cop");
newGBtn.onclick=function(){
  newGame();
}
function newGame(){
  me=true;

  over=false;//判断棋局是否结束
  chessBox.innerHTML='<canvas id="chess" width="450px" height="450px"></canvas>';
  var chess=document.getElementById('chess');
  context=chess.getContext('2d');
  context.strokeStyle="#bfbfbf";
  //棋盘
  for(var i=0;i<15;i++){
    context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.stroke();
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
    context.stroke();
  }
  //赢法数组 
  wins=[];
  for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
      wins[i][j]=[];
    }
  }

  count=0;//索引
  //横线赢法
  for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
      for(var k=0;k<5;k++){
        wins[i][j+k][count]=true;
      }
      count++;
    }
  }

  //竖线赢法
  for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
      for(var k=0;k<5;k++){
        wins[j+k][i][count]=true;
      }
      count++;
    }
  }

  //反斜线
  for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
      for(var k=0;k<5;k++){
        wins[i+k][j+k][count]=true;
      }
      count++;
    }
  }

  //斜线
  for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
      for(var k=0;k<5;k++){
        wins[i+k][j-k][count]=true;
      }
      count++;
    }
  }
  //alert(count);
  //赢法的统计数组
  myWin=[];
  computerWin=[];
  for(var i=0;i<count;i++){
    myWin[i]=0;
    computerWin[i]=0;
  }
  chess.onclick=function(e){
    thisClick(e);
  }

  //用于判断点击位置是否已落子
  chessBoard=[];
  for(var i=0;i<15;i++){
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
      chessBoard[i][j]=0;
    } 
  }

}
newGame();


//用于判断点击位置是否已落子
var chessBoard=[];
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}








//棋子
function oneStep(i,j,me){
	context.beginPath();
  context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
  context.closePath();
  var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
  if(me){
    gradient.addColorStop(0,"#0a0a0a");
    gradient.addColorStop(1,"#636766");
  }else{
  	gradient.addColorStop(0,"#d1d1d1");
    gradient.addColorStop(1,"#f9f9f9");
  }
  context.fillStyle=gradient;
  context.fill();
}

//落子函数
chess.onclick=function(e){
  thisClick(e);
}

function thisClick(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
  var x=e.offsetX;
  var y=e.offsetY;
  var i=Math.floor(x/30);
  var j=Math.floor(y/30);
  if(chessBoard[i][j]==0){
    oneStep(i,j,me);
    chessBoard[i][j]=1;
    for(var k=0;k<count;k++){
   	  if(wins[i][j][k]){
    	  myWin[k]++;
      	computerWin[k]=6;
     		if(myWin[k]==5){
          scoreMe.innerHTML=parseInt(scoreMe.innerHTML)+1;
   	  		alert("你赢了");
   		  	over=true;
     	  }
   	  }
    }
    if(!over){
      me=!me;
    	computerAI();
    }
    
  }
}

function computerAI(){
  var myScore=[];  //玩家得分
  var computerScore=[];  //电脑得分
  var max=0;//保存最高分数
  var u=0,v=0;//最高分数坐标
  for(var i=0;i<15;i++){
  	myScore[i]=[];
  	computerScore[i]=[];
  	for(var j=0;j<15;j++){
  		myScore[i][j]=0;
  		computerScore[i][j]=0;
  	}
  }
  for(var i=0;i<15;i++){
  	for(var j=0;j<15;j++){
  		if(chessBoard[i][j]==0){
  			for(var k=0;k<count;k++){
  				if(wins[i][j][k]){
  					if(myWin[k]==1){
  						myScore[i][j]+=200;
  					}else if(myWin[k]==2){
  						myScore[i][j]+=400;
  					}else if(myWin[k]==3){
  						myScore[i][j]+=2000;
  					}else if(myWin[k]==4){
  						myScore[i][j]+=10000;
  					}
  					if(computerWin[k]==1){
  						computerScore[i][j]+=220;
  					}else if(computerWin[k]==2){
  						computerScore[i][j]+=440;
  					}else if(computerWin[k]==3){
  						computerScore[i][j]+=2100;
  					}else if(computerWin[k]==4){
  						computerScore[i][j]+=20000;
  					}
  				}
  			}
  			if(myScore[i][j]>max){
  				max=myScore[i][j];
  				u=i;
  				v=j;
  			}else if(myScore[i][j]==max){
  				if(computerScore[i][j]>computerScore[u][v]){
  					u=i;
  					v=j;
  				}
  			}
  			if(computerScore[i][j]>max){
  				max=computerScore[i][j];
  				u=i;
  				v=j;
  			}else if(computerScore[i][j]==max){
  				if(myScore[i][j]>myScore[u][v]){
  					u=i;
  					v=j;
  				}
  			}
  		}
  	}
  }
  oneStep(u,v,false);
  chessBoard[u][v]=2;
  for(var k=0;k<count;k++){
   	  if(wins[u][v][k]){
    	  computerWin[k]++;
      	myWin[k]=6;
     		if(computerWin[k]==5){
          scoreCop.innerHTML=parseInt(scoreCop.innerHTML)+1;
   	  		alert("你输了");
   		  	over=true;
     	  }
   	  }
    }
    if(!over){
      me=!me;
    }
}




var reChess=document.getElementById("reChess");



var score = 0;
var time = 31;
var isstop = true;

function start(){                  //按Start键时，开始游戏
	isstop = !isstop;
	if(!isstop){
		document.getElementById('situation').value = "Playing"
		document.getElementById('showscore').value=score
		var hitedHole=document.getElementsByTagName('button');
		for(var i = 1; i < 25; i++) {         //第一button时Start键
			hitedHole[i].disabled = "";
		}
		appaergopher();
		times();
	}
}

function hit(num){                         //打地鼠的函数
	var hitedHole=document.getElementsByTagName('button')[num];   //取出打了那个洞
	if(hitedHole.className == "gopher"){                     //如果是地鼠，score加 1，颜色变回来
		score = score + 1;
		document.getElementById('showscore').value=score;
		hitedHole.className = "hole";
		appaergopher();
	} else{                                        //如果不是地鼠，score减 1
		score = score - 1;
		document.getElementById('showscore').value=score;
	}
}

function appaergopher(){           //出现地鼠
	var num1 = Math.floor(Math.random()*24) + 1;
	var hitedHole1=document.getElementsByTagName('button')[num1];
	hitedHole1.className = "gopher";
}

function times(){                 //挤时间，并且判断是否结束
	if (isstop) { time = 0;}
	if(time == 0){
		// var temp = document.getElementsByTagName('button')[0];
		// temp.disabled = "";           //结束以后才能按开始
		cannothit();                  //游戏结束以后不能按那些洞
		var str="Game Over.\n You Score:" + score;
		alert(str);                    //显示结果
		score = 0;
		document.getElementById('showtime').value = 0;
		time = 31;
		return;
	} else{
		time--;
		// var temp = document.getElementsByTagName('button')[0];       //开始游戏了就不能按Start了
		// temp.disabled = "disabled";
		document.getElementById('showtime').value = time;           //显示时间
		setTimeout(function() {times()},1000);
	}
}
function cannothit(){                                  //游戏结束以后不能按那些洞
	var hitedHole=document.getElementsByTagName('button');
	for(var i = 1; i < 25; i++) {                    //第一button时Start键
		hitedHole[i].className = "hole"
		hitedHole[i].disabled = "disabled";
		document.getElementById('situation').value = "Game over"
	}
}
var isStart = false;    //是否通过开始
var lost = false;       //是否撞到墙
var t;
function gameStart() {     //鼠标移过开始时执行
	lost = false;
	isStart = true;
	$("#result").text("");  //清空结果
}
function foul(num) {               //鼠标移到wall上时执行
	if(isStart){                 //判断是否开始玩游戏
		lost = true;
		$("#result").text("You Lose");
		var str;
		if(num < 6) str = "u_wall_" + num;
		else str = "l_wall_" + (num - 5);
		$('#'+str).removeClass();
		$('#'+str).addClass("whenLose");
	}
}
function recover(){
	$("#game").find("div").each(function(){
		$(this).removeClass();
		$(this).addClass("wall_style");
	});
}
function finish(){
	if(lost) $("#result").text("You Lose");
	else if(isStart) $("#result").text("You Win");
	else if((!lost) && (!isStart)) $("#result").text("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");

}
function initialize(){
	isStart = false;
	lost = false;
}
var idofblankslice = "";
var isstart = false;
var time = 0;
var t;

window.onload = function(){
	creategame();
}
function creategame(){		//将图片切成16块,最后一个为空的，
	for(var i = 1; i <= 4; i++){
		for(var j = 1; j <= 4; j++){
			var slice = document.createElement("div");
			var str = createclassname(i,j);
			slice.className = str;
			var str1 = "slice_id" + i + j;
			slice.id = str1;
			document.getElementById('game').appendChild(slice);
			slice.onclick = function(){
       			move(this);
       		};
		}
	}
}
function createclassname(i,j){
	var str;
	if((i - 1) * 4 + j == 16){
		str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
		idofblankslice = "slice_id" + i + j;
	} else{
		str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
	}
	return str;
}
function move(obj){		// 点击模块移动,div的位置不变（id不变），只改背景属性
	if (isstart) {
		var blank = $('#'+idofblankslice);
		var str = $('#'+idofblankslice).attr("id");
		if(canmove(obj)){
			idofblankslice = obj.id;
			var temp = obj.className;
			obj.className = blank.attr("class");
			blank.removeClass();
			blank.addClass(temp);
			if(issuccess()) showresult();
		}
	}
}
function canmove(obj){
	var blank = $('#'+idofblankslice);
	var str = $('#'+idofblankslice).attr("id");
	var str1 = str.substring(0,9) + (Number(str.substring(9,10)) + 1);
	var str2 = str.substring(0,9) + (Number(str.substring(9,10)) - 1);
	var str3 = str.substring(0,8) + (Number(str.substring(8,9)) + 1) + str.substring(9,10);
	var str4 = str.substring(0,8) + (Number(str.substring(8,9)) - 1) + str.substring(9,10);
	if(obj.id == str1 || obj.id == str2 || obj.id == str3 || obj.id == str4) return true;
	return false;
}
function showresult(){
	isstart = false;
	setTimeout(function(){alert("You Win!\nTime:" + time);}, 100);
	clearTimeout(t);
	$('#showtime').val(0);
}
function issuccess(){                //判断是否成功
	var i = 1, j = 1;
	$("#game").find("div").each(function(){
		var str;
		if(j == 5) j = 1, i++;
		if(i == 4 && j == 4) str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
		else str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
		if(str != $(this).attr("class").toString()){
			return false;
		}
		j++;
	});
	if(i == 4 && j == 5) return true;
	else return false;
}
function startgame(num1){
	isstart = true;
	clearTimeout(t);
	time = 0;
	initialize();
	mixup(num1);
	timer();
}
function mixup(num1){		//随机打乱，为了确保有解，通过执行一定次数的随机移动来完成。难度是按照循环次数俩设计的，不是很好。
	for(var k = 0; k < num1; k++){
		var blank = document.getElementById(idofblankslice);
		var str = blank.id;
		var num = Math.floor(Math.random()*4);		//随机生成一个0-3的数
		var str1 = israndommove(num,str);
		var change = document.getElementById(str1);
		if(change != null){		//判断可不可以移动
			idofblankslice = change.id;
			var temp = change.className;
			change.className = blank.className;
			blank.className = temp;
		}
	}
}
function israndommove(num,str){
	var str1;
	//如果随机生成的数为0，上移动一次
	if(num == 0) var str1 = str.substring(0,8) + (Number(str.substring(8,9)) + 1) + str.substring(9,10);
	//如果随机生成的数为1，下移动一次
	if(num == 1) var str1 = str.substring(0,8) + (Number(str.substring(8,9)) - 1) + str.substring(9,10);
	//如果随机生成的数为2，左移动一次
	if(num == 2) var str1 = str.substring(0,9) + (Number(str.substring(9,10)) - 1);
	//如果随机生成的数为3，右移动一次
	if(num == 3) var str1 = str.substring(0,9) + (Number(str.substring(9,10)) + 1);
	return str1;
}
function timer(){		//计时器
	$('#showtime').val(time);           //显示时间
	time++;
	t = setTimeout(function() {timer()},1000);
}
function initialize(){		//初始化碎片的背景
	var i = 1, j = 1;
	$("#game").find("div").each(function(){
		var str;
		if(j == 5) j = 1, i++;
		if(i == 4 && j == 4) str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
		else str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
		$(this).removeClass();
		$(this).addClass(str);
		j++;
	});
	idofblankslice = "slice_id44";
}
function endgame(){
	isstart = false;
	clearTimeout(t);
	time = 0;
	$('#showtime').val(0);
	initialize();
}
var idofblankslice = "";
var isstart = false;
var time = 0;
var t;

window.onload = function(){
	creategame();
}

//将图片切成16块,最后一个为空的，
function creategame(){
	for(var i = 1; i <= 4; i++){
		for(var j = 1; j <= 4; j++){
			var slice = document.createElement("div");
			//判断是不是最后一个，最后一个时空的，跟其他的属性不一样
			if((i - 1) * 4 + j == 16){
				var str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
				slice.className = str;
				idofblankslice = "slice_id" + i + j;
			} else{
				var str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
				slice.className = str;
			}
			//给生成的div赋id
			var str1 = "slice_id" + i + j;
			slice.id = str1;
			document.getElementById('game').appendChild(slice);
			//创建onclick事件
			slice.onclick = function(){
       			move(this);
       		};
		}
	}
}

// 点击模块移动,div的位置不变（id不变），只改背景属性
function move(obj){
	if (isstart) {
		var blank = document.getElementById(idofblankslice);
		var str = blank.id;
		//获取空的碎片右，左，下，上的位置的div的id
		var str1 = str.substring(0,9) + (Number(str.substring(9,10)) + 1);
		var str2 = str.substring(0,9) + (Number(str.substring(9,10)) - 1);
		var str3 = str.substring(0,8) + (Number(str.substring(8,9)) + 1) + str.substring(9,10);
		var str4 = str.substring(0,8) + (Number(str.substring(8,9)) - 1) + str.substring(9,10);
		//判断点击碎片是否为空的碎片的周围的div
		if(obj.id == str1 || obj.id == str2 || obj.id == str3 || obj.id == str4){
			idofblankslice = obj.id;
			var temp = obj.className;
			obj.className = blank.className;
			blank.className = temp;
			//每移动一次就判断一次是否成功
			if(issuccess()){
				isstart = false;
				setTimeout(function(){alert("You Win!\nTime:" + time);}, 100);
				clearTimeout(t);
				document.getElementById('showtime').value = 0;
			}
		}
	}
}

function issuccess(){                //判断是否成功
	for(var i = 1; i <= 4; i++){
		for(var j = 1; j <= 4; j++){

			var str1 = "slice_id" + i + j;
			var slice = document.getElementById(str1);

			if((i - 1) * 4 + j == 16){
				var str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
			}
			else{
				var str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
			}

			if(str != slice.className){
				return false;
			}
		}
	}
	return true;
}

function startgame(num1){
	isstart = true;
	clearTimeout(t);
	time = 0;
	initialize();
	mixup(num1);
	timer();
}

//随机打乱，为了确保有解，通过执行一定次数的随机移动来完成。难度是按照循环次数俩设计的，不是很好。
function mixup(num1){

	for(var k = 0; k < num1; k++){
		var blank = document.getElementById(idofblankslice);
		var str = blank.id;
		var change;

		//随机生成一个0-3的数
		var num = Math.floor(Math.random()*4);
		//如果随机生成的数为0，上移动一次
		if(num == 0){
			var str1 = str.substring(0,8) + (Number(str.substring(8,9)) + 1) + str.substring(9,10);
			change = document.getElementById(str1);
		}
		//如果随机生成的数为1，下移动一次
		if(num == 1){
			var str1 = str.substring(0,8) + (Number(str.substring(8,9)) - 1) + str.substring(9,10);
			change = document.getElementById(str1);
		}
		//如果随机生成的数为2，左移动一次
		if(num == 2){
			var str1 = str.substring(0,9) + (Number(str.substring(9,10)) - 1);
			change = document.getElementById(str1);
		}
		//如果随机生成的数为3，右移动一次
		if(num == 3){
			var str1 = str.substring(0,9) + (Number(str.substring(9,10)) + 1);
			change = document.getElementById(str1);
		}
		//判断可不可以移动
		if(change != null){
			idofblankslice = change.id;
			var temp = change.className;
			change.className = blank.className;
			blank.className = temp;
		}
	}
} ///////////////////////////////////////////////////////////////////////////////////

//计时器
function timer(){
	$('#showtime').val(time);           //显示时间
	time++;
	t = setTimeout(function() {timer()},1000);
}

//初始化碎片的背景
function initialize(){
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
	// for(var i = 1; i <= 4; i++){
	// 	for(var j = 1; j <= 4; j++){

	// 		var str1 = "slice_id" + i + j;
	// 		if((i - 1) * 4 + j == 16){
	// 			var str = "blank_slice " + "slice_p_x" + j + " " + "slice_p_y" + i;
	// 			idofblankslice = str1;
	// 		}
	// 		else{
	// 			var str = "slice_img " + "slice_p_x" + j + " " + "slice_p_y" + i;
	// 		}
	// 		var slice = document.getElementById(str1);
	// 		slice.className = str;
	// 	}
	// }
}

function endgame(){
	isstart = false;
	clearTimeout(t);
	time = 0;
	$('#showtime').val(0);
	initialize();
}
window.onload = function(){
	addclickevent();
	checkInputIsValid();
	cansubmit();
}
function addclickevent(){					//给“清除”按钮添加点击事件
	$("#clear_button").click(function(){
		$("input[type='text']").val("");		//清空
		$(".erromsg").html("");
	});
}
function checkInputIsValid(){				//输入一项内容以后判断是否合法
	$("#username").blur(function(){ checkUsernameIsValid(); });
	$("#studentid").blur(function(){ checkstudentidIsValid(); });
	$("#tel").blur(function(){ checktelIsValid(); });
	$("#email").blur(function(){ checkemailIsValid(); });

}
function checkUsernameIsValid(){			//判断username的输入是否合法，并做出反应
	var username = $("#username").val();
	canpressbutton();
	if (/\W/.test(username) || /[a-zA-Z]\w{5,17}/.test(username) == false || username.length > 18 || /[a-zA-Z]/.test((username)[0]) == false){
		$("#errormsg_username").html("不合法!");
	} else{
		$("#errormsg_username").html("");
	}
}
function checkstudentidIsValid(){			//判断学号的输入是否合法，并做出反应
	var studentid = $("#studentid").val();
	canpressbutton();
	if (/\D/.test(studentid) || (studentid)[0] == '0' || /\d{8}/.test(studentid) == false || studentid.length > 8){
		$("#errormsg_studentid").html("不合法!");
	} else {
		$("#errormsg_studentid").html("");
	}
}
function checktelIsValid(){			//判断电话号的输入是否合法，并做出反应
	var tel = $("#tel").val();
	canpressbutton();
	if (/\D/.test(tel) || (tel)[0] == '0' || /\d{11}/.test(tel) == false || tel.length > 11){
		$("#errormsg_tel").html("不合法!");
	} else {
		$("#errormsg_tel").html("");
	}
}
function checkemailIsValid(){			//判断邮箱的输入是否合法，并做出反应
	var email = $("#email").val();
	canpressbutton();
	if (/^[a-zA-Z_0-9\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test(email) == false){
		$("#errormsg_email").html("不合法!");
	} else {
		$("#errormsg_email").html("");
	}
}
function canpressbutton() {				//判断是否所有输入都合法，如果合法就可以按“提交”按钮
	if($(".erromsg").html() == "" && $("#username").val() != "" && $("#studentid").val() != "" && $("#tel").val() != "" && $("#email").val() != "" ){
		$("#submit_button").attr("disabled",false);
	} else {
		$("#submit_button").attr("disabled",true);
	}
}
function cansubmit() {					//没改变输入的时候去判断是否可以提交
	$("#username").keyup(function(){ canpressbutton(); });
	$("#studentid").keyup(function(){ canpressbutton(); });
	$("#tel").keyup(function(){ canpressbutton(); });
	$("#email").keyup(function(){ canpressbutton(); });
}
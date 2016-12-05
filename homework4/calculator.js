var input_string = "";               //记录输入的字符串

function add_to_string(string1){     //通过我们按的按键来记录输入的字符串，参数就是我们按的键
	input_string += string1;
	document.getElementById("result").value = input_string;
}

function delete_from_string(){       //按下'←'时，从字符串中删除最后输入的一个字符
	input_string = input_string.substring(0,input_string.length-1);
	document.getElementById('result').value = input_string;
}

function delete_all(){              //按下'CE'时，清空输入的字符串（删除所有字符串）
	input_string = "";
	document.getElementById('result').value = input_string;
}

function outcome(){                //计算表达式结果
	if(input_string == ""){
    	document.getElementById('result').value = input_string;
	} else{
		try{                        //抛出异常
    		input_string = eval(input_string);
    		if(input_string == Infinity){      //如果除数为零，报错
    			alert("Divisor can not Be zero!");
    		} else {                           //如果除数不为零，显示结果
    			document.getElementById('result').value = input_string;
    		}
  		}
		catch(exception){          //异常，即表达式不合法时，报错。
  		  	alert(exception);
    	}
	}
    input_string = "";            //输出完计算结果,清空输入字符串
}
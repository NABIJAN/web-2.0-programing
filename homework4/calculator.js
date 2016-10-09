var input_string = "";

function add_to_string(string1){
	input_string += string1;
	document.getElementById("result").value = input_string;
}
function delete_from_string(){
	input_string = input_string.substring(0,input_string.length-1);
	document.getElementById('result').value = input_string;
}
function delete_all(){
	input_string = "";
	document.getElementById('result').value = input_string;
}
function outcome(){
	if(input_string == ""){
    	document.getElementById('result').value = input_string;
	} else{
		try{
    		input_string = eval(input_string);
    		document.getElementById('result').value = input_string;
  		}
		catch(exception){
  		  	alert(exception);
    	}
	}
    input_string = "";
}
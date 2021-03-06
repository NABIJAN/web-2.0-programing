var isAscendingOrderSort = true;
var todoData = [];
var staffData = [];

window.onload = function(){
	addOnclickEvent();
	getData();
}

function addOnclickEvent() {
	var a = $("th");
	a.click(function(){
		intializestyle();
		$(this).css({
			"background-color":"#9b90f9",
			"background-repeat":"no-repeat",
			"background-position":"right"
		});
		if(isAscendingOrderSort) changetodo(this);
		else changestaff(this);
		isAscendingOrderSort = !isAscendingOrderSort;
	});
}

function changetodo(value){
	$(value).css("background-image","url(ascend.png)");
	if(value.innerText == "What?") todoAscendingOrderSort(0);
	if(value.innerText == "When?") todoAscendingOrderSort(1);
	if(value.innerText == "Location") todoAscendingOrderSort(2);
	if(value.innerText == "First name") staffAscendingOrderSort(0);
	if(value.innerText == "Last name") staffAscendingOrderSort(1);
	if(value.innerText == "Latest checkin") staffAscendingOrderSort(2);
}

function changestaff(value){
	$(value).css("background-image","url(descend.png)");
	if(value.innerText == "What?") todoDescendingOrderSort(0);
	if(value.innerText == "When?") todoDescendingOrderSort(1);
	if(value.innerText == "Location") todoDescendingOrderSort(2);
	if(value.innerText == "First name") staffDescendingOrderSort(0);
	if(value.innerText == "Last name") staffDescendingOrderSort(1);
	if(value.innerText == "Latest checkin") staffDescendingOrderSort(2);
}

function getData() {
	$("#todo").find("tbody tr").each(function(){
		var temp = [];
		$(this).find("td").each(function(){
			temp.push($(this).html());
		});
		todoData.push(temp);
	});
	$("#staff").find("tbody tr").each(function(){
		var temp = [];
		$(this).find("td").each(function(){
			temp.push($(this).html());
		});
		staffData.push(temp);
	});
}

function intializestyle() {
	var a = $("th");
	a.each(function(){
		$(this).css({
			"background-image":"none",
			"background-color":"#000080"
		});
	});
}

function todoAscendingOrderSort(col) {
	var sortReference = [];
	for(var i = 0; i < 3; i++){
		sortReference[i] = todoData[i][col]
	}
	sortReference.sort(function(a,b){return a > b;});
	sortTodoData(sortReference, col);
}

function todoDescendingOrderSort(col) {
	var sortReference = [];
	for(var i = 0; i < 3; i++){
		sortReference[i] = todoData[i][col]
	}
	sortReference.sort(function(a,b){return a < b;});
	sortTodoData(sortReference, col);
}
function staffAscendingOrderSort(col) {
	var sortReference = [];
	for(var i = 0; i < 3; i++){
		sortReference[i] = staffData[i][col]
	}
	sortReference.sort(function(a,b){return a > b;});
	sortStaffData(sortReference, col);
}

function staffDescendingOrderSort(col) {
	var sortReference = [];
	for(var i = 0; i < 3; i++){
		sortReference[i] = staffData[i][col]
	}
	sortReference.sort(function(a,b){return a < b;});
	sortStaffData(sortReference, col);
}

function sortTodoData(sortReference, col) {
	var i1 = 0;
	var i2 = 0;
	var num;
	$("#todo").find("tbody tr").each(function(){
		for(var k = 0; k < 3; k++){
			if(sortReference[i1] == todoData[k][col]){
				num = k;
			}
		}
		var j = 0;
		$(this).find("td").each(function(){
			$(this).text(todoData[num][j]);
			j++;
		});
		i1++;
	});
}

function sortStaffData(sortReference, col) {
	var i1 = 0;
	var i2 = 0;
	var num;
	$("#staff").find("tbody tr").each(function(){
		for(var k = 0; k < 3; k++){
			if(sortReference[i1] == staffData[k][col]){
				num = k;
			}
		}
		var j = 0;
		$(this).find("td").each(function(){
			$(this).text(staffData[num][j]);
			j++;
		});
		i1++;
	});
}
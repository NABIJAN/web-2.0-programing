var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var userdata = new Buffer(100);

function parseMessage(_url){		//解析url或者我们传进来的string，解析成对象返回
	var obj = new Object();
	obj.username = querystring.parse(_url).username;
	obj.studentid = querystring.parse(_url).studentid;
	obj.tel = querystring.parse(_url).tel;
	obj.email = querystring.parse(_url).email;
	return obj;
}
http.createServer(function (request, response) {		//创建服务器
	response.writeHead(200, {'Content-Type': 'text/html'});
	var url1 = request.url.toString();
	if(request.url == '/') showIndex(response);			//通过url判断请求，再根据请求执行函数
	else if(request.url == '/CSS/signup.css') roalIndexCSS(response);
	else if(request.url == '/JS/signup.js') roalIndexJS(response);
	else if(request.url == '/img/bgimage.png') roalBGimg(response);
	else if(request.url == '/detail') showDetail(request, response);
	else if(request.url == '/CSS/detail.css') roalDetailCSS(response);
	else if(url1.length > 11) sreachUser(request, response);
	else showIndex(response);
}).listen(8000);

function showIndex(_response) {				//读取index.html，即注册页面，并且显示
	_response.write(fs.readFileSync('../index.html'));
	_response.end();
}
function roalIndexCSS(_response) {			//加载index.html的CSS
	fs.readFile("../CSS/signup.css",'utf-8',function(err, data) {
		if(err) throw err;
		_response.writeHead(200, {"Content-Type": "text/css"});
		_response.write(data);
		_response.end();
	});
}
function roalIndexJS(_response) {			//加载index.html的javascript
	fs.readFile("./signup.js",'utf-8',function(err, data) {
		if(err) throw err;
		_response.writeHead(200, {"Content-Type": "text/JavaScript"});
		_response.write(data);
		_response.end();
	});
}
function roalBGimg(_response) {			//bgimage.png文件，index.html的背景图
	fs.readFile("../img/bgimage.png",function(err, data) {
		if(err) throw err;
		_response.writeHead(200, {"Content-Type": "image/png"});
		_response.write(data);
		_response.end();
	});
}
function showDetail(_request, _response) {			//显示详情页面
	var data = new Object();
	_request.on('data', function(chunk){
		data = parseMessage(chunk.toString());
		if(!ispreat(data)) saveData(data);
	});
	_request.on('end', function(){
		writeDetailHTMl(data, _response);
	});
}
function writeDetailHTMl(data, _response) {			//根据需求替换“详情”页面的内容，并显示
	var details = fs.readFileSync('../detail.html', {encoding: "utf-8"});
	var change1 = details.replace("<span>UserName:</span>", "<span>UserName:" + data.username + "</span>");
	var change2 = change1.replace("<span>StudentId:</span>", "<span>StudentId:" + data.studentid + "</span>");
	var change3 = change2.replace("<span>TEL:</span>", "<span>TEL:" + data.tel + "</span>");
	var change4 = change3.replace("<span>Email:</span>", "<span>Email:" + data.email + "</span>");
	_response.write(change4);
	_response.end();
}
function roalDetailCSS(_response) {				//加载“详情”页面的CSS
	fs.readFile("../CSS/detail.css",'utf-8',function(err, data) {
		if(err) throw err;
		_response.writeHead(200, {"Content-Type": "text/css"});
		_response.write(data);
		_response.end();
	});
}
//判断data的数据是否与JSON里的数据有重复的，如果有重复的表明那个是重复。（因为数据只要重复就保存JSON里面）
function ispreat(data) {
	var userdataSTr = fs.readFileSync('../data.json', {encoding: "utf-8"});
	var ispreat = false;
	var userdata = JSON.parse(userdataSTr.toString());
	for(var i = 0; i < userdata.user.length; i++){
		if (data.username == userdata.user[i].username) {
			data.username += "(重复,注册失败)";
			ispreat = true;
		}
		if (data.studentid == userdata.user[i].studentid) {
			data.studentid += "(重复,注册失败)";
			ispreat = true;
		}
		if (data.tel == userdata.user[i].tel) {
			data.tel += "(重复,注册失败)";
			ispreat = true;
		}
		if (data.email == userdata.user[i].email) {
			data.email += "(重复,注册失败)";
			ispreat = true;
		}
		if(ispreat) return true;
	}
	return false;
}
function saveData(data) {				//保存数据到JSON文件里
	var userdataSTr = fs.readFileSync('../data.json', {encoding: "utf-8"});
	var userdata = JSON.parse(userdataSTr.toString());
	var index = userdata.user.length;
	userdata.user[index] = data;
	var writestr = JSON.stringify(userdata);
	fs.writeFileSync('../data.json', writestr);
}
function sreachUser(_request, _response) {		//通过url，查找username，查找成功显示详情，查找失败会回到“注册”页面
	var s_username = querystring.parse(url.parse(_request.url).query).username;
	var isreapt = false;
	var userdataSTr = fs.readFileSync('../data.json', {encoding: "utf-8"});
	var userdata = JSON.parse(userdataSTr.toString());
	for(var i = 0; i < userdata.user.length; i++){
		if (s_username == userdata.user[i].username) {
			writeDetailHTMl(userdata.user[i], _response);
			isreapt = true;
		}
	}
	if (!isreapt) showIndex(_response);
}
console.log('server running on 8000');
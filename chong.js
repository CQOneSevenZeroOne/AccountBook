var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
var server = require("http").createServer(app);
//实例化express
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"wy",
		password:"123456",
		database:"account"
	});
connection.connect();
//-----------------------------扈冲------------------------------------------------
// 用户登录时查找用户是否存在
app.get('/checkusername', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	
	var sql=`SELECT * FROM userinfo where uName='${req.query.username}'`;
	// console.log(sql)
    connection.query(sql, function (error, results, fields) {
		if(results==""){
			res.send("0");
		}else{
			res.send("1");
		}
    });
});
// 电话号码登录时查找用户是否存在
app.get('/checkuserphone', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.query.userphone)
	var sql=`SELECT * FROM userinfo where uPhone='${req.query.userphone}'`;
    connection.query(sql, function (error, results, fields) {
		if(results==""){
			res.send("0");
		}else{
			res.send("1");
		}
    });
});
//登录页面
app.post('/reg', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	// console.log(req.body.username,req.body.password)
	//用电话登录
	if(req.body.username.length==11){
		var sql=`SELECT * FROM userinfo where uPhone='${req.body.username}'`;
		connection.query(sql, function (error, results, fields) {
			if(results==""){
				res.send("失败")
			}else{
				// console.log(results[0].uPhone)
				if(results[0].uPass==req.body.password){
					var str = results[0].userId+"";
					res.send(str)
				}else{
					res.send("失败")
				}
			}
		});
	// 用户名登录
	}else{
		var sql=`SELECT * FROM userinfo where uName='${req.body.username}'`;
		// console.log(sql)
		connection.query(sql, function (error, results, fields) {
			if(results==""){
				res.send("失败")
			}else{
				// console.log(results[0].uPhone)
				if(results[0].uPass==req.body.password){
					var str = results[0].userId+"";
					res.send(str)
				}else{
					res.send("失败")
				}
			}
		});
	}
    
});
//注册用户
app.post('/login', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	var sql=`INSERT INTO userinfo( uPhone, uPass, uName) VALUES ('${req.body.userphone}','${req.body.userpswd}','${req.body.username}')`
	connection.query(sql, function (error, results, fields) {
		res.send("1")
    });
});
//
app.get('/index/capital', function(req, res) {
	console.log(req.query.id)
	res.append("Access-Control-Allow-Origin","*");
	// var sql=`SELECT reId, userId, reDate, reTime, reType, reMoney, iconId, payKind, iconType FROM recordinfo WHERE userId='${req.query.id}'`
	var sql=`SELECT reType, reMoney, payKind FROM recordinfo WHERE userId='${req.query.id}'`
	console.log(sql)
	connection.query(sql, function (error, results, fields) {
		res.send(results)
    });
});




//服务器修改成1703----扈冲操作
server.listen(1703);
console.log("开启服务器");

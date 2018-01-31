var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
//处理post请求体
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"liusong",
		password:"123456",
		database:"account"
	});
connection.connect();

app.post("/giveDate",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	var year = req.body.year+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = 1 and reDate like '${req.body.year}%'`;
	connection.query(s,(error,result1)=>{
		if(error) throw error;
		console.log(result1);
		res.send(JSON.stringify(result1));
	})
})
app.post("/giveMonth",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	var year = req.body.year+req.body.month+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = 1 and reDate like '${year}'`;
	connection.query(s,(error,result)=>{
		if(error) throw error;
		console.log(result);
		res.send(JSON.stringify(result));
	})
})
app.post("/giveDay",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	var year = req.body.year+req.body.month+req.body.day+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = 1 and reDate like '${year}'`;
	connection.query(s,(error,result)=>{
		if(error) throw error;
		console.log(result);
		res.send(JSON.stringify(result));
	})
})
app.listen("1703");
console.log("开启服务器");
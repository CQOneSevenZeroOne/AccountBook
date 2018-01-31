var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
var server = require("http").createServer(app);
//实例化express
var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"wy",
		password:"123456",
		database:"account"
	});
connection.connect();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/searchcoder/today', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	var yearmonth=req.body.redate.slice(0,6);
	var sql=`SELECT * FROM recordinfo as a,icon as b where a.userId=${req.body.userid} and a.iconId=b.iconId and a.reDate like '${yearmonth}%' order by a.reDate DESC`;
    connection.query(sql, function (error, results, fields) {   
		res.send(results);
    });
});



server.listen(1703);
console.log("开启服务器");
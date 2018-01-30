var express = require("express");
var app = express();
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
var server = require("http").createServer(app);
//var io = require("socket.io")(server);
//实例化express
var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"wy",
		password:"123456",
		database:"account"
	});
connection.connect();

app.post('/searchcoder/today', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	var sql=`SELECT * FROM userinfo`;
    connection.query(sql, function (error, results, fields) {   
        console.log(sql);
		res.send(results);
    });
});
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//实例化express
var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"jian",
		password:"123456",
		database:"account"
	});
connection.connect();

app.post('/accbook/getIcon', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
	var sql=`SELECT * FROM icon where reType=${req.body.reType}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});
app.post('/accbook/insertList', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    
	var sql=`INSERT INTO recordinfo(userId,reDate,reTime,reType,reMoney,iconId,payKind,iconType) VALUES (${req.body.userId},'${req.body.reDate}','${req.body.reTime}',${req.body.reType},'${req.body.reMoney}',${req.body.iconId},'${req.body.payKind}',${req.body.iconType})`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send("success");
    });
});

app.listen(1703);
console.log("开启服务器")
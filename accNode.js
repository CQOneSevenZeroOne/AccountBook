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


/*-------------------------------------jian---------------------------- */
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
app.post('/accbook/findreId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
	var sql=`select * from recordinfo as a,icon as b where a.reId = ${req.body.reId} and a.iconId=b.iconId`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});
app.post('/accbook/updateinfo', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`update recordinfo set reTime='${req.body.reTime}',reType=${req.body.reType},reMoney='${req.body.reMoney}',iconId=${req.body.iconId},payKind='${req.body.payKind}',iconType=${req.body.iconType} where reId=${req.body.reId}`;
    
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send("success");
    });
});
/*----------------------------------wy------------------------------------------*/

app.post('/searchcoder/today', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	var yearmonth=req.body.redate.slice(0,6);
	var sql=`SELECT * FROM recordinfo as a,icon as b where a.userId=${req.body.userid} and a.iconId=b.iconId and a.reDate like '${yearmonth}%' order by a.reDate DESC`;
    connection.query(sql, function (error, results, fields) {   
		res.send(results);
    });
});
app.post('/searchcoder/delthiscorder', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
	var sql=`delete from recordinfo where reId=${req.body.reid}`;
    connection.query(sql, function (error, results, fields) {   
        res.send("success");
    });
});


/*----------------------------------ls------------------------------------------*/
app.post("/giveDate",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	var year = req.body.year+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = ${req.body.id} and reDate like '${req.body.year}%'`;
	connection.query(s,(error,result1)=>{
		if(error) throw error;
		res.send(JSON.stringify(result1));
	})
})
app.post("/giveMonth",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	var year = req.body.year+req.body.month+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = ${req.body.id} and reDate like '${year}'`;
	connection.query(s,(error,result)=>{
		if(error) throw error;
		res.send(JSON.stringify(result));
	})
})
app.post("/giveDay",(req,res)=>{
	res.append("Access-Control-Allow-Origin","*");
	var year = req.body.year+req.body.month+req.body.day+"%";
	var retype = parseInt(req.body.retype);
	var s = `select reMoney,iconType,reDate from recordinfo where reType = ${retype} and userId = ${req.body.id} and reDate like '${year}'`;
	connection.query(s,(error,result)=>{
		if(error) throw error;
		res.send(JSON.stringify(result));
	})
})
//-----------------------------扈冲------------------------------------------------
// 用户登录时查找用户是否存在
app.get('/checkusername', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	
	var sql=`SELECT * FROM userinfo where uName='${req.query.username}'`;
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
//获取capital账单信息
app.get('/index/capital', function(req, res) {
	res.append("Access-Control-Allow-Origin","*");
	// var sql=`SELECT reId, userId, reDate, reTime, reType, reMoney, iconId, payKind, iconType FROM recordinfo WHERE userId='${req.query.id}'`
	var sql=`SELECT reType, reMoney, payKind FROM recordinfo WHERE userId='${req.query.id}'`

	connection.query(sql, function (error, results, fields) {
		res.send(results)
    });
});
app.listen(1703);
console.log("开启服务器")
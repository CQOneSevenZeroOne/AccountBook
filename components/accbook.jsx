import React from "react";
import "../css/accbooks.css";
import {connect} from 'react-redux';
import $ from "jquery";
import cookie from "jquery.cookie";

class Xaccbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
      //图标总类型
      sumkind: 0,
      //选择的小图标
      skind: {
        name: "早餐",
        kid: 1,
        iconType: 1
      },
      //支付方式的选择
      cardName: "现金",
      cardbools: false,
      //时间的选择
      timeName: "",
      timebools: false,
      //小图标类
      icon: [],
      //格式错误的提示
      errorbools: false
    }
    this.changkind = this.changkind.bind(this);
    this.changSkind = this.changSkind.bind(this);
    this.selCard = this.selCard.bind(this);
    this.seltime = this.seltime.bind(this);
    this.changeCard = this.changeCard.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.insertList = this.insertList.bind(this);
  }
  render() {
    var _this = this;
    return (
      <div>
        <header style={{ lineHeight: '40px', height: '40px',width:"100%",fontSize: '18px', textAlign: 'center', color: '#ED4F4E', background: 'white', position: 'fixed', top: '0px',display:"flex"}}>
          <a href="#/index/tally" style={{ fontStyle: "normal",  color: "#ED4F4E",flex:"1",textAlign:"left",paddingLeft:"10px"}} className="iconfont icon-arrow-left" ></a>
          <p style={{flex:"4"}}>日常账本</p>
          <span style={{ fontSize: "15px",flex:"1",textAlign:"right",paddingRight:"10px"}} onClick={this.insertList}>完成</span>
          
        </header>
        <div className="selecttab">
          <p onClick={this.changkind}>
            <span className={this.state.sumkind == 0 ? "istab" : ""}>支出</span>
            <span className={this.state.sumkind == 1 ? "istab" : ""}>收入</span>
          </p>
        </div>
        <div className="writeValue">
          <p>{this.state.skind.name}</p>
          <input type="text" placeholder="0.00" id="money" />
        </div>
        <div className="twoTab">
          <div>
            <p onClick={this.selCard}><span>{this.state.cardName}</span> <i className="iconfont icon-xialasanjiao"></i></p>
            <ul className="cardlist" onClick={this.changeCard} style={{ display: this.state.cardbools == true ? "block" : "none" }}>
              <li>现金</li>
              <li>储蓄卡</li>
              <li>信用卡</li>
              <li>支付宝</li>
              <li>微信钱包</li>
            </ul>
          </div>
          <div>
            <p onClick={this.seltime}><span>{this.state.timeName}</span><i className="iconfont icon-xialasanjiao" ></i></p>
            <ul className="cardlist1" onClick={this.changeTime} style={{ display: (this.state.timebools == true && this.props.reId=="-1")?"block":"none"}}>
              {function () {
                return _this.state.time.map(function (item, index) {
                  return <li key={index}>{item}</li>
                })
              }()}
            </ul>
          </div>
        </div>
        <ul className="iconlist" onClick={this.changSkind}>
          {function () {
            return _this.state.icon.map(function (item, index) {
              return <li key={index}>
                <i className={item.iconPath}></i>
                <p data-kid={item.iconId} data-ty={item.iconType}>{item.iconName}</p>
              </li>
            })
          }()}
        </ul>
        <div id="toast" style={{ display: this.state.errorbools == true ? "block" : "none" }}>
          <div className="weui-mask_transparent"></div>
          <div className="weui-toast" style={{ height: "30px", minHeight: "30px", top: "45%" }}>
            <p className="weui-toast__content">信息输入错误</p>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    if(document.cookie==""){
      location.href="http://localhost:12345/#/reg";
    }else if($.cookie("user")==undefined){
      location.href="http://localhost:12345/#/reg";
    }else{
      var _this = this;
    //取小图标
    $.ajax({
      url: "http://localhost:1703/accbook/getIcon",
      type: "POST",
      data: {
        reType: _this.props.reType
      },
      success(data) {
        var arr = JSON.parse(data);
        _this.setState({
          time: timeChange(),
          timeName: getday(),
          icon: arr
        })
      }
    })
    //判断是修改操作
    if(this.props.reId!="-1"){
      $.ajax({
        url:"http://localhost:1703/accbook/findreId",
        type:"POST",
        data:{
          reId:_this.props.reId,
        },
        success(data){
          var arr = JSON.parse(data);
          var time1=arr[0].reDate.slice(0,4)+"-"+arr[0].reDate.slice(4,6)+"-"+arr[0].reDate.slice(6,8);
          var arr1 =[];arr.push(time1);
          _this.setState({
            time:arr1,
            timeName:time1,
            skind: {
              name: arr[0].iconName,
              kid: 1,
              iconType: arr[0].iconType,
            },
            cardName: arr[0].payKind,
            sumkind:arr[0].reType
          });
          document.getElementById("money").value=arr[0].reMoney;
        }
      })
    }
    }
    
    
  }
  //改变记录的种类，支出、收入
  changkind(e) {
    var _this = this;
    var kind;
    if (e.target.tagName == "SPAN" && e.target.innerHTML == "收入") {
      kind = 1;
    } else if (e.target.tagName == "SPAN" && e.target.innerHTML == "支出") {
      kind = 0;
    }
    $.ajax({
      url: "http://localhost:1703/accbook/getIcon",
      type: "POST",
      async: true,
      data: {
        reType: kind
      },
      success(data) {
        var arr = JSON.parse(data);
        _this.setState({
          icon: arr,
          sumkind: kind,
          skind: {
            name: arr[0].iconName,
            kid: arr[0].iconId,
            iconType: arr[0].iconType
          },
        })
      }
    })
  }
  //改变输入框旁的信息
  changSkind(e) {
    var kind = {};
    if (e.target.tagName == "P") {
      kind.name = e.target.innerHTML;
      kind.kid = e.target.getAttribute("data-kid");
      kind.iconType = e.target.getAttribute("data-ty");
    } else if (e.target.tagName == "I") {
      var next = e.target.nextElementSibling;
      kind.name = next.innerHTML;
      kind.kid = next.getAttribute("data-kid");
      kind.iconType = next.getAttribute("data-ty");
    } else {
      kind.name = this.state.skind.name;
      kind.kid = this.state.skind.kid;
      kind.iconType = this.state.skind.iconType;
    }
    this.setState({
      skind: kind
    })
  }
  //判断支付方式的下拉框显示隐藏
  selCard() {
    var bools = this.state.cardbools;
    this.setState({
      cardbools: !bools
    })
  }
  //判断时间的下拉框显示隐藏
  seltime() {
    var bools = this.state.timebools;
    this.setState({
      timebools: !bools
    })
  }
  //选择支付方式
  changeCard(e) {
    var name = "";
    if (e.target.tagName == "LI") {
      name = e.target.innerHTML;
    }
    this.setState({
      cardName: name,
      cardbools: false
    })
  }
  //选择时间
  changeTime(e) {
    var name = "";
    if (e.target.tagName == "LI") {
      name = e.target.innerHTML;
    }
    this.setState({
      timeName: name,
      timebools: false
    })
  }
  //添加数据
  insertList() {
    var _this = this;
    
    var input = document.getElementById("money").value;
    var is = iserror(input);
    if(is.bools==false){
      this.setState({
        errorbools:true
      })
      setTimeout(function(){
        _this.setState({
          errorbools:false
        })
      },1000)
    }else{
      var reMoney = is.money;
      var reDate = datatime(this.state.timeName);
      var reTime = getTime();
      if(this.props.reId=="-1"){ 
        var user = JSON.parse($.cookie("user"));
        var userId = user.userid;
          $.ajax({
            url:"http://localhost:1703/accbook/insertList",
            type:"POST",
            data:{
              userId:userId,
              reType:_this.state.sumkind,
              payKind:_this.state.cardName,
              iconType:_this.state.skind.iconType,
              iconId:_this.state.skind.kid,
              reMoney:reMoney,
              reDate:reDate,
              reTime:reTime
            },
            success(data){
              if(data=="success"){
                 location.href="http://localhost:12345/#/index/tally";
              }
             
            }
          })
      }else{
        $.ajax({
          url:"http://localhost:1703/accbook/updateinfo",
          type:"POST",
          data:{
              reId:_this.props.reId,
              reType:_this.state.sumkind,
              payKind:_this.state.cardName,
              iconType:_this.state.skind.iconType,
              iconId:_this.state.skind.kid,
              reMoney:reMoney,
              reDate:reDate,
              reTime:reTime
          },
          success(data){
            if(data=="success"){
              _this.props.changeIded();
              location.href="http://localhost:12345/#/index/tally";
            }
            
          }
        })
      }
      
    }
  }
}

//得到下拉时间数组
function timeChange() {
  var time = new Date;
  var days = GetLastDay(time.getFullYear(), time.getMonth() + 1);
  var arr = [];
  for (var i = 0, j = 1; j <= days; i++ , j++) {
    arr[i] = time.getFullYear() + "-" + stringNum(time.getMonth() + 1) + "-" + stringNum(j);
  }
  return arr;
}
//获取当前时间
function getday() {
  var time = new Date;
  var dd = time.getFullYear() + "-" + stringNum(time.getMonth() + 1) + "-" + stringNum(time.getDate());
  return dd;
}
//时间不足填0
function stringNum(ti) {
  if (ti < 10) {
    ti = "0" + ti;
  }
  return ti;
}
//根据年月的天数
function GetLastDay(year, month) {
  var date = new Date(year, month, 1),
    lastDay = new Date(date.getTime() - 864e5).getDate();
  return lastDay;
}
//转换日期格式
function datatime(data) {
  var arr = data.split("-");
  var str = arr.join("");
  return str;
}
//获取当前时分秒
function getTime() {
  var time = new Date;
  var dd = stringNum(time.getHours()) + "" + stringNum(time.getMinutes()) + "" + stringNum(time.getSeconds()) + "";
  return dd;
}
//判断价钱格式是否输入错误
function iserror(mon) {
  var obj = {};
  if(/^[0\.]+$/.test(mon)){
    obj.bools = false;
    return obj;
  }
  if (/^[0-9\.]+$/.test(mon)) {
    if (/\.+/.test(mon)) {
      var arr = mon.split(".");
      if (arr[0] == "" && arr[1] == "") {
        obj.bools = false;
        return obj;
      } else if (arr[0] != "" && arr[1] == "") {
        if(arr[0]=="0"){
          obj.bools = false;
          return obj;
        }else{
          obj.bools = true;
          obj.money = arr[0]+".00";
        }
      } else if (arr[0] == "" && arr[1] != "") {
        if(/^[0-9]{3,}$/.test(arr[1])){
          obj.bools = false;
          return obj;
        }else if(/^[0-9]{1}$/.test(arr[1])){
          obj.bools = true;
          obj.money = "0."+arr[1]+"0";
        }else {
          obj.bools = true;
          obj.money = "0."+arr[1];
        }
      }else{
        if(/^[0-9]{3,}$/.test(arr[1])){
          obj.bools = false;
          return obj;
        }else if(/^[0-9]{1}$/.test(arr[1])){
          obj.bools = true;
          obj.money = mon+"0";
        }else{
          obj.bools = true;
          obj.money = mon;
        }
      }
    }else{
      if(/^0+/.test(mon)){
        obj.bools = false;
        return obj;
      }else if(mon==0){
        obj.bools = false;
        return obj;
      }else{
        obj.bools = true;
        obj.money = mon+".00";
      }
    }
  }else{
    obj.bools = false;
    return obj;
  }
  return obj;
}


export default connect((state)=>{
	return state
},(dispatch)=>{
	return {
		changeIded(){
			dispatch({
				type:"changeId",
        reId:"-1",
        reType:"0"
			})	
		}
	}
})(Xaccbook);

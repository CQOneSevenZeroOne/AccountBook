import React from "react";
import "../css/accbooks.css";
class Xaccbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time:[],
      sumkind:1,
      //选择小图标
      skind:{
        name:"早餐",
        kid:1
      },
      //支付方式的选择
      cardName:"现金",
      cardbools:false,
      //时间的选择
      timeName:"",
      timebools:false
    }
    this.changkind = this.changkind.bind(this);
    this.changSkind = this.changSkind.bind(this);
    this.selCard = this.selCard.bind(this);
    this.seltime = this.seltime.bind(this);
    this.changeCard = this.changeCard.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }
  render() {
    var _this = this;
    return (
      <div>
        <header style={{ lineHeight: '40px', height: '40px', fontSize: '18px', textAlign: 'center', color: '#ED4F4E', background: 'white', display: 'fixed', top: '0px' }}>
          <a href="#/index/tally" style={{ float: "left", fontStyle: "normal", position: "fixed", top: "0px", left: "10px", color: "#ED4F4E" }} className="iconfont icon-arrow-left"></a>
          <span style={{fontSize:"15px",float:"right",paddingRight:"10px"}}>完成</span>
          <p>日常账本</p>
        </header>
        <div className="selecttab">
          <p onClick={this.changkind}>
            <span className={_this.state.sumkind==1?"istab":""}>支出</span>
            <span className={_this.state.sumkind==2?"istab":""}>收入</span>
          </p>
        </div>
        <div className="writeValue">
          <p>{this.state.skind.name}</p>
          <input type="text" placeholder="0.00" />
        </div>
        <div className="twoTab">
          <div>
            <p onClick={this.selCard}><span>{this.state.cardName}</span> <i className="iconfont icon-xialasanjiao"></i></p>
            <ul className="cardlist" onClick={this.changeCard} style={{display:this.state.cardbools==true?"block":"none"}}>
              <li>现金</li>
              <li>储蓄卡</li>
              <li>信用卡</li>
              <li>支付宝</li>
              <li>微信钱包</li>
            </ul>
          </div>
          <div>
          <p onClick={this.seltime}><span>{this.state.timeName}</span><i className="iconfont icon-xialasanjiao"></i></p>
            <ul className="cardlist1" onClick={this.changeTime} style={{display:this.state.timebools==true?"block":"none"}}>
            {function() {
              return _this.state.time.map(function(item,index) {
                return <li key={index}>{item}</li>
            })
            }()}
            </ul>
          </div>
        </div>
        <ul className="iconlist" onClick={this.changSkind}>
                <li >
                    <i className="iconfont icon-xiajiang"></i>
                    <p data-kid="1">餐饮</p>
                </li>
                <li>
                    <i className="iconfont icon-xiajiang"></i>
                    <p data-kid="2">晚餐</p>
                </li>
            </ul>
      </div>
    )
  }
  componentDidMount() {
    this.setState({
      time:timeChange(),
      timeName:getday()
    })
  }
  //改变记录的种类，支出、收入
  changkind(e){
      var kind;
      if(e.target.tagName=="SPAN" && e.target.innerHTML=="收入"){
        kind=2;
      }else if(e.target.tagName=="SPAN" && e.target.innerHTML=="支出"){
        kind=1;
      }
      this.setState({
        sumkind:kind
      })
  }
  //改变输入框旁的信息
  changSkind(e){
    var kind={};
    if(e.target.tagName=="P"){
        kind.name=e.target.innerHTML;
        kind.kid=e.target.getAttribute("data-kid");
    }else if(e.target.tagName=="I"){
      var next = e.target.nextElementSibling;
        kind.name=next.innerHTML;
        kind.kid=next.getAttribute("data-kid");
    }else{
      kind.name=this.state.skind.name;
      kind.kid=this.state.skind.kid;
    }
    this.setState({
      skind:kind
    })
  }
  //判断支付方式的下拉框显示隐藏
  selCard(){
    var bools = this.state.cardbools;
    this.setState({
        cardbools:!bools
    })
  }
  //判断时间的下拉框显示隐藏
  seltime(){
    var bools = this.state.timebools;
    this.setState({
        timebools:!bools
    })
  }
  //选择支付方式
  changeCard(e){
    var name="";
    if(e.target.tagName=="LI"){
      name = e.target.innerHTML;
    }
    this.setState({
      cardName:name,
      cardbools:false
    })
  }
  //选择时间
  changeTime(e){
    var name="";
    if(e.target.tagName=="LI"){
      name = e.target.innerHTML;
    }
    this.setState({
      timeName:name,
      timebools:false
    })
  }
}

//得到下拉时间数组
function timeChange(){ 
  var time = new Date;
  var days = GetLastDay(time.getFullYear(),time.getMonth()+1);
  var arr = [];
  for(var i=0,j=1;j<=days;i++,j++){
    arr[i]=time.getFullYear()+"-"+stringNum(time.getMonth()+1)+"-"+stringNum(j);
  }
  return arr;
}
//获取当前时间
function getday(){
  var time = new Date;
  var dd =time.getFullYear()+"-"+stringNum(time.getMonth()+1)+"-"+stringNum(time.getDate());
  return dd;
}
//时间不足填0
function stringNum(ti){
  if(ti<10){
    ti="0"+ti;
  }
  return ti;
}
//根据年月的天数
function GetLastDay(year, month) {
  var date = new Date(year, month, 1),
  lastDay = new Date(date.getTime() - 864e5).getDate();  
  return lastDay;
}

export default Xaccbook;
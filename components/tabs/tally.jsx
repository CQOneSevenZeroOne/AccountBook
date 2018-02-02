import React from "react";
import Route from 'react-router-dom';
import {connect} from 'react-redux';
import "../../css/tally.css";
import $ from "jquery";
import cookie from "jquery.cookie";
class Xtally extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      thismonthacc:[
        {
          title:"本月收入",
          accmoney:"0.00"
        },
        {
          title:"本月支出",
          accmoney:"0.00"
        }
      ],
      writepane:require("../../img/pane.png"),
      todaydata:[],
      dayin:"0.00",
      dayout:"0.00",
      reid:"",
      retype:"",
      dialogisshow:false
    }
    this.showDialog=this.showDialog.bind(this);
    this.closeDialog=this.closeDialog.bind(this);
    this.delthiscorder=this.delthiscorder.bind(this);
  }
  render() {
    var self=this;
    return (
	    <div>
        <div className="thiswrite">
          <div className="thismonthaccount">
          {function() {
            return self.state.thismonthacc.map(function(item,index) {
                return <p key={index}><span>{item.title}</span><b>{item.accmoney}</b></p>
            })
          }()}
          </div>
          <div className="writepanebg">
            <a href="#/accbook">
              <img src={this.state.writepane}/>
            </a>
          </div>
        </div>
        <div className="todaylistbg">
          {/* <div className="todaytime">
            <p>{function(){
              var date=new Date();
              return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
            }()}</p>
            <p>收入：<span>{this.state.dayin}</span></p>
            <p>支出：<span>{this.state.dayout}</span></p>    
          </div> */}
          <div className="todaylist">
            <ul>
              {
                function(){
                  if(self.state.todaydata.length==0){
                    return <li style={{display:"block",textAlign:"center",border:0,fontSize:"14px",color:"#969696"}}>至今还没有记录，快去添加吧~~~</li>
                  }else{
                    return self.state.todaydata.map(function(item,index){
                      return <li key={index} onClick={self.showDialog} data-id={item.reid} data-type={item.retype}>
                          <p className="todayiconbg"><i className={item.icon}></i></p>
                          <p className="icontitle"><span>{item.icontitle}</span></p>
                          <p className="todayiconprice"><span>{item.iconprice}</span></p>
                          <p className="todayicondate"><span>{item.icondate}</span></p>
                        </li>
                    })
                  }
                }()
              }
            </ul>
          </div>
        </div>
        <div className="weui-mask" style={{display:this.state.dialogisshow?"block":"none"}}></div>
        <div className="weui-dialog" style={{display:this.state.dialogisshow?"block":"none"}}>
            <div className="weui-dialog__hd"><strong className="weui-dialog__title">请选择操作</strong></div>
            <div className="weui-dialog__bd">选择操作前请仔细查看</div>
            <div className="weui-dialog__ft">
                <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.delthiscorder}>删除</a>
                <a href="#/accbook" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.props.changeIdMethod.bind(this)}>修改</a>
            </div>
            <p className="closedialog" onClick={this.closeDialog}>×</p>
        </div>
	    </div>
    )
  }
  //对单条记录操作时显示弹窗
  showDialog(e){
    var tempid;
    var temptype;
    if(e.target.tagName=="I" || e.target.tagName=="SPAN"){
      tempid=e.target.parentNode.parentNode.getAttribute("data-id");
      temptype=e.target.parentNode.parentNode.getAttribute("data-type");
    }else if(e.target.tagName=="P"){
      tempid=e.target.parentNode.getAttribute("data-id");
      temptype=e.target.parentNode.getAttribute("data-type");
    }else if(e.target.tagName=="LI"){
      tempid=e.target.getAttribute("data-id");
      temptype=e.target.getAttribute("data-type");
    }
  
    this.setState({
      dialogisshow:true,
      reid:tempid,
      retype:temptype
    });
  }
  //关闭弹窗
  closeDialog(){
    this.setState({
      dialogisshow:false
    });
  }
  //删除某条记录
  delthiscorder(){
    var self=this;
    $.ajax({
      url:"http://localhost:1703/searchcoder/delthiscorder",
      type:"post",
      async:true,
      data:{
        reid:this.state.reid
      },
      success:function(data){
        if(data=="success"){
          self.setState({
            dialogisshow:false
          })        
        }
      }
    })
    var self=this;
    var today=new Date();
    var todate;
    var totime;
    todate=today.getFullYear()+''+addZero(today.getMonth()+1)+''+addZero(today.getDate())+'';
    totime=today.getHours()+''+addZero(today.getMinutes())+''+addZero(today.getSeconds())+'';
    $.ajax({
      url:"http://localhost:1703/searchcoder/today",
      type:"post",
      async:false,
      data:{
        userid:JSON.parse($.cookie("user")).userid,
        redate:todate
      },
      success:function(data){
        //今日无记录
        if(data.length==0){
          self.setState({
            todaydata:[]
          })
        }else{//存在
          var arr=[];
          var dayinnum=0.00;
          var dayoutnum=0.00;
          for(var i in data){
            if(data[i].reType==0){
              dayoutnum+=Number.parseFloat(data[i].reMoney);
              data[i].reMoney='-'+data[i].reMoney;
            }else if(data[i].reType==1){
              dayinnum+=Number.parseFloat(data[i].reMoney);
            }
            var reDate=data[i].reDate.slice(0,4)+"-"+data[i].reDate.slice(4,6)+"-"+data[i].reDate.slice(6,8);
            var obj={
              icon:data[i].iconPath,
              icontitle:data[i].iconName,
              iconprice:data[i].reMoney,
              icondate:reDate,
              iconid:data[i].iconId,
              reid:data[i].reId,
              retype:data[i].reType
            }
            arr.push(obj);
          }
          self.setState({
            todaydata:arr,
            thismonthacc:[
              {
                title:"本月收入",
                accmoney:toDecimal2(dayinnum)
              },
              {
                title:"本月支出",
                accmoney:toDecimal2(dayoutnum)
              }
            ]
          })
        } 
      }
    })
  }
  componentDidMount(){
    if(document.cookie==""){
      location.href="http://localhost:12345/#/reg";
    }else if($.cookie("user")==undefined){
      location.href="http://localhost:12345/#/reg";
    }else{
      this.props.resetId();
      var self=this;
      var today=new Date();
      var todate;
      var totime;
      todate=today.getFullYear()+''+addZero(today.getMonth()+1)+''+addZero(today.getDate())+'';
      totime=today.getHours()+''+addZero(today.getMinutes())+''+addZero(today.getSeconds())+'';
      $.ajax({
        url:"http://localhost:1703/searchcoder/today",
        type:"post",
        async:true,
        data:{
          userid:JSON.parse($.cookie("user")).userid,
          redate:todate
        },
        success:function(data){
          //今日无记录
          if(data.length==0){
            self.setState({
              todaydata:[]
            })
          }else{//存在
            var arr=[];
            var dayinnum=0.00;
            var dayoutnum=0.00;
            for(var i in data){
              if(data[i].reType==0){
                dayoutnum+=Number.parseFloat(data[i].reMoney);
                data[i].reMoney='-'+data[i].reMoney;
              }else if(data[i].reType==1){
                dayinnum+=Number.parseFloat(data[i].reMoney);
              }
              var reDate=data[i].reDate.slice(0,4)+"-"+data[i].reDate.slice(4,6)+"-"+data[i].reDate.slice(6,8);
              var obj={
                icon:data[i].iconPath,
                icontitle:data[i].iconName,
                iconprice:data[i].reMoney,
                icondate:reDate,
                iconid:data[i].iconId,
                reid:data[i].reId,
                retype:data[i].reType
              }
              arr.push(obj);
            }
            self.setState({
              todaydata:arr,
              thismonthacc:[
                {
                  title:"本月收入",
                  accmoney:toDecimal2(dayinnum)
                },
                {
                  title:"本月支出",
                  accmoney:toDecimal2(dayoutnum)
                }
              ]
            })
          } 
        }
      })
    }
    
  }
}
export default connect((state)=>{
	return state
},(dispatch)=>{
	return {
		changeIdMethod(){
			dispatch({
				type:"changeId",
        reId:this.state.reid,
        reType:this.state.retype
      })	
    },
    resetId(){
      dispatch({
				type:"changeId",
        reId:"-1",
        reType:"0"
      })	
    }
	}
})(Xtally);
//小于10补零
function addZero(num){
  if(num<10){
    return '0'+num;
  }else{
    return num;
  }
}
//小数保留两位并补零
function toDecimal2(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return false; 
  } 
  var f = Math.round(x*100)/100; 
  var s = f.toString(); 
  var rs = s.indexOf('.'); 
  if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
  } 
  while (s.length <= rs + 2) { 
    s += '0'; 
  } 
  return s; 
} 

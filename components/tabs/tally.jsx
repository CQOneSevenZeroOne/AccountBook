import React from "react";
import Route from 'react-router-dom';
import "../../css/tally.css";
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
      todaydata:[
        {
          icon:"iconfont icon-yaopin",
          icontitle:"药品",
          iconprice:"20.00"
        },
        {
          icon:"iconfont icon-yaopin",
          icontitle:"药品",
          iconprice:"20.00"
        },
        {
          icon:"iconfont icon-yaopin",
          icontitle:"药品",
          iconprice:"20.00"
        }
      ]
    }
  }
  render() {
    var self=this;
    return (
	    <div>
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
        <div className="todaylistbg">
          <div className="todaytime">
            <p>{function(){
              var date=new Date();
              return date.getFullYear()+"年"+date.getMonth()+"月"+date.getDate()+"日";
            }()}</p>
            <p>收入：<span>300.00</span></p>
            <p>支出：<span>300.00</span></p>
          </div>
          <div className="todaylist">
            <ul>
              {
                function(){
                  if(self.state.todaydata.length==0){
                    return <li style={{display:"block",textAlign:"center",border:0,fontSize:"14px",color:"#969696"}}>今天还没有记录，快去添加吧~~~</li>
                  }else{
                    return self.state.todaydata.map(function(item,index){
                      return <li key={index}><p className="todayiconbg"><i className={item.icon}></i></p><p className="icontitle"><span>{item.icontitle}</span></p><p className="todayiconprice"><span>{item.iconprice}</span></p></li>
                    })
                  }
                }()
              }
            </ul>
          </div>
        </div>
	    </div>
    )
  }
  componentDidMount(){
    console.log("----------在第一次渲染后调用----------");
  } 
}
export default Xtally;

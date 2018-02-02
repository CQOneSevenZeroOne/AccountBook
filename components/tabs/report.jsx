import React from "react";
import {Route} from 'react-router-dom';

import Xreportin from '../reports/reportin.jsx';
import Xreportcon from '../reports/reportcon.jsx';
import '../../css/report.css';
class Xreport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:"",
      id:0,
      arr:[0,1]
    }
    this.changeDate = this.changeDate.bind(this);
    this.changeId = this.changeId.bind(this);
  }
  componentWillMount(){
    /*var mydateInput = document.querySelector(".weui-input");*/
    var date = new Date();
    var day = date.getDate();
    if(date.getMonth()<9){
      var month = '0' + (date.getMonth()+1);
    }
    if(date.getDate()<10){
      day = '0'+ date.getDate();
    }
    var dateString = date.getFullYear()+"-"+month+"-"+day;
    this.setState({
      date:dateString
    })
  }
  render() {
    return (
	    <div>
	    	<div className="weui-cell" style={{marginTop:'2.8rem'}}>
                <div className="weui-cell__hd"><label className="weui-label" style={{color:'#aaa'}}>日期</label></div>
                <div className="weui-cell__bd">
                    <input className="weui-input" type="date" style={{fontSize:'1.2rem'}} onChange={this.changeDate} id={this.state.arr[1]} value={this.state.date}/>
                </div>
        </div>
        <div className="weui-navbar" style={{position:'relative',zIndex:'0'}}>
                <div style={{padding:'0px',height:'3.5rem',lineHeight:'3.5rem'}} className={this.state.id==0?'weui-navbar__item weui-bar__item_on':'weui-navbar__item'} onClick={this.changeId} id={this.state.arr[0]}>
                    <a href="#/index/report/reportcon" style={{display:'inline-block',width:'100%',height:'100%',color:this.state.id==0?'rgb(237, 79, 78)':'#000'}}>支出</a>
                </div>
                <div style={{padding:'0px',height:'3.5rem',lineHeight:'3.5rem'}} className={this.state.id==1?'weui-navbar__item weui-bar__item_on':'weui-navbar__item'} onClick={this.changeId} id={this.state.arr[1]}>
                    <a href="#/index/report/reportin" style={{display:'inline-block',width:'100%',height:'100%',color:this.state.id==1?'rgb(237, 79, 78)':'#000'}}>收入</a>
                </div>
        </div>
       {/* <Route path="/index/report/reportcon" component={Xreportcon} name={this.state.name}></Route>
        <Route path="/index/report/reportin" component={Xreportin}></Route>*/}
        {this.state.id==0?<Xreportcon date={this.state.date} retype={this.state.id}/>:null}
        {this.state.id==1?<Xreportin date={this.state.date} retype={this.state.id}/>:null}
	   </div>
    )
  }
  changeDate(e){
    this.setState({
      date:document.querySelector(".weui-input").value,
      id:e.target.id
    })
  }
  changeId(e){
    this.setState({
      id:e.target.parentNode.id
    })
  }
}
export default Xreport;

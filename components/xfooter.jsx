import React from "react";
import ReactDOM from 'react-dom';
class Xfooter extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        id:1,
        arr:[1,2,3,4]
    }
    this.changeId = this.changeId.bind(this);
    
  }
  render() {
    return (<div className="weui-tab">
      <div className="weui-tabbar" style={{
          position: "fixed"
        }}>
        <a href="#/index/tally" id={this.state.arr[0]} onClick={this.changeId} className="weui-tabbar__item">
          <i className="iconfont icon-bianji1" style={{lineHeight:"21px",fontSize:"21px",color:this.state.id==1?"#ED4F4E":"#B7B7B7"}}></i>
          <p className="weui-tabbar__label" style={{color:this.state.id==1?"#ED4F4E":"#B7B7B7"}}>记账</p>
        </a>
        <a href="#/index/report" onClick={this.changeId} id={this.state.arr[1]} className="weui-tabbar__item">
        <i className="iconfont icon-shanxingtu" style={{lineHeight:"21px",fontSize:"21px",color:this.state.id==2?"#ED4F4E":"#B7B7B7"}}></i>
          <p className="weui-tabbar__label" style={{color:this.state.id==2?"#ED4F4E":"#B7B7B7"}}>报表</p>
        </a>
        <a href="#/index/capital" id={this.state.arr[2]} className="weui-tabbar__item" onClick={this.changeId} className="weui-tabbar__item">
        <i className="iconfont icon-yinhang" style={{lineHeight:"21px",fontSize:"21px",color:this.state.id==3?"#ED4F4E":"#B7B7B7"}}></i>
          <p className="weui-tabbar__label" style={{color:this.state.id==3?"#ED4F4E":"#B7B7B7"}}>资金</p>
        </a>
        <a href="#/index/mine" id={this.state.arr[3]} className="weui-tabbar__item" onClick={this.changeId} className="weui-tabbar__item">
        <i className="iconfont icon-yonghu" style={{lineHeight:"21px",fontSize:"21px",color:this.state.id==4?"#ED4F4E":"#B7B7B7"}}></i>
          <p className="weui-tabbar__label" style={{color:this.state.id==4?"#ED4F4E":"#B7B7B7"}}>我的</p>
        </a>
      </div>
    </div>)
  }
  changeId(e){
    var mid;
    if(e.target.tagName=="P" || e.target.tagName=="I"){
      mid=e.target.parentNode.id
    }else if(e.target.tagName=="A"){
      mid=e.target.id;
    }
    this.setState({      
        id:mid
    })
  }
}
export default Xfooter;


import React from "react";
import Xfooter from "../xfooter.jsx";
import Xheader from "../xheader.jsx";
import $ from "jquery";
import cookie from "jquery.cookie";
class Xmine extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tools:[
        {
          toolicon:"iconfont icon-dingjiaziyuanwei",
          toolcon:"借点钱花花"
        },
        {
          toolicon:"iconfont icon-quan",
          toolcon:"办张卡刷刷"
        },
        {
          toolicon:"iconfont icon-jinbi",
          toolcon:"心愿存钱",
          clickevent:""
        },
        {
          toolicon:"iconfont icon-tushu",
          toolcon:"记账提醒"
        }
      ]
    }
  }
  render() {
    var self=this;
    return (
      <div style={{marginTop:"45px"}}>
        <div className="todaylist">
          <ul>
            {
              function(){
                  return self.state.tools.map(function(item,index){
                    return <li key={index}>
                        <p className="todayiconbg"><i className={item.toolicon}></i></p>
                        <p className="icontitle"><span>{item.toolcon}</span></p>
                      </li>
                  })
              }()
            }
            <li onClick={function(){
                 $.cookie("user","",{expires:-1});
                 location.href="http://localhost:12345/#/reg";
            }}>
              <p className="todayiconbg"><i className="iconfont icon-haoyou"></i></p>
              <p className="icontitle"><span>退出登录</span></p>
            </li>
          </ul>
	      </div>
      </div>
    )
  }
}

export default Xmine;

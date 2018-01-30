import React from "react";
class Xaccbook extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
	    <div>
	    	<header style={{lineHeight:'45px',height:'45px',fontSize:'20px',textAlign:'center',color:'#fff',background:'#ED4F4E',display:'fixed',top:'0px'}}>
            <a href="#/index/tally" style={{float:"left",fontStyle:"normal",position:"fixed",top:"0px",left:"10px",color:"white"}} className="iconfont icon-arrow-left"></a>
            <p>日常账本</p>
        </header>
	    </div>
    )
  }
}
export default Xaccbook;

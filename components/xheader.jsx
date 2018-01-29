import React from "react";
class Xheader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <header style={{lineHeight:'45px',height:'45px',fontSize:'20px',textAlign:'center',color:'#fff',background:'#ED4F4E',display:'fixed',top:'0px'}}>天天账本</header>
            </div>
        )
    }
}
export default Xheader;
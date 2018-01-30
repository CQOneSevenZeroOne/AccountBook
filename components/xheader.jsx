import React from "react";
class Xheader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <header style={{lineHeight:'45px',height:'45px',fontSize:'20px',textAlign:'center',color:'#fff',background:'#ED4F4E',position:"fixed",top:'0px',width:"100%",zIndex:2}}>天天账本</header>
            </div>
        )
    }
}
export default Xheader;
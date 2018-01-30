import React from "react";

class Xreportin extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="reportin">
				<div><p>购物</p></div>
				<div><p>0%</p></div>
				<div><p>{this.props.date}</p></div>
			</div>
			)
	}
}
export default Xreportin;

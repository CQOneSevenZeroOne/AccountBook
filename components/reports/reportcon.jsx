import React from "react";

class Xreportcon extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		console.log(this.props.name);
	}
	render(){
		return(
			<div id="reportcon">
				<div><p>购物</p></div>
				<div><p>100%</p></div>
				<div><p>{this.props.date}</p></div>
			</div>
			)
	}

}
export default Xreportcon;

import React from "react";
import Xheader from "../xheader.jsx"
import Xfooter from "../xfooter.jsx"
import Xcontent from "../Xcontent.jsx"


class Xcapital extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
	    <div>
        <Xheader />
        <Xcontent />
        <Xfooter />
	    </div>
    )
  }
}
export default Xcapital;

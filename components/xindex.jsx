import React from "react";
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import Xtally from "./tabs/tally.jsx";
import Xreport from "./tabs/report.jsx";
import Xcapital from "./tabs/capital.jsx";
import Xmine from "./tabs/mine.jsx";
import Xfooter from "./xfooter.jsx";
import Xheader from "./xheader.jsx";
export default class Xindex extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div>
        <Xheader />
        <Route path="/index/tally" component={Xtally}></Route>
        <Route path="/index/report" component={Xreport}></Route>
        <Route path="/index/capital" component={Xcapital}></Route>
        <Route path="/index/mine" component={Xmine}></Route>
        <Xfooter />
      </div>
    )
  }
}

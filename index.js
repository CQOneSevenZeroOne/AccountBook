import ReactDOM from 'react-dom';
import React from 'react';
import "./font/iconfont.css";
// router
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import "weui";

// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'

//选项卡组件
import Xindex from "./components/xindex.jsx";

ReactDOM.render(
        <Router>
            <div>
                <Route path="/index" component={Xindex}></Route>
            </div>
        </Router>
	,
	document.querySelector("#app"))
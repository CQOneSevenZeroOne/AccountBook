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
import Xaccbook from "./components/accbook.jsx";

const store = createStore((state={
    reId:"-1",
    retype:"0"
},action)=>{
    switch(action.type){
    	case "changeId":
    		return Object.assign({}, state, {
                reId: action.reId,
                reType:action.reType
              })
              break;
     	default:
     		return state
    }
});


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/index" component={Xindex}></Route>
                <Route path="/accbook" component={Xaccbook}></Route>

            </div>
        </Router>
    </Provider>
	,
	document.querySelector("#app"))
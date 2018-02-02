import React from "react";
// import {Route} from 'react-router-dom';
import "../css/login.css";
import "../font/iconfont2.css";
import img03 from "../img/1_03.jpg";
import img06 from "../img/1_06.jpg";
import img08 from "../img/1_08.jpg";
import img10 from "../img/1_10.jpg";
import img12 from "../img/1_12.jpg";
import $ from "jquery";
import "jquery.cookie";
class Xcontent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ['0.00','0.00','0.00','0.00','0.00','0.00']
        }
    }
    componentDidMount() {
        var _this = this;
        var str = $.cookie("user")
        var obj = JSON.parse(str)
        $.ajax({
            url: "http://localhost:1703/index/capital",
            type: "get",
            data: {
                id: obj.userid
            },
            success: function (arr) {
                var a=0;
                var b=0;
                var c=0;
                var d=0;
                var e=0;
                var sum=0;
                for (var i in arr) {
                    if(arr[i].reType==0){
                        arr[i].reMoney = "-"+arr[i].reMoney
                    }
                    switch (arr[i].payKind) {
                        case "现金": a+=Number.parseFloat(arr[i].reMoney);
                            break;
                        case "储蓄卡": b+=Number.parseFloat(arr[i].reMoney);
                            break;
                        case "信用卡": c+=Number.parseFloat(arr[i].reMoney);
                            break;
                        case "支付宝": d+=Number.parseFloat(arr[i].reMoney);
                            break;
                        case "微信钱包": e+=Number.parseFloat(arr[i].reMoney);
                    }
                }
                sum = returnFloat(a+b+c+d+e);
                c = returnFloat(c)
                _this.setState({
                    arr:[returnFloat(a),returnFloat(b),returnFloat(c),returnFloat(d),returnFloat(e),sum]
                })
                //函数补位
                function returnFloat(value) {
                    var value = Math.round(parseFloat(value) * 100) / 100;
                    var xsd = value.toString().split(".");
                    if (xsd.length == 1) {
                        value = value.toString() + ".00";
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString() + "0";
                        }
                        return value;
                    }
                }
            }
        })

    }
    render() {
        return (
            <div className="content1">
                <div className="capital-main">
                    <div className="total">
                        <div>
                            <span>结余</span>
                            <i className="iconfont icon-icon_on_the_down"></i>
                        </div>
                        <div>
                            <span>{this.state.arr[5]}</span>
                            <i className="iconfont icon-eye"></i>
                        </div>
                    </div>
                    <div className="title-list">
                        <div className="list-item">
                            <div><img src={img03} onClick={this.cheak}/><span>现金</span></div>
                            <span>{this.state.arr[0]}</span>
                        </div>
                        <div className="list-item">
                            <div><img src={img06} /><span>储蓄</span></div>
                            <span>{this.state.arr[1]}</span>
                        </div>
                        <div className="list-item">
                            <div><img src={img08} /><span>信用卡</span></div>
                            <span>{this.state.arr[2]}</span>
                        </div>
                        <div className="list-item">
                            <div><img src={img10} /><span>支付宝</span></div>
                            <span>{this.state.arr[3]}</span>
                        </div>
                        <div className="list-item">
                            <div><img src={img12} /><span>微信</span></div>
                            <span>{this.state.arr[4]}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Xcontent;

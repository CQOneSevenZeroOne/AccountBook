import React from "react";
import ReactDOM from 'react-dom';
import "../css/login.css";
import $ from "jquery";
import "jquery.cookie";
import imgs1 from "../img/1_02.jpg";
// import "jquery.cookie";
class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userpassword: "",
            IsShowusername:false,
            IsShowuserpassword:false,
            username: "",
            IsShowtip:false
          }
          
          this.getusername = this.getusername.bind(this)
          this.checkusername = this.checkusername.bind(this)
          this.checkuserpassword = this.checkuserpassword.bind(this)
          this.getuserpassword = this.getuserpassword.bind(this)
          this.Regbtn = this.Regbtn.bind(this)
    }
    render() {
        return (
            <div>
                <div className="header">
                    <div className="header-bg">
                        <div className="bgimg">
                            <img src={imgs1} style={{width:"100%"}}/>
                        </div>
                    </div>
                    <div className="header-choice">
                        <div className="choice">
                            <a className="login-choice">登录</a><span>|</span><a href="/#/login">注册</a>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="login">
                        <div className="login-item username">
                            <span className="titile">用户名：</span>
                            <input type="text" onChange={this.getusername} onBlur={this.checkusername} placeholder="请输入用户名或手机号"/>
                            <span className={this.state.IsShowusername?"show":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">用户名不存在</em>
                            </span>
                        </div>
                        <div className="login-item password">
                            <span className="titile">密&nbsp;&nbsp;&nbsp;码：</span>
                            <input type="password"  onChange={this.getuserpassword} onBlur={this.checkuserpassword} placeholder="请输入密码"/>
                            <span className="hidden" className={this.state.IsShowuserpassword?"show":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">密码不能为空</em>
                            </span>
                        </div>
                    </div>
                    <div className="login-btn">
                        <span className={this.state.IsShowtip?"":"hidden"}>登录失败,请正确输入</span>
                        <a onClick={this.Regbtn}>登录</a>
                    </div>
                </div>
            </div>
        )
    }
    getusername(event){

        //更改数据时，将用户名传给data      
        this.setState({username: event.target.value})
    }
    checkusername(event){
        var _this =this;
        // 判断是否用电话号码登录
        if(event.target.value.length==11){
            $.ajax({
                url:"http://localhost:1703/checkuserphone",
                type:"get",
                data:{
                    userphone:event.target.value
                },
                success:function(data){
                    if(data=="0"){
                        
                        _this.setState({IsShowusername:true})
                        setTimeout(() => {
                            _this.setState({IsShowusername:false})
                        },2000);
                    }
                }
            })
            //判断用户名不能用空
        }else if(event.target.value.length==0){
                _this.setState({IsShowusername:true})
                setTimeout(() => {
                    _this.setState({IsShowusername:false})
                },2000);
        //判断使用户名登录
        }else{
            $.ajax({
                url:"http://localhost:1703/checkusername",
                type:"get",
                data:{
                    username:event.target.value
                },
                success:function(data){
                    // data=0时表示为用户名为空，显示提示
                    if(data=="0"){
                        _this.setState({IsShowusername:true})
                        setTimeout(() => {
                            _this.setState({IsShowusername:false})
                        },2000);
                    }
                }
            })
        }
        
    }
    getuserpassword(event){
        this.setState({userpassword: event.target.value})
    }
    checkuserpassword(event){
        if(event.target.value.length==0){
            this.setState({IsShowuserpassword:true})
            setTimeout(() => {
                this.setState({IsShowuserpassword:false})
            },2000);
        }
    }
    //点击登录按钮时开始登录
    Regbtn(){
        if((!this.state.IsShowuserpassword)&&(!this.state.IsShowusername)&&(this.state.username!="")&&(this.state.userpassword!="")){
            var _this = this;
            $.ajax({
                url:"http://localhost:1703/reg",
                type:"post",
                data:{
                    username:_this.state.username,
                    password:_this.state.userpassword,
                },
                success:function(data){
                    //data =="失败时，表示失败"
                    if(data=="失败"){
                        _this.setState({IsShowtip:true})
                        setTimeout(() => {
                            _this.setState({IsShowtip:false})
                        },2000);
                    }else{
                        var obj={
                            userid:data
                        }
                        $.cookie("user",JSON.stringify(obj));
                        location.href="/#/index/tally"
                    }
                }
            })
        }else{
            // console.log("条件不满足")
        }
    }

}
export default Reg
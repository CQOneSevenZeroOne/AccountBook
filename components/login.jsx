import React from "react";
import ReactDOM from 'react-dom';
import "../css/login.css";
import $ from "jquery";
import imgs1 from "../img/1_02.jpg"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //控制提示信息
            IsShowphone:false,
            IsShowphone1:false,
            IsShowusername:false,
            IsShowusername1:false,
            IsShowpswd:false,
            IsShowpswd1:false,
            //传值
            username:"",
            userphone:"",
            userpswd:"",
            //验证全部正确
            IsShowphonebool:false,
            IsShowusernamebool:false,
            IsShowpswdbool:false,
            IsShowpswd1bool:false,
            //登录成功或失败提示
            IsShowloginsucc:false,
            IsShowloginerr:false
          }
          
          this.cheackusernamevalue = this.cheackusernamevalue.bind(this)
          this.changeusername = this.changeusername.bind(this)
          this.changeuserphone = this.changeuserphone.bind(this)
          this.cheackuserphonevalue = this.cheackuserphonevalue.bind(this)
          this.changeuserpswd = this.changeuserpswd.bind(this)
          this.cheackuserpswdvalue = this.cheackuserpswdvalue.bind(this)
          this.cheackuserpswd = this.cheackuserpswd.bind(this)
          this.loginbtn = this.loginbtn.bind(this)
    }
    render() {
        return (
            <div>
                <div className="header">
                    <div className="header-bg">
                    {/* 这是最上面的背景图片 */}
                        <div className="bgimg">
                            <img src={imgs1} style={{width:"100%"}}/>
                        </div>
                    </div>
                    <div className="header-choice">
                        <div className="choice">
                            <a href="/#/reg">登录</a><span>|</span><a className="login-choice">注册</a>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="login">
                        <div className="login-item username">
                            <span className="titile">用户名：</span>
                            <input type="text" onChange={this.changeusername} onBlur={this.cheackusernamevalue} placeholder="请输入用户名"/>
                            <span className={this.state.IsShowusername?"":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">{this.state.IsShowusername1?"用户名不能为空":"用户名已存在"}</em>
                            </span>
                        </div>
                        <div className="login-item username">
                            <span className="titile">手机号：</span>
                            <input type="text" onChange={this.changeuserphone} onBlur={this.cheackuserphonevalue} placeholder="请输入手机号"/>
                            <span className={this.state.IsShowphone?"":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">{this.state.IsShowphone1?"手机已被注册":'手机格式不正确'}</em>
                            </span>
                        </div>
                        <div className="login-item password">
                            <span className="titile">密&nbsp;&nbsp;&nbsp;码：</span>
                            <input type="password" onChange={this.changeuserpswd} onBlur={this.cheackuserpswdvalue} placeholder="设置密码（6-12的数字字母混合）"/>
                            <span className={this.state.IsShowpswd?"":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">密码格式不正确</em>
                            </span>
                        </div>
                        <div className="login-item password">
                            <span className="titile">再&nbsp;&nbsp;&nbsp;次：</span>
                            <input type="password" onBlur={this.cheackuserpswd} placeholder="请再次输入"/>
                            <span className={this.state.IsShowpswd1?"":"hidden"}>
                                <i className="clearcon">×</i>
                                <em className="messshow">密码不一致</em>
                            </span>
                        </div>
                    </div>
                    <div className="login-btn">
                    <span className={this.state.IsShowloginsucc?"":"hidden"}>{this.state.IsShowloginerr?'注册失败，请检查后在注册':'注册成功！！即将跳入登录页面'}</span>
                        <a onClick={this.loginbtn}>注册</a>
                    </div>
                </div>
            </div>
        )
    }
    changeusername(event){
        this.setState({username: event.target.value})
    }
    //判断名字是否存在
    cheackusernamevalue(event){
        var _this=this
        if(event.target.value.length!=0){
            $.ajax({
                url:"http://localhost:1703/checkusername",
                type:"get",
                data:{
                    username:event.target.value
                },
                success:function(data){
                    // data=0时表示为用户名为空，
                    if(data=="1"){
                        _this.setState({IsShowusernamebool:false})
                        _this.setState({IsShowusername:true})
                        setTimeout(() => {
                            _this.setState({IsShowusername:false})
                        },2000);
                    }else{
                        _this.setState({IsShowusernamebool:true})
                    }
                }
            })
        }else{
            _this.setState({IsShowusername:true})
            setTimeout(() => {
                _this.setState({IsShowusername:false})
            },2000);
            _this.setState({IsShowusername1:true})
            setTimeout(() => {
                _this.setState({IsShowusername1:false})
            },2000);
        }
    }
    changeuserphone(event){
        this.setState({userphone: event.target.value})
    }
    //判断手机号
    cheackuserphonevalue(event){
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        var bool =  myreg.test(event.target.value)
        if(!bool){
            this.setState({IsShowphonebool:false})
            this.setState({IsShowphone:true})
            setTimeout(() => {
                this.setState({IsShowphone:false})
            },2000);
        }else{
            var _this = this;
            $.ajax({
                url:"http://localhost:1703/checkuserphone",
                type:"get",
                data:{
                    userphone:event.target.value
                },
                success:function(data){
                    // data=0时表示为手机用户为空，
                    if(data=="1"){
                        _this.setState({IsShowphone1:true})
                        _this.setState({IsShowphonebool:false})

                        _this.setState({IsShowphone:true})
                        setTimeout(() => {
                            _this.setState({IsShowphone:false})
                        },2000);
                    }else{
                        _this.setState({IsShowphone1:false})
                        _this.setState({IsShowphonebool:true})
                    }
                }
            })
        }
    }
    changeuserpswd(event){
        this.setState({userpswd: event.target.value})
    }
    //检验密码格式是否正确
    cheackuserpswdvalue(event){
        var mypswd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        var bool =  mypswd.test(event.target.value)
        if(!bool){
            this.setState({IsShowpswd:true})
            this.setState({IsShowpswdbool:false})
            setTimeout(() => {
                this.setState({IsShowpswd:false})
            },2000);
        }else{
            this.setState({IsShowpswdbool:true})
        }
        this.setState({userpswd: event.target.value})
    }
    cheackuserpswd(event){
        var bool=(this.state.userpswd==event.target.value)
        if(!bool){
            this.setState({IsShowpswd1:true})
            this.setState({IsShowpswd1bool:false})
            setTimeout(() => {
                this.setState({IsShowpswd1:false})
            },2000);
        }else{
            this.setState({IsShowpswd1bool:true})
        }
    }
    loginbtn(){
        var bool =(this.state.IsShowphonebool&&this.state.IsShowusernamebool&&this.state.IsShowpswdbool&&this.state.IsShowpswd1bool)
        // var bool = 1;
        if(bool){
            // console.log("开始发送")
            var _this =this;
            $.ajax({
                url:"http://localhost:1703/login",
                type:"post",
                data:{
                    username:_this.state.username,
                    userpswd:_this.state.userpswd,
                    userphone:_this.state.userphone
                },
                success:function(data){
                    if(data=="1"){
                        // console.log("注册成功")
                        location.href="/#/reg"
                    }else{
                        // console.log("注册失败")
                    }
                }
            })
        }else{
            // console.log("注册注册有误，请检查")
            this.setState({IsShowloginsucc:true})
            this.setState({IsShowloginerr:true})
            var _this =this;
            setTimeout(function(){
                _this.setState({IsShowloginsucc:false})
                _this.setState({IsShowloginerr:false})
            },2000)
        }
    }
}
export default Login
/**
 * Created by wangxiaobo on 17/3/5.
 */
require('./login.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="module-login">
                <div className="Login">
                <div className="logo">
                </div>
                <div className="icon-c">
                    <i className="iconfont icon--"></i>
                    <input className="input-under-line" type="text" name="username" placeholder="请输入您的用户名"/>
                </div>
                <div className="icon-c">
                    <i className="iconfont icon--1"></i>
                    <input className="input-under-line" type="text" name="password" placeholder="请输入您的账户密码"/>
                </div>
                <p className="ph">请登录微信绑定，可查看用户信息</p>
                <a className="btn btn-wx" href="javascript:;">绑定微信</a>
                <a className="btn-sub" href="/register">立即注册</a>
                <a className="btn-fp" href="">忘记密码?</a>
            </div>
            </div>
        )
    }
    componentDidMount() {

    }
}
render(
    <Login />, document.getElementById("login")
);
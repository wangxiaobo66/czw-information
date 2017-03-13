/**
 * Created by wangxiaobo on 17/3/5.
 */
require('./register.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="module-register">
                <div className="Register">
                    <div className="logo">
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--"></i>
                        <input className="input-under-line" type="text" name="username" placeholder="请输入您的用户名" />
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--1"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="请输入您的账户密码" />
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--1"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="请再次输入密码" />
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--4	"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="请输入公司全称含分公司或办事处" />
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--2"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="请输入您的手机号码" />
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--3"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="请输入您的电子邮箱" />
                    </div>
                    <a className="btn btn-wx" href="">确定</a>
                </div>
            </div>
        )
    }
    componentDidMount() {

    }
}
render(
    <Register />, document.getElementById("register")
);
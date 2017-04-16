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
            username:'',
            password:''
        }
    }
    render() {
        let {username,password} = this.state;
        return (
            <div className="module-login">
                <div className="Login">
                <div className="logo">
                </div>
                <div className="icon-c">
                    <i className="iconfont icon--"></i>
                    <input className="input-under-line" type="text" name="username" placeholder="请输入您的用户名" value={username} onChange={(e) => this.change(e)} onBlur={(e) => this.blur(e)}/>
                </div>
                <div className="icon-c">
                    <i className="iconfont icon--1"></i>
                    <input className="input-under-line" type="text" name="password" placeholder="请输入您的账户密码" value={password} onChange={(e) => this.change(e)}/>
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
    change(e){
        let name = e.target.name;
        let val = e.target.value;
        switch (name){
            case 'username':
                this.setState({
                    username:val
                });
                break;
            case 'password':
                this.setState({
                   password:val
                });
                break;
        }
    }
    blur(e){
        let val = this.state.username;
        let data ={'username':val};
        util.postRequest('/userQuery',data).then(body=>{
            body.json().then(
                json => {
                    if(json.status<0){
                        console.log('该帐号不存在,请重新输入。')
                    }
                }
            )
        })
    }
}
render(
    <Login />, document.getElementById("login")
);
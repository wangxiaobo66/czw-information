/**
 * Created by wangxiaobo on 17/3/5.
 */
require('./login.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Capacity } = require('../../component/capacity/capacity');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            text:'',
            hide:true,
            WXFBSESSIONID:''
        }
    }
    render() {
        let {username,password,text,hide} = this.state;
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
                    <input className="input-under-line" type="password" name="password" placeholder="请输入您的账户密码" value={password} onChange={(e) => this.change(e)}/>
                </div>
                <p className="ph">请登录微信绑定，可查看用户信息</p>
                <a className="btn btn-wx" href="javascript:;" onClick={(e) => this.click(e)}>绑定微信</a>
                <a className="btn-sub" href="/register">立即注册</a>
                <a className="btn-fp" href="tel:400-006-6655">忘记密码?请拨打客服电话</a>
            </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }
    componentDidMount() {
        //获取WXFBSESSIONID的值
        this.setState({
            WXFBSESSIONID:util.localStorage('get','WXFBSESSIONID')
        })
    }
    //弹框回调
    changeHide(e){
        if(e){
            this.setState({
                text:'',
                hide:true
            })
        }
    }
    //input输入绑定
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
    //失焦查询用户是否存在
    blur(e){
        let val = this.state.username;
        if(val!=''){
            let data ={'username':val};
            util.postRequest('/userQuery',data).then(body=>{
                body.json().then(
                    json => {
                        if(json.status<0){
                            this.setState({
                                text:'该帐号不存在,请重新输入',
                                hide:false,
                                username:''
                            });
                        }
                    }
                )
            })
        }
    }
    //点击提交各种判断
    click(e){
        let {username,password,WXFBSESSIONID} = this.state;
        if(password==''){
            this.setState({
                text:'请输入您的账户密码',
                hide:false
            })
        }
        if(username==''){
            this.setState({
                text:'请输入您的用户名',
                hide:false
            })
        }
        if(username!=''&&password!=''){
            let data = {"username":username,"password":password,"WXFBSESSIONID":WXFBSESSIONID};
            util.postRequest('/login',data).then(body=>{
                body.json().then(
                    json => {
                        if(json.status==1){
                            this.setState({
                                text:'登录成功',
                                hide:false
                            });
                            util.localStorage('set','username',json.username);
                            window.location.href = '/binding';
                        }
                        if(json.status==-6){
                            this.setState({
                                text:'网络异常，请重新登录',
                                hide:false
                            })
                        }
                        if(json.status==-4){
                            this.setState({
                                text:'该微信号已绑定过其它账号',
                                hide:false
                            })
                        }
                        if(json.status==-5){
                            this.setState({
                                text:'服务异常，请稍后再试',
                                hide:false
                            })
                        }
                    }
                )
            })
        }
    }
}
render(
    <Login />, document.getElementById("login")
);
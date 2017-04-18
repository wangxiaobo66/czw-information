/**
 * Created by wangxiaobo on 17/3/5.
 */
require('./register.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Capacity } = require('../../component/capacity/capacity');

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            passwordAgain:'',
            company:'',
            tel:'',
            email:'',
            contact:'',
            tphone:'',
            text:'',
            hide:true
        }
    }
    render() {
        let {username,password,passwordAgain,company,tel,contact,email,tphone,text,hide} = this.state;
        return (
            <div className="module-register">
                <div className="Register">
                    <div className="logo">
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--"></i>
                        <input className="input-under-line" type="text" name="username" placeholder="请输入您的用户名" value={username} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--1"></i>
                        <input className="input-under-line" type="password" name="password" placeholder="请输入您的账户密码" value={password} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--1"></i>
                        <input className="input-under-line" type="password" name="passwordAgain" placeholder="请再次输入密码" value={passwordAgain} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--4	"></i>
                        <input className="input-under-line" type="text" name="company" placeholder="请输入公司全称含分公司或办事处" value={company} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--"></i>
                        <input className="input-under-line" type="text" name="contact" placeholder="请输入联系人姓名" value={contact} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--2"></i>
                        <input className="input-under-line" type="tel" name="tel" placeholder="请输入您的手机号码" value={tel} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--3"></i>
                        <input className="input-under-line" type="email" name="email" placeholder="请输入您的电子邮箱" value={email} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--2"></i>
                        <input className="input-under-line" type="tel" name="tphone" placeholder="请输入座机号码" value={tphone} onChange={(e)=>this.onchange(e)} onBlur={(e)=>this.blur(e)}/>
                    </div>
                    <a className="btn btn-wx" href="javascript:;" onClick={(e) => this.click(e)}>确定</a>
                    <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
                </div>
            </div>
        )
    }
    componentDidMount() {

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
    onchange(e){
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
            case 'passwordAgain':
                this.setState({
                    passwordAgain:val
                });
                break;
            case 'company':
                this.setState({
                    company:val
                });
                break;
            case 'tel':
                this.setState({
                    tel:val
                });
                break;
            case 'email':
                this.setState({
                    email:val
                });
                break;
            case  'contact':
                this.setState({
                    contact:val
                });
                break;
            case 'tphone':
                this.setState({
                    tphone:val
                });
                break;
        }
    }
    blur(e){
        let {username,password,passwordAgain,tel,email,tphone} = this.state;
        let name = e.target.name;
        switch (name){
            case 'username':
                let data ={'username':username};
                util.postRequest('/userQuery',data).then(body=>{
                    body.json().then(
                        json => {
                            if(json.status>0){
                                this.setState({
                                    text:'该帐号已存在',
                                    hide:false,
                                    username:''
                                });
                            }
                        })
                });
                if(username!=''&&!util.match.name.reg.test(username)){
                    this.setState({
                        text:util.match.name.msg,
                        hide:false
                    })
                }
                break;
            case 'password':
                if(password!=''&&!util.match.password.reg.test(password)){
                    this.setState({
                        text:util.match.password.msg,
                        hide:false
                    })
                }
                break;
            case 'passwordAgain':
                if(password==''&&passwordAgain!=''){
                    this.setState({
                        text:'请输入您的密码',
                        hide:false
                    })
                }
                if(password!=''&&passwordAgain!=password){
                    this.setState({
                        text:'两次密码必须一致',
                        hide:false
                    })
                }
                break;
            case 'tel':
                if(tel!=''&&!util.match.mobile.reg.test(tel)){
                    this.setState({
                        text:util.match.mobile.msg,
                        hide:false
                    })
                }
                break;
            case 'email':
                if(email!=''&&!util.match.email.reg.test(email)){
                    this.setState({
                        text:util.match.email.msg,
                        hide:false
                    })
                }
                break;
            case 'tphone':
                if(tphone!=''&&!util.match.tel.reg.test(tphone)){
                    this.setState({
                        text:util.match.tel.mag,
                        hide:false
                    })
                }
                break;
        }
    }
    click(e){
        let {username,password,passwordAgain,company,tel,contact,email,tphone} = this.state;
        if(tphone==''||!util.match.tel.reg.test(tphone)){
            this.setState({
                text:util.match.tel.msg,
                hide:false
            })
        }
        if(email==''||!util.match.email.reg.test(email)){
            this.setState({
                text:util.match.email.msg,
                hide:false
            })
        }
        if(contact==''){
            this.setState({
                text:'请输入联系人姓名',
                hide:false
            })
        }
        if(tel==''||!util.match.mobile.reg.test(tel)){
            this.setState({
                text:util.match.mobile.msg,
                hide:false
            })
        }
        if(company==''){
            this.setState({
                text:'请输入公司名称',
                hide:false
            })
        }
        if(passwordAgain==''||passwordAgain!=password){
            this.setState({
                text:'两次密码必须保持一致',
                hide:false
            })
        }
        if(password==''||!util.match.password.reg.test(password)){
            this.setState({
                text:util.match.password.msg,
                hide:false
            })
        }
        if(username==''||!util.match.name.reg.test(username)){
            this.setState({
                text:util.match.name.msg,
                hide:false
            })
        }
        if(username!=''&&util.match.name.reg.test(username)&&password!=''&&util.match.password.reg.test(password)&&passwordAgain==password&&company!=''&&tel!=''&&util.match.mobile.reg.test(tel)&&contact!=''&&email!=''&&util.match.email.reg.test(email)&&tphone!=''&&util.match.tel.reg.test(tphone)){
            let data = {"username":username,"password":password,"passwordAgain":passwordAgain,"company":company,"tel":tel,"contact":contact,"email":email,"tphone":tphone};
            util.postRequest('/Register',data).then(body=> {
                body.json().then(
                    json => {
                        if(json.status>0){
                            this.setState({
                                text:'注册成功！',
                                hide:false
                            })
                        }else{
                            this.setState({
                                text:'网络异常请稍后再试',
                                hide:false
                            })
                        }
                    })
            })
        }
    }
}
render(
    <Register />, document.getElementById("register")
);
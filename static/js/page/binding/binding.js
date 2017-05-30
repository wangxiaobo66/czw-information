/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./binding.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Capacity } = require('../../component/capacity/capacity');

class Binding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realName:'',
            username:'',
            tel:'',
            email:'',
            select:'',
            text:'',
            hide:true,
            WXFBSESSIONID:''
        }
    }

    render() {
        let {realName,tel,email,text,hide} = this.state;
        return (
            <div className="module-binding">
                <div className="Binding">
                    <div className="logo">
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--"></i>
                        <input className="input-under-line" type="text" name="realName" placeholder="真实姓名" value={realName} onChange={(e) => this.change(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--2"></i>
                        <input className="input-under-line" type="tel" name="tel" placeholder="手机号码" maxLength="11" value={tel} onChange={(e) => this.change(e)} onBlur={(e) => this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--5"></i>
                        <select className="input-under-line zhiwei" name="select" onChange={(e) => this.change(e)}>
                            <option value="" selected="">选择职位</option>
                            <option value="1">管理</option>
                            <option value="2">市场</option>
                            <option value="3">行政</option>
                            <option value="4">技术</option>
                            <option value="5">产品</option>
                        </select>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--3"></i>
                        <input className="input-under-line" type="text" name="email" placeholder="邮箱地址" value={email} onChange={(e) => this.change(e)} onBlur={(e) => this.blur(e)}/>
                    </div>
                    <a className="btn btn-wx" href="javascript:;" onClick={(e) => this.click(e)}>绑定微信</a>
                </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }
    componentDidMount() {
        let username = util.localStorage('get','username');
        this.setState({
            username:username,
            WXFBSESSIONID:util.localStorage('get','WXFBSESSIONID')
        });
    }
    //弹框回调
    changeHide(e){
        let {text,WXFBSESSIONID} = this.state;
        let _this = this;
        if(text == "绑定成功"){
            let data = {"WXFBSESSIONID":WXFBSESSIONID};
            util.postRequest('/setSendMobanEmail',data).then(body=> {
                body.json().then(
                    json => {
                        if(json.status==1){
                            _this.setState({
                                text:'模版邮件发送成功！',
                                hide:false
                            });
                            setTimeout(function(){
                                window.location.href ="/mine"
                            },2000);
                        }
                    })
            })
        }
        if(e){
            this.setState({
                text:'',
                hide:true
            })
        }
    }
    change(e){
        let name = e.target.name;
        let val = e.target.value;
        switch (name){
            case 'realName':
                this.setState({
                    realName:val
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
            case 'select':
                this.setState({
                    select:val
                });
                break;
        }
    }
    blur(e){
        let name = e.target.name;
        let val = e.target.value;
        switch (name){
            case 'tel':
                if(val!=''&&!util.match.mobile.reg.test(val)){
                    this.setState({
                        text:util.match.mobile.msg,
                        hide:false
                    })
                }
                break;
            case 'email':
                if(val!=''&&!util.match.email.reg.test(val)){
                    this.setState({
                        text:util.match.mobile.msg,
                        hide:false
                    })
                }
                break;
        }
    }
    click(e){
        let {username,realName,tel,email,select,WXFBSESSIONID} =this.state;
        if(select==''){
            this.setState({
                text:'请选择职位',
                hide:false
            })
        }
        if(email==''||!util.match.email.reg.test(email)){
            this.setState({
                text:util.match.email.msg,
                hide:false
            })
        }
        if(tel==''||!util.match.mobile.reg.test(tel)){
            this.setState({
                text:util.match.mobile.msg,
                hide:false
            })
        }
        if(realName==''){
            this.setState({
                text:'请输入您的真实姓名',
                hide:false
            })
        }
        if(username!=''&&realName!=''&&select!=''&&tel!=''&&util.match.mobile.reg.test(tel)&&email!=''&&util.match.email.reg.test(email)){
            let data = {"username":username,"realName":realName,"select":select,"tel":tel,"email":email,"WXFBSESSIONID":WXFBSESSIONID};
            util.postRequest('/binding',data).then(body=>{
                body.json().then(
                    json => {
                        if(json.status==-4){
                            this.setState({
                                text:'该微信已绑定过采招网父账号',
                                hide:false
                            })
                        }
                        if(json.status==-5){
                            this.setState({
                                text:'采招网父账号为空',
                                hide:false
                            })
                        }
                        if(json.status==-6){
                            this.setState({
                                text:'此邮箱已被占用',
                                hide:false
                            })
                        }
                        if(json.status==-21){
                            this.setState({
                                text:'生成用户失败，请稍后再试',
                                hide:false
                            })
                        }
                        if(json.status<0&&json.status!=-4&&json.status!=-5&&json.status!=-6&&json.status!=-21){
                            this.setState({
                                text:'网络异常，请稍后再试',
                                hide:false
                            })
                        }
                        if(json.status==1){
                            this.setState({
                                text:'绑定成功',
                                hide:false
                            });
                        }
                    })
            })
        }
    }
}
render(
    <Binding />, document.getElementById("binding")
);
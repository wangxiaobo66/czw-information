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
            position:'',
            tel:'',
            email:'',
            text:'',
            hide:true
        }
    }

    render() {
        let {realName,position,tel,email,text,hide} = this.state;
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
                        <input className="input-under-line" type="text" name="tel" placeholder="手机号码" maxLength="11" value={tel} onChange={(e) => this.change(e)} onBlur={(e) => this.blur(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--5"></i>
                        <input className="input-under-line" type="text" name="position" placeholder="选择职位" value={position} onChange={(e) => this.change(e)}/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--3"></i>
                        <input className="input-under-line" type="text" name="email" placeholder="邮箱地址" value={email} onChange={(e) => this.change(e)} onBlur={(e) => this.blur(e)}/>
                    </div>
                    <a className="btn btn-wx" href="" onClick={(e) => this.click(e)}>绑定微信</a>
                </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }
    componentDidMount() {
        let username = util.localStorage('get','username');
        console.log(username);
        this.setState({
            username:username
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
                console.log(util.match.mobile.reg.test(val));
                this.setState({
                    tel:val
                });
                break;
            case 'email':
                this.setState({
                    email:val
                });
                break;
        }
    }
    blur(e){
        let name = e.target.name;
        let val = e.target.value;
        switch (name){
            case 'tel':
                if(!util.match.mobile.reg.test(val)){
                    this.setState({
                        text:util.match.mobile.msg,
                        hide:false
                    })
                }
                break;
            case 'email':
                if(!util.match.email.reg.test(val)){
                    this.setState({
                        text:util.match.mobile.msg,
                        hide:false
                    })
                }
                break;
        }
    }
    click(e){
        let {username,realName,position,tel,email} =this.state;
        if(realName==''){
            this.setState({
                text:'请输入您的真实姓名',
                hide:false
            })
        }
        if(tel==''||!util.match.email.reg.test(tel)){
            this.setState({
                text:util.match.mobile.msg,
                hide:false
            })
        }
        if(email==''||!util.match.email.reg.test(email)){
            this.setState({
                text:util.match.email.msg,
                hide:false
            })
        }
    }
}
render(
    <Binding />, document.getElementById("binding")
);
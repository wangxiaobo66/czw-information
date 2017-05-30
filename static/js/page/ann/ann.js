/**
 * Created by wangxiaobo on 17/5/18.
 */
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Capacity } = require('../../component/capacity/capacity');

class Ann extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            hide: true,
            WXFBSESSIONID: ''
        }
    }
    render() {
        let {text, hide} = this.state;
        return (
            <div className="Anns">
                <h1>邮件发布</h1>
                <div className="anns-article">
                    <p>1.发送前请您先<span className="ann--a">绑定邮箱</span>用于确认您的账户信息</p>
                    <p>2.请将要发布的信息内容，以附件doc文档的形式进行发送</p>
                    <p>3.请将信息发布至邮箱<span className="ann--a">zhaobiaofabu@chinabidding.cn</span></p>
                    <p>4.您可以点击<span className="btn-yl" onClick={(e) => this.click(e)}>发送参考模板</span>至
                        <span className="ann--a">我的邮箱</span>查看模板</p>
                </div>
                <h1>表单发布</h1>
                <div className="anns-article">
                    <p>1.请您先登录网站<span className="ann--a">https://www.chinabidding.cn</span></p>
                    <p>2.请您在网站内提交信息进行发布</p>
                </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
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
    //点击发送模版
    click(e){
        let WXFBSESSIONID = util.localStorage('get','WXFBSESSIONID');
        let _this = this;
        console.log(WXFBSESSIONID,"**");
        if(WXFBSESSIONID&&WXFBSESSIONID!="undefined"){
            let data = {"WXFBSESSIONID":WXFBSESSIONID};
                util.postRequest('/setSendMobanEmail',data).then(body=> {
                    body.json().then(
                        json => {
                            if(json.status==1){
                                _this.setState({
                                    text:'邮件发送成功！',
                                    hide:false
                                })
                            }else if(json.status==-9){
                                _this.setState({
                                    text:'已发送邮件，请注意查收',
                                    hide:false
                                })
                            }else{
                                _this.setState({
                                    text:'您尚未登录绑定邮箱账号',
                                    hide:false
                                });
                                setTimeout(function(){
                                    window.location.href ="/login"
                                },2000);

                            }

                        })
                })
        }else{
            let theRequest = util.GetRequest();
            let data = {"code":theRequest.code};
            util.postRequest('/getWXFBSESSIONID',data).then(body=> {
                body.json().then(
                    json => {
                        util.localStorage('set','WXFBSESSIONID',json.wxfbSession);
                        let WXFBSESSIONID = json.wxfbSession;
                        let data = {"WXFBSESSIONID":WXFBSESSIONID};
                        util.postRequest('/getUserMine',data).then(body=> {
                            body.json().then(
                                json => {
                                    if(json.status!=1){
                                        _this.setState({
                                            text:'您尚未登录绑定邮箱账号',
                                            hide:true
                                        });
                                        setTimeout(function(){
                                            window.location.href ="/login"
                                        },2000);
                                    }else{
                                        util.postRequest('/setSendMobanEmail',data).then(body=> {
                                            body.json().then(
                                                json => {
                                                    if(json.status==1){
                                                        _this.setState({
                                                            text:'邮件发送成功！',
                                                            hide:false
                                                        })
                                                    }else{
                                                        _this.setState({
                                                            text:'您尚未登录绑定邮箱账号',
                                                            hide:false
                                                        });
                                                        setTimeout(function(){
                                                            window.location.href ="/login"
                                                        },2000);
                                                    }
                                                })
                                        })
                                    }
                                })
                        })
                    })
            })
        }
    }
}
render(
    <Ann />, document.getElementById("Ann")
);
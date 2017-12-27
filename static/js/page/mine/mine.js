/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./mine.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const {Prompt} = require('../../component/prompt/prompt');
const {Capacity} = require('../../component/capacity/capacity');

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            f_name:'',
            headImgUrl:'',
            yifabu:'',
            nofabu:'',
            all:'',
            textPro:'',
            hidePro:true,
            text:'',
            zzFlag:'',
            hide:true,
            WXFBSESSIONID:''
        }
    }
    componentWillMount(){
        //渲染前
    }
    render() {
        let {name,f_name,headImgUrl,yifabu,nofabu,all,textPro,hidePro,text,hide,zzFlag} = this.state;
        return (
            <div className="module-mine">
                <div className="Mine">
                    <div className="header cl">
                        <div className="photo-frame">
                            <img src={headImgUrl!=""?headImgUrl:"./img/head.jpg"}></img>
                        </div>
                        <div className="user-info">
                            <p className="user-name">{name}</p>
                            <p className="father-name">{f_name}</p>
                            <span className="account-integral">账户积分：</span><span className="y">0</span>
                        </div>
                        <a className="btn btn-small" onClick={(e) => this.unLogin(e)}>解绑微信</a>
                    </div>
                    <a className="company-info" href="/companyinfo">
                        <span>企业信息 | 资质认证</span>
                        {
                            zzFlag==''?<span className="un-id">(未认证)</span>
                                :
                                zzFlag=="F"?
                                    <span className="un-id">(未认证)</span>
                                    :<span className="un-id">(已认证)</span>
                        }
                        <span className="arrow"></span>
                    </a>
                    <table className="release-table">
                        <tr>
                            <th>发布信息</th>
                            <th>发布(待审核)</th>
                            <th>发布成功</th>
                        </tr>
                        <tr>
                            <td>{yifabu!=""?yifabu:0}</td>
                            <td>{nofabu!=""?nofabu:0}</td>
                            <td>{all!=""?all:0}</td>
                        </tr>
                    </table>
                    {/*
                        <ul className="push-ul">
                            <div className="push-ul-title">
                                历史发布统计
                                <span className="arrow"></span>
                            </div>
                            <li>
                                <span>2016年12月</span>
                                <span>发布条数（10）</span>
                            </li>
                            <li>
                                <span>2016年12月</span>
                                <span>发布条数（10）</span>
                            </li>
                            <li>
                                <span>2016年12月</span>
                                <span>发布条数（10）</span>
                            </li>
                        </ul>
                    */}
                </div>
                <Prompt text={textPro} hide={hidePro} changeClick={(e) => this.changeClick(e)}/>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }
    componentDidMount() {
        //应该写在渲染前,下次注意
        let WXFBSESSIONID = util.localStorage('get','WXFBSESSIONID');
        console.log(WXFBSESSIONID,"**");
        let _this = this;
        if(WXFBSESSIONID&&WXFBSESSIONID!="undefined"){
            let data = {"WXFBSESSIONID":WXFBSESSIONID};
            util.postRequest('/getState',data).then(body => {
                body.json().then(
                    json => {
                        _this.setState({
                            zzFlag:json.zz_flag
                        });
                    })
            });
            util.postRequest('/getUserMine',data).then(body=>{
                body.json().then(
                    json =>{
                        if(json.status!=1){
                            _this.setState({
                                WXFBSESSIONID:WXFBSESSIONID
                            });
                            window.location.href='/login';
                        }else{
                            _this.setState({
                                name:json.wx_nickname,
                                headImgUrl:json.wx_headimgurl,
                                f_name:json.f_username,
                                WXFBSESSIONID:WXFBSESSIONID
                            });
                            _this.allTongJi(WXFBSESSIONID);
                        }
                    })
            })
        }else{
            let theRequest = util.GetRequest();
            let data = {"code":theRequest.code};
            util.postRequest('/getWXFBSESSIONID',data).then(body=>{
                body.json().then(
                    json =>{
                        util.localStorage('set','WXFBSESSIONID',json.wxfbSession);
                        let WXFBSESSIONID = json.wxfbSession;
                        let data = {"WXFBSESSIONID":WXFBSESSIONID};
                        util.postRequest('/getUserMine',data).then(body=>{
                            body.json().then(
                                json =>{
                                    if(json.status!=1){
                                        _this.setState({
                                            WXFBSESSIONID:WXFBSESSIONID
                                        });
                                        window.location.href='/login';
                                    }else{
                                        _this.setState({
                                            name:json.wx_nickname,
                                            headImgUrl:json.wx_headimgurl,
                                            WXFBSESSIONID:WXFBSESSIONID
                                        });
                                        _this.allTongJi(WXFBSESSIONID);
                                    }
                                })
                        })
                    })
            });
        }

    }
    /*
    getUserMine(){
        util.postRequest('/getUserMine').then(body=>{
            body.json().then(
                json =>{
                    this.setState({
                        name:json.wx_nickname,
                        headImgUrl:json.wx_headimgurl
                    })
                })
        })
    }
    */
    allTongJi(WXFBSESSIONID){
        let data = {"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/tongJi2',data).then(body=>{
            body.json().then(
                json =>{
                    if(json.state==""){
                        return false
                    }else{
                        this.setState({
                            yifabu:json.yifabu,
                            nofabu:json.nofabu,
                            all:json.all
                        })
                    }
                }
            )
        })
    }
    unLogin(e){
        this.setState({
            textPro:'解绑微信',
            hidePro:false
        });
    }
    changeClick(e){
        let _this = this;
        if(e=="confirm"){
            let data = {"WXFBSESSIONID":this.state.WXFBSESSIONID};
            util.postRequest('/unLogin',data).then(body=>{
                body.json().then(
                    json =>{
                        if(json.status==1){
                            _this.setState({
                                text:'解绑成功',
                                hide:false,
                                textPro:'',
                                hidePro:true
                            });
                            window.location.href="/login";
                        }else{
                            _this.setState({
                                text:'网络繁忙，请稍后再试',
                                hide:false,
                                textPro:'',
                                hidePro:true
                            })
                        }
                    }
                )
            })
        }else{
            this.setState({
                textPro:'',
                hidePro:true
            })
        }
    }
    changeHide(e){
        this.setState({
            text:'',
            hide:true
        })
    }
}
render(
    <Mine />, document.getElementById("mine")
);
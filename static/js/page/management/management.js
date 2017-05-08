/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./management.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const {Capacity} = require('../../component/capacity/capacity');
const {Prompt} = require('../../component/prompt/prompt');
const {Details} = require('../../component/details/details');

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            page:1,
            type:1010,
            details:{},
            mc:false,
            total:null,
            hidePro:true,
            textPro:'',
            hide:true,
            text:'',
            value:'',
            associated:false,
            id:'',
            zbgsId:'',
            associatedDetails:'',
            submit:false,
            WXFBSESSIONID:''
        }
    }
    render() {
        let {list,page,total,type,details,mc,hide,text,hidePro,textPro,associated,value,zbgsId,associatedDetails,submit} = this.state;
        let date = util.date(details.publish_date);
        return (
            <div className="module-management">
                <div className="Management">
                    <nav className="nav flex-row">
                        <div className={type==1010?"curr":""} name="1010" onClick={(e) => this.tableClick(e)}>管理招标信息</div>
                        <div className={type==1020?"curr":""} name="1020" onClick={(e) => this.tableClick(e)}>管理中标信息</div>
                        <div className={type==2000?"curr":""} name="2000" onClick={(e) => this.tableClick(e)}>管理采购信息</div>
                    </nav>
                    <ul className="management-ul">
                        {
                            list.length !=0?
                                list.map((obj) => {
                                    return <Details obj={obj} changeDetails={(e) => this.changeDetails(e)} changeDelete={(e) => this.changeDelete(e)} changeAssociated={(e) =>this.changeAssociated(e)}/>
                                })
                                :null
                        }
                    </ul>
                        {
                            page*8<total?<div className="more btn btn-w" onClick={(e) => this.clickMore(e)}>加载更多</div>
                                :''
                        }
                    {/*关联*/}
                    <div className={"mc"+(associated?"":" hide")}>
                        <div className="mc-contaner">
                            {
                                zbgsId==""?
                                    <div>
                                        <input className="mc-search-input" type="number" name="" placeholder="请输入您想查找的招标信息ID" value={value} onChange={(e) => this.associatedChange(e)}/>
                                        <div className="btn mc-btn-search" onClick={(e) => this.submit(e)}>搜索</div>
                                        {
                                            submit == true && associatedDetails != "" ?
                                                <div className="published">
                                                    <p>
                                                        <span>ID号</span>
                                                        <span>{associatedDetails.id}</span>
                                                    </p>
                                                    <p>
                                                        <span>中标主题</span>
                                                        <span>{associatedDetails.title}</span>
                                                    </p>
                                                    <p className={details.ok_status == 200 ? "published" : "unpublish"}>
                                                        <span>发布状态</span>
                                                        <span className="item"></span>
                                                    </p>
                                                    <p>
                                                        <span>提交时间</span>
                                                        <span>{util.formatDate(util.date(associatedDetails.publish_date))}</span>
                                                    </p>
                                                    <div className="btn btn-y"  onClick={(e) => this.relation(associatedDetails.id)}>关联
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                :null
                            }
                            {
                                zbgsId!=""&&value==""?
                                <div className="published">
                                    <p>
                                        <span>ID号</span>
                                        <span>{associatedDetails.id}</span>
                                    </p>
                                    <p>
                                        <span>中标主题</span>
                                        <span>{associatedDetails.title}</span>
                                    </p>
                                    <p className={details.ok_status == 200 ? "published" : "unpublish"}>
                                        <span>发布状态</span>
                                        <span className="item"></span>
                                    </p>
                                    <p>
                                        <span>提交时间</span>
                                        <span>{util.formatDate(util.date(associatedDetails.publish_date))}</span>
                                    </p>
                                    <div className="btn btn-w" onClick={(e) => this.unRelation(e)}>取消关联</div>
                                </div>
                                    :null
                            }
                            <div className="btn btn-close" onClick={(e) => this.associatedMc(e)}>关闭</div>
                        </div>
                    </div>
                    {/*查看详情*/}
                    <div className={"mc"+(mc?"":" hide")} onClick={(e) => this.clickMc(e)}>
                        <div className="mc-contaner article">
                            <h1 className="head-title">{details.title}</h1>
                            <div className={"status"+(details.ok_status==200?" published":" unpublish")}>
                                <div className="status-item">
                                    <p>ID</p>
                                    <p>{details.id}</p>
                                </div>
                                <div className="status-item">
                                    <p>状态</p>
                                    <p className="pub"></p>
                                </div>
                                <div className="status-item">
                                    <p>发布时间</p>
                                    <p>{util.formatDate(date)}</p>
                                </div>
                            </div>
                            <article className="ar">
                                <p>
                                    {details.description}
                                </p>
                            </article>
                        </div>
                    </div>
                    <Prompt text={textPro} hide={hidePro} changeClick={(e) => this.changeClick(e)}/>
                    <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let theRequest = util.GetRequest();
        let data = {"code":theRequest.code};
        console.log(data);
        let _this=this;
        util.postRequest('/getWXFBSESSIONID',data).then(body=>{
            body.json().then(
                json =>{
                    util.localStorage('set','WXFBSESSIONID',json.wxfbSession);
                    let WXFBSESSIONID = json.wxfbSession;
                    _this.setState({
                        WXFBSESSIONID:WXFBSESSIONID
                    });
                    let data = {"WXFBSESSIONID":WXFBSESSIONID};
                    util.postRequest('/getUserMine',data).then(body=>{
                        body.json().then(
                            json =>{
                                if(json.status!=1){
                                    window.location.href='/login';
                                }else{
                                    this.initial()
                                }
                            })
                    });
                })
        });
        //this.initial();
    }
    //初始加载
    initial(){
        let {page,type,WXFBSESSIONID} = this.state;
        //alert(theRequest.code);
        let data = {"type":type,"page":page,"rp":8,"WXFBSESSIONID":WXFBSESSIONID};//1010招标 1020中标 2000采购
        util.postRequest('/messageList',data).then(body=>{
            body.json().then(
                json =>{
                    let len = json.length;
                    let jsonList = json.slice(1, [len]);

                    this.setState({
                        list:jsonList,
                        total:json[0].id
                    })
                }
            )
        })
    }
    //加载更多
    clickMore(e){
        let {page,type,list,WXFBSESSIONID} = this.state;
        let data = {"type":type,"page":page+1,"rp":8,"WXFBSESSIONID":WXFBSESSIONID};//1010招标 1020中标 2000采购
        util.postRequest('/messageList',data).then(body=>{
            body.json().then(
                json =>{
                    let len = json.length;
                    let moreList = json.slice(1, [len]);
                    let arrayList = list.concat(moreList);
                    this.setState({
                        list:arrayList,
                        total:json[0].id
                    })
                }
            )
        })
    }
    //table切换
    tableClick(e){
        let name = e.target.getAttribute('name');
        this.setState({
            type:name
        });
        let{page,WXFBSESSIONID} = this.state;
        let data = {"type":name,"page":page,"rp":8,"WXFBSESSIONID":WXFBSESSIONID};//1010招标 1020中标 2000采购
        util.postRequest('/messageList',data).then(body=>{
            body.json().then(
                json =>{
                    let len = json.length;
                    let list = json.slice(1, [len]);
                    this.setState({
                        list:list,
                        total:json[0].id
                    })
                }
            )
        })
    }
    //查看详情
    changeDetails(e){
        this.setState({
            details:e,
            mc:true
        })
    }
    clickMc(e){
        this.setState({
            mc:false
        })
    }
    //点击删除
    changeDelete(e){
        this.setState({
            id:e,
           hidePro:false,
            textPro:"删除信息"
        });
    }
    changeClick(e){
        let _this = this;
        let {WXFBSESSIONID} = this.state;
        if(e=="confirm"){
            let data = {"id":this.state.id,"WXFBSESSIONID":WXFBSESSIONID};
            util.postRequest('/messageDelete',data).then(body=>{
                body.json().then(
                    json => {
                        if(json.state=="ok"){
                            this.setState({
                                hidePro:true,
                                textPro:'',
                                hide:false,
                                text:'删除成功'
                            });
                            _this.initial();
                        }else{
                            this.setState({
                                hidePro:true,
                                textPro:'',
                                hide:false,
                                text:'网络繁忙，请稍后再试'
                            })
                        }
                    })
            })
        }else{
            this.setState({
                hidePro:true,
                text:''
            })
        }
    }
    //单按钮提示
    changeHide(e){
        this.setState({
            hide:true,
            text:''
        })
    }
    //关联
    changeAssociated(e){
        let _this=this;
        let {WXFBSESSIONID} = this.state;
        let data = {"id":e,"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/getRelation',data).then(body=>{
            body.json().then(
                json => {
                    this.setState({
                        zbgsId:json.state,
                        //zbgsId:2
                    });
                    //if(this.state.zbgsId){
                    if(json.state!=""){
                        _this.associatedDetails(json.state);
                    }
                })
        });
        this.setState({
            associated:true,
            id:e
        })
    }
    //关联的信息
    associatedDetails(id){
        let {WXFBSESSIONID} = this.state;
        let data = {"id":id,"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/messageDetails',data).then(body=> {
            body.json().then(
                json => {
                    if(json.state==""){
                        this.setState({
                            hidePro:true,
                            textPro:'',
                            hide:false,
                            text:'没有此条信息'
                        })
                    }else{
                        this.setState({
                            associatedDetails:json
                        })
                    }
                })
        })
    }
    //取消关联
    unRelation(e){
        let {id,zbgsId,WXFBSESSIONID} = this.state;
        let data = {"zbggId":id,"zbgsId":zbgsId,"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/unRelation',data).then(body=>{
            body.json().then(
                json =>{
                    if(json.state=="ok"){
                        this.setState({
                            hidePro:true,
                            textPro:'',
                            hide:false,
                            associatedDetails:'',
                            text:'取消成功',
                            zbgsId:''
                        });
                        this.associatedMc(e)
                    }else{
                        this.setState({
                            hidePro:true,
                            textPro:'',
                            hide:false,
                            associatedDetails:'',
                            zbgsId:'',
                            text:'网络繁忙，请稍后再试'
                        });
                        this.associatedMc(e)
                    }
                }
            )
        })
    }
    //关联蒙层
    associatedMc(e){
       this.setState({
           associated:false,
           associatedDetails:'',
           submit:false,
           value:''
       })
    }
    //input赋值
    associatedChange(e){
        this.setState({
            value:e.target.value
        })
    }
    //点击搜索
    submit(e){
        this.setState({
           submit:true
        });
        let {value} = this.state;
        if(value!=""){
            this.associatedDetails(value);
        }
    }
    //点击关联
    relation(id){
        let {value} = this.state;
        let data = {"zbggId":id,"zbgsId":value};
        util.postRequest('/relation',data).then(body=>{
            body.json().then(
                json =>{
                    if(json.state=="ok"){
                        this.setState({
                            hidePro:true,
                            textPro:'',
                            hide:false,
                            associatedDetails:'',
                            text:'关联成功',
                            zbgsId:''
                        });
                    }else{
                        this.setState({
                            hidePro:true,
                            textPro:'',
                            hide:false,
                            associatedDetails:'',
                            zbgsId:'',
                            text:'网络繁忙，请稍后再试'
                        });
                    }
                })
        })
    }
}
render(
    <Management />, document.getElementById("management")
);
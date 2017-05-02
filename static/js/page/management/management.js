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
            id:''
        }
    }
    render() {
        let {list,page,total,type,details,mc,hide,text,hidePro,textPro,associated,value} = this.state;
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
                    <div className={"mc"+(associated?"":" hide")} onClick={(e) => this.associatedMc(e)}>
                        <div className="mc-contaner">
                            <input className="mc-search-input" type="number" name="" placeholder="请输入您想查找的招标信息ID" value={value} onChange={(e) => this.associatedChange(e)}/>
                            <div className="btn mc-btn-search" onClick={(e) => this.submit(e)}>搜索</div>
                                <div className="published">
                                    <p>
                                        <span>ID号</span>
                                        <span></span>
                                    </p>
                                    <p>
                                        <span>中标主题</span>
                                        <span></span>
                                    </p>
                                    <p className={details.ok_status == 200 ? "published" : "unpublish"}>
                                        <span>发布状态</span>
                                        <span className="item"></span>
                                    </p>
                                    <p>
                                        <span>提交时间</span>
                                        <span>2016-12-18</span>
                                    </p>
                                    <div className="btn btn-y">关联招标</div>
                                </div>
                            {/*
                                < div  className="published">
                                <p>
                                <span>ID号</span>
                                <span>30569678</span>
                                </p>
                                <p>
                                <span>中标主题</span>
                                <span>天上一道打火帘，莫非上帝想抽烟</span>
                                </p>
                                <p>
                                <span>发布状态</span>
                                <span className="item"></span>
                                </p>
                                <p>
                                <span>提交时间</span>
                                <span>2016-12-18</span>
                                </p>
                                <div className="btn btn-w">取消关联</div>
                                </div>
                            */}
                            <div className="btn btn-close">关闭</div>
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
    //初始加载
    componentDidMount() {
        let theRequest = util.GetRequest();
        this.initial();
    }
    //初始加载
    initial(){
        let {page,type} = this.state;
        //alert(theRequest.code);
        let data = {"type":type,"page":page,"rp":8};//1010招标 1020中标 2000采购
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
        let {page,type,list} = this.state;
        let data = {"type":type,"page":page+1,"rp":8};//1010招标 1020中标 2000采购
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
        let{page} = this.state;
        let data = {"type":name,"page":page,"rp":8};//1010招标 1020中标 2000采购
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
        if(e=="confirm"){
            let data = {"id":this.state.id};
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
        this.setState({
            associated:true
        })
    }
    //关联蒙层
    associatedMc(e){
       this.setState({
           associated:false
       })
    }
    //input赋值
    associatedChange(e){
        if ( e && e.stopPropagation ) {
            e.stopPropagation();
            this.setState({
                value:e.target.value
            })
        }
    }
    //点击搜索
    submit(e){
        if ( e && e.stopPropagation ) {
            e.stopPropagation();
            console.log(1);
        }
    }
}
render(
    <Management />, document.getElementById("management")
);
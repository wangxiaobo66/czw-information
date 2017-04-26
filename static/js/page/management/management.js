/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./management.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const {Capacity} = require('../../component/capacity/capacity');
const {Details} = require('../../component/details/details');

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            page:1,
            total:null
        }
    }
    render() {
        let {list,page,total} = this.state;
        return (
            <div className="module-management">
                <div className="Management">
                    <nav className="nav flex-row">
                        <div className="curr">管理招标信息</div>
                        <div>管理中标信息</div>
                        <div>管理采购信息</div>
                    </nav>
                    <ul className="management-ul">
                        {
                            list.length !=0?
                                list.map((obj) => {
                                    return <Details obj={obj} />
                                })
                                :null
                        }
                    </ul>
                        {
                            page*8<total?<div className="more btn btn-w">加载更多</div>
                                :''
                        }

                    <div className="mc hide">
                        <div className="mc-contaner">
                            <input className="mc-search-input" type="text" name="" placeholder="请输入您想查找的招标信息ID"/>
                                <div className="btn mc-btn-search">搜索</div>
                                <div className="published">
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
                                    <div className="btn btn-y">关联招标</div>
                                </div>
                                <div  className="published">
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
                        </div>
                    </div>
                    <div className="mc hide">
                        <div className="mc-contaner article">
                            <h1 className="head-title">标题标题标题标题标题标题题标题标题标题</h1>
                            <div className="status">
                                <div className="status-item">
                                    <p>ID</p>
                                    <p>30567896</p>
                                </div>
                                <div className="status-item">
                                    <p>状态</p>
                                    <p className="unpublish">未发布</p>
                                </div>
                                <div className="status-item">
                                    <p>发布时间</p>
                                    <p>2017-03-23</p>
                                </div>
                            </div>
                            <article className="ar">
                                <p>
                                    响应式布局的表现是：网页通过css媒介查询判断可视区域的宽度，在不同的范围应用不同的样式，以便在不同尺寸的设备上呈现最佳的界面效果。典型的例子是，有一个商品列表页，应用响应式布局后，可能在pc上是用4列展示，在平板上用3列展示，在手机上只用1列展示。这种布局的最大好处就是节省人力、资源和时间，所以很多公司都喜欢用。而响应式布局有两个必须的要求：
                                    响应式布局的表现是：网页通过css媒介查询判断可视区域的宽度，在不同的范围应用不同的样式，以便在不同尺寸的设备上呈现最佳的界面效果。典型的例子是，有一个商品列表页，应用响应式布局后，可能在pc上是用4列展示，在平板上用3列展示，在手机上只用1列展示。这种布局的最大好处就是节省人力、资源和时间，所以很多公司都喜欢用。而响应式布局有两个必须的要求：
                                    响应式布局的表现是：网页通过css媒介查询判断可视区域的宽度，在不同的范围应用不同的样式，以便在不同尺寸的设备上呈现最佳的界面效果。典型的例子是，有一个商品列表页，应用响应式布局后，可能在pc上是用4列展示，在平板上用3列展示，在手机上只用1列展示。这种布局的最大好处就是节省人力、资源和时间，所以很多公司都喜欢用。而响应式布局有两个必须的要求：
                                    响应式布局的表现是：网页通过css媒介查询判断可视区域的宽度，在不同的范围应用不同的样式，以便在不同尺寸的设备上呈现最佳的界面效果。典型的例子是，有一个商品列表页，应用响应式布局后，可能在pc上是用4列展示，在平板上用3列展示，在手机上只用1列展示。这种布局的最大好处就是节省人力、资源和时间，所以很多公司都喜欢用。而响应式布局有两个必须的要求：
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let theRequest = util.GetRequest();
        let {page} = this.state;
        //alert(theRequest.code);
        let data = {"type":1010,"page":page,"rp":8};//1010招标 1020中标 2000采购
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
}
render(
    <Management />, document.getElementById("management")
);
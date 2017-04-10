/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./management.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="module-management">
                <div className="Management">
                    <nav className="nav flex-row">
                        <div className="curr">管理招标信息</div>
                        <div>管理中标信息</div>
                        <div>管理采购信息</div>
                    </nav>
                    <ul className="management-ul">
                        <li className="unpublish">
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
                            <div className="flex-row-around">
                                <div className="btn btn-y">查看</div>
                                <div className="btn btn-w">删除</div>
                            </div>
                        </li>
                        <li className="published">
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
                            <div className="flex-row-around">
                                <div className="btn btn-y">查看</div>
                                <div className="btn btn-w">取消关联</div>
                            </div>
                        </li>
                    </ul>
                    <div className="more btn btn-w">加载更多</div>
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
                </div>
            </div>
        )
    }
    componentDidMount() {

    }
}
render(
    <Management />, document.getElementById("management")
);
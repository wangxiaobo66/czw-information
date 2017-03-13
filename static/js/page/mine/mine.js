/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./mine.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="module-mine">
                <div className="Mine">
                    <div className="header cl">
                        <div className="photo-frame">
                            <img src="./img/head.jpg"></img>
                        </div>
                        <div className="user-info">
                            <p className="user-name">蒙奇D路飞先生</p>
                            <span className="account-integral">账户积分：</span><span className="y">168168168</span>
                        </div>
                        <a className="btn btn-small" href="">解绑微信</a>
                    </div>
                    <a className="company-info">
                        <span>企业信息 | 资质认证</span>
                        <span className="arrow"></span>
                    </a>
                    <table className="release-table">
                        <tr>
                            <th>发布信息</th>
                            <th>发布(待审核)</th>
                            <th>发布成功</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </table>
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
                </div>
                <div className="mc hide">
                    <div className="tip-contaner">
                        <p className="title">解绑微信</p>
                        <p className="quest">确定要解绑吗？</p>
                        <div className="flex-row">
                            <div className="btn btn-w">确定</div>
                            <div className="btn btn-y">取消</div>
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
    <Mine />, document.getElementById("mine")
);
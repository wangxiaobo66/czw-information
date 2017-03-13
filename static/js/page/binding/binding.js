/**
 * Created by wangxiaobo on 17/3/7.
 */
require('./binding.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Binding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="module-binding">
                <div className="Binding">
                    <div className="logo">
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--"></i>
                        <input className="input-under-line" type="text" name="username" placeholder="真实姓名"/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--2"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="手机号码"/>
                    </div>
                    <div className="icon-c">
                        <i className="iconfont icon--5"></i>
                        <input className="input-under-line" type="text" name="password" placeholder="选择职位"/>
                    </div>
                    <a className="btn btn-wx" href="">绑定微信</a>
                </div>
                <div className="mc hide">
                    <div className="tip-contaner no-top">
                        <p className="quest">绑定完成</p>
                        <div className="flex-row">
                            <div className="btn btn-y">确定</div>
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
    <Binding />, document.getElementById("binding")
);
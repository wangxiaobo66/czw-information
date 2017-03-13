/**
 * Created by wangxiaobo on 17/3/6.
 */
require('./companyinfo.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

class Companyinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOne: ''
        }
    }

    render() {
        return (
            <div className="module-companyinfo">
                <div className="Company">
                    <div className="list">
                        <span>身份选择</span>
                        <select className="status">
                            <i></i>
                            <option>请选择您的身份信息</option>
                            <option>身份证</option>
                        </select>
                    </div>
                    <div className="list">
                        <span className="fl">公司名称</span>
                        <span className="item oh">神华集团有限责任公司</span>
                        <span className="btn btn-small">编辑</span>
                        <span className="un-id">(未认证)</span>
                    </div>
                    <div className="list xinyong curr">
                        <span>统一社会信用代码</span><span className="ph">工商营业执照、组织机构代码证和税务登记证三证合为一证</span>
                        <div className="checkbox"></div>
                    </div>
                    <div className="list in-load">
                        <span className="item">工商营业执照</span>
                        <span className="btn btn-small"></span>
                    </div>
                    <div className="list un-load">
                        <span className="item">组织结构代码</span>
                        <span className="btn btn-small"></span>
                    </div>
                    <div className="list un-load">
                        <span className="item">代理资质</span>
                        <span className="btn btn-small"></span>
                    </div>
                    <div className="list un-load">
                        <span className="fl">其他资料上传</span>
                        <input className="file-upload" type="text" name="" placeholder="资料说明" />
                            <span className="btn btn-small btn-upload"><input type="file" name="" onChange={(e) => this.IMGchange(e)}/></span>
                            <img src={this.state.imgOne}/>
                    </div>

                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    IMGchange(e){//获取图片路径并本地展示
        let _this = this;
        if (e.target) {
            //Internet Explorer
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                e.target.select();
                return document.selection.createRange().text;
            }
            //Firefox
            if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (e.target.files) {
                    return e.target.files.item(0).getAsDataURL();
                }
                return e.target.value;
            }

            //兼容chrome、火狐等，HTML5获取路径
            if (typeof FileReader != "undefined") {
                var reader = new FileReader();
                reader.onload = function(e) {
                    let a = e.target.result + "";
                    _this.setState({
                        imgOne:a
                    })
                };
                reader.readAsDataURL(e.target.files[0]);
            }
            /*else if (browserVersion.indexOf("SAFARI") > -1) {
             alert("暂时不支持Safari浏览器!");
             }*/

            _this.setState({
                imgOne:e.target.value
            })
        }
    }
}

render(
    <Companyinfo />, document.getElementById("companyinfo")
);

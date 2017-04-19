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
            imgOne: '',
            idType:1,
        }
    }

    render() {
        let {idType} = this.state;
        return (
            <div className="module-companyinfo">
                <div className="Company">
                    <div className="list">
                        <span className="red">*</span><span>身份选择</span>
                        <select className="status" onChange={(e) => this.idChange(e)}>
                            <option value="1">招标代理</option>
                            <option value="2">招标业主</option>
                        </select>
                    </div>
                    <div className="list cl">
                        <span className="red fl">*</span><span className="fl">公司名称</span>
                        <span className="item oh">神华集团有限责任公司</span>
                        <span className="btn btn-small">编辑</span>
                        <span className="un-id">(未认证)</span>
                    </div>
                    {idType=2 ?
                        <div>
                            <div className="list un-load">
                                <span className="red">*</span><span className="item">公告扫描件（加盖公章）</span>
                                <span className="btn btn-small"></span>
                            </div>
                            <div className = "list">
                                <span> 其它资料上传 </span>
                                <select className="status">
                                <option value="">社会统一信用代码</option>
                                <option value="">工商营业执照</option>
                                <option value="">组织机构代码</option>
                                <option value="">其它资料</option>
                                </select>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="list xinyong cl">
                            <span>统一社会信用代码</span><span className="ph">工商营业执照、组织机构代码证和税务登记证三证合为一证</span>
                            <input id="switchCP" className="switch-cp__input switchbox" type="checkbox"/>

                            </div>
                            <div className="list in-load">
                            <span className="red">*</span><span className="item">工商营业执照</span>
                            <span className="btn btn-small"></span>
                            </div>
                            <div className="list un-load">
                            <span className="red">*</span><span className="item">组织结构代码</span>
                            <span className="btn btn-small"></span>
                            </div>
                            <div className="list un-load">
                            <span className="red">*</span><span className="item">代理资质</span>
                            <span className="btn btn-small"></span>
                            </div>
                            <div className="list un-load">
                            <span className="fl">其他资料上传</span>
                            <input className="file-upload" type="text" name="" placeholder="资料说明"/>
                            <span className="btn btn-small btn-upload"><input type="file" name=""/></span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        util.postRequest('/getState').then(body=> {
            body.json().then(
                json => {
                    console.log(json)
                })
            })
    }
    //身份切换改变页面样式
    idChange(e){
        let val = e.target.value;
        this.setState({
            idType:val
        })
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

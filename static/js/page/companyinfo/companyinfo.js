/**
 * Created by wangxiaobo on 17/3/6.
 */
require('./companyinfo.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const {Capacity} = require('../../component/capacity/capacity');

class Companyinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fId: '',//父级id
            idType: 1,
            companyName: '',
            isThree: 1,//初始状态1表示非三证合一，0表示三证合一
            //下面六个参数为空或为文件名表示是否上传图片
            zzjgdmz: '',//组织机构证
            gszz: '',//营业执照
            zzjg: '',//组织机构代码
            dlzz: '',//代理资质
            ggsmj: '',//公告扫描件
            swdjz: '',//税务登记证
            code: '',//三证合一时的营业执照
            text: '',
            hide: true
        }
    }

    render() {
        let {idType, companyName, isThree, zzjgdmz, gszz, dlzz, swdjz, ggsmj, code, text, hide} = this.state;
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
                        {
                            companyName == '' ?
                                <input type="text" name="companyName" value={companyName}/>
                                :
                                <div>
                                    <span className="item oh">{companyName}</span>
                                    <span className="un-id">(未认证)</span>
                                </div>
                        }

                    </div>
                    {
                        idType == 2 ?
                            <div>
                                <div className={"list" + (ggsmj == "" ? " un-load" : " in-load")}>
                                    <span className="red">*</span><span className="item">公告扫描件（加盖公章）</span>
                                    <div className="btn btn-small" >
                                        <input type="file" className="upload" name="ggsmj"
                                           onChange={(e) => this.imageUpload(e)}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="list xinyong cl">
                                    <span>统一社会信用代码</span><span className="ph">工商营业执照、组织机构代码证和税务登记证三证合为一证</span>
                                    <input id="switchCP" className="switch-cp__input switchbox" type="checkbox"
                                           checked={isThree == 0 ? "checked" : ""}
                                           onChange={(e) => this.isThreeChange(e)}/>
                                </div>
                                {
                                    isThree == 1 ?
                                        <div>
                                            <div className={"list" + (gszz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">工商营业执照</span>
                                                <div className="btn btn-small" >
                                                    <input type="file" className="upload" name="gszz"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (swdjz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">税务登记证</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="swdjz"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (zzjgdmz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">组织机构代码</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="zzjgdmz"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (dlzz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">代理资质</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="dlzz"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={"list" + (code == "" ? " un-load" : " in-load")}>
                                            <span className="red">*</span><span className="item">工商营业执照</span>
                                            <div className="btn btn-small" >
                                            <input type="file" className="upload" name="code"
                                                   onChange={(e) => this.imageUpload(e)}/>
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                    <div className="btn btn-sub">
                        提交
                    </div>
                </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }

    componentDidMount() {
        util.postRequest('/getState').then(body => {
            body.json().then(
                json => {
                    this.setState({
                        companyName: json.company_name,
                        fId: json.f_id
                    });
                })
        })
    }

    changeHide(e) {
        if (e) {
            this.setState({
                text: '',
                hide: true
            })
        }
    }

    //上传图片
    imageUpload(e) {
        let val = e.target.value;
        let fileName = e.target.name;
        let name = this.state.fId + '_' + e.target.name;
        var formData = new FormData();
        if (!e.target.value) {
            return false
        } else {
            formData.append(name, e.target.files[0]);
            return fetch('/uploadMy', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01', //接受数据格式
                    //'Content-Type':'multipart/form-data; charset=UTF-8'//上传文件不指定content-type
                },
                //credentials: 'include', //使用cookie  默认不使用cookie
                body: formData
            }).then(response => {
                response.json().then(
                    json => {
                        console.log(json);
                        val = '';
                        if (json.status == 1) {
                            //zzjgdmz,gszz,dlzz,swdjz,ggsmj,code
                            switch (fileName) {
                                case 'zzjgdmz':
                                    this.setState({
                                        zzjgdmz: 'zzjgdmz'
                                    });
                                    break;
                                case 'gszz':
                                    this.setState({
                                        gszz: 'gszz'
                                    });
                                    break;
                                case 'dlzz':
                                    this.setState({
                                        dlzz: 'dlzz'
                                    });
                                    break;
                                case 'swdjz':
                                    this.setState({
                                        swdjz: 'swdjz'
                                    });
                                    break;
                                case 'ggsmj':
                                    this.setState({
                                        ggsmj: 'ggsmj'
                                    });
                                    break;
                                case 'code':
                                    this.setState({
                                        code: 'code'
                                    });
                                    break;
                            }
                            //for枢波
                            /*
                            let data = {"fileName":fileName};
                            util.postRequest('/upload',data).then(body=>{
                                body.json().then(
                                    json => {
                                        console.log(json)
                                    })
                            })
                            */
                        }else{
                            this.setState({
                                text:'网络异常，请稍后再试',
                                hide:false
                            })
                        }
                    }
                )
            })
        }
    }

    //身份切换改变页面样式
    idChange(e) {
        let val = e.target.value;
        this.setState({
            idType: val
        })
    }

    //三证切换改变页面
    isThreeChange(e) {
        let checked = e.target.checked;
        if (checked) {
            this.setState({
                isThree: 0
            })
        } else {
            this.setState({
                isThree: 1
            })
        }
    }
}

render(
    <Companyinfo />, document.getElementById("companyinfo")
);

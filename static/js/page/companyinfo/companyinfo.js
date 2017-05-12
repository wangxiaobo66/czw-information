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
            hide: true,
            zzFlag:'',
            click:true,
            WXFBSESSIONID:''
        }
    }

    render() {
        let {idType, companyName, isThree, zzjgdmz, gszz, dlzz, swdjz, ggsmj, code, text, hide,zzFlag,click} = this.state;
        return (
            <div className="module-companyinfo">
                <div className="Company">
                    <div className="list">
                        <span className="red">*</span><span>身份选择</span>
                        <select className="status" value={idType} onChange={(e) => this.idChange(e)}>
                            <option value="1">招标代理</option>
                            <option value="2">招标业主</option>
                        </select>
                    </div>
                    <div className="list cl">
                        <span className="red fl">*</span><span className="fl">公司名称</span>
                        <div>
                            <span className="item oh">{companyName}</span>
                            {
                                zzFlag==''?''
                                    :
                                    zzFlag=="F"?
                                        <span className="un-id">(未认证)</span>
                                        :<span className="un-id">(已认证)</span>
                            }

                        </div>

                    </div>
                    {
                        idType == 2 ?
                            <div>
                                <div className={"list" + (ggsmj == "" ? " un-load" : " in-load")}>
                                    <span className="red">*</span><span className="item">公告扫描件（加盖公章）</span>
                                    <div className="btn btn-small" >
                                        <input type="file" className="upload" name="ggsmj"
                                               accept="image/jpeg,image/jpg"
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
                                           accept="image/jpeg,image/jpg"
                                           onChange={(e) => this.isThreeChange(e)}/>
                                </div>
                                {
                                    isThree == 1 ?
                                        <div>
                                            <div className={"list" + (gszz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">工商营业执照</span>
                                                <div className="btn btn-small" >
                                                    <input type="file" className="upload" name="gszz"
                                                           accept="image/jpeg,image/jpg"
                                                           onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (swdjz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">税务登记证</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="swdjz"
                                                       accept="image/jpeg,image/jpg"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (zzjgdmz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">组织机构代码</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="zzjgdmz"
                                                       accept="image/jpeg,image/jpg"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                            <div className={"list" + (dlzz == "" ? " un-load" : " in-load")}>
                                                <span className="red">*</span><span className="item">代理资质</span>
                                                <div className="btn btn-small" >
                                                <input type="file" className="upload" name="dlzz"
                                                       accept="image/jpeg,image/jpg"
                                                       onChange={(e) => this.imageUpload(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={"list" + (code == "" ? " un-load" : " in-load")}>
                                            <span className="red">*</span><span className="item">工商营业执照</span>
                                            <div className="btn btn-small" >
                                            <input type="file" className="upload" name="code"
                                                   accept="image/jpeg,image/jpg"
                                                   onChange={(e) => this.imageUpload(e)}/>
                                            </div>
                                        </div>
                                }
                            </div>
                    }
                    <div className="btn btn-sub" onClick={(e) => this.click(e)}>
                        提交
                    </div>
                    <a className="btn btn-sub" href="/mine">
                        返回
                    </a>
                </div>
                <Capacity text={text} hide={hide} changeHide={(e) => this.changeHide(e)}/>
            </div>
        )
    }

    componentDidMount() {
        //获取WXFBSESSIONID的值
        let WXFBSESSIONID = util.localStorage('get','WXFBSESSIONID');
        console.log(WXFBSESSIONID,"**");
        this.setState({
            WXFBSESSIONID:WXFBSESSIONID
        });
        let _this = this;
        let data = {"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/getState',data).then(body => {
            body.json().then(
                json => {
                    _this.setState({
                        companyName:json.company_name,
                        fId:json.f_id
                    });
                    if(json.zz_id!=null){//有数据 已经上传
                        if(json.id_type==1){//招标代理
                            console.log(1,"招标代理");
                            if(json.is_three==0){//三证合一
                                console.log(1,"三证合一");
                                _this.setState({
                                    idType:1,
                                    isThree:0,
                                    code:json.code
                                })
                            }else{//三证不合一
                                console.log(1,"三证不合一");
                                _this.setState({
                                    idType:1,
                                    isThree:1,
                                    zzjgdmz:json.zzjgdmz,//组织机构证
                                    gszz:json.yyzz,//营业执照
                                    dlzz:json.daili_zz,//代理资质
                                    swdjz:json.swdjz,//税务登记证
                                })
                            }
                        }else if(json.id_type==2){//招标业主
                            console.log(2,"招标业主");
                            _this.setState({
                                idType:2,
                                ggsmj:json.first_info
                            })
                        }
                    }
                    //无数据不用做任何处理
                })
        });
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
                            this.setState({
                               text:'图片上传成功',
                                hide:false
                            });
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
    //点击提交
    click(e){
        let {idType, isThree, zzjgdmz, gszz, dlzz, swdjz, ggsmj, code, text, hide,WXFBSESSIONID,click} = this.state;
        /*
         //004 is_three        bigint(11) NOT NULL DEFAULT '0',   0-表示三证合一  1-表示三证不合一
         //005 code            varchar(200) NULL 三证合一代码
         //006 yyzz            varchar(200) NULL 营业执照 英文+数字 无中文无标点 附件
         //007 zzjgdmz         varchar(200) NULL 组织机构代码证 英文+数字 无中文无标点 附件
         //008 swdjz           varchar(200) NULL 税务登记证 英文+数字 无中文无标点 附件
         //011 id_type         bigint(11) NOT NULL DEFAULT '0' 身份类型  0未知 1招标代理 2招标业主
         //012 daili_zz        varchar(200) NULL 代理资质 英文+数字 无中文无标点 附件
         //014 first_info      varchar(200) NULL 首条公告扫描件 附件(a,html,b.jpg,c.png,)
         */
        let data;
        if(idType==1){//招标代理
            if(isThree==1){//三证合一
                if(dlzz==""){
                    this.setState({
                        text:'请上传代理资质证',
                        hide:false
                    })
                }
                if(zzjgdmz==""){
                    this.setState({
                        text:'请上传组织机构代码证',
                        hide:false
                    })
                }
                if(swdjz==""){
                    this.setState({
                        text:'请上传税务登记证件',
                        hide:false
                    })
                }
                if(gszz==""){
                    this.setState({
                        text:'请上传工商营业执照',
                        hide:false
                    })
                }
                if(dlzz!=""&&zzjgdmz!=""&&swdjz!=""&&gszz!=""){
                    if(click==true){
                        this.setState({
                            click:false
                        });
                        data = {"WXFBSESSIONID":WXFBSESSIONID,"id_type":idType,"is_three":isThree,"code":"","yyzz":gszz+".jpg","zzjgdmz":zzjgdmz+".jpg","swdjz":swdjz+".jpg","daili_zz":dlzz+".jpg","first_info":""};
                        util.postRequest('/upload',data).then(body => {
                            body.json().then(
                                json => {
                                    if(json.status==1){
                                        this.setState({
                                            text:'提交成功',
                                            hide:false,
                                            click:true
                                        })
                                    }else{
                                        this.setState({
                                            text:'网络异常，请稍后再试',
                                            hide:false,
                                            click:true
                                        })
                                    }
                                })
                        })
                    }

                }
            }else{//非三证合一
                if(code==""){
                    this.setState({
                        text:'请上传工商营业执照',
                        hide:false
                    })
                }else{
                    if(click==true) {
                        this.setState({
                            click: false
                        });
                        data = {
                            "WXFBSESSIONID": WXFBSESSIONID,
                            "id_type": idType,
                            "is_three": isThree,
                            "code": code + ".jpg",
                            "yyzz": "",
                            "zzjgdmz": "",
                            "swdjz": "",
                            "daili_zz": "",
                            "first_info": ""
                        };
                        util.postRequest('/upload', data).then(body => {
                            body.json().then(
                                json => {
                                    if (json.status == 1) {
                                        this.setState({
                                            text: '提交成功',
                                            hide: false,
                                            click:true
                                        })
                                    } else {
                                        this.setState({
                                            text: '网络异常，请稍后再试',
                                            hide: false,
                                            click:true
                                        })
                                    }
                                })
                        })
                    }
                }
            }
        }else{//招标业主
            if(ggsmj==""){
                this.setState({
                    text:'请上传公告扫描件',
                    hide:false
                })
            }else{
                if(click==true) {
                    this.setState({
                        click: false
                    });
                    data = {
                        "WXFBSESSIONID": WXFBSESSIONID,
                        "id_type": idType,
                        "is_three": isThree,
                        "code": "",
                        "yyzz": "",
                        "zzjgdmz": "",
                        "swdjz": "",
                        "daili_zz": "",
                        "first_info": ggsmj + ".jpg"
                    };
                    util.postRequest('/upload', data).then(body => {
                        body.json().then(
                            json => {
                                if (json.status == 1) {
                                    this.setState({
                                        text: '提交成功',
                                        hide: false,
                                        click:true
                                    })
                                } else {
                                    this.setState({
                                        text: '网络异常，请稍后再试',
                                        hide: false,
                                        click:true
                                    })
                                }
                            })
                    })
                }
            }
        }
    }
}

render(
    <Companyinfo />, document.getElementById("companyinfo")
);

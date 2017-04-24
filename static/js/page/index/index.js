/**
 * Created by wangxiaobo on 17/2/4.
 */
require('./index.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

//const { Provider, connect } = require('react-redux');
//const { createStore, applyMiddleware } = require('redux');
//const thunk = require('redux-thunk').default;
//const { CZW } = require('../../redux/reducers');

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOne: '',
            echostr:'',
            body:'',
            signature:'',
            timestamp:'',
            nonce:''
        }
    }

    render() {
        let {echostr} = this.state;
        return (
            <div className="module-index">
                <p>{echostr}</p>
            </div>
        )
    }

    componentDidMount() {
        //String body, String signature, String timestamp, String nonce, String echostr
        let theRequest = util.GetRequest();
        if(theRequest.echostr){
            this.setState({
                echostr:theRequest.echostr
            })
        }
        if(theRequest.body){
            this.setState({
                body:theRequest.body
            })
        }
        if(theRequest.signature){
            this.setState({
                body:theRequest.signature
            })
        }
        if(theRequest.timestamp){
            this.setState({
                body:theRequest.timestamp
            })
        }
        if(theRequest.nonce){
            this.setState({
                body:theRequest.nonce
            })
        }
    }

    change(e) {
        let _this = this;
        let xmlhttp = new XMLHttpRequest();
        let formData = new FormData();

        if (!e.target.value) {
            return false
        } else {
            console.log(e.target.files);
            formData.append('watermarkImg', e.target.files[0]);
            console.log(formData);
            fetch('/upload', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01' //接受数据格式
                    // 'Content-Type':'multipart/form-data; charset=UTF-8'//上传文件不指定content-type
                },
                credentials: 'include', //使用cookie  默认不使用cookie
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                let src = '/img' + '?' + data.filename;
                _this.setState({
                    imgOne: src
                });
            })
        }
    }

    imgChange(e) {
        if (e.target.files) {
            //ie
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                e.target.select();
                return document.selection.createRange().text;
            }
            //firefox
            else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (e.target.files) {
                    return e.target.files.item(0).getAsDataURL();
                }
                return e.target.value;
            }
            console.log(e.target.value);
            //return e.target.value;
            this.setState({
                imgOne:e.target.value
            })
        }
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
    <Index />, document.getElementById("index")
);
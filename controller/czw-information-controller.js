/**
 * Created by wangxiaobo on 17/2/4.
 */
var formParse = require('co-busboy');
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var server = 'http://test-wxinfopub.chinabidding.cn/';
var WXFBSESSIONID = 'oGx7pt8VmTwCQ9ghpCyE9DLua-fE';
/*
* username:zhanghaitao
* password:b2YzmSfn1vGkL
* */

module.exports = {
    //测试
    upload:function *(next){
        var parts = formParse(this.request);
        var part;
        while (part = yield parts){
            var filename = part.filename;
            var homeDir = path.resolve(__dirname, '..');
            var newpath = homeDir + '/static/img/'+ filename;
            var stream = fs.createWriteStream(newpath);
            //写入文件流
            part.pipe(stream);
        }
        //var path = this.request.body;
        //var path = this.request.body.files.watermarkImg.path;
        //watermarkImg(path);
        //var name = path.substring(path.lastIndexOf('/')+1,path.length);
        //console.log(name);
            this.body = {
                message:'上传成功',
                filename:filename
            }
    },
    img:function *(next){
        var url = this.request.url;
        var name = url.substring(url.indexOf('?')+1,url.length);
        var img = fs.readFileSync('static/img/'+name);
        this.body = img;
    },
    //开调
    getUser:function *(next){
        var url = server + 'httpserver.wx.Weixin/getUserWxWxfbSession?WXFBSESSIONID=' + WXFBSESSIONID;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = json
    },
    userQuery:function *(next){
        var data = this.request.body;
        var url = server + '/httpserver.member.Regist/check?username=' + data;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = json
    },
    Register:function *(next){
        var data = this.request.body;
        var url = server + '/httpserver.member.Regist/regist?username='+data.username+'&password='+data.password+'&pwd='+data.pwd+'&company='+data.company+'&contact='+data.contact+'&tphone='+data.tphone+'&mphone='+data.mphone+'&email='+data.email;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = json
    },
    binding:function *(next){
        var url = server + '/httpserver.member.Login/getUserZbwWxfbSession?WXFBSESSIONID=' + WXFBSESSIONID;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = json
    }
};
//post请求共用方法
function postFetch(url,data){
    return fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01', //接受数据格式
            'Content-Type': 'application/json; charset=UTF-8', //请求数据格式
        },
        body:JSON.stringify(data)
    }).then(function(res) {
        return res.text();
    }).then(function(body) {
        return body;
    })
        .catch(function(error){
            console.log(error);
        });
}
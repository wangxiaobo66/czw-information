/**
 * Created by wangxiaobo on 17/2/4.
 */
var formParse = require('co-busboy');
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var server = 'http://test-wxinfopub.chinabidding.cn';
var WXFBSESSIONID = 'oGx7pt8VmTwCQ9ghpCyE9DLua-fE';
/*
* username:zhanghaitao
* password:b2YzmSfn1vGkL
* */

module.exports = {
    //测试
    /*
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
    */
    img:function *(next){
        var url = this.request.url;
        var name = url.substring(url.indexOf('?')+1,url.length);
        var img = fs.readFileSync('static/img/'+name);
        this.body = img;
    },
    //开调
    //获取WXFBSESSIONID
    getWXFBSESSIONID:function *(next){
        var data = this.request.body;
        var url = server + '/httpserver.wx.Weixin/getUserWxoAuth2?code='+data.code+'&state=1510';
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
    getUser:function *(next){
        var url = server + '/httpserver.wx.Weixin/getUserWxWxfbSession?WXFBSESSIONID=' + WXFBSESSIONID;
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
    getUserMine:function *(next){
        var url = server + '/httpserver.member.Login/getUserZbwWxfbSession?WXFBSESSIONID='+WXFBSESSIONID;
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
    unLogin:function *(next){
        var url = server + '/httpserver.member.Login/unlogin?WXFBSESSIONID='+WXFBSESSIONID;
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
    tongJi:function *(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/tongji?WXFBSESSIONID='+WXFBSESSIONID+'&time='+data.time;
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
        var url = server + '/httpserver.member.Regist/check?username=' + data.username;
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
        var url = server + '/httpserver.member.Regist/regist?username='+data.username+'&password='+data.password+'&pwd='+data.passwordAgain+'&company='+data.company+'&contact='+data.contact+'&tphone='+data.tphone+'&mphone='+data.tel+'&email='+data.email;
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
        var data = this.request.body;
        var url = server + '/httpserver.member.Login/login3?username='+data.username+'&real_name='+data.realName+'&tel='+data.tel+'&zhiwei='+data.select+'&email='+data.email+'&WXFBSESSIONID=' + WXFBSESSIONID;
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
    login:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.member.Login/login?username='+data.username+'&password='+data.password+'&WXFBSESSIONID=' + WXFBSESSIONID;
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
    getState:function*(next){
        var url  = server + '/httpserver.member.Other/getUserZzWxfbSession?WXFBSESSIONID='+WXFBSESSIONID;
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
    uploadMy:function*(next){//给自己

        var file = this.request.body;
        var files = file.files;
        var str = printObject(files);
        var attr = str.split(':');
        var attrs = attr[0].split('_');
        var oldPath = file.files[attr[0]].path;

        var filePath = '../data/file/company/zz/'+attrs[0]+'/'+attrs[1]+'/';
        var newPath = '../data/file/company/zz/'+attrs[0]+'/'+attrs[1]+'/'+attrs[1]+'.jpg';
        createFolder(newPath);

        var Attrs = fs.readdirSync(filePath);
        if(Attrs.length == 0){
            fs.renameSync(oldPath, newPath)
        }else{
            fs.unlinkSync(newPath);
            var newPath = '../data/file/company/zz/'+attrs[0]+'/'+attrs[1]+'/'+attrs[1]+'.jpg';
            fs.renameSync(oldPath, newPath)
        }
        this.body={status:'1'};
       /*另一种方法
        var parts = formParse(this.request);
        var part;
        var _this = this;
        while (part = yield parts){
            console.log(typeof part,'**');
            var attr = part.fieldname.split('_');
            var filePath = '../data/file/company/zz/'+attr[0]+'/'+attr[1]+'/';

            var newpath = '../data/file/company/zz/'+attr[0]+'/'+attr[1]+'/'+attr[1]+'.jpg';
            createFolder(newpath);

            var attrs = fs.readdirSync(filePath);

            if(attrs.length == 0){
                var stream = fs.createWriteStream(newpath);
                //写入文件路径
                part.pipe(stream);
                _this.body = {status:1};
            }else{
                fs.unlinkSync(newpath);
                var newpath = '../data/file/company/zz/'+attr[0]+'/'+attr[1]+'/'+attr[1]+'.jpg';
                createFolder(newpath);
                var stream = fs.createWriteStream(newpath);
                //写入文件路径
                part.pipe(stream);
                _this.body = {status:1};
            }
        }
        */

    },
    upload:function*(next){//给枢波
        //data = {"id_type":idType,"is_three":isThree,"code":code+".jpg","yyzz":"","zzjgdmz":"","swdjz":"","daili_zz":"","first_info":""};
        var data = this.request.body;
        var url = server + '/httpserver.member.Other/setZizhi?WXFBSESSIONID='+WXFBSESSIONID+'&is_three='+data.is_three+'&id_type='+data.id_type+'&code='+data.code+'&yyzz='+data.yyzz+'&zzjgdmz='+data.zzjgdmz+'&swdjz='+data.swdjz+'&daili_zz='+data.daili_zz+'&first_info='+data.first_info;
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
    messageList:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/getMoreInfoOneMember?type='+data.type+'&page='+data.page+'&rp='+data.rp+'&WXFBSESSIONID='+WXFBSESSIONID;
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
    messageDetails:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/getOneInfoOneMember?WXFBSESSIONID='+WXFBSESSIONID+'&id='+data.id;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json;
        if(result==""){
            json = {"state":""};
        }else{
            json = yield JSON.parse(result);
        }
        this.body = json
    },
    messageDelete:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/delOneInfoOneMember?WXFBSESSIONID='+WXFBSESSIONID+'&id='+data.id;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json;
        if(result=="ok"){
            json = {"state":"ok"}
        }else{
            json = {"state":""}
        }
        this.body = json
    },
    getRelation:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/getRelationZbgs?WXFBSESSIONID='+WXFBSESSIONID+'&id_zbgg='+data.id;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        console.log(result);
        var json;
        if(result==""){
            json = {"state":""};
        }else{
            json = {"state":result};
        }
        this.body = json
    },
    relation:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/relationZbgs?WXFBSESSIONID='+WXFBSESSIONID+'&id_zbgg='+data.zbggId+'&id_zbgs='+data.zbgsId;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json;
        if(result=="ok"){
            json = {"state":"ok"}
        }else{
            json = {"state":""}
        }
        this.body = json
    },
    unRelation:function*(next){
        var data = this.request.body;
        var url = server + '/httpserver.info.Info/unrelationZbgs?WXFBSESSIONID='+WXFBSESSIONID+'&id_zbgg='+data.zbggId+'&id_zbgs='+data.zbgsId;
        var result = yield postFetch(url).then(
            body =>{
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json;
        if(result=="ok"){
            json = {"state":"ok"}
        }else{
            json = {"state":""}
        }
        this.body = json
    },
};
/*
 /httpserver.info.Info/relationZbgs?WXFBSESSIONID=&id_zbgg=&id_zbgs=    参数一为原招标公告id  参数二为中标公告id  关联接口 用户直接填写被关联的id号查询
 /httpserver.info.Info/unrelationZbgs?WXFBSESSIONID=&id_zbgg=&id_zbgs=  参数一为原招标公告id  参数二为中标公告id  取消关联接口
 /httpserver.info.Info/getRelationZbgs?WXFBSESSIONID=&id_zbgg=          参数一为原招标公告id  查询此招标公告是否有关联的中标接口
 我想了这仨接口 你看看你能用不
 */

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
//
var createFolder = function(to) { //文件写入
    var sep = path.sep;
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};

function printObject(obj){
    var temp = "";
    for(var i in obj){//用javascript的for/in循环遍历对象的属性
        temp += i+":"+obj[i]+"\n";
    }
    return temp;//结果：cid:C0 \n ctext:区县
}
/**
 * Created by wangxiaobo on 17/2/4.
 */
var formParse = require('co-busboy');
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');

module.exports = {
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
    }
};
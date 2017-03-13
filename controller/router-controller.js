/**
 * Created by wangxiaobo on 17/2/4.
 */
var views = require('co-views');
var render = views(__dirname,{map: {html: 'swig'}});

module.exports = {
    index: function *(next) {//首页
        this.body = yield render('../dist/template/index.html');
    },
    login: function *(next) {//登陆
        this.body = yield render('../dist/template/login.html');
    },
    register: function *(next) {//注册
        this.body = yield render('../dist/template/register.html');
    },
    companyinfo: function *(next) {//公司信息
        this.body = yield render('../dist/template/companyinfo.html');
    },
    management: function *(next){//信息管理
        this.body = yield  render('../dist/template/management.html');
    },
    mine: function *(next){//我的
        this.body = yield  render('../dist/template/mine.html');
    },
    binding: function *(next){//微信绑定
        this.body = yield  render('../dist/template/binding.html');
    }
};
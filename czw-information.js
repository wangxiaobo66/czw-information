/**
 * Created by wangxiaobo on 17/1/24.
 */
var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
var Router = require('koa-router');
var czwInformationController = require('./controller/czw-information-controller');
var routerController = require('./controller/router-controller');
var koaBody = require('koa-body')();
var path = require('path');
var staticCache = require('koa-static-cache');//静态文件

//页面配置
router.get('/',routerController.index);//首页测试用
router.get('/login',routerController.login);//登陆
router.get('/register',routerController.register);//注册
router.get('/companyinfo',routerController.companyinfo);//公司信息
router.get('/management',routerController.management);//信息管理
router.get('/mine',routerController.mine);//我的
router.get('/binding',routerController.binding);//微信绑定

//接口配置
router.post('/upload',koaBody,czwInformationController.upload);//上传图片接口
router.get('/img',czwInformationController.img);//预览图片接口

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(staticCache(path.join(__dirname, 'dist/'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    dynamic: true,
    // buffer: true,
    // prefix: 'static',
    usePrecompiledGzip: true
}));

app.listen(10002);
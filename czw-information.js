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
router.get('/',routerController.index);//首页

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
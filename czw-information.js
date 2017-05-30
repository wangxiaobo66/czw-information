/**
 * Created by wangxiaobo on 17/1/24.
 */
var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
var Router = require('koa-router');
var czwInformationController = require('./controller/czw-information-controller');
var routerController = require('./controller/router-controller');
var koaBody = require('koa-body')({
    multipart: true
});
var path = require('path');
var staticCache = require('koa-static-cache');//静态文件

//页面配置
router.get('/in',routerController.index);//测试
router.get('/login',routerController.login);//登陆
router.get('/register',routerController.register);//注册
router.get('/companyinfo',routerController.companyinfo);//公司信息
router.get('/management',routerController.management);//信息管理
router.get('/mine',routerController.mine);//我的
router.get('/binding',routerController.binding);//微信绑定
router.get('/announce',routerController.announce);//信息发布导视

//接口配置
//测试
//router.post('/upload',koaBody,czwInformationController.upload);//上传图片接口
router.get('/img',czwInformationController.img);//预览图片接口
//开整
router.post('/getWXFBSESSIONID',koaBody,czwInformationController.getWXFBSESSIONID);//获取WXFBSESSIONID信息
router.post('/getUser',koaBody,czwInformationController.getUser);//获取用户信息
router.post('/userQuery',koaBody,czwInformationController.userQuery);//查询采招网账户是否可用
router.post('/Register',koaBody,czwInformationController.Register);//注册到采招网,并保存到数据库
router.post('/login',koaBody,czwInformationController.login);//用父账号登录
router.post('/binding',koaBody,czwInformationController.binding);//子账号与父账号相关联
router.post('/upload',koaBody,czwInformationController.upload);//上传相关图片（给枢波）
router.post('/uploadMy',koaBody,czwInformationController.uploadMy);//上传图片存入服务器指定位置（for me）
router.post('/getState',koaBody,czwInformationController.getState);//获取公司状态
router.post('/messageList',koaBody,czwInformationController.messageList);//信息管理列表
router.post('/messageDetails',koaBody,czwInformationController.messageDetails);//单条信息查看
router.post('/messageDelete',koaBody,czwInformationController.messageDelete);//单条信息删除
router.post('/getRelation',koaBody,czwInformationController.getRelation);//查看公告是否关联
router.post('/relation',koaBody,czwInformationController.relation);//关联
router.post('/unRelation',koaBody,czwInformationController.unRelation);//取消关联
router.post('/getUserMine',koaBody,czwInformationController.getUserMine);//获取个人信息
router.post('/unLogin',koaBody,czwInformationController.unLogin);//解绑微信
router.post('/tongJi',koaBody,czwInformationController.tongJi);//统计信息/httpserver.info.Info/tongji?WXFBSESSIONID=&time=   time -1 表示全部 0当月-自然月 1上一个月-自然月 2上上一个月自然月   12 ,往前数第12个自然月 没有其它值 默认为0 当月统计
//统计接口 按月 招标 中标 采购   创建时间?  发布日期     1010 1020 2000
router.post('/tongji2',koaBody,czwInformationController.tongji2);
router.post('/setSendMobanEmail',koaBody,czwInformationController.setSendMobanEmail);//发送邮件模版接口

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
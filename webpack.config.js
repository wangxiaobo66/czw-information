/**
 * Created by wangxiaobo on 16/11/18.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'index': ['./static/js/page/index/index.js'],//首页
        'login': ['./static/js/page/login/login.js'],//登陆
        'register': ['./static/js/page/register/register.js'],//注册
        'companyinfo': ['./static/js/page/companyinfo/companyinfo.js'],//公司信息
        'management': ['./static/js/page/management/management.js'],//信息管理
        'mine': ['./static/js/page/mine/mine.js'],//我的
        'binding': ['./static/js/page/binding/binding.js'],//微信绑定
        'ann':['./static/js/page/ann/ann.js']
    },
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "",
        chunkFilename: "[name].chunk.js",
        externals: [
            {
                'es5-shim': true,
                'es5-sham': true
            }
        ]
    },
    externals:{
        'react':'React',
        'react-dom':'ReactDOM',
        'redux':'Redux',
        'react-redux':'ReactRedux'
    },
    module: {
        resolve: {
            root: path.resolve('static'),
            modulesDirectorie: ['node_modules'],
            extensions: ['', '.js', '.css', '.scss', '.png', '.jpg']
        },
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                loaders: ['url-loader?limit=1000&name=[path][name][hash:8].[ext]', 'img?minimize']
            },
            {
                test: /\.(scss|css)/,
                loaders: ['style', 'css', 'sass']
            },
            //{test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/, /js\/lib/]}
        ],
        noParse: ['react', 'react-dom' , 'redux', 'react-redux'],
        plugins: []
    }
};
/**
 * Created by wangxiaobo on 17/2/4.
 */
const path = require('path');
const gulp = require('gulp');
const scp = require('gulp-scp2');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const rev = require('gulp-rev');
const webpackConfig = require('./webpack.config.js');
//图片路径
const imgPath = '/data/upload';
/*向服务器提交*/
var host = '139.198.1.219',
    username = 'misoar',
    password = 'vYwme_kitjpiqmqrclemc6kqccSysn1k',
    dest = '/app/czw-information',
    port = 22004;
/**/
gulp.task('distJs', function () {
    'use strict';
    return gulp.src('./static/js/page/**/*.js')
        .pipe(webpack(webpackConfig))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('distImg', function () {
    'use strict';
    return gulp.src('./static/img/*')
        .pipe(gulp.dest('./dist/img'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('distThird', function () {
    'use strict';
    return gulp.src('./static/js/third/*')
        .pipe(gulp.dest('./dist/js'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('distHtml', function () {
    'use strict';
    return gulp.src('./template/*')
        .pipe(gulp.dest('./dist/template'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('distCss', function () {
    'use strict';
    return gulp.src('./static/css/*')
        .pipe(gulp.dest('./dist/css'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('distFont',function (){
    'use strict';
    return gulp.src('./static/font/*')
        .pipe(gulp.dest('./dist/font'))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('appText', ['distJs', 'distImg','distThird','distHtml','distCss','distFont']);

gulp.task('server',function(){
    'use strict';
    return gulp.src(['./dist/**/*','./controller/*','czw-information.js','package.json'])
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: dest,
            port:port
        }))
        .on('error', function(err) {
            console.log(err);
        });
});
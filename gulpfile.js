/**
 * Created by wangxiaobo on 17/2/4.
 */
const path = require('path');
const gulp = require('gulp');
const scp = require('gulp-scp2');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const watch = require('gulp-watch');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const clean = require('gulp-clean');
const webpackConfig = require('./webpack.config.js');

//图片路径
const imgPath = '/data/upload';
/*向服务器提交*/
var host = '39.107.107.129',
    username = 'ops',
    password = '94gcumhvfpkmJtdMifptelrwz&nlofao',
    dest = '/data/service/czw-information',
    port = 22001;
/**/
gulp.task('distJs',['clean'], function () {
    'use strict';
    return gulp.src('./static/js/page/**/*.js')
        .pipe(webpack(webpackConfig))
        //.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./controller/'))
        .on('error', function (err) {
            console.log(err);
        });
});
gulp.task('clean',function(){
    'use strict';
        gulp.src('./dist/js/')
            .pipe(clean({force: true}))
});
gulp.task('revC',function(){
    'use strict';
    gulp.src(['./controller/*.json','dist/template/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/template/'))
});
gulp.task('rev',function(){
    'use strict';
    gulp.src(['dist/js/*'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./controller/'))

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
        .pipe(gulp.dest('./dist/third/'))
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

//js
gulp.task('watchJs',function(){
    var watcher = gulp.watch('./static/js/page/**/*.js',['distJs']);
    watcher.on('change', function(event) {
        console.log('finished');
    });
});

gulp.task('appText', ['distJs', 'distImg','distHtml','distThird','distCss','distFont']);

gulp.task('server',['revC'],function(){
    'use strict';
    return gulp.src(['./**/*','!./node_modules/**/*','!./static/**/*','!./template/**/*','!./.gitignore','!./README.md','!./gulpfile.js','!./webpack.config.js'])
    //return gulp.src(['./dist/**/*','./controller/*','czw-information.js','package.json'])
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
gulp.task('serverPart',['revC'],function(){
    'use strict';
    return gulp.src(['./**/*','!./node_modules/**/*','!./static/**/*','!./template/**/*','!./.gitignore','!./README.md','!./gulpfile.js','!./webpack.config.js','!./dist/css/**/*','!./dist/font/**/*','!./dist/img/**/*','!./dist/third/**/*'])
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
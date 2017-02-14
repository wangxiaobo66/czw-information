/**
 * Created by wangxiaobo on 17/2/4.
 */
const path = require('path');
const gulp = require('gulp');
const scp = require('gulp-scp2');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');

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
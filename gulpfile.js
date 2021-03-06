'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var reload = browserSync.reload;


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});


var path = {
    build: {
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/poem.js',
        style: 'src/sass/main.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.scss'
    },
    clean: './build'
};

gulp.task('js:build', function(){
        gulp.src(path.src.js)
        //.pipe(jshint())
        .pipe(jshint({
            // these directives can
            // be found in the official
            // JSLint documentation.
            node: true,
            nomen: true,

            // you can also set global
            // declarations for all source
            // files like so:
            globals: [{"$":false}],
            predef: []

            // both ways will achieve the
            // same result; predef will be
            // given priority because it is
            // promoted by JSLint
        }))

        // pass in your prefered reporter like so:
        .pipe(jshint.reporter('default', true))
        //.pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});


gulp.task('sass', function(){
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .on('end', function() {
        })
        .pipe(reload({stream: true}));
});

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});


gulp.task('sass:watch', function(){
    gulp.watch(path.watch.style,['sass'])
});

gulp.task('html:watch', function(){
    gulp.watch(path.watch.html,['html:' + 'build'])
});

gulp.task('js:watch', function(){
    gulp.watch(path.watch.js,['js:' + 'build'])
});

gulp.task('mocha:watch', function() {
      gulp.watch(['lib/**', 'test/**'], ['mocha']);
});


gulp.task('default', ['sass','js:build','sass:watch','html:build','html:watch','js:watch', 'mocha', 'mocha:watch']);
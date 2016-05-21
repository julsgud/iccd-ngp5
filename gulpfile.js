'use strict';

var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');

// files
var js = 'app/**/*.js';
var views = 'app/**/*.html';
var css = 'app/styles/main.css';

// error handling
var interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments);

    // notify on errors
    notify.onError({
        title: 'Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // end when done
    this.emit('end');
};


// processing your files
gulp.task('browserify', ['views'], function() {
    return browserify('./app/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('views', function() {
    return gulp.src(views)
        .pipe(templateCache({standalone: true}))
        .on('error', interceptErrors)
        .pipe(rename('app.templates.js'))
        .pipe(gulp.dest('./app/config/'));
});

gulp.task('html', function() {
    return gulp.src('app/index.html')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('css', function() {
    return gulp.src('app/styles/main.css')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build'));
});

// ready for dist?! run build
gulp.task('build', ['css', 'html', 'browserify'], function() {
    var html = gulp.src('build/index.html')
                .pipe(gulp.dest('./dist/'));
    var js = gulp.src('build/app.js')
                .pipe(uglify())
                .pipe(gulp.dest('./dist/'));
    var css = gulp.src('build/app.js')
                .pipe(gulp.dest('./dist/'));

    return merge(css, html, js);
});

// run gulp
gulp.task('default', ['css', 'html', 'browserify'], function() {
    browserSync.init(['./build/**/**.**'], {
        server: './build',
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

    gulp.watch('app/index.html', ['html']);
    gulp.watch(views, ['views']);
    gulp.watch(js, ['browserify']);
    gulp.watch(css, ['css', 'browserify'])
});
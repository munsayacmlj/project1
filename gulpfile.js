var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

var sassSrc = 'app/scss/';
var imageSrc = 'app/images/';

gulp.task('sass', function(){
    return gulp.src(sassSrc + '**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('images', function(){
    return gulp.src(imageSrc + '**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin({
        interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', ['browserSync', 'sass'],function(){
    gulp.watch(sassSrc + '**/*.scss', ['sass']);
});


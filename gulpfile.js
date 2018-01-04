var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCss = require('gulp-clean-css');

/*Source Variables*/
var sassSrc = 'app/scss/';
var imageSrc = 'app/images/';
var fontsSrc = 'app/fonts/';


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

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
    return gulp.src(imageSrc + '**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function(){
    return gulp.src(fontsSrc + '**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function(){
    return del.sync('dist');
});

gulp.task('build', function(callback){
    runSequence('clean:dist', ['sass', 'images', 'fonts'], callback)
});

gulp.task('default', function(callback){
    runSequence(['sass', 'browserSync', 'watch'], callback)
});

gulp.task('watch', ['browserSync', 'sass'],function(){
    gulp.watch(sassSrc + '**/*.scss', ['sass']);
});

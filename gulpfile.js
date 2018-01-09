// Require plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

/*Global Variables*/
var sassSrc = [
    'app/scss/',
    'node_modules/bootstrap/scss/',
    'node_modules/font-awesome/scss/',
];
var imageSrc = 'app/images/**/*.+(png|jpg|gif|svg)';
var fontsSrc = 'app/fonts/';
var htmlSrc = 'app/pages/*.html';
var jsSrc = [
    'app/js/*.js',
    'app/bootstrap/js/bootstrap.bundle.js',
    'app/bootstrap/js/bootstrap.js'
];
var dataJSON = './app/data.json';
var htmlDist = 'dist/';
var imgDist = 'dist/images';
var jsDist = 'dist/js';
var cssDist = 'dist/css';

// Compile html

gulp.task('html', function () {
    return gulp.src(htmlSrc)
        .pipe(data(function () {
            return require(dataJSON)
        }))
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(gulp.dest(htmlDist));
});


// Compile SASS

gulp.task('sass', function () {
    return gulp.src(sassSrc[0] + '**/*.scss')
        .pipe(sass({
            includePaths: sassSrc,
            outputStyle: 'expanded'
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest(cssDist))
});

//Optimize images
gulp.task('images', function () {
    var options = {
        verbose: true
    }
    return gulp.src(imageSrc)
        .pipe(cache(imagemin([
                imagemin.gifsicle({
                interlaced: true
            }),
                imageminMozjpeg({
                quality: 100
            }),
                imageminPngquant({
                quality: 100
            }),
//                imagemin.svgo({
//                plugins: [
//                    {
//                        removeViewBox: true
//                    },
//                    {
//                        cleanupIDs: false
//                    }
//                    ]
//            })

        ], options)))
        .pipe(gulp.dest(imgDist));
});

//gulp.task('images', function () {
//    return gulp.src(imageSrc)
//        .pipe(imagemin({
//            progressive: true
//        }))
//        .pipe(gulp.dest(imgDist));
//});

// Concat js files
gulp.task('js', function () {
    return gulp.src(jsSrc)
        .pipe(changed(jsDist))
        .pipe(gulp.dest(jsDist));
});



//gulp.task('nunjucks', function () {
//    // Gets .html and .nunjucks files in pages folder
//    return gulp.src('app/pages/**/*.+(html|nunjucks)')
//
//        // Adding data to Nunjucks
//        .pipe(data(function () {
//            return require('./app/data.json')
//        }))
//
//        // Renders template with nunjucks
//        .pipe(nunjucksRender({
//            path: ['app/templates']
//        }))
//
//        // output files in app folder
//        .pipe(gulp.dest('app'))
//        .pipe(browserSync.stream())
//});


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    })
});

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});



gulp.task('fonts', function () {
    return gulp.src(fontsSrc + '**/*')
        .pipe(gulp.dest('dist/fonts'))
});



gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', function (callback) {
    runSequence('clean', ['sass', 'html', 'images', 'fonts', 'js'], callback)
});


gulp.task('watch', ['browserSync', 'sass', 'html', 'js'], function () {
    // Watch SASS
    gulp.watch('app/scss/**/*.scss', ['sass', browserSync.reload]);
    // Watch html
    gulp.watch('app/**/*.html', ['html', browserSync.reload]);
    //Watch js
    gulp.watch('app/js/*.js', ['js', browserSync.reload]);
    

});

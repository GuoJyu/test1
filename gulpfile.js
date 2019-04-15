const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const mincss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const image = require('gulp-imagemin');
//编译sass
gulp.task('sass', () => {
        return gulp.src('./src/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./bulid/css'))
    })
    //es6>es5
gulp.task('devJs', () => {
        return gulp.src('./src/js/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']

            }))
            .pipe(gulp.deat('./bulid/js'))
    })
    //压缩html
gulp.task('htmls', () => {
        return gulp.src('./src/**/.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest('./bulid'))
    })
    //watch监听
gulp.task('watching', () => {
        return gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js', './src/**/.html'], gulp.series('sass', 'devJS', 'htmls'))

    })
    //起服务
gulp.task('server', () => {
        return gulp.src('./bulid')
            .pipe(webserver({
                port: 8080,
                livereload: true,
                middleware(req, res, next) {
                    let { pathname, query } = url.parse(req, res, next)
                    if (pathname === '/favicon.ico') {
                        return res.end('');
                    }
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    if (pathname === '/api/getData') {
                        res.end(JSON.stringify(data));
                    } else {
                        res.end(readFileSync(join(__dirname, 'src', pathname)))
                    }
                }
            }))
    })
    //同步执行编译静态文件
gulp.task('default', gulp.series('sass', 'devJS', 'htmls', 'server', 'watching'));
//压缩scc
gulp.task('zipcss', () => {
        return gulp.src('./src/css/**/*.css')
            .pipe(mincss())
            .pipe(gulp.dest('./bulid/css'))
    })
    //压缩js
gulp.task('zipjs', () => {
        return gulp.src('./src/js/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./bulid/js'))
    })
    //压缩html
gulp.task('minhtml', () => {
        return gulp.src('./src/**/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest('./bulid'))
    })
    //压缩图片
gulp.task('img', () => {
        return gulp.src('./src/images/**/*')
            .pipe(image())
            .pipe(gulp.dest('./bulid/img'))
    })
    //异步执行
gulp.task('bulid', gulp.parallel('zipjs', 'zipcss', 'htmlmin', 'img'))
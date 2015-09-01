var gulp = require('gulp');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    scripts: ['src/*.js'],
    css: ['src/*.scss']
};

gulp.task('sass', function () {
    gulp.src('src/*.scss')
        .pipe(changed('./dist'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("rodal.css"))
        .pipe(gulp.dest('./dist'))
        .pipe(csso())
        .pipe(rename("rodal.min.css"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jsx', function () {
    gulp.src('src/*.js')
        .pipe(changed('./dist'))
        .pipe(babel())
        .pipe(rename("rodal.js"))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename("rodal.min.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['jsx']);
    gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['watch', 'jsx', 'sass']);
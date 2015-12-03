var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require("gulp-babel");
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    gulp.src('src/*.scss')
        .pipe(changed('./dist'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('babel', function () {
    gulp.src('src/*.js')
        .pipe(changed('./dist'))
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
    gulp.watch(['src/*.js'], ['babel']);
    gulp.watch(['src/*.scss'], ['sass']);
});

gulp.task('default', ['watch', 'babel', 'sass']);
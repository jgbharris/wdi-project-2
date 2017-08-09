const gulp        = require('gulp');
const sass        = require('gulp-sass');
const nodemon     = require('gulp-nodemon');
const babel       = require('gulp-babel');
const cleanCSS    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('public/css'));
});

gulp.task('serve', ['js', 'sass'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 8000,
    files: ['public/**/*.*'],
    reloadDelay: 500
  });

  return nodemon({ script: 'index.js'})
  .on('start', () => browserSync.reload());
});

gulp.task('default', ['sass', 'js', 'serve'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('views/**/*.ejs', browserSync.reload);
});

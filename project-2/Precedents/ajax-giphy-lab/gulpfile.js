const gulp        = require('gulp');
const sass        = require('gulp-sass');
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

gulp.task('images', () => {
  return gulp.src('src/images/*.{jpg,jpeg,png,gif,svg}')
    .pipe(gulp.dest('public/images'));
});

gulp.task('serve', ['js', 'sass'], () => {
  browserSync.init({
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
    reloadDelay: 500,
    server: { baseDir: './' }
  });
});

gulp.task('default', ['sass', 'js', 'images', 'serve'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/images/**/*.{jpg,jpeg,png,gif,svg}', ['images']);
  gulp.watch('views/**/*.ejs', browserSync.reload);
});

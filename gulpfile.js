'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config')
const browserSync = require('browser-sync')

// const distdir = process.env.NODE_ENV === 'development' ? './dist/dev' : './dist/prod'
const distdir = './dist/dev'

gulp.task('default', () => {
  browserSync({
    server: {
      baseDir: './dist/dev'
    },
    ghostMode: false,
    notify: false
  })
  gulp.watch(['src/js/**'], gulp.series('js', 'browserReload'))
  gulp.watch('src/pug/**', gulp.series('pug', 'browserReload'))
  gulp.watch('src/sass/**', gulp.series('sass'))
})

gulp.task('js', done => {
  gulp
    .src('js/src/*.js')
    .pipe(plumber())
    .pipe(
      webpackStream(webpackConfig, webpack).on('error', function (e) {
        this.emit('end')
      })
    )
    .pipe(gulp.dest(distdir))
    .on('end', done)
})

gulp.task('pug', done => {
  gulp
    .src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(distdir))
    .on('end', done)
})

gulp.task('sass', done => {
  gulp
    .src('src/sass/index.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(`${distdir}/style`))
    .on('end', done)
})

gulp.task('browserReload', done => {
  browserSync.reload()
  done()
})

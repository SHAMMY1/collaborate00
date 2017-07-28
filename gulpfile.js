const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

gulp.task('default', () => {
    require('./server');
});

gulp.task('dev', ['browser-sync'], () => { });

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: ['views/**/*.*', 'public/**/*.*'],
        browser: 'chrome',
        port: 3001,
        ui: {
            port: 3002,
        },
    });
});

gulp.task('nodemon', (cb) => {
    let started = false;

    return nodemon({
        script: 'server.js',
        ext: 'js',
        execMap: {
            js: 'node --inspect',
        },
        ignore: ['node_modules', 'public'],
        env: {
            NODE_ENV: 'development',
        },
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', () => {
        setTimeout(() => {
            browserSync.reload();
        }, 2700);
    });
});


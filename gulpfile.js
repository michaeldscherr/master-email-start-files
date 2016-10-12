const gulp = require('gulp');
const pug = require('gulp-pug');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

const baseDir = __dirname;
const srcDir = `${baseDir}/src`;
const publicDir = `${baseDir}/public`;

function errorHandler(error) {
    gutil.log(error.message);
    this.emit('end');
}

function initBS() {
    browserSync.init({
        server: publicDir,
        logLevel: 'info',
        logConnections: false,
        logFileChanges: false,
        logSnippet: true,
        open: false,
    });
}

gulp.task('templates', [], () => {
    gulp.src(`${srcDir}/templates/index.pug`)
        .pipe(pug({
            data: require(`${srcDir}/templates/data.json`),
            pretty: true,
            baseDir,
        })).on('error', errorHandler)
        .pipe(gulp.dest(publicDir))
        .pipe(browserSync.stream({ match: '**/*.html' }));
});

gulp.task('default', ['templates']);

gulp.task('watch', ['default'], () => {
    if (gutil.env.bs) {
        initBS();
    }
    gulp.watch([
        `${srcDir}/**/**.{pug,css}`,
    ], ['templates']);
});

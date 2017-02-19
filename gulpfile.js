const gulp = require('gulp'),

    browserSync = require('browser-sync'),
    fs = require('fs'),
    glob = require('glob'),
    data = require('gulp-data'),
    foreach = require('gulp-foreach'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    twig = require('gulp-twig'),
    path = require('path'),
    runSequence = require('run-sequence');

/* browsersync */
gulp.task('browserSync:init', function() {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'front-end-progress.html'
        }
    })
});

function getJsonData (file, cb) {
    glob('src/front_end_progress*.json', {}, function(err, files) {
        var data = {};
        if (files.length) {
            files.forEach(function(fPath){
                var baseName = path.basename(fPath, '.json');
                data[baseName] = JSON.parse(fs.readFileSync(fPath));
            });
        }
        cb(undefined, data);
    });
}

gulp.task('front-end-progress:compile',function(){
    return gulp.src('./src/*.{twig,html}')
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(data(getJsonData))
        .pipe(foreach(function(stream,file){
            return stream
                .pipe(twig())
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('front-end-progress:update',['front-end-progress:compile'],browserSync.reload);

gulp.task('front-end-progress',function(){
    runSequence('front-end-progress','browserSync:init')
    gulp.watch('./src/*',['front-end-progress:update']);
});
// shortcut
gulp.task('progress',['front-end-progress']);

// shortcut for when this is the only task
gulp.task('default',['front-end-progress']);
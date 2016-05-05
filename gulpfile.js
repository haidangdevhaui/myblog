'use strict'
var gulp = require('gulp') ,
    nodemon = require('gulp-nodemon'),
    config = require('./config/config');

gulp.task('default' , function() {
    nodemon({
        script : 'server.js' ,
        ext : 'js' ,
        ignore: ['client/*.js', 't.js'],
        env : {
            PORT : config.port
        }
    })
        .on('restart' , function() {
            console.log('Restarting...')
        })
});
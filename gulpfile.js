var gulp = require('gulp'), 
		sass = require('gulp-sass'), 
		sourcemaps = require('gulp-sourcemaps'), 
		connect = require('gulp-connect-php')
		browserSync = require('browser-sync').create();

//Source Paths
var srcpath = {
		'base'		: './src/**/*.+(php|html)',
		'scripts' : './src/js/**/*.js',
		'styles'  : './src/scss/**/*.scss',
		'images'  : './src/img/**/*.*',
		'fonts'		: './src/fonts/**/*.*'
};

//Distribution Paths
var distpath = {
		'base'		: './dist/',
		'scripts' : './dist/js/**/*',
		'styles'  : './dist/css/',
		'images'  : './dist/img/**/*',
		'fonts'		: './dist/fonts/'
};

// Copy Static Assets
gulp.task('static', function(){
	var fonts = gulp.src(srcpath.fonts).pipe(gulp.dest(distpath.fonts));
	var files = gulp.src(srcpath.base).pipe(gulp.dest(distpath.base));
	return [fonts, files];
});


// Sass & Sourcemaps
gulp.task('sass', function(){
	return gulp.src(srcpath.styles)
				.pipe(sourcemaps.init())
				.pipe(sass())
				.pipe(sourcemaps.write(distpath.styles+'/maps'))
				.pipe(gulp.dest(distpath.styles))
				.pipe(browserSync.reload({
		      stream: true
		    }))
});

// BrowserSync Server
gulp.task('browserSync',['static'],function(){
	browserSync.init({
		server: {
			proxy : 'localhost:8000',
			baseDir: 'dist'
		},
	});
});




// Watchers 
gulp.task('watch', ['browserSync'], function(){
	gulp.watch(srcpath.styles, ['sass']);
});


gulp.task('default', function(){
	console.log('hello world!');
});

const gulp = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');

var paths = {
	styles: {
		src: 'css/*.css',
		dest: 'css/dest'
	},
	pugs: {
		src: './pug/*.pug',
		dest: './'
	}
};

function styles() {
	return gulp.src(paths.styles.src).pipe(concat('style.css')).pipe(gulp.dest(paths.styles.dest));
}

function pugs() {
	return gulp
		.src(paths.pugs.src)
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(gulp.dest(paths.pugs.dest));
}

function watch() {
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.pugs.src, pugs);
}

const build = gulp.series(gulp.parallel(pugs, styles));

exports.styles = styles;
exports.pugs = pugs;
exports.watch = watch;
exports.build = build;

exports.default = build;

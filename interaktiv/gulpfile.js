const {src, dest} = require('gulp');
const pug = require('gulp-pug');

function usePug() {
	return src('./pug/*.pug')
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(dest('./'));
}

exports.usePug = usePug;

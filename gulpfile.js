const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'esm',
  },
  styles: 'src/**/*.less',
  scripts: ['src/**/*.{js,jsx}'],
};

/**
 * 编译脚本文件
 */
const compile = () => {
  return gulp
    .src(paths.scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm))
}

/**
 * 复制样式
 */
const copyLess = () => {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

const stylelint = () => {
  const gulpStylelint = require('gulp-stylelint');
  return gulp.src(['src/**/*.css', 'src/**/*.less']).pipe(
    gulpStylelint({
      fix: true,
      reporters: [{ formatter: 'string', console: true }],
    })
  );
}

const build = gulp.series(compile, copyLess);
exports.build = build;
exports.stylelint = stylelint;
exports.default = build;

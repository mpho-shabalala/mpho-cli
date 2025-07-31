import gulp from 'gulp';
import eslint from 'gulp-eslint-new';

export function runLintTask() {
  return gulp
    .src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint()) // assumes config already exists
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint().on('error', (err) => {
      console.error('[lint] ESLint failed:', err.message);
    }))
}

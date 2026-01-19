import { execSync } from 'child_process';

// 수정된 파일 추출
const getChangedFiles = () => {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
    stdio: 'pipe',
  })
    .toString()
    .trim();
  return output ? output.split('\n') : [];
};

// 파일 검사 실행 함수
const runChecks = (files) => {
  const tscFiles = files.filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'));
  const eslintFiles = files.filter(
    (file) =>
      file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.tsx') ||
      file.endsWith('.ts'),
  );

  if (tscFiles.length) {
    console.log('\nRun `tsc` On Files:');
    console.log(tscFiles.join('\n'));

    console.log('\n\n🔍 Checking TypeScript Errors...');
    try {
      // pnpm exec -> yarn run
      execSync(`yarn run tsc --noEmit`, {
        stdio: 'inherit',
      });

      console.log('\n✅ TypeScript checks passed successfully!');
    } catch (_e) {
      console.error('\n❌ TypeScript check failed!');
      process.exit(1);
    }
  }

  if (eslintFiles.length) {
    console.log('\nRun `eslint` On Files:');
    console.log(eslintFiles.join('\n'));

    console.log('\n\n🔍 Checking ESLint Errors...');

    try {
      const fileFlags = eslintFiles
        .map(
          (f) => `--file=${f.replaceAll(/[()]/g, '\\$&')}`, // $& 는 매칭된 문자 전체를 의미
        )
        .join(' ');
      console.log(`yarn run lint --no-cache ${fileFlags}`);
      // pnpm exec -> yarn run
      execSync(`yarn run lint --no-cache ${fileFlags}`, {
        stdio: 'inherit',
      });
      console.log('\n✅ ESLint checks passed successfully!');
    } catch (_e) {
      console.error('\n❌ ESLint check failed!');
      process.exit(1);
    }
  }
};

// 실행 로직
const changedFiles = getChangedFiles();
if (changedFiles.length) {
  console.log('Pre-commit Hooks running...');
  runChecks(changedFiles);
  console.log('\n✅ Pre-commit checks passed successfully!');
} else {
  console.log('✅ No files to check.');
}

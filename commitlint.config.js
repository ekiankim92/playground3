module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 or 수정
        'fix', // 버그 수정
        'hotfix', // 핫픽스
        'style', // UI 갱신, css 추가, 변경, 수정
        'refactor', // 코드 포맷수정, 리팩토링
        'docs', // 문서
        'test', // 테스트 코드
        'chore', // 기타 자잘한 작업
      ],
    ],

    'header-max-length': [2, 'always', 150],
  },
};

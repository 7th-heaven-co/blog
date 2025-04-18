// commitlint.config.mjs
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci', 'post', 'build'],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [0],
  },
  ignores: [(msg) => msg.startsWith('chore(release)')],
};

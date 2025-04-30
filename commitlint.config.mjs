// commitlint.config.mjs
/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: { parserOpts: { issuePrefixes: ['HEAVB-'] } },
  rules: {
    'references-empty': [2, 'never'],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [0, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'post',
        'build',
        'revert',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [0],
  },
  // keep the ignore for semantic-release commits
  ignores: [(msg) => msg.startsWith('chore(release)')],
};

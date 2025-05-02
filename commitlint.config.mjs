// commitlint.config.mjs
// commitlint.config.mjs
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Resolve repo-relative path regardless of where the config is executed */
const __dirname = dirname(fileURLToPath(import.meta.url));
const mapPath = resolve(__dirname, '.config/components-map.json');
const map = JSON.parse(readFileSync(mapPath, 'utf8'));

const scopes = Object.keys(map).filter((k) => !k.startsWith('$'));

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
    'scope-enum': [2, 'always', scopes],
  },
  // keep the ignore for semantic-release commits
  ignores: [(msg) => msg.startsWith('chore(release)')],
};

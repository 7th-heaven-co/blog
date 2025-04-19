// release.config.js – semantic‑release config (CommonJS) with grouped, emoji‑headed notes

/**
 * Converted from ESM (.mjs) to CommonJS (.js).
 * - Newline‑safe templates (no double‑escaping)
 * - Commit groups mapped to emoji section headers
 * - Immutable‑safe transform (returns a fresh object)
 */

const SECTION_TITLES = {
  feat: '✨ Features',
  fix: '🐛 Fixes',
  docs: '📝 Docs',
  style: '💄 Style',
  refactor: '♻️ Refactors',
  perf: '⚡ Performance',
  test: '✅ Tests',
  build: '📦 Build',
  ci: '🤖 CI / CD',
  chore: '🧹 Chores',
  post: '✉️ Posts',
};

module.exports = {
  // ─────────────── Branches ───────────────
  branches: [
    { name: 'staging', prerelease: 'beta' },
    { name: 'release/*', prerelease: 'rc' },
    'main',
  ],

  // ─────────────── Plugins ───────────────
  plugins: [
    // 1) Parse commits ➜ decide next version
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'post', release: false },
          { type: 'chore', release: false },
          { type: 'docs', release: false },
          { type: 'style', release: false },
          { type: 'ci', release: false },
          { type: 'build', release: false },
          { type: 'test', release: false },
        ],
      },
    ],

    // 2) Generate human‑readable notes
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          groupBy: 'type', // group commits by the (mapped) type field
          commitGroupsSort: 'title',
          commitsSort: ['scope', 'subject'],

          // Immutable‑safe transform: return a NEW object instead of mutating
          transform: (commit) => ({
            ...commit,
            type: SECTION_TITLES[commit.type] || commit.type,
            shortHash: commit.hash?.slice(0, 7),
          }),

          headerPartial: '## 📦 Release {{version}}\n\n',
          commitPartial: '- {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ({{shortHash}})\n',
          footerPartial: '\n---',
        },
      },
    ],

    // 3) Update CHANGELOG.md
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],

    // 4) Bump package.json but don’t publish to npm
    ['@semantic-release/npm', { npmPublish: false }],

    // 5) Draft GitHub release & attach CHANGELOG
    [
      '@semantic-release/github',
      {
        assets: ['CHANGELOG.md'],
        successComment: false,
        failComment: false,
        releasedLabels: ['released'],
        releaseNotes: true,
      },
    ],

    // 6) Commit version bumps & CHANGELOG back to repo
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],

    // 7) Custom post‑publish script
    [
      '@semantic-release/exec',
      {
        publishCmd: 'node ./scripts/x-announce.js "${nextRelease.version}"',
      },
    ],
  ],
};

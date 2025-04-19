// release.config.mjs – semantic‑release with grouped, newline‑friendly notes

/**
 * This ESM version replaces .releaserc.json so we can:
 *  • add multi‑line templates without double‑escaping
 *  • group commits by type with emoji section headers
 *  • shorten hashes and ensure each bullet is on its own line
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

export default {
  // ───────────────── Branches ─────────────────
  branches: [
    { name: 'staging', prerelease: 'beta' },
    { name: 'release/*', prerelease: 'rc' },
    'main',
  ],

  // ───────────────── Plugins ─────────────────
  plugins: [
    // 1) Parse conventional commits ➜ determine next version
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

    // 2) Craft human‑readable release notes
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          // Group similar commit types together
          groupBy: 'type',
          commitGroupsSort: 'title',
          commitsSort: ['scope', 'subject'],

          // Map each type to an emoji header
          transform: (commit) => {
            commit.groupBy = SECTION_TITLES[commit.type] || 'Other';
            commit.shortHash = commit.hash.slice(0, 7);
            return commit;
          },

          // Templates
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

    // 5) Draft GitHub release and attach CHANGELOG
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

    // 7) Custom post‑publish script (e.g., announce on X / Slack)
    [
      '@semantic-release/exec',
      {
        publishCmd: 'node ./scripts/x-announce.js "${nextRelease.version}"',
      },
    ],
  ],
};

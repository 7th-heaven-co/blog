// cz.config.cjs – central cz‑git configuration
// Put this in the project root. Commitizen (cz‑git) will auto‑detect it.
// Docs: https://cz-git.qbb.sh/guide/#configuration-files

const { defineConfig } = require('cz-git');

module.exports = defineConfig({
  /**
   * Commit types (same list you had in commitlint.config.mjs)
   */
  types: [
    { value: 'feat', name: 'feat:     ✨  A new feature', emoji: ':sparkles:' },
    { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
    { value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: ':memo:' },
    {
      value: 'style',
      name: 'style:    💄  Code style, white‑space, formatting',
      emoji: ':lipstick:',
    },
    {
      value: 'refactor',
      name: 'refactor: ♻️   Code change that neither fixes a bug nor adds a feature',
      emoji: ':recycle:',
    },
    { value: 'perf', name: 'perf:     ⚡️  Performance improvement', emoji: ':zap:' },
    { value: 'test', name: 'test:     ✅  Tests added/updated', emoji: ':white_check_mark:' },
    {
      value: 'build',
      name: 'build:    📦️   Build system or dependency changes',
      emoji: ':package:',
    },
    { value: 'ci', name: 'ci:       🎡  CI configuration changes', emoji: ':ferris_wheel:' },
    {
      value: 'chore',
      name: "chore:    🔨  Other changes that don't modify src/test",
      emoji: ':hammer:',
    },
    { value: 'post', name: 'post:     📰  New blog post content', emoji: ':newspaper:' },
    { value: 'revert', name: 'revert:   ⏪️  Revert a previous commit', emoji: ':rewind:' },
  ],

  /** Commit scopes (optional) */
  scopes: ['ui', 'auth', 'email', 'infra'],

  /** Jira / issue prefixes */
  issuePrefixes: [{ value: 'HEAVB-', name: 'HEAVB-: 7th-Heaven Blog' }],
  allowEmptyIssuePrefix: false,

  /** Aliases & quick‑shortcuts */
  alias: {
    b: 'chore: bump dependencies',
    c: 'chore: update config files',
    f: 'docs: fix typos',
    ':': 'docs: update README',
    transition: ['In Progress', 'In Review', 'Staging', 'Release', 'Done'],
  },

  /** Footer template (same as before) */
  template: {
    footer: [
      '{{ticketNumber}} #comment {{subject}}',
      '{{ticketNumber}} #transition {{transition}}',
    ],
  },

  /** Use git branch name as default scope / ticket */
  useBranch: true,

  /** Show emojis in the prompt */
  useEmoji: true,

  /**
   * Callback to post‑process the generated message.
   * Removes the stray space after the HEAVB‑ prefix (Fix B).
   */
  formatMessageCB: ({ defaultMessage }) => defaultMessage.replace(/(HEAVB-)\s+/g, '$1'),
});

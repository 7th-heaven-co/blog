### `docs/cz-config.md`

```markdown
# cz.config.cjs – Central **cz-git** Configuration

This file lives at the project root and is automatically discovered by **cz-git** / Commitizen.  
It defines every aspect of the interactive commit-message prompt and post-processing logic used in 7th-Heaven-Blog.

---

## 1. Commit Types (`types`)

| Value      | Emoji | Description                               |
| ---------- | ----- | ----------------------------------------- |
| `feat`     | ✨     | A new feature                             |
| `fix`      | 🐛     | A bug fix                                 |
| `docs`     | 📝     | Documentation-only changes                |
| `style`    | 💄     | Code style / formatting (no logic change) |
| `refactor` | ♻️     | Code refactor that isn’t a fix or feature |
| `perf`     | ⚡️     | Performance improvement                   |
| `test`     | ✅     | Adding or updating tests                  |
| `build`    | 📦     | Build-system or dependency changes        |
| `ci`       | 🎡     | CI configuration changes                  |
| `chore`    | 🔨     | Other changes that don’t touch src/tests  |
| `post`     | 📰     | New content for the blog                  |
| `revert`   | ⏪️     | Reverts a previous commit                 |

---

## 2. Scopes (`scopes`)

```text
ui • auth • email • infra
```

Use one of these (kebab-case) to indicate the affected area of the codebase.

---

## 3. Jira / Issue Prefixes (`issuePrefixes`)

* **Prefix**: `HEAVB-`  
* **Prompt name**: “HEAVB-: 7th-Heaven Blog”  
* **Rule**: an issue/ticket is *required* (`allowEmptyIssuePrefix: false`).

---

## 4. Aliases (`alias`)

| Shorthand    | Expands to                                                                                           | Notes                 |
| ------------ | ---------------------------------------------------------------------------------------------------- | --------------------- |
| `b`          | `chore: bump dependencies`                                                                           | Quick dependency bump |
| `c`          | `chore: update config files`                                                                         |                       |
| `f`          | `docs: fix typos`                                                                                    |                       |
| `:`          | `docs: update README`                                                                                |                       |
| `transition` | Prompts a Jira workflow transition: <br>`In Progress` · `In Review` · `Staging` · `Release` · `Done` |                       |

Run with `git cz -a <alias>`.

---

## 5. Footer Template (`template.footer`)

```text
{{ticketNumber}} #comment {{subject}}
{{ticketNumber}} #transition {{transition}}
```

Produces smart-commit directives for Jira, e.g.:

```
HEAVB-123 #comment Fix login race condition
HEAVB-123 #transition In Review
```

---

## 6. Branch Integration (`useBranch`)

If the current branch name starts with a valid ticket (`HEAVB-###-…`) cz-git pre-fills `{{ticketNumber}}`.

---

## 7. Emoji Support (`useEmoji`)

Emojis render in the selection menu for better visual scanning.

---

## 8. Post-processing Callback (`formatMessageCB`)

```js
({ defaultMessage }) =>
  defaultMessage.replace(/(HEAVB-)\s+/g, '$1')
```

*Removes the stray space* that cz-git inserts after `HEAVB-`, ensuring footers are `HEAVB-123` (no space) so Commitlint and Jira both parse them correctly.

---

## 9. Full Source

```js
const { defineConfig } = require('cz-git');

module.exports = defineConfig({
  types: [
    { value: 'feat', name: 'feat:     ✨  A new feature', emoji: ':sparkles:' },
    { value: 'fix',  name: 'fix:      🐛  A bug fix',      emoji: ':bug:' },
    { value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: ':memo:' },
    { value: 'style', name: 'style:    💄  Code style, white-space, formatting', emoji: ':lipstick:' },
    { value: 'refactor', name: 'refactor: ♻️   Code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
    { value: 'perf', name: 'perf:     ⚡️  Performance improvement', emoji: ':zap:' },
    { value: 'test', name: 'test:     ✅  Tests added/updated', emoji: ':white_check_mark:' },
    { value: 'build', name: 'build:    📦️   Build system or dependency changes', emoji: ':package:' },
    { value: 'ci',   name: 'ci:       🎡  CI configuration changes', emoji: ':ferris_wheel:' },
    { value: 'chore', name: \"chore:    🔨  Other changes that don't modify src/test\", emoji: ':hammer:' },
    { value: 'post', name: 'post:     📰  New blog post content', emoji: ':newspaper:' },
    { value: 'revert', name: 'revert:   ⏪️  Revert a previous commit', emoji: ':rewind:' },
  ],

  scopes: ['ui', 'auth', 'email', 'infra'],

  issuePrefixes: [{ value: 'HEAVB-', name: 'HEAVB-: 7th-Heaven Blog' }],
  allowEmptyIssuePrefix: false,

  alias: {
    b: 'chore: bump dependencies',
    c: 'chore: update config files',
    f: 'docs: fix typos',
    ':': 'docs: update README',
    transition: ['In Progress', 'In Review', 'Staging', 'Release', 'Done'],
  },

  template: {
    footer: [
      '{{ticketNumber}} #comment {{subject}}',
      '{{ticketNumber}} #transition {{transition}}',
    ],
  },

  useBranch: true,
  useEmoji: true,

  formatMessageCB: ({ defaultMessage }) =>
    defaultMessage.replace(/(HEAVB-)\\s+/g, '$1'),
});
```

> **Tip:** When committing, simply run `git commit` (Husky + cz-git will launch automatically) or use `git cz` / `npx czg` if you prefer the standalone CLI.
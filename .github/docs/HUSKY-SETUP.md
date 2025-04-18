# 🐶 HUSKY-SETUP.md
> Git Hook Automation for 7th-Heaven

This guide documents how to set up and maintain Husky hooks for local commit/push enforcement.

---

## ✅ Step-by-Step Installation

### 1. Install Husky and Commitlint
```bash
npm install husky @commitlint/cli @commitlint/config-conventional --save-dev
npx husky install
npm pkg set scripts.prepare="husky install"
npm run prepare
```

---

### 2. Configure Git Hooks (Recommended)

💡 Tip: Add a quick log message to confirm your hooks are running!

#### `pre-push`
Blocks pushing if `package.json` version has been manually edited.
```bash
mkdir -p .husky
cat <<EOF > .husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
echo "🐶 Husky pre-push hook triggered"
node .github/scripts/check-version-lock.js
EOF
chmod +x .husky/pre-push
```

#### `commit-msg`
Enforces [Conventional Commits](https://www.conventionalcommits.org/).
```bash
cat <<EOF > .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
echo "✉️  Husky commit-msg hook triggered"
npx commitlint --edit "$1"
EOF
chmod +x .husky/commit-msg
```

---

## 🧪 Commit Message Rules (via `commitlint.config.js`)

Includes support for a dedicated `post` type for blog content commits only. Semantic-release is configured to ignore `post:` commits by default.

### ✅ Labeling Blog Posts in PRs
To auto-label content changes, update `.github/labeler.yml`:
```yaml
type:post:
  - "src/content/blog/**"
```

### ✅ Semantic-release Config Override
To prevent post-only commits from triggering a version bump, add this to `.releaserc.json`:
```json
"plugins": [
  ["@semantic-release/commit-analyzer", {
    "releaseRules": [
      { "type": "post", "release": false }
    ]
  }]
]
```

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
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
        'post' // for blog content-only commits
      ]
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [0]
  }
};
```

---

## 📁 Add `.husky/.gitignore`
```gitignore
# Ignore internal husky support scripts
_/

# Ignore local log output
log.txt
```
```
# Optional: ignore husky internal scripts and temp files
_/
```

---

## 🛠️ Auto-Setup Script (Optional)

Create this file and run it once to bootstrap Husky hooks:

```bash
# ./scripts/setup-husky.sh
#!/bin/bash

npx husky install
mkdir -p .husky

cat > .husky/pre-push <<EOF
#!/bin/sh
. "\$(dirname "$0")/_/husky.sh"
node .github/scripts/check-version-lock.js
EOF
chmod +x .husky/pre-push

cat > .husky/commit-msg <<EOF
#!/bin/sh
. "\$(dirname "$0")/_/husky.sh"
npx commitlint --edit "\$1"
EOF
chmod +x .husky/commit-msg
```

Then run:
```bash
chmod +x ./scripts/setup-husky.sh
./scripts/setup-husky.sh
```

---

## 🚧 Optional: `install.mjs` (Advanced)

If you're working in a monorepo or want to prevent Husky from installing during CI/CD or production builds, you can create an optional `install.mjs` script:

```js
// ./scripts/install.mjs
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

const husky = (await import('husky')).default;
console.log('🐶 Running husky install manually...');
husky();
```

Update your `prepare` script in `package.json`:
```json
"scripts": {
  "prepare": "node ./scripts/install.mjs"
}
```

✅ Use this if you need to skip Husky setup in cloud builds or CI-only installations.

---

## ✅ Onboarding Checklist for Contributors
- [ ] Clone repo
- [ ] Run `npm install`
- [ ] Run `npm run prepare`
- [ ] Run `./scripts/setup-husky.sh` (optional)
- [ ] Commit using `feat()`, `fix()`, etc.
- [ ] Avoid manually editing `package.json` version

---

## 🔁 Usage Notes

### 🔍 Log Monitoring
- Log file: `.husky/log.txt`
- View log: `npm run hook:log`
- Logs hook name, timestamp, and user

### 🔁 Optional Log Rotation
You can clear the log every 100 lines with:
```bash
head -n 100 .husky/log.txt > .husky/log.tmp && mv .husky/log.tmp .husky/log.txt
```
- `pre-push`: blocks manual version changes
- `commit-msg`: blocks non-semantic commits
- Use `npm run prepare` after cloning to reinitialize hooks

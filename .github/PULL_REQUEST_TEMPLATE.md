---
name: 📝 Project‑Wide Pull Request Template
about: _Use this for **any** PR. It covers all common scenarios in Seventh‑Heaven._
labels: []
---

# 📋 Pull Request

> **Title Tip:** Use **Conventional Commits** — e.g. `feat(blog): add pagination` or `fix(ci): broken release workflow` _(see [docs/SEMANTIC_TAGS.md](docs/SEMANTIC_TAGS.md) for full guide)_


## 📦 Type
- [ ] **feat** ✨  &nbsp;–&nbsp;New feature or enhancement
- [ ] **fix** 🐛  &nbsp;–&nbsp;Bug fix
- [ ] **docs** 📚  &nbsp;–&nbsp;Documentation only changes
- [ ] **style** 🎨  &nbsp;–&nbsp;Formatting, missing semi‑colons, etc.
- [ ] **refactor** ♻️  &nbsp;–&nbsp;Code change that neither fixes a bug nor adds a feature
- [ ] **perf** 🚀  &nbsp;–&nbsp;Performance improvement
- [ ] **test** 🧪  &nbsp;–&nbsp;Adding or adjusting tests
- [ ] **ci** 🤖  &nbsp;–&nbsp;CI/CD pipeline changes
- [ ] **build** 🏗️  &nbsp;–&nbsp;Build system or external dependency changes
- [ ] **chore** 🧹  &nbsp;–&nbsp;Other chores (release bumps, deps, etc.)
- [ ] **post** 📰  &nbsp;–&nbsp;Content‑only update (blog/news)

## 📁 Scope
- [ ] UI / Components
- [ ] Blog / Content
- [ ] Utility / Logic
- [ ] Styles / Design
- [ ] Documentation
- [ ] Tests
- [ ] CI / CD / Workflow
- [ ] Infrastructure / Config
- [ ] Accessibility / Performance
- [ ] Other (explain below)

## 🧾 Summary
_Describe **what** & **why**. Bullet points welcome._

## 🖼️ Screenshots / Media (if UI changes)
<details>
<summary>Expand to view</summary>

| Before | After |
| ------ | ----- |
|        |       |

</details>

## 🔍 Linked Issues / Tickets
Closes | Fixes | Related: `#`issue‑number(s)

## 🧪 How to Test
1. `npm run dev`
2. Navigate to …
3. Expect …

## ✅ Checklist
- [ ] Code builds & lints locally (`npm run build && npm run biome ci`)
- [ ] All tests pass (`npm test`)
- [ ] PR targets **correct base branch** (`dev` for features/fixes, `staging` for releases)
- [ ] Follows coding standards & formatting (Biome, Prettier, ESLint)
- [ ] Added/updated tests where relevant
- [ ] Updated documentation / comments
- [ ] Updated environment variables & secrets docs (if applicable)
- [ ] No sensitive data committed
- [ ] I have read the **CONTRIBUTING.md** guidelines

## 🗒️ Deployment Notes
_Add any extra steps (DB migrations, CF cache purge, env keys, etc.)._

## 💥 Breaking Changes
_List anything that might require a major version bump or manual action._

---
<!-- Thank you for contributing to Seventh‑Heaven! 💖 -->


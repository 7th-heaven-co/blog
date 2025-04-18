---
name: "🚀 New Contributor Onboarding"
about: Checklist for setting up a full local dev environment
labels: [onboarding, devtools, contributor]
---

# 🚀 New Contributor Setup Checklist

## ⚙️ Install & Clone
- [ ] Fork and **clone** this repo
- [ ] Run `npm ci` (deterministic install)
- [ ] Confirm Node.js version is **20 LTS** (`node --version`)
- [ ] Copy env templates → `cp .dev.vars.sample .dev.vars && cp .env.sample .env.local`
- [ ] Install the **Biome** VS Code extension (`biomejs.biome`)

## 🚫 Protected Branch Awareness
- [ ] Direct pushes are blocked on `main`, `staging`, `dev`
- [ ] All changes must go through **pull requests**

## 💼 Husky & Git Hooks
- [ ] Run `npm run prepare` to activate Husky hooks
- [ ] Commit‑msg hook validates Conventional Commits
- [ ] Pre‑push runs lint, tests, and version‑lock check

## 📚 Learning the Workflow
- [ ] Read `/docs/WORKFLOW.md`
- [ ] Understand `feature → dev → staging → main` flow
- [ ] Run `npm run lint`, `npm test`, and `npm run build` without errors

Once you’re set up, you’re ready to open your first PR! Tag **@maintainers** if you need help.


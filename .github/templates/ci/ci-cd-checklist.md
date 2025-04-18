---
name: ✅ CI/CD Workflow Checklist
about: Use this checklist to validate the full release pipeline
labels: [workflow, checklist, ci]
---

# CI/CD Pipeline Review Checklist

> Use this template before merging `dev → staging` or staging → main.

## ⚖️ PR & Commit Hygiene
- [ ] All commits use valid types: `feat`, `fix`, `post`, etc.
- [ ] No manual version edits in `package.json`
- [ ] Husky & Commitlint are passing locally

## ✅ Pull Request Rules
- [ ] PR opened into the correct target branch (`dev` or `staging`)
- [ ] PR uses the correct template (dev/staging)
- [ ] All required labels added: `type:*`, `target:*`

## 🧰 CI & Automation
- [ ] All required GitHub Actions checks have passed
- [ ] `test-on-dev.yml` triggered if PR targets `dev`
- [ ] PR into `staging` ran semantic-release preview

## 🚀 Deployment Sequence
- [ ] Merge into `staging` triggers changelog + version bump
- [ ] Weekly Action merges `staging → main`
- [ ] Cloudflare Pages deployed latest `main`

## 🌐 Selective Content Support
- [ ] `post:` commits correctly excluded from release
- [ ] RSS + Sitemap updated using `parsed-paths.json`
- [ ] Cloudflare purge worker logs visible under `/admin/logs.html`

---

Feel free to tag `@maintainers` if any of these checks fail or need clarification!
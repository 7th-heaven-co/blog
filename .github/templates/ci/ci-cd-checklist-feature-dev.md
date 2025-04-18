---
name: ✨ Feature → Dev PR Checklist
about: Validate a feature or fix branch before merging into dev
labels: [feature, checklist]
---

# ✨ Feature → Dev CI/CD Checklist

## ✍️ PR Quality
- [ ] Commit messages use conventional format (e.g., `feat(ui): add filter`)
- [ ] No manual version changes in `package.json`
- [ ] PR is targeting `dev` branch only
- [ ] PR uses `pull_request_template_dev.md`
- [ ] Includes required labels: `type:*`, `target:dev`

## ⚖️ Lint & Test
- [ ] Husky pre-push ran successfully
- [ ] Commitlint passed
- [ ] GitHub test workflow (`test-on-dev.yml`) passed

## 🎯 Approval & Review
- [ ] PR reviewed or self-approved (if solo dev)
- [ ] CI & PR checks are green
- [ ] Ready to merge into `dev`

Tag `@maintainers` or comment if this checklist is blocked.

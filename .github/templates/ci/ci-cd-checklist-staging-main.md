---
name: 🎉 Staging → Main Checklist
about: Final approval before production deployment via main
labels: [staging, release, production, deploy, checklist]
---

# 🎉 Staging → Main CI/CD Checklist

## 🌐 Release Approval
- [ ] PR merges latest `staging` into `main`
- [ ] Weekly Action confirmed or run manually
- [ ] No unresolved hotfixes pending
- [ ] Cloudflare Pages will deploy `main` branch

## 📅 Artifacts
- [ ] Changelog published
- [ ] Version tag released on GitHub
- [ ] `CHANGELOG.md` is up to date

## 🔄 Post-Merge
- [ ] Monitor deployment logs
- [ ] Confirm purge worker runs (if enabled)
- [ ] Confirm new content routes are live

Celebrate a clean release ✨ — tag `@maintainers` if you hit an edge case.

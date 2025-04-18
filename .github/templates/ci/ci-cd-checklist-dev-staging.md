---
name: ✅ Dev → Staging Checklist
about: Validate all dev changes before promoting to staging
labels: [dev, checklist]
---

# ✅ Dev → Staging Release Checklist

## ✏️ PR Requirements
- [ ] Base branch is `staging`
- [ ] Source is latest `dev` branch
- [ ] PR uses `pull_request_template_staging.md`
- [ ] Proper changelog summary included
- [ ] Labels: `target:staging`, `type:release`

## ✅ Versioning & Release
- [ ] No `post:` commits will affect version
- [ ] `semantic-release` ran successfully
- [ ] `CHANGELOG.md` was updated
- [ ] GitHub release published or previewed

## 🚀 Deploy Readiness
- [ ] Manual preview passed (optional)
- [ ] All tests and build CI jobs are green
- [ ] All reviewed + approved

You’re ready to promote to `staging`. Ping `@maintainers` if needed!

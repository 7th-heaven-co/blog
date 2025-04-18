---
# pull_request_preview.md
name: 🌐 Preview Branch Checklist
about: Use this for validating branch-specific preview deployments
labels: [preview, deploy, selective]
---

# 🌐 Preview Branch Validation

## 🚀 Preview Setup
- [ ] Branch is named `preview/*`
- [ ] Uses `ASTRO_ENV=preview`
- [ ] Includes `parsed-paths.json` if routing is selective

## ✅ Preview Behavior
- [ ] Builds only updated paths (e.g., `/blog/my-new-post`)
- [ ] Does **not** include unrelated blog or static routes
- [ ] Preview renders as expected on Cloudflare Pages

## 🔍 Validation
- [ ] Internal links work
- [ ] Draft content excluded
- [ ] Build logs look clean

Use this to test deploy-only experiments without touching `staging`. Ping `@maintainers` with results.

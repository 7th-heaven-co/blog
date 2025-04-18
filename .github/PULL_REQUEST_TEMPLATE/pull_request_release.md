---
# pull_request_release.md
name: 🔍 Release Audit Log
about: Track version history, release tags, and key changelog points
labels: [release, audit, changelog]
---

# 🔍 Release Audit Log

## 📅 Date
<!-- e.g., 2025-04-15 -->

## ✨ Version Released
<!-- e.g., v1.6.0 -->

## 📄 Changelog Summary
<!-- Bullet points or copied from CHANGELOG.md -->

## ⚖️ Release Tag Confirmed
- [ ] GitHub tag created
- [ ] Tag matches `package.json`

## 🌐 Public Release Verified
- [ ] Deployed to Cloudflare Pages
- [ ] Verified post URLs live
- [ ] Robots.txt and sitemap up to date
- [ ] RSS feed updated (if changed)

## 🔄 Purge Triggered (optional)
- [ ] Purge worker triggered from parsed-paths.json
- [ ] Viewable at `/admin/logs.html`

> _Use this issue to document everything that shipped with a given release._

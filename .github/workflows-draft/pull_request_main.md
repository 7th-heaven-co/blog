## 🚀 Main Branch Merge Checklist
_This PR template is used only by automated `staging → main` merges._

---

### 🧾 Summary
This pull request promotes the latest `staging` content to `main` for production deployment.

- Merged via scheduled GitHub Action
- Triggered by changelog + version bump from staging

### ✅ Deployment Review
- [ ] Confirm Cloudflare Pages deployed new `main`
- [ ] Confirm updated paths are available
- [ ] Confirm RSS feed and sitemap reflect changes
- [ ] Confirm `/admin/logs.html` recorded purge history (if purge enabled)

---

This PR will auto-merge unless blocked. Tag `@maintainers` to delay deploy.

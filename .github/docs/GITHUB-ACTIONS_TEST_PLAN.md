# ✅ TEST-PLAN.md 
> ***Validate Your CI/CD System***

---

## 🔐 1. Branch Protection Rules
- [ ] `main`, `staging`, and `dev` all require PRs
- [ ] Status checks are required for test and build
- [ ] 1 approval required (optional self-approve)
- [ ] Admin enforcement enabled
- [ ] Direct pushes are blocked

---

## 🏷️ 2. PR Labeler
- [ ] Create PR into `dev` → adds `target:dev`
- [ ] Create PR from `dev` → `staging` → adds `target:staging`
- [ ] Feature or release branches **must merge into `dev` first**, not directly into `staging` or `main`
- [ ] PRs into `main` are not permitted directly and should be blocked by protection rules

---

## ✅ 3. Semantic PR Title Validation
- [ ] Open PR with title `feat(blog): add pagination`
  - [ ] Confirm that ✅ it passes
- [ ] Open PR with title `fix something` or `WIP: patch`
  - [ ] Confirm that ❌ it fails with message: `PR title must not start with WIP`
- [ ] Check that title matches defined `types:` in `.github/semantic.yml`

---

## 🧪 4. Dev Testing Workflow
- [ ] Push to `dev` branch → triggers `test-on-dev.yml`
- [ ] Confirm test output appears under "Checks"
- [ ] Break a test and confirm CI fails
- [ ] Fix it and confirm CI passes

---

# 📝 5. Changelog & Versioning

- [ ] Open PR `dev → staging`
- [ ] Confirm that `semantic-release`:
  - [ ] Bumps version in `package.json`
  - [ ] Updates `CHANGELOG.md`
  - [ ] Posts GitHub Release (Draft or Final)
  - [ ] Optional: triggers announcement script
- [ ] ✅ Semantic-release compares commits **since the latest release tag** (from `staging`)
- [ ] ✅ Even if a feature branch is old, it computes the next version based on **all changes** merged into `dev → staging`
- [ ] ✅ Feature branches **should not manually change** `package.json` version — semantic-release will handle it automatically
- [ ] ✅ `post:` commits (used for blog content only) **will not trigger** a version bump or changelog update — this is configured via `releaseRules` in `.releaserc.json`

### ℹ️ Example:
- If `staging` is on `1.4.0`
- And two fixes + one `feat:` commit are added via `dev → staging`
- Then `semantic-release` will bump to `1.5.0` (minor update)

---

## 🧬 6. Weekly Main Merge
- [ ] Wait for Sunday scheduled merge from `staging → main`
- [ ] Or trigger manually: GitHub Actions → Run workflow
- [ ] Confirm `main` is updated and Cloudflare deploys

---

## ⚙️ 7. Preview Environment
- [ ] Create `preview/fancy-update`
- [ ] Confirm Pages deploys this branch
- [ ] Confirm `ASTRO_ENV=preview` activates route filtering
- [ ] Confirm `parsed-paths.json` is respected

---

## 🔄 8. Cloudflare Purge Worker
- [ ] POST JSON to purge Worker endpoint:
```bash
curl -X POST https://yourworker.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/blog/test-post", "/about"]}'
```
- [ ] Visit `/admin/logs.html`
- [ ] Confirm purge was recorded and timestamped

---

## 📤 9. Admin Tools & Logs
- [ ] Confirm `/admin/logs.html` renders log history
- [ ] Use filters by path or date
- [ ] Download logs via CSV button

---

# 🛠️ Triage Protocol — Handling Critical Issues

This guide outlines how to respond to bugs or issues flagged using the [Triage Issue Form](../../.github/ISSUE_TEMPLATE/triage.md).

---

## 🚨 When to Trigger Protocol
An issue qualifies for immediate response if:
- **Severity:** `Blocking release`
- **Urgency:** `Needs immediate fix`

GitHub will auto-label these with:
- `priority:high`
- `hotfix`

---

## 🔁 Response Flow

### 1. Review & Confirm
- [ ] Review reproduction steps or screenshots
- [ ] Confirm the issue is active and not already patched

### 2. Hotfix Branch
```bash
git checkout -b hotfix/issue-###
```
- [ ] Apply fix
- [ ] Add test (if applicable)
- [ ] Commit using `fix(scope): message`

### 3. Create PR → `dev`
- [ ] Run tests + CI
- [ ] Request review or self-approve (solo dev)

### 4. Promote
- [ ] Merge into `dev`
- [ ] Open PR: `dev → staging`
- [ ] Allow `semantic-release` to handle changelog + version bump

### 5. Verify on `main`
- [ ] Confirm deploy via Cloudflare Pages
- [ ] Confirm issue is resolved and paths are purged (if needed)
- [ ] Close the original issue

---

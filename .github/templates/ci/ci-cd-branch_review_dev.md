---
name: 🔍 Dev Branch Review Checklist
about: _Use this when **reviewing** a PR that targets `dev`._
labels: []
---

## 🚦  Quick Start
- **Understand the context** – skim the PR summary and linked issues.  
- **Run it** – `npm i && npm run dev` (or test script) to replicate author steps.  
- **Check the boxes** below and leave comments inline or in the **Review Notes** section.

---

## ✅  High‑Level Checks
- [ ] **Conventional Title & Message** — follows `type(scope): subject` format.  
- [ ] **PR Targets `dev`** — base branch is correct; no stray merge commits.  
- [ ] **Labels Present** — `type:*`, `target:dev`, any extra context labels.  
- [ ] **Summary Completed** — author described _what_ & _why_.  

## 🧪  Functional Testing
- [ ] Feature works as described (QA steps pass).  
- [ ] Edge cases covered (error paths, loading states, null data).  
- [ ] **No regressions** in adjacent areas.

## 🧹  Code Quality
- [ ] Lint and prettier pass locally (`npm run lint`, etc.).  
- [ ] Code is readable, typed, and uses existing utilities/hooks when possible.  
- [ ] Dead code, TODOs, console logs removed.  
- [ ] Follows accessibility & semantic‑HTML guidelines.

## 🛡️  Tests
- [ ] Unit/integration tests added or updated.  
- [ ] `npm test` / `vitest` green.  
- [ ] Coverage ≥ team threshold (or justified).

## 📈  Performance / Security
- [ ] No obvious performance hits (large assets, extra renders, N+1 calls).  
- [ ] No secrets, tokens, or PII committed.  
- [ ] Follows dependency‑update best practices (no vulnerable packages introduced).

## 📝  Docs / Storybook (if applicable)
- [ ] README, MDX, or Storybook stories updated.  
- [ ] Public APIs & prop types documented.

## 🗒️  Review Notes
_Add any overall comments, blocking issues, or praise here._

---

### ⏭️ Next Steps
1. **Approve** if all critical items pass.  
2. **Request changes** with clear guidance if something blocks merge.  
3. **Optional:** add “auto‑merge” label if policy allows.

Happy reviewing! 🎉

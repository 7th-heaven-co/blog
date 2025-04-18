# Auto Append Deploy Tags Workflow

**File:** `.github/workflows/auto-append-deploy-tags.yml`

This workflow watches the **staging** branch, extracts special *deploy tags* from the most‑recent commits, appends them to `deploy‑changelog.md`, and opens a pull‑request back into `staging`. It keeps the branch‑protection rule **“no direct pushes”** intact while remaining 100 % automated.

---

## What it Solves 🎯

| Problem                                             | How the workflow fixes it                                                                                                               |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub ruleset rejects direct pushes (GH013 error). | All changes are committed to a temporary branch (`auto/deploy‑changelog`) and delivered via an auto‑PR, which branch protection allows. |
| Losing an audit trail for auto‑generated files.     | Every update is a discrete PR with labels, CI checks, and merge history.                                                                |
| Manual upkeep of the **Deploy Changelog** file.     | Tags in commit messages are parsed and appended automatically.                                                                          |

---

## Deploy Tag Syntax 🏷️

Use these hashtags in your commit *footers* (or anywhere in the message) to have them picked up:

| Tag                       | Intent                            | Example                                                   |
| ------------------------- | --------------------------------- | --------------------------------------------------------- |
| `#add-post:slug`          | A new article was added           | `feat(blog): publish April post  — #add-post:2025‑04‑18`  |
| `#delete-post:slug`       | An article was removed            | `chore(blog): remove outdated FAQ  #delete-post:faq‑2019` |
| `#update-section:section` | A section of the site was updated | `docs: revamp About page  #update-section:about`          |

Feel free to extend the `grep -E` pattern in **Step 2** if you need more tags.

---

## How it Works ⚙️

1. **Trigger** — `on: push` to **staging**.
2. **Checkout** staging at its new head.
3. **Extract Tags** — `git log -n 20` → `commits.txt` → grep for tag patterns.
4. **Append** tags (if any) to `deploy‑changelog.md`, preceded by an auto‑dated header.
5. **Create Pull Request** with [peter‑evans/create‑pull‑request] v5
   * Branch: `auto/deploy‑changelog`
   * Labels: `type:chore`, `target:staging`
   * Auto‑merge cleans up the branch (`delete‑branch: true`).

> **Note** If no tags are found, the job finishes without opening a PR.

---

## Customising 🔧

| Need                            | Change                                                |
| ------------------------------- | ----------------------------------------------------- |
| **Scan more commits**           | Edit `git log -n 20` (Step 2).                        |
| **Different tag tokens**        | Update the `grep -E` regex.                           |
| **Write a different file name** | Replace `deploy‑changelog.md` in Steps 3–4.           |
| **Target a different branch**   | Change both `on.push.branches` and `base:` in Step 4. |
| **Change PR labels**            | Adjust the `labels:` block in Step 4.                 |

---

## Integration with Auto‑Approve 🤖

If you already run an auto‑approve bot (e.g. **peter‑evans/auto‑approve** or a custom action) that keys off the label `target:staging` and/or PR title `chore(deploy): …`, this PR will merge itself within seconds. If not, add a simple approve‑and‑merge job to keep the flow hands‑free.

---

## Troubleshooting 🛠️

| Symptom                            | Cause & Fix                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| **PR isn’t created**               | Likely no matching tags → ensure your commit messages include `#add-post:` etc.    |
| **Workflow fails at PR step**      | Check `permissions:` – the job needs `contents: write` and `pull‑requests: write`. |
| **PR fails branch protection**     | Confirm your auto‑approve rules, or manually approve/merge the first run.          |
| **Duplicate entries in changelog** | Lower `git log` depth or add a de‑duplication script if needed.                    |

---

## Maintenance Tips 🧹

* Keep **Step 2**’s regexp close to your editorial workflow—document new tag types here.
* Periodically prune old lines from `deploy‑changelog.md` or archive it per release to keep the file size reasonable.
* If you adopt Conventional Commits *scopes* for posts (e.g. `feat(post): …`), you can parse those instead of hashtags.

---

### Related Files / Docs

* `.github/workflows/auto-append-deploy-tags.yml` – the workflow itself.
* `deploy‑changelog.md` – rendered output.
* `docs/SEMANTIC_TAGS.md` – full commit‑type matrix. (see commit 7d83f27)

---

© 2025 — 7th‑Heaven Blog CI Docs


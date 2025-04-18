# 🗒️ Auto‑Comment Reviewer Checklist Workflow

> **File:** `.github/workflows/auto-comment-reviewer-checklist.yml`
> **Last updated:** 04/18/25

This workflow automatically posts (or updates) a **review checklist comment** whenever a pull‑request (PR) targeting `dev` or `staging` is opened, marked *ready for review*, synchronized (*new commits pushed*), or labelled.  It helps solo and team reviewers follow a consistent gate before merging.

---

## 1 · Why use it?

- Guarantees every PR carries an actionable‑checklist right where reviewers work.
- Updates the same comment on subsequent events—no clutter.
- Works for local branches **and forks** thanks to `pull_request_target`.

---

## 2 · How it works

| Step            | What happens                                                                                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**     | `pull_request_target` fires for the selected event types. This event runs in the context of the target branch → the default `GITHUB_TOKEN` always has write rights.                                      |
| **Conditional** | The job continues **only** when the PR base branch is `dev` or `staging`, **or** if a matching label (`target:dev` or `target:staging`) was added.                                                       |
| **Permissions** | `contents:read` (minimum), `issues:write` (create / update comment), `pull‑requests:write` (future proofing for labels / reviews).                                                                       |
| **Script**      | The **marker** `<!-- reviewer-checklist:{branch} -->` is injected into the comment body. ▪ If a comment containing the marker already exists → it is **updated**. ▪ Else → a new comment is **created**. |

---

## 3 · Quick troubleshooting ‑ “Resource not accessible by integration (403)”

Below are the most common causes (and fixes) for a 403 when the workflow tries to comment:

| #   | Symptom                                                         | Root cause                                                                              | Fix                                                                                    |
| --- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | Works for same‑repo PRs but 403s for **forks**                  | Workflow still listening to `pull_request` somewhere → token becomes read‑only on forks | Remove / migrate that listener to `pull_request_target` or use a PAT with write scopes |
| 2   | You updated YAML in the feature branch but error persists       | GitHub runs the workflow that exists on the **base branch**; it still has the old file  | Merge the workflow change into `dev` / `staging` first, then re‑run                    |
| 3   | Another action inside the job touches PR APIs (labels, reviews) | Only `issues:write` declared                                                            | Add `pull-requests:write` to the `permissions:` block                                  |
| 4   | **Issues disabled** in repo settings                            | PR comments use the Issues API under the hood                                           | Enable *Issues* or switch to the PR‑review‑comments endpoint                           |
| 5   | Org‑level policy overrides token scopes                         | Enterprise policy forces read‑only                                                      | Ask an admin to allow write scopes for Actions                                         |

---

## 4 · Customizing the checklist

| Change                            | How                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Add / remove checklist items**  | Edit the markdown inside `checklist` template in the workflow file. Keep the marker lines intact. |
| **Support another target branch** | Update the `if:` expression and label list. Remember to adjust the checklist header.              |
| **Trigger on extra events**       | Add new items under `types:` for `pull_request_target` (e.g., `edited`).                          |
| **Different wording per branch**  | Use the `${branch}` variable in the template or add a `switch` for custom text.                   |

> **Commit style:** use `ci(workflows): …` when editing this file so semantic‑release categories it correctly.

---

## 5 · Updating this README

1. Modify the content here as needed.
2. Commit with a `docs(workflows):` message.
3. Keep table columns ≤ 100 chars to satisfy **biome** line‑width.

---

Made with 💛 for **7th‑Heaven**.


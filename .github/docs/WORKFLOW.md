# 🧭 WORKFLOW.md

> _Last updated: 18 Apr 2025_

Developer CI/CD Overview

---

## 🧱 Philosophy & Branch Model


* **Automation first** — every push runs lint/tests; releases are assembled & tagged without manual version bumps.
* **Three protected trunks** — `dev` → `staging` → `main`, with a weekly promotion job.
* **Release branches** (`release/YYYY‑MM‑DD`) capture RCs & hot‑fix back‑ports.
* **Preview branches** (`preview/*`) auto‑deploy PR previews to Cloudflare Pages.

![branch diagram](assets/branch-flow.md)

---

## 🔁 Git Flow

### Branch purpose
| Branch               | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| `dev`                | day‑to‑day feature work; default branch             |
| `staging`            | integration + beta/RC tags via **semantic‑release** |
| `main`               | production (auto‑deployed)                          |
| `release/YYYY‑MM‑DD` | frozen RC branch created weekly                     |
| `preview/*` (opt.)   | deploy‑only testing; no release tagging             |

### Pull‑request policy
| Base        | PR required | CI gates                               | Review               |
| ----------- | ----------- | -------------------------------------- | -------------------- |
| **main**    | ✅           | build + test + deploy                  | 1 approval           |
| **staging** | ✅           | lint + test + semantic‑release dry‑run | 1 approval           |
| **dev**     | ✅           | lint + test                            | self‑approve allowed |

---

## 🔧 Toolchain Highlights

| Tool                 | What it does                                    |
| -------------------- | ----------------------------------------------- |
| **Biome**            | Formatter + linter (replaces ESLint + Prettier) |
| **Vitest**           | Unit‑test runner with coverage                  |
| **Playwright**       | Headless E2E browser tests                      |
| **semantic‑release** | Auto version / changelog on `staging`           |
| **Wrangler Action**  | Deploys `main` to Cloudflare Pages              |
| **Selective Deploy** | Skips build when no site‑visible changes        |
| **CodeQL** (opt.)    | Static security scan                            |
| **Actionlint**       | Lint workflow YAML                              |

---

## 📂 Key GitHub Actions

| Workflow                      | Trigger               | Notes                               |
| ----------------------------- | --------------------- | ----------------------------------- |
| **test‑on‑dev.yml**           | push / PR → `dev`     | Biome lint + Vitest + coverage      |
| **test‑on‑staging.yml**       | push / PR → `staging` | Same gates before release           |
| **semantic‑release.yml**      | push → `staging`      | tags **vX.Y.Z‑beta.N/rc.N**         |
| **create‑release‑branch.yml** | cron Sun 00:00 EST    | opens `release/YYYY‑MM‑DD` PR       |
| **selective‑deploy.yml**      | push → `main`         | build‑skip logic + Wrangler deploy  |
| **notify‑slack‑discord.yml**  | deployment_status     | channel alerts                      |
| **concurrency‑guard.yml**     | dependency            | blocks overlapping release branches |

---

## 📦 File Timeline (chronological)

### Core config
- `.releaserc.json`
- `.dev.vars.sample` & `.env.sample`
- `biome.json`

### GitHub ecosystem
- `.github/labeler.yml`
- PR templates (`dev`, `staging`, `main`)
- Workflows listed above

### Automation scripts
- `scripts/deploy-from-changelog.js`
- `scripts/create-release-branch.js`
- `scripts/purge-history.js`
- `scripts/x-announce.js`

---

## 🧪 Development milestones

| Date         | Milestone                                |
| ------------ | ---------------------------------------- |
| ✅ 2025‑03‑09 | Astro 5 scaffold complete                |
| ✅ 2025‑03‑15 | Cloudflare Pages deploy set up           |
| ✅ 2025‑03‑29 | Semantic‑release integrated              |
| ✅ 2025‑04‑13 | Selective deploy + cache purge worker    |
| ✅ 2025‑04‑18 | Biome migration; Wrangler Action rollout |

---

## 📄 One‑page cheatsheet

* **feature/* → PR to `dev`** (commitlint via Husky).  
* `dev` must be green before merge to `staging`.  
* `staging` merge triggers **semantic‑release** (beta/rc tag + CHANGELOG).  
* Weekly **create‑release‑branch** job freezes an RC; QA merges it to `main`.  
* `main` pushes run **selective‑deploy** — skip build if docs‑only.  
* Wrangler Action uploads the site; purge script invalidates changed paths.  
* Slack/Discord notifications relay success/failure.  

### CI/CD checklist

- [ ] PRs target only protected branches
- [ ] Conventional Commits (`feat`, `fix`, `post`, `docs`, `chore`…)
- [ ] Biome lint passes locally & in CI
- [ ] Unit tests & coverage ≥ baseline
- [ ] `post:` commits excluded from version bumps
- [ ] Release branch merges use PR template
- [ ] Cloudflare Pages build skipped when no HTML/Assets changed
- [ ] Purge worker logs all invalidated paths
- [ ] RSS + sitemap regenerated only for changed posts

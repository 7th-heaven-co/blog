# GitHub Actions CI / CD Flow for **7th‑Heaven**

> Last updated: 17 Apr 2025

---

## 1 · High‑level picture

```
   feature/*  fix/*  chore/*
        │      │       │           preview/*
        └──────┴───────┴──────────┬─────────────▶ pull‑request → **dev**
                                  │
                                  ▼
                         **CI** (tests + lint)
                                  │
                manual merge / auto‑merge (≥1 approval, squash)
                                  │
                                  ▼
                               **dev**
                                  │ (continuous integration)
                                  ▼
            PR → **staging** (branch protection ✔)  ── beta tag via *semantic‑release*
                                  │
              scheduled job (Sun 00:00 EST) creates
              **release/YYYY‑MM‑DD** branch ▼
                                  │
                                RC tag
                                  │  QA
                                  ▼
            PR → **main** (final approval)  ── stable tag + tweet & email
                                  │
                                  ▼
                    **Selective Deploy** to Cloudflare Pages
                                  │
                                  ├─ success → Slack / Discord notify ✅
                                  └─ failure → Slack / Discord notify ❌
```

* **Semantic‑release** drives versioning + CHANGELOG on `staging`.
* A **concurrency guard** ensures a new release branch can’t spawn until the previous one has merged to `main`.
* **Release branches persist** for hot‑fix cherry‑picks.

---

## 2 · Workflow catalogue

| Workflow file                                 | Trigger                                    | Purpose                                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/auto-label-pr.yml`         | `pull_request` (opened/edited/synchronize) | Auto‑labels PRs based on **target branch** (`target:dev`, `target:staging`) and **source prefix** (`type:feature`, `type:fix`, `type:chore`, `type:preview`). |
| `.github/workflows/pr-title-validation.yml`   | `pull_request` events                      | Fails the check if the title doesn’t follow Conventional Commits.                                                                                             |
| `.github/workflows/test-on-dev.yml`           | `push` to `dev` • PRs _into_ `dev`         | Installs deps, runs `npm test`/`vitest`, uploads coverage.                                                                                                    |
| `.github/workflows/create-release-branch.yml` | **cron**: `0 4 * * 0` (Sun 00:00 EST)      | Creates `release/YYYY‑MM‑DD` from `staging`, opens a PR back to `staging`, tags **vX.Y.Z‑rc.0**.                                                              |
| `.github/workflows/semantic-release.yml`      | `push` to `staging`                        | Generates release notes, bumps version, updates `CHANGELOG.md`, attaches assets.                                                                              |
| `.github/workflows/selective-deploy.yml`      | `push` to `main` • `workflow_dispatch`     | Runs `scripts/deploy-from-changelog.js`; skips build if only docs changed. Exposes `steps.deploy.outputs.SKIPPED_BUILD`.                                      |
| `.github/workflows/notify-slack-discord.yml`  | `deployment_status`                        | Posts success/failure message via `SLACK_WEBHOOK_URL`.                                                                                                        |
| `.github/workflows/concurrency-guard.yml`     | `workflow_dispatch` • dependency           | Blocks `create-release-branch` if an open `release/*→main` PR exists.                                                                                         |

> **Tip 🔎** Install the **GitHub Actions** & **YAML** VS Code extensions and add this to your workspace `settings.json` so all workflow files get schema‑validated:
>
> ```jsonc
> "yaml.schemas": {
>   "https://json.schemastore.org/github-workflow.json": ".github/workflows/*.{yml,yaml}"
> }
> ```

---

## 3 · Key workflows explained

### 3.1 Auto‑label PRs
```yaml
name: Auto Label PR Based on Target / Source Branch
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      # target‑branch labels
      - name: Label PRs targeting staging
        if: github.event.pull_request.base.ref == 'staging'
        uses: actions-ecosystem/action-add-labels@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          labels: target:staging, type:release
      # …more rules (dev, feature/*, fix/*, chore/*, preview/*)
```

### 3.2 Weekly release branch creator
```yaml
name: Create Weekly Release Branch
on:
  schedule:
    - cron: '0 4 * * 0' # Sunday 00:00 EST
jobs:
  create:
    runs-on: ubuntu-latest
    concurrency: release-branch
    steps:
      - uses: actions/checkout@v4
      - name: Create branch + PR
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node scripts/create-release-branch.js
```
* Uses **concurrency group** `release-branch` to avoid overlap.
* Fails gracefully if a `release/*` PR is still open.

### 3.3 Selective deploy to Cloudflare Pages
```yaml
name: Selective Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    outputs:
      skipped: ${{ steps.deploy.outputs.SKIPPED_BUILD }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - id: deploy
        run: node scripts/deploy-from-changelog.js
        env:
          CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
          ZONE_ID:      ${{ secrets.CF_ZONE_ID }}
```
* The Node script inspects `CHANGELOG.md` to decide which paths to purge.
* If nothing requires a build (`SKIPPED_BUILD == 'true'`) the workflow exits early.

---

## 4 · Secrets & environment

| Secret                                        | Used by          | Description                           |
| --------------------------------------------- | ---------------- | ------------------------------------- |
| `GITHUB_TOKEN`                                | *all*            | Auto‑generated token, default scopes. |
| `CF_API_TOKEN`                                | selective‑deploy | Cloudflare API token for cache‑purge. |
| `CF_ZONE_ID`                                  | selective‑deploy | Zone identifier.                      |
| `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ZONE_ID` | legacy scripts   | (fallback) Node Worker purge history. |
| `SLACK_WEBHOOK_URL`                           | notify workflow  | Incoming webhook for notifications.   |

> 💡 Use **Repository Settings ► Secrets and variables ► Actions** to add these.

---

## 5 · Extending the pipeline

1. **Add a linter or type‑check job** in `test-on-dev.yml`.
2. **Publish preview deploys**: target `preview/*` branches and push a Pages preview URL to the PR.
3. **Docs only pathway**: short‑circuit the build if only markdown or `.astro` docs changed.

---

## 6 · Common pitfalls

| Symptom                                       | Likely cause                         | Fix                                                             |
| --------------------------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `Context access might be invalid: CF_ZONE_ID` | Secret name typo / wrong env block   | Ensure secrets are added and referenced correctly under `env:`. |
| `Unexpected value "env"` warning in YAML      | `env:` at wrong indentation level    | Place it under the `run:` step **not** alongside `uses:`.       |
| `kv_namespaces[0] missing "binding"`          | Wrong toml syntax in `wrangler.toml` | Add `binding = "PURGE_HISTORY"` inside the namespace block.     |

---

## 7 · References

- **GitHub Actions docs** — <https://docs.github.com/actions>
- **Semantic‑release** — <https://github.com/semantic-release/semantic-release>
- **Cloudflare Pages** — <https://developers.cloudflare.com/pages>
- **GitHub Actions VS Code extension** — <https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions>

---

*Happy shipping! 💜*


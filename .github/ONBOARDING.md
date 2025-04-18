# ONBOARDING.md

Welcome to **7th‑Heaven**! This guide will have you coding, testing, and shipping in minutes.

---

## 1 · Workstation setup

| Requirement            | Version / Extension                                                     |
| ---------------------- | ----------------------------------------------------------------------- |
| **Node.js**            | 20 LTS (`node --version`)                                               |
| **npm**                | Ships with Node 20                                                      |
| **Git**                | ≥ 2.40                                                                  |
| **VS Code extensions** | *Astro*, **Biome** ( `biomejs.biome` ), *Stylelint* (optional for SCSS) |

```bash
# Clone & install dependencies (deterministic)
git clone https://github.com/your‑org/7th‑heaven.git
cd 7th‑heaven
npm ci
```

### 1.1 Environment variables

We use **two** env files to keep local dev credentials separate from runtime variables:

| File                             | Purpose                                                                                            | Committed?                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `.dev.vars.sample`               | Variables read by **`wrangler dev` / `pages dev`** (Cloudflare Account ID, API keys, KV bindings). | ✅ sample only                                      |
| `.env.sample` → **`.env.local`** | Public/runtime vars used by Astro, Semantic‑release, and local scripts.                            | ✅ sample only – **never** commit real `.env.local` |

```bash
# Copy the templates the first time you clone
git clone https://github.com/your‑org/7th‑heaven.git
cd 7th‑heaven
cp .dev.vars.sample .dev.vars          # for wrangler / pages dev
cp .env.sample     .env.local          # for Astro & scripts
npm ci
```

<details>
<summary>.dev.vars sample (excerpt)</summary>

```env
# .dev.vars
SITE_URL="http://localhost:4321"

# Cloudflare Pages / API
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_API_TOKEN=""
CLOUDFLARE_ZONE_ID=""

# Optional purge worker
CLOUDFLARE_PURGE_URL=""  # https://your-worker.workers.dev
PURGE_HISTORY=<KV_NAMESPACE_BINDING>

# X (formerly Twitter) Developer API
X_API_KEY=""
X_API_SECRET=""
X_ACCESS_TOKEN=""
X_ACCESS_SECRET=""

# Turso database
TURSO_DATABASE_URL=""
TURSO_AUTH_TOKEN=""
```
</details>

<details>
<summary>.env.local sample (excerpt)</summary>

```env
# 📦 GitHub Actions / Semantic‑release
NPM_TOKEN=""
GITHUB_TOKEN=""

# X Developer API (optional)
X_API_KEY=""
X_API_SECRET=""
X_ACCESS_TOKEN=""
X_ACCESS_SECRET=""

# Site metadata
SITE_TITLE=""
SITE_DESCRIPTION=""
SITE_URL="https://7th-heaven.dev"
AUTHOR=""

# Social links
GITHUB=""
DISCORD=""
REDDIT=""
X=""
...

# Turso database
TURSO_DATABASE_URL=""
TURSO_AUTH_TOKEN=""

# Services (optional)
SLACK_WEBHOOK_URL=""
DISCORD_WEBHOOK_URL=""
```
</details>

> **Security note 🔒** `.gitignore` already excludes real `.dev.vars` and `.env.local`. GitHub Actions pull their secrets from **Repo Settings → Secrets & Variables → Actions**.

---

## 2 · Daily workflow

| Task                      | Command               |
| ------------------------- | --------------------- |
| Dev server (hot‑reload)   | `npm run dev`         |
| Re‑compile SCSS on change | `npm run dev-sass`    |
| **Lint (Biome)**          | `npm run lint`        |
| **Format (Biome)**        | `npm run format`      |
| Unit tests (Vitest)       | `npm test`            |
| E2E tests (Playwright)    | `npx playwright test` |

### 2.1 Creating a branch

```bash
git checkout -b feature/awesome‑thing
git push -u origin feature/awesome‑thing
```

### 2.2 Conventional Commits cheat‑sheet

| Type   | Example                                                                              |
| ------ | ------------------------------------------------------------------------------------ |
| `feat` | `feat(filter): add collection buttons`                                               |
| `fix`  | `fix(pagination): correct last‑page calc`                                            |
| `post` | `post(blog): publish dev workflow overview #add-post:dev-workflow date="2025-04-15"` |
| `docs` | `docs: update README`                                                                |

> Husky + Commitlint run automatically on `git commit` and will reject bad messages.

---

## 3 · Pull‑request flow

1. Open a PR **into `dev`** (template auto‑loads).
2. Ensure Biome lint, unit tests and coverage checks are green.
3. At least one approval → **Squash & merge**.

### 3.1 Staging & production promotion

```
main ──► production 🌐
│
└─ staging ─► weekly auto‑merge → main (semantic‑release)
   │
   └─ dev (default)
         ▲
         └─ feature/* fix/* chore/* preview/*
```

* A weekly cron job opens a `release/YYYY‑MM‑DD` branch; once QA passes it merges into **main**.
* **Selective Deploy** skips Cloudflare Pages builds when no user‑visible files changed.

---

## 4 · Testing & quality gates

| Tool                   | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| **Biome**              | Formatter + JS/TS/JSON linter (runs on commit & CI) |
| **Stylelint**          | SCSS lint rules                                     |
| **Vitest**             | Blazing‑fast unit testing                           |
| **Playwright**         | Cross‑browser E2E suites under `tests/e2e/`         |
| **Codecov** (optional) | PR coverage diff & badge                            |

---

## 5 · Debugging tips

| Symptom                                                      | Fix                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| **VS Code says “value is not accepted” for Biome formatter** | Reload the window or ensure the *Biome* extension is enabled. |
| SCSS changes not reflected                                   | Restart `npm run dev` after changing `@use` paths.            |
| GHA “Context access might be invalid”                        | Verify secret names match `env:` vars in the workflow.        |
| Wrangler "Unexpected fields" in toml                         | Place `binding` inside the `[[kv_namespaces]]` block.         |

---

## 6 · Next steps

* Pick a **good‑first‑issue** from GitHub.
* Skim **docs/dev‑docs‑suggestions** (once generated).
* Join the discussion threads & propose improvements.

Happy coding 💜


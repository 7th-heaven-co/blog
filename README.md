# 7th‑Heaven

> *A content‑driven Astro 5 + React 18 blog powered by Cloudflare Pages.*

<!-- <p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/your‑org/7th‑heaven/test-on-dev.yml?label=dev%20tests" alt="Dev tests status" />
  <img src="https://img.shields.io/github/actions/workflow/status/your‑org/7th‑heaven/semantic-release.yml?label=release" alt="Semantic‑release status" />
  <img src="https://img.shields.io/github/license/jazicorn/7th‑heaven" alt="License" />
</p> -->

## Table of Contents

- [7th‑Heaven](#7thheaven)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Quick Start](#quickstart)
  - [Project Structure](#projectstructure)
  - [Scripts](#scripts)
  - [Configuration](#configuration)
  - [Branching \& CI/CD](#branchingcicd)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **Astro 5 + MDX** — static HTML by default with on‑demand React islands.
- **React 18** components where interactivity is required.
- **TypeScript everywhere** (TSX, MDX, Astro, Node scripts).
- **SCSS with design tokens** compiled once at build.
- **Pagination, collection filtering and dynamic routing** (`[...slug].astro`).
- **Biome** formatter/linter — consistent code style & fast linting.
- **Vitest + Playwright** test stack with optional Codecov upload.
- **Semantic‑release** for automatic versioning & changelogs on *staging*.
- **Selective Deploy** workflow — skips Cloudflare Pages build when nothing user‑visible changed.
- **Wrangler Action** deploys to Cloudflare Pages (no Zone‑ID required).
- **Cloudflare KV purge history** & future cache‑purge Function.
- **Commitlint + Husky** enforcing Conventional Commits.

---

## Quick Start

```bash
# 1. Clone
$ git clone https://github.com/your‑org/7th‑heaven.git && cd 7th‑heaven

# 2. Install (Node 20 LTS)
$ npm ci           # or pnpm/bun

# 3. Dev server
$ npm run dev

# 4. Build production bundle
$ npm run build

# 5. Preview locally
$ npm run preview
```

> **Tip 💡** Live‑recompile SCSS with `npm run dev-sass` if you tweak global styles.

---

## Project Structure

```text
.
├─ .github/            # Workflows, PR templates, issue templates
├─ public/             # Static assets served as‑is
├─ src/
│  ├─ components/      # React & Astro UI pieces
│  ├─ hooks/           # Reusable React hooks
│  ├─ layouts/
│  ├─ pages/
│  │   └─ blog/
│  │       ├─ index.astro        # Blog index (pre‑rendered)
│  │       └─ [...slug].astro    # Dynamic post pages
│  ├─ scripts/        # Node helpers (fade, deploy, etc.)
│  └─ styles/
├─ tests/              # Vitest unit tests & Playwright E2E
├─ wrangler.toml       # Cloudflare Pages & KV config
└─ package.json
```

---

## Scripts

| Script     | Purpose                                 |
| ---------- | --------------------------------------- |
| `dev`      | Start Astro dev server with hot‑reload  |
| `dev-sass` | Watch SCSS → `public/styles/global.css` |
| `lint`     | `biome check .`                         |
| `format`   | `biome format . --write`                |
| `test`     | Run Vitest                              |
| `build`    | Compile SCSS then run `astro build`     |
| `preview`  | Serve the built site locally            |

---

## Configuration

| Variable                                                         | Scope            | Description                                            |
| ---------------------------------------------------------------- | ---------------- | ------------------------------------------------------ |
| `SITE_URL`                                                       | `.env` / Secrets | Canonical URL (RSS & SEO)                              |
| `CLOUDFLARE_API_TOKEN`                                           | Secrets          | Direct‑upload token for Wrangler Action & purge script |
| `CLOUDFLARE_ACCOUNT_ID`                                          | Secrets          | Cloudflare account ID                                  |
| `CLOUDFLARE_ZONE_ID`                                             | Secrets          | Zone used only by purge script                         |
| `CODECOV_TOKEN`                                                  | Secrets          | Upload coverage for private repos                      |
| `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET` | Secrets          | X (formerly Twitter) integration                       |

See **`wrangler.toml`** and `.github/workflows/` for exact usage.

---

## Branching & CI/CD

```
main ──► production 🌐
│
└─ staging ─► weekly auto‑merge → main   (semantic‑release)
   │
   └─ dev (default)
         ▲
         └─ feature/*  fix/*  chore/*
```

Workflows:

| Workflow                      | Trigger               | Purpose                                                           |
| ----------------------------- | --------------------- | ----------------------------------------------------------------- |
| **test-on-dev.yml**           | push / PR → `dev`     | Lint (Biome) + unit tests + coverage                              |
| **test-on-staging.yml**       | push / PR → `staging` | Same checks as dev before release                                 |
| **semantic-release.yml**      | push → `staging`      | Version bump, changelog, beta/RC tags                             |
| **create-release-branch.yml** | cron Sun 00:00 EST    | Creates `release/YYYY-MM-DD` branch                               |
| **selective-deploy.yml**      | push → `main`         | Skip build if no site‑visible changes; deploy via Wrangler Action |
| **notify-slack-discord.yml**  | deployment_status     | Notify channels on success/failure                                |

---

## Contributing

1. **Fork** → `feature/your-cool-thing` from **`dev`**.
2. Commit with Conventional Commits (`feat(ui): add pagination`).
3. Ensure `npm run lint` + `npm test` pass.
4. Open a PR to **`dev`** using the provided template.
5. At least one approval → merge. CI will handle the rest.

See **ONBOARDING.md** for detailed setup.

---

## License

<section id="cc">
  <p
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:dct="http://purl.org/dc/terms/"
  >
    <a property="dct:title" rel="cc:attributionURL" href={SITE_URL}
      >7th Heaven</a
    >
    &nbsp;by&nbsp;
    <a
      rel="cc:attributionURL dct:creator"
      property="cc:attributionName"
      href={PROFILE}>Jazicorn</a
    >&nbsp;is licensed under&nbsp;<a
      href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
      target="_blank"
      rel="license noopener noreferrer"
      style="display:inline-block;"
      >CC BY-NC-ND 4.0<img
        style="height:20px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
        alt=""
      /><img
        style="height:20px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
        alt=""
      /><img
        style="height:20px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
        alt=""
      /><img
        style="height:20px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"
        alt=""
      /></a
    >
  </p>
</section>


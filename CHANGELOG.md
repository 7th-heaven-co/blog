## 📦 Release 1.0.0-beta.3


- Merge pull request #27 from jazicorn/dev (732a28a)
- Merge pull request #29 from jazicorn/dev (2b5e73e)
- **ci:** update release to exit if fails commitlint (6819728)
- **pr-template:** add universal project‑wide pull request template (0ffc262)
- **release:** rename to .cjs; header comment updated (e4a7863)
- **release:** switch config to CommonJS release.config.js (ec7bb15)
- **github:** harden Auto Append Deploy Tags workflow (28679fb)


---

## 📦 Release 1.0.0-beta.2


- Merge pull request #20 from jazicorn/auto/deploy-changelog (dd55fe6)
- Merge pull request #21 from jazicorn/auto/deploy-changelog (4862672)
- Merge pull request #23 from jazicorn/dev (8d7b29a)
- Merge pull request #25 from jazicorn/dev (6e54d67)
- **ci:** unblock semantic‑release & CF Pages build (ba7f574)
- **release:** make transform immutable‑safe to stop semantic‑release crash (6cf90c0)
- **release:** migrate to ESM release.config.mjs with grouped emoji notes (f4c2f44)
- **workflow:** stop self‑trigger loop (3b50cae)
- **deploy:** auto-update deploy changelog (585251f)
- **deploy:** auto-update deploy changelog (f8238d2)


---

## 📦 Release Notes


- 🔢 Bump version to 0.0.2 (a405c4a)- 🔢 Bump version to 0.0.3 (a908e3d)- 🔢 Bump version to 0.0.4 (d83b3eb)- added background image file (be72839)- added cloudflare package (256e4ed)- added comment to top of page (d66a372)- added donate button to header (57e083f)- added header link preloads (52e5a08)- added info on colors for site (1afa13c)- added placeholder md files (66e4341)- added pre-load screen (5aa1084)- added sass (2f6ebe1)- added script to deploy staged branch to production branch (cb2e78b)- added testing to project (9ef81ee)- Create LICENSE.md (0677067)- created catalog component to lists posts (16ec39f)- created collections for newsletter categories (cfc9aeb)- created newsletter sign-up form (b238770)- created subscribe page (48ad59a)- fixed const to NEW_VERSION (506ccc0)- fixed newsletter styling (a7c7cdd)- fixed script errors (d137afe)- fixed scripts version auto numbering (6e0cc80)- Initial commit from Astro (b77d98a)- Merge 66e43412af2bf4a07741a713de13891a13901b0d into 81077ed51492166baaf3414a3ff7bb674f578013 (80c08ce)- Merge a405c4aba789eef941a75cc15274caaf131c666f into 7f43cbf4b7e3ce1be2f3aed865fcf77a93069be8 (145a717)- Merge e74cda38b9f60f0570a3b9493cbb6ed846e042b0 into 7f43cbf4b7e3ce1be2f3aed865fcf77a93069be8 (2f7a156)- Merge pull request #10 from jazicorn/dev

updated blog const (eb0fcc6)- Merge pull request #11 from jazicorn/dev

Dev (c222b8c)- Merge pull request #13 from jazicorn/ci/github-actions

ci(github): created github-actions workflow (1603d16)- Merge pull request #14 from jazicorn/dev

ci(github): created github-actions workflow (73a44fc)- Merge pull request #15 from jazicorn/ci/github-actions

ci(workflow): fix label‑name validation in auto‑label.yml (64d6933)- Merge pull request #17 from jazicorn/ci/github-actions

ci(workflow): updating append-deploy‑tags.yml (5af94c3)- Merge pull request #18 from jazicorn/dev

ci(workflow): updating append-deploy‑tags.yml - Staging (8f53f04)- Merge pull request #19 from jazicorn/auto/deploy-changelog

chore(deploy): auto‑update deploy changelog (77e1427)- Merge pull request #4 from jazicorn/dev

Dev (81077ed)- Merge pull request #5 from jazicorn/staged

Staged (1ea29f9)- Merge pull request #6 from jazicorn/dev

added placeholder md files (100812f)- Merge pull request #7 from jazicorn/staged

Staged (fddac31)- Merge pull request #8 from jazicorn/dev

Dev (d8b0987)- Merge pull request #9 from jazicorn/dev

Dev (deb031b)- moved .md files (5eefce4)- moved css files (433a315)- moved from astro:db to turso client (57b6eb2)- moved guides (100c592)- moved robots file (abe9590)- refactored styling, updating css global to scss variables, updated script transitions (e2d58a6)- remove default styling (6ba9a43)- remove unused log (5b1c005)- removed default padding (89c8c73)- removed donate button from header and added it to footer, added additional links to footer, updated home page (f724e21)- removed pull request scripts (4126328)- removed unused astro vite define (a884a7b)- removed unused cloudflare pkg (6bac2e8)- removed unused css (8ebdd86)- removed unused preloads (b7d8a95)- update consts (d2007a7)- update rss to generate when content empty (9415ce4)- update sass function (ec7c686)- update styling (319d759)- update version (8d002ca)- updated and added collections and newsletter categories (3f3be21)- updated background (3bac120)- updated blog const (56b2e60)- updated blog stylesheets (811f498)- updated border (72c0441)- updated bot permissions (e74cda3)- updated cloudflare pages config file (b889cc4)- updated dynamic route for blog posts (1052549)- updated env defaults (39f0129)- updated env defaults (fc859f1)- updated env defaults (51e18b2)- updated env defaults (9cfbcd6)- updated favicon (7f7a420)- updated font (b1a771e)- updated footer (7f43cbf)- updated github action workflows (94392fc)- updated page backgrounds (7bab566)- updated post slug (dae1f21)- updated preload screen by adding radical fade out (b5049c8)- updated project for cloudflare pages settings (622924c)- updated script commands (70eae64)- updated scripts to fix permission issues (8549970)- updated site config (459ff15)- updated styling (7ea535b)- updated subscribe form (fb3daac)- updated url paths to const (7b2ad1d)- **commitlint:** chore(commitlint): ignore “chore(release)” commits & migrate config to ESM

* convert config to ESM (`commitlint.config.mjs`)
* add `ignores` fn to skip semantic‑release commits
* expand `type‑enum` list (ci, build, post) (acc8b58)- **deploy:** chore(deploy): auto-update deploy changelog (c80236a)- **files:** chore(files): removed testing from ci (c7fd95f)- **lint:** chore(lint): satisfy Biome rules across blog pagination & docs

* fix(pagination): replace index keys with stable keys and add type="button"
* chore(lint): run `npm run lint --fix` to apply Biome formatting
* refactor(pagination): swap forEach ➜ for…of and deduplicate imports
* docs(biome): add `docs/biome-notes.md` with config & common fix examples

No functional changes; passes `npm run lint` clean. (9358e97)- **repo:** chore(repo): align release automation, lint rules & docs

* build(wrangler): drop `workers_dev`, nest KV `binding`, tidy Pages‑compatible keys
* chore(commitlint): add `build` to `type‑enum` and migrate config to ESM
* chore(release): extend `.releaserc.json` with explicit `releaseRules` for non‑versioned types
* docs(semantic-tags): rename **CHANGELOG_ACTIONS_TAGS.md** → **SEMANTIC_TAGS.md**
  expand glossary with full commit‑type matrix, tag tables, and usage tips

Signed‑off‑by: $(git config user.name) <$(git config user.email)> (7d83f27)- **repo:** chore(repo): docs, workflows & config overhaul

* docs: add README.md, ONBOARDING.md, and expanded TEST‑PLAN
* docs: introduce bug‑report & feature‑request ISSUE_TEMPLATEs
* docs: add Dev/Stage PR templates, reviewer‑checklists, release‑audit log
* ci: add auto‑label, title‑validation, selective‑deploy, and notify workflows
* ci: codify branch‑protection rules in workflow docs
* build: migrate test scripts to ES6 imports; chain fixture‑generation scripts
* chore(commitlint): extend type‑enum with `post`; update Husky commit‑msg hook
* fix(config): correct KV `binding` in wrangler.toml; move CLOUDFLARE_API_TOKEN env to step
* chore(release): tweak `.releaserc` to ignore `post` commits & auto‑generate CHANGELOG

BREAKING CHANGE: All contributors must use the new PR templates and commit scopes or CI will fail. (7078151)- **github:** ci(github): updated review-checklist-comment.yml (6d0fb5a)- **workflow:** ci(workflow): add auto‑append deploy‑tags PR automation

* **ci:** introduce `.github/workflows/append-deploy-tags.yml`
  * extracts `#add-post:`, `#delete-post:`, `#update-section:` tags
  * appends results to `deploy‑changelog.md`
  * opens self‑merging PR into `staging` (no direct pushes)
* **docs:** add `docs/auto-append-deploy-tags.md` with usage, config & troubleshooting

Closes #<issue‑or‑ticket‑id if any>. (272c1cf)- **workflow:** ci(workflow): fix label‑name validation in auto‑label.yml

* split comma‑separated label string into line‑break list (`|` notation)
* align with actions‑ecosystem/action‑add‑labels input requirements
* no source code changes; CI‑only tweak (f8531d8)- **github:** docs(github): created AUTO_COMMENT_REVIEWER_CHECKLIST.md (5b78e5c)- **github:** docs(github): updated pull_request_dev.md (90995af)- fix: index.astro Catalog import (51512ce)- fix: newsletter page now displays form without error (eb1a29b)- **db:** fix(db): correct import paths for newsletter helpers

* db-newsletter-subscribe.ts: point to shared `libsql` client instead of local copy
* db-user-news-exist.ts: align import with new utils directory

Fixes module‑resolution errors and restores newsletter signup flow. (9a5aea7)- **env:** fix(env): align SITE_* imports in rss.xml.js with astro:env/client

* src/pages/rss.xml.js: replace `consts.ts` import with `astro:env/client`
* mirrors previous fixes in Astro page components
* eliminates remaining build warning for SITE_TITLE/SITE_DESCRIPTION (874f1aa)- **env:** fix(env): correct SITE_* imports in Astro pages

* src/pages/blog/index.astro: switch to `astro:env/client` for SITE_TITLE & SITE_DESCRIPTION
* src/pages/index.astro: same import fix
* src/pages/newsletter.astro: same import fix
* resolves build error: '"SITE_TITLE" is not exported by "src/consts.ts"' (fe1cb7c)- **github:** fix(github): updated validate-pr-title.yml formatting (52f5fa2)- **repo:** fix(repo): rename lint script & correct newsletter subscribe handler

* build(package): update npm script from `lint-fix` to `lint:fix`
* fix(db): point `db-newsletter-subscribe` to correct function (e36d54d)- **title:** fix(title): correct `SITE_TITLE` import across loader, header, and head

* **PgLoader.astro** – point import to the proper `../consts` module so the
  gradient site title shows during the pre‑loader animation.
* **Header.astro** – same import correction; title now renders in the masthead.
* **BaseHead.astro** – align import path to ensure `<title>` and meta tags use
  the correct constant.

No stylesheet changes were required. (fec547e)

---

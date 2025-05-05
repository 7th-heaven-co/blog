## 📦 Release 1.4.0-beta.1


- Merge pull request #60 from 7th-heaven-co/HEAVB-53 (2c17bef)
- Merge pull request #61 from 7th-heaven-co/dev HEAVB-53 (a366df0)
- Merge pull request #62 from 7th-heaven-co/staging HEAVB-53 (0e270ee)
- Merge pull request #64 from 7th-heaven-co/HEAVB-17 (4c05116)
- Merge pull request #65 from 7th-heaven-co/HEAVB-19 (4ee9c1e)
- Merge pull request #66 from 7th-heaven-co/HEAVB-18 (1b56ede)
- Merge pull request #67 from 7th-heaven-co/HEAVB-23 (dd9180b)
- Merge pull request #68 from 7th-heaven-co/dev (c6668a7)
- Merge pull request #69 from 7th-heaven-co/HEAVB-17, HEAVB-18, HEAVB-19, HEAVB-23 (0480ae9)
- Merge pull request #70 from 7th-heaven-co/HEAVB-30 (008b5c9)
- Merge pull request #71 from 7th-heaven-co/HEAVB-54 (7fde04a)
- Merge pull request #72 from 7th-heaven-co/dev (c402cc7)
- Merge pull request #73 from 7th-heaven-co/HEAVB-54 (462f55f)
- Merge pull request #74 from 7th-heaven-co/dev (7f71f52)
- Merge pull request #75 from 7th-heaven-co/staging HEAVB-30, HEAVB-54 (c43fad6)
- Merge pull request #76 from 7th-heaven-co/HEAVB-54 (fab4025)
- Merge pull request #77 from 7th-heaven-co/dev (10fb3ad)
- Merge pull request #78 from 7th-heaven-co/staging (e3a4e9c)
- Merge pull request #79 from 7th-heaven-co/HEAVB-54 (f0efde8)
- Merge pull request #81 from 7th-heaven-co/dev (71db74c)

- **frontend:** :sparkles: add custom 404 page with site-branded design (09e9994)
- **ci-cd:** :bug: enable semantic-release bypass via GitHub App + PAT (7390f74)
- **ci-cd:** :bug: updated all env's for semantic release workflows (8706baa)
- **styling:** :bug: fix footer policy-nav width & text-wrap on mobile (e0b8c4d)
- **styling:** :bug: prevent horizontal overflow on mobile & refine input focus/autofill styles (fa9f8c5)
- **styling:** :bug: updated footer columns from em to px for consistant styling (22fe1de)
- **styling:** :bug: updated to text-align left for blog-post (7059275)
- :ferris_wheel: add branch-gate workflows for main and staging & set them as required checks (92d1484)
- **ci-cd:** :ferris_wheel: 🔒 restrict GITHUB_TOKEN to read-only in guard workflows (e258bf3)
- **ci-cd:** :hammer: updated workflows by moving env to jobs (f8d03ba)
- **ci-cd:** :ferris_wheel: switch semantic-release to GitHub App token and drop extra PAT envs (11379dd)

---

## 📦 Release 1.3.0


- Merge pull request #56 from 7th-heaven-co/HEAVB-52 (68f4c1a)
- Merge pull request #58 from 7th-heaven-co/dev (a2e3628)
- Merge pull request #59 from 7th-heaven-co/staging (9d4c5ef)
- **frontend:** :sparkles: surface newsletter signup form above the fold (2a5a03d)
- **ci-cd:** :ferris_wheel: fix label sync failure by adding issues:write permission (0a281af)
- **ci-cd:** :ferris_wheel: newline-separate LOCAL_COMPONENTS in detect-components.js (83cd32a)
- **release:** 1.3.0-beta.1 [skip ci] (33fd6b5)

---

## 📦 Release 1.3.0-beta.1


- Merge pull request #56 from 7th-heaven-co/HEAVB-52 (68f4c1a)
- Merge pull request #58 from 7th-heaven-co/dev (a2e3628)
- **frontend:** :sparkles: surface newsletter signup form above the fold (2a5a03d)
- **ci-cd:** :ferris_wheel: fix label sync failure by adding issues:write permission (0a281af)
- **ci-cd:** :ferris_wheel: newline-separate LOCAL_COMPONENTS in detect-components.js (83cd32a)


---

## 📦 Release 1.2.0


- Merge pull request #36 from 7th-heaven-co/HEAVB-14 (b2b1e9a)
- Merge pull request #37 from 7th-heaven-co/HEAVB-14 (def9d0d)
- Merge pull request #38 from 7th-heaven-co/dev (060459e)
- Merge pull request #41 from 7th-heaven-co/HEAVB-39 (1b5e899)
- Merge pull request #42 from 7th-heaven-co/dev (eaef585)
- Merge pull request #43 from 7th-heaven-co/auto/deploy-changelog (d9ed403)
- Merge pull request #44 from 7th-heaven-co/auto/deploy-changelog (9fcf278)
- Merge pull request #46 from 7th-heaven-co/HEAVB-31 (15069a1)
- Merge pull request #47 from 7th-heaven-co/dev (7173e97)
- Merge pull request #48 from 7th-heaven-co/dev (9ff0533)
- Merge pull request #49 from 7th-heaven-co/dev (0825109)
- Merge pull request #50 from 7th-heaven-co/dev (403df29)
- Merge pull request #51 from 7th-heaven-co/dev (17fcb98)
- Merge pull request #52 from 7th-heaven-co/staging (ce8ed23)
- **ci-cd:** :sparkles: consolidate CI & runtime failure reporting with SHA-256 de-dupe (fb31605)
- **ci-cd:** :bug: pass correct Jira issue_key to gajira-transition (6e01508)
- **ci-cd:** :ferris_wheel: align env var names in jira-components.yml (b9aa642)
- **ci-cd:** :ferris_wheel: fan-out transition workflow to handle multiple Jira keys (f24f22a)
- **ci-cd:** :ferris_wheel: fix “Auto Append Deploy Tags” workflow when no deploy tags are present (d82e2d7)
- **ci-cd:** :ferris_wheel: import minimatch as named export (6063f42)
- **ci-cd:** :ferris_wheel: point validate-commit-scopes.yml to verify-components-map.js (502e396)
- **ci-cd:** :ferris_wheel: scaffold single-source component tooling (1d4e56b)
- **github-actions:** :ferris_wheel: fix word-splitting in workflow (d55f0ce)
- **release-workflow:** :ferris_wheel: ♻️  skip weekly release when no staging commits & enable Slack (57503eb)
- **release-workflow:** :ferris_wheel: gate weekly release on changes & add Slack alert (b8d55d9)
- **deploy:** auto-update deploy changelog (a7a5586)
- **deploy:** auto-update deploy changelog (900868d)
- **release:** 1.2.0-beta.1 [skip ci] (bcd71b8)
- **release:** 1.2.0-beta.2 [skip ci] (a82060f)


---

## 📦 Release 1.2.0-beta.2


- Merge pull request #51 from 7th-heaven-co/dev (17fcb98)
- **ci-cd:** :bug: pass correct Jira issue_key to gajira-transition (6e01508)


---

## 📦 Release 1.2.0-beta.1


- Merge pull request #36 from 7th-heaven-co/HEAVB-14 (b2b1e9a)
- Merge pull request #37 from 7th-heaven-co/HEAVB-14 (def9d0d)
- Merge pull request #38 from 7th-heaven-co/dev (060459e)
- Merge pull request #41 from 7th-heaven-co/HEAVB-39 (1b5e899)
- Merge pull request #42 from 7th-heaven-co/dev (eaef585)
- Merge pull request #43 from 7th-heaven-co/auto/deploy-changelog (d9ed403)
- Merge pull request #44 from 7th-heaven-co/auto/deploy-changelog (9fcf278)
- Merge pull request #46 from 7th-heaven-co/HEAVB-31 (15069a1)
- Merge pull request #47 from 7th-heaven-co/dev (7173e97)
- Merge pull request #48 from 7th-heaven-co/dev (9ff0533)
- Merge pull request #49 from 7th-heaven-co/dev (0825109)
- Merge pull request #50 from 7th-heaven-co/dev (403df29)
- **ci-cd:** :sparkles: consolidate CI & runtime failure reporting with SHA-256 de-dupe (fb31605)
- **ci-cd:** :ferris_wheel: align env var names in jira-components.yml (b9aa642)
- **ci-cd:** :ferris_wheel: fan-out transition workflow to handle multiple Jira keys (f24f22a)
- **ci-cd:** :ferris_wheel: fix “Auto Append Deploy Tags” workflow when no deploy tags are present (d82e2d7)
- **ci-cd:** :ferris_wheel: import minimatch as named export (6063f42)
- **ci-cd:** :ferris_wheel: point validate-commit-scopes.yml to verify-components-map.js (502e396)
- **ci-cd:** :ferris_wheel: scaffold single-source component tooling (1d4e56b)
- **github-actions:** :ferris_wheel: fix word-splitting in workflow (d55f0ce)
- **release-workflow:** :ferris_wheel: ♻️  skip weekly release when no staging commits & enable Slack (57503eb)
- **release-workflow:** :ferris_wheel: gate weekly release on changes & add Slack alert (b8d55d9)
- **deploy:** auto-update deploy changelog (a7a5586)
- **deploy:** auto-update deploy changelog (900868d)


---

## 📦 Release 1.1.1


- **ci:** :bug: removed unsupported with block (786919d)
- **append-deploy-tags:** :ferris_wheel: remove branches-ignore and scope concurrency correctly (420b43a)
- **jira:** :ferris_wheel: configured jira (f1c93f5)


---

## 📦 Release 1.1.0


- Merge pull request #31 from 7th-heaven-co/dev (cb64e97)
- **css:** add View Transitions and upgrade tooling (ffd4572)
- **ui:** add about to home page #update-section:about (47296fe)
- **newsletter:** import global stylesheet so page styles load (13bd3b9)


---

## 📦 Release 1.0.0


- 🔢 Bump version to 0.0.2 (a405c4a)
- 🔢 Bump version to 0.0.3 (a908e3d)
- 🔢 Bump version to 0.0.4 (d83b3eb)
- added background image file (be72839)
- added cloudflare package (256e4ed)
- added comment to top of page (d66a372)
- added donate button to header (57e083f)
- added header link preloads (52e5a08)
- added info on colors for site (1afa13c)
- added placeholder md files (66e4341)
- added pre-load screen (5aa1084)
- added sass (2f6ebe1)
- added script to deploy staged branch to production branch (cb2e78b)
- added testing to project (9ef81ee)
- Create LICENSE.md (0677067)
- created catalog component to lists posts (16ec39f)
- created collections for newsletter categories (cfc9aeb)
- created newsletter sign-up form (b238770)
- created subscribe page (48ad59a)
- fixed const to NEW_VERSION (506ccc0)
- fixed newsletter styling (a7c7cdd)
- fixed script errors (d137afe)
- fixed scripts version auto numbering (6e0cc80)
- Initial commit from Astro (b77d98a)
- Merge 66e43412af2bf4a07741a713de13891a13901b0d into 81077ed51492166baaf3414a3ff7bb674f578013 (80c08ce)
- Merge a405c4aba789eef941a75cc15274caaf131c666f into 7f43cbf4b7e3ce1be2f3aed865fcf77a93069be8 (145a717)
- Merge e74cda38b9f60f0570a3b9493cbb6ed846e042b0 into 7f43cbf4b7e3ce1be2f3aed865fcf77a93069be8 (2f7a156)
- Merge pull request #13 from jazicorn/ci/github-actions (1603d16)
- Merge pull request #15 from jazicorn/ci/github-actions (64d6933)
- Merge pull request #17 from jazicorn/ci/github-actions (5af94c3)
- Merge pull request #4 from jazicorn/dev (81077ed)
- Merge pull request #5 from jazicorn/staged (1ea29f9)
- Merge pull request #6 from jazicorn/dev (100812f)
- Merge pull request #7 from jazicorn/staged (fddac31)
- moved .md files (5eefce4)
- moved css files (433a315)
- moved from astro:db to turso client (57b6eb2)
- moved guides (100c592)
- moved robots file (abe9590)
- refactored styling, updating css global to scss variables, updated script transitions (e2d58a6)
- remove default styling (6ba9a43)
- remove unused log (5b1c005)
- removed default padding (89c8c73)
- removed donate button from header and added it to footer, added additional links to footer, updated home page (f724e21)
- removed pull request scripts (4126328)
- removed unused astro vite define (a884a7b)
- removed unused cloudflare pkg (6bac2e8)
- removed unused css (8ebdd86)
- removed unused preloads (b7d8a95)
- update consts (d2007a7)
- update rss to generate when content empty (9415ce4)
- update sass function (ec7c686)
- update styling (319d759)
- update version (8d002ca)
- updated and added collections and newsletter categories (3f3be21)
- updated background (3bac120)
- updated blog const (56b2e60)
- updated blog stylesheets (811f498)
- updated border (72c0441)
- updated bot permissions (e74cda3)
- updated cloudflare pages config file (b889cc4)
- updated dynamic route for blog posts (1052549)
- updated env defaults (39f0129)
- updated env defaults (fc859f1)
- updated env defaults (51e18b2)
- updated env defaults (9cfbcd6)
- updated favicon (7f7a420)
- updated font (b1a771e)
- updated footer (7f43cbf)
- updated github action workflows (94392fc)
- updated page backgrounds (7bab566)
- updated post slug (dae1f21)
- updated preload screen by adding radical fade out (b5049c8)
- updated project for cloudflare pages settings (622924c)
- updated script commands (70eae64)
- updated scripts to fix permission issues (8549970)
- updated site config (459ff15)
- updated styling (7ea535b)
- updated subscribe form (fb3daac)
- updated url paths to const (7b2ad1d)
- **ci:** unblock semantic‑release & CF Pages build (ba7f574)
- **db:** correct import paths for newsletter helpers (9a5aea7)
- **env:** align SITE_* imports in rss.xml.js with astro:env/client (874f1aa)
- **env:** correct SITE_* imports in Astro pages (fe1cb7c)
- **github:** updated validate-pr-title.yml formatting (52f5fa2)
- index.astro Catalog import (51512ce)
- newsletter page now displays form without error (eb1a29b)
- **release:** make transform immutable‑safe to stop semantic‑release crash (6cf90c0)
- **repo:** rename lint script & correct newsletter subscribe handler (e36d54d)
- **title:** correct `SITE_TITLE` import across loader, header, and head (fec547e)
- **github:** created AUTO_COMMENT_REVIEWER_CHECKLIST.md (5b78e5c)
- **github:** updated pull_request_dev.md (90995af)
- **pr-template:** add universal project‑wide pull request template (0ffc262)
- **release:** migrate to ESM release.config.mjs with grouped emoji notes (f4c2f44)
- **release:** rename to .cjs; header comment updated (e4a7863)
- **release:** switch config to CommonJS release.config.js (ec7bb15)
- **github:** harden Auto Append Deploy Tags workflow (28679fb)
- **github:** updated review-checklist-comment.yml (6d0fb5a)
- **workflow:** add auto‑append deploy‑tags PR automation (272c1cf)
- **workflow:** fix label‑name validation in auto‑label.yml (f8531d8)
- **workflow:** stop self‑trigger loop (3b50cae)
- **commitlint:** ignore “chore(release)” commits & migrate config to ESM (acc8b58)
- **files:** removed testing from ci (c7fd95f)
- **lint:** satisfy Biome rules across blog pagination & docs (9358e97)
- **repo:** align release automation, lint rules & docs (7d83f27)
- **repo:** docs, workflows & config overhaul (7078151)


---

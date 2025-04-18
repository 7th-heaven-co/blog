# 🧩 `deploy-from-changelog.js`

This script powers your **selective content deployment system**, based on entries in `deploy-changelog.md`. It conditionally builds your site, triggers a Cloudflare purge, and manages changelog archiving — all tailored for your solo dev workflow.

---

## 🚀 Features

- ✅ Parses `deploy-changelog.md` with support for:
  - `#add-post:slug title="..." date="..."`
  - `#delete-post:slug`
  - `#update-section:section`
- ✅ Outputs `scripts/parsed-paths.json` for cache purging
- ✅ Supports local testing via `--local`
- ✅ Optional Cloudflare purge with `--purge`
- ✅ Validation and CI safety with `--strict`
- ✅ Archives processed changelog entries to `deploy-changelog.archive.md`

---

## 📦 Usage

### 🔁 Basic Usage
```bash
node scripts/deploy-from-changelog.js
```

### 🧪 Local Test Mode
Skips build, archive, and CI-specific behavior:
```bash
node scripts/deploy-from-changelog.js --local
```

### 🔐 Trigger a Purge via Worker URL
Must have `CLOUDFLARE_PURGE_URL` defined in your environment or `.env`:
```bash
node scripts/deploy-from-changelog.js --local --purge
```

### 🔒 Enforce Validation with `--strict`
Will exit the script if:
- `slug` is malformed
- `title` or `date` is missing on `#add-post`
- paths don’t match `/blog/...`
```bash
node scripts/deploy-from-changelog.js --strict
```

---

## 📁 Inputs

### `deploy-changelog.md`  
Located at the root of your project. Contains deployment instructions like:
```md
#add-post:my-new-post title="New Post" date="2025-04-18"
#update-section:community
#delete-post:old-guide
```

---

## 📤 Outputs

- `scripts/parsed-paths.json`: used by cache purge scripts
- `deploy-changelog.archive.md`: archived entries with timestamp
- Local build triggered via `npm run build`

---

## 🧪 Testing Helpers

Use these scripts to generate test fixtures:

```bash
npm run test:changelog
npm run test:paths
npm run test:fixtures      # generates both + runs deploy script locally
npm run test:deploy-local  # manually runs the deploy script in local mode
```

---

## 🧠 Tips

- Add `--strict` to enforce formatting before pushing to `staging`
- You can inspect `parsed-paths.json` manually before triggering a purge
- Run purge workflow separately by pushing that file or triggering via GitHub Actions

---
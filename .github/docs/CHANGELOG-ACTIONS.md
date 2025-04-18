# 📦 CHANGELOG-ACTIONS.md — Changelog Tag Reference

## Supported Tags
- `#add-post:slug` — adds a blog post
- `#delete-post:slug` — removes a blog post
- `#update-section:slug` — rebuilds a static section

## Optional Extended Tags
- `#draft-post:slug`
- `#sync:airtable:slug`
- `#refresh-feed:collection`

### Example Commits
```bash
feat(ui): add pagination to blog index
feat(preloader): introduce fade transitions
feat(filter): support collection tag filtering
feat(blog): add launch recap #add-post:launch-recap title="Launch Recap" date="2025-04-12"

post(blog): publish dev workflow overview #add-post:dev-workflow title="Solo Dev CI/CD" date="2025-04-15"
post(blog): schedule announcement #draft-post:ai-preview

docs: update about section #update-section:about
docs(rss): refresh community feed #refresh-feed:community

chore: remove deprecated AI post #delete-post:old-ai-guide
chore(sync): import product news from Airtable #sync:airtable:product-update
```

## 🚫 Special Handling Tags
- ✅ `post:` commits (used for blog content only) **will not trigger** a version bump or changelog update — this is configured via `releaseRules` in `.releaserc.json`.

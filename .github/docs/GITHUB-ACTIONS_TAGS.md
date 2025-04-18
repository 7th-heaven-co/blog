# 🏷️ TAGS.md — Commit / Changelog Tags Glossary

## 🚀 Release Tags (Used in Commit Messages)

### `#add-post:slug`
Adds a new blog post. Can auto-generate `.mdx` file.

### `#delete-post:slug`
Flags a post for deletion. Can auto-remove `.mdx` file.

### `#update-section:slug`
Triggers selective rebuild or cache purge for non-post pages.

---

## 🧪 Experimental Tags (Ideas for Future Expansion)

### `#draft-post:slug`
Generates `.mdx` with `draft: true` frontmatter.

### `#sync:airtable:slug`
Integrates external data via sync script.

### `#refresh-feed:collection`
Triggers RSS feed rebuild for one category only.

---

## 📥 Post Content Tags

### `post:`
Use for blog-only commits that affect content but not code.
- Example: `post(blog): publish author spotlight`
- These will **not trigger** version bumps

---

## 🧠 Usage Tips
- Tags should appear at the **end** of your commit or changelog line
- Tags are case-sensitive
- Don’t use spaces inside slugs: use `-` or `_`

**Example Commits:**
```bash
post(blog): publish accessibility article #add-post:accessible-ui title="Accessible UI" date="2025-04-17"
post(blog): schedule teaser for product launch #draft-post:product-teaser
feat(ui): add filter component #update-section:projects
```

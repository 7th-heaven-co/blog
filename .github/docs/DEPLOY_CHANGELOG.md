# 🚀 Deploy Changelog

This file is used by the `deploy-from-changelog.js` script to determine which routes need to be rebuilt, purged, or skipped.

---

## 🧠 Usage

Use **one line per directive**. Each line must begin with one of the following keywords:

### ✅ Add a post

```md
#add-post:your-post-slug title="Post Title" date="YYYY-MM-DD"

❌ Delete a post

#delete-post:your-old-slug

🔁 Update a section

#update-section:section-name

✍️ Examples

#add-post:april-update title="April Site Update" date="2025-04-16"
#add-post:guide-to-astro title="Guide to Astro"
#update-section:community
#delete-post:deprecated-methods

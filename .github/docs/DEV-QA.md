# ❓ QA.md — Developer Questions & Insights

### Q: Do I need NPM publishing?
A: No, semantic-release still works for changelogs + versioning without publishing.

### Q: Can I delete .mdx posts manually?
A: Yes, if `AUTO_DELETE_ENABLED = false`, nothing will break.

### Q: Can I preview just one blog post?
A: Yes. Enable `ASTRO_ENV=preview` and use `parsed-paths.json` to restrict `getStaticPaths()`.

### Q: Do I need Cloudflare API tokens?
A: Only if you're using the purge Worker. Not needed for regular Pages.

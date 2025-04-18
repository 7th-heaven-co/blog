# ✍️ CONTRIBUTING.md

Thank you for contributing to the 7th-Heaven project!
This guide outlines our preferred workflows, commit formats, and tagging conventions.

---

## 🧪 1. Development Workflow

- Fork and clone the repo
- Use feature branches: `feature/your-feature-name`
- Open a PR into `dev` — never commit directly to `main`, `staging`, or `dev`
- Use conventional commits (see below)
- Ensure tests pass before pushing

---

## ✅ 2. Commit Message Format (Conventional Commits)

**Format:**
```
type(scope): subject
```

**Examples:**
```bash
feat(pagination): add next batch nav
fix(preloader): prevent flicker
post(blog): publish new article on filters
```

### Supported Types
- `feat` – new features
- `fix` – bug fixes
- `chore` – tooling and maintenance
- `docs` – documentation updates
- `refactor` – code changes without user-facing impact
- `style` – formatting only
- `test` – tests and fixtures
- `ci` – CI configuration
- `post` – blog/content-only commits (excluded from versioning)

---

## 🏷️ 3. Changelog Automation Tags

Tags are placed at the **end of the commit message** to automate behavior:

| Tag                        | Description                               |
| -------------------------- | ----------------------------------------- |
| `#add-post:slug`           | Adds a new `.mdx` file or Astro blog post |
| `#delete-post:slug`        | Removes a post and purges if enabled      |
| `#update-section:slug`     | Triggers rebuild of a static route        |
| `#draft-post:slug`         | Creates post in draft mode                |
| `#sync:airtable:slug`      | Imports from Airtable via sync script     |
| `#refresh-feed:collection` | Triggers partial RSS rebuild              |

**Example:**
```bash
post(blog): launch accessibility article #add-post:accessible-ui title="Accessible UI" date="2025-04-17"
```

---

## ⚙️ 4. Pull Requests

Use PR templates:
- Use `pull_request_template_dev.md` when targeting `dev`
- Use `pull_request_template_staging.md` when promoting `dev → staging`

**All PRs must:**
- Use semantic titles
- Include labels like `type:feature`, `target:staging`, etc.
- Be approved before merging (even solo contributors)

---

For questions or suggestions, open an issue or ping a maintainer. Thanks again!

# Biome (Formatter + Linter) Notes

These notes capture **how we configured Biome** for the 7th Heaven repo and give **real‑world examples of fixes** that were required to satisfy its rules.

---

## 1. Biome Configuration Snapshot

```jsonc
// biome.json (trimmed)
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  }
}
```

Key take‑aways:

- **Opinionated formatter** – Biome will re‑print a file if indentation, quotes or line‑width diverge.
- **Recommended rules** active; many map 1‑to‑1 to ESLint’s best‑practice set.

> **Tip**  Add `"check": "biome check"` and `"fix": "biome check --apply"` to your package scripts to keep code clean.

---

## 2. Common Lint / Format Errors & Fixes

| Rule                                                                          | What it flags                                          | Real‑world fix                                                                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **`noExplicitAny`**                                                           | Use of `any` type.                                     | Created lightweight interfaces (e.g. `BlogEntry`) instead of `any` in **Post.tsx** citeturn1file1.                     |
| **`useExhaustiveDependencies`**                                               | Missing/extra deps in React hooks.                     | Added/stabilised callbacks or removed unused deps in **Catalog.tsx** updates.                                             |
| **`noForEach`** (complexity)                                                  | Prefers `for..of` over `forEach` for perf/readability. | Replaced `forEach` loop in `SubscribeNewsletterForm` payload builder with `for…of` (see commit `chore: replace forEach`). |
| **`noArrayIndexKey`**                                                         | React keys should be stable – not array indices.       | Generated semantic keys (`'ellipsis‑0'`, `'1'`, …) in **Pagination.tsx** citeturn1file7.                               |
| **`useButtonType`**                                                           | `<button>` missing explicit `type`.                    | Added `type="button"` in **PaginationButton.tsx** citeturn1file6 and **Filter.tsx** citeturn1file0.                 |
| **Accessibility – ****`noLabelWithoutControl`**** / ****`noSvgWithoutTitle`** | Labels without `htmlFor`; SVGs without title / aria.   | Linked each checkbox label to its input and added `<title>` inside success SVG in `SubscribeNewsletterForm`.              |
| **`noRedeclare`**                                                             | Duplicate imports/identifiers in the same file.        | Removed doubled imports in the pagination component after copy‑paste merge.                                               |
| **Formatter diff**                                                            | Biome auto‑wraps long destructurings & param lists.    | Accepted formatter output in final **Pagination.tsx**; keep lines ≤ 100 chars.                                            |

---

### Example Fix – Pagination Keys

```diff
- {pagesToDisplay.map((page, index) => (
-   <span key={index}>…
+ let ellipsisId = 0;
+ const keyedPages = pagesToDisplay.map((p) =>
+   typeof p === 'number'
+     ? { key: p.toString(), value: p }
+     : { key: `ellipsis-${ellipsisId++}`, value: 'ellipsis' },
+ );
+
+ {keyedPages.map(({ key, value }) => (
+   <span key={key}>…
```

### Example Fix – Remove `any`

```diff
-interface PostProps {
-  post: any;
+interface BlogEntry {
+  data: { title: string; pubDate: Date | string };
+  [key: string]: unknown;
+}
+
+interface PostProps {
+  post: BlogEntry;
```

### Example Fix – forEach → for…of

```diff
- ['heaven','announcements',…].forEach((key) => {
-   if (validated[key]) payload.append(key, 'on');
- });
+for (const key of ['heaven','announcements',…] as const) {
+  if (validated[key]) payload.append(key, 'on');
+}
```

---

## 3. Authoring Guidelines

1. **Let Biome format for you** – run `biome check --apply` pre‑commit.
2. Prefer **specific types / generics** to `any`.
3. When iterating arrays for side‑effects, default to `for…of`.
4. Provide `type="button"` on non‑form buttons and stable `key` props in React lists.
5. Use `aria` labels / `<title>` for interactive SVGs and link every `<label>` via `htmlFor`.

---

### Further Reading

- [Biome documentation](https://biomejs.dev/)
- [Migration guide from ESLint + Prettier](https://biomejs.dev/docs/migration/eslint)

Happy lint‑free coding! 🎉


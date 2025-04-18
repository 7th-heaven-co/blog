# 👁️ PREVIEW.md — Preview Branch Guide

## Use Cases
- Styling previews
- Single-page render tests

## Astro
```ts
if (process.env.ASTRO_ENV === 'preview') {
  // Restrict static paths
}
```

## Tips
- Never merge preview to staging
- Clean up after testing

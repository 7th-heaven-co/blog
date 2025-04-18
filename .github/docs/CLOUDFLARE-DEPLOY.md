# 🚀 DEPLOY.md — Cloudflare Deployment Strategy

## Pages Config
- Build Command: `npm run build`
- Output Dir: `dist/`

## ENV Vars
- `SITE_URL`
- `X_*` for announcements
- `CF_*` for cache purge (optional)
- `TURSO_*` for database access

## Optional
- Bind KV: `PURGE_HISTORY`
- Add Worker route for `/functions/purge`

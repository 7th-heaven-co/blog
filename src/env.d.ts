interface ImportMetaEnv {
  readonly NPM_TOKEN: string
  readonly GITHUB_TOKEN: string
  readonly X_API_KEY: string
  readonly X_API_SECRET: string
  readonly X_ACCESS_TOKEN: string
  readonly X_ACCESS_SECRET: string
  readonly CLOUDFLARE_API_TOKEN: string
  readonly CLOUDFLARE_ZONE_ID: string
  readonly PURGE_HISTORY: string
  readonly SITE_TITLE: string
  readonly SITE_DESCRIPTION: string
  readonly SITE_URL: string
  readonly PROFILE: string
  readonly AUTHOR: string
  readonly GITHUB: string
  readonly DISCORD: string
  readonly REDDIT: string
  readonly X: string
  readonly FACEBOOK: string
  readonly INSTAGRAM: string
  readonly LINKEDIN: string
  readonly YOUTUBE: string
  readonly TIKTOK: string
  readonly CONTACT_EMAIL: string
  readonly SUPPORT_EMAIL: string
  readonly TURSO_DATABASE_URL: string
  readonly TURSO_AUTH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

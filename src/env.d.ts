interface ImportMetaEnv {
  readonly ASTRO_DB_REMOTE_URL: string
  readonly ASTRO_DB_APP_TOKEN: string

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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

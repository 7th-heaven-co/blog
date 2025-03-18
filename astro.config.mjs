// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import db from '@astrojs/db';
import react from '@astrojs/react';
import node from '@astrojs/node';

import { loadEnv } from "vite";

const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [    
    sitemap({
      changefreq: 'weekly',
    }), mdx(), db(), react()],
  adapter: node({
    mode: 'standalone',
  }),
  env: {
    schema: {
      ASTRO_DB_REMOTE_URL: envField.string({ context: "server", access: "secret" }),
      ASTRO_DB_APP_TOKEN: envField.string({ context: "server", access: "secret" }),
      SITE_TITLE: envField.string({ context: "client", access: "public", default: "7th Heaven" }),
      SITE_DESCRIPTION: envField.string({ context: "client", access: "public", default: "Before The Fall" }),
      SITE_URL: envField.string({ context: "client", access: "public" }),
      PROFILE: envField.string({ context: "client", access: "public" }),
      AUTHOR: envField.string({ context: "client", access: "public" }),
      GITHUB: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      DISCORD: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      REDDIT: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      X: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      FACEBOOK: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      INSTAGRAM: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      LINKEDIN: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      YOUTUBE: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      TIKTOK: envField.string({ context: "client", access: "public", default: `${SITE_URL}/socials` }),
      CONTACT_EMAIL: envField.string({ context: "client", access: "public" }),
      SUPPORT_EMAIL: envField.string({ context: "client", access: "public" }),
    }
  }
});
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// @ts-check
import { defineConfig, envField } from 'astro/config';
import sass from 'sass';
import { loadEnv } from 'vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://7th-heaven.blog',
  integrations: [sitemap({ changefreq: 'weekly' }), mdx(), react()],
  adapter: cloudflare(),
  output: 'server',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['src/styles'],
        },
      },
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: {
        'react-dom/server.browser': 'react-dom/server.edge',
      },
    },
    ssr: {
      external: [
        'node:fs',
        'node:path',
        'node:vm',
        'node:events',
        'node:url',
        'node:util',
        'node:https',
        'node:http',
        'node:stream',
        'node:zlib',
        'node:buffer',
        'node:net',
        'node:tls',
        'node:crypto',
        'node:assert',
        'node:string_decoder',
        'node:child_process',
        'node:os',
        'node:whatwg-url',
        'node:jsdom',
      ],
    },
    build: {
      minify: false,
      rollupOptions: {
        external: ['jsdom'],
      },
    },
  },
  env: {
    schema: {
      TURSO_DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      TURSO_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret' }),
      SITE_TITLE: envField.string({ context: 'client', access: 'public', default: '7th Heaven' }),
      SITE_DESCRIPTION: envField.string({
        context: 'client',
        access: 'public',
        default: 'Before The Fall',
      }),
      SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog',
      }),
      PROFILE: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://github.com/jazicorn',
      }),
      AUTHOR: envField.string({ context: 'client', access: 'public', default: 'Jazicorn' }),
      GITHUB: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      DISCORD: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      REDDIT: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      X: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      FACEBOOK: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      INSTAGRAM: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      LINKEDIN: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      YOUTUBE: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      TIKTOK: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://7th-heaven.blog/socials',
      }),
      CONTACT_EMAIL: envField.string({
        context: 'client',
        access: 'public',
        default: 'john@doe.com',
      }),
      SUPPORT_EMAIL: envField.string({
        context: 'client',
        access: 'public',
        default: 'john@doe.com',
      }),
    },
  },
});

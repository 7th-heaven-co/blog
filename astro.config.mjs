// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import db from '@astrojs/db';
import react from '@astrojs/react';
import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  site: 'https://7th-heaven.jazicorn.com',
  integrations: [mdx(), sitemap(), db(), react()],

  adapter: node({
    mode: 'standalone',
  }),
});
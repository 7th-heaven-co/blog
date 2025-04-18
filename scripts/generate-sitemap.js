import fs from 'node:fs';
import paths from './parsed-paths.json';

import 'dotenv/config';

const version = process.argv[2];
const baseUrl = `${process.env.SITE}`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.updatedPaths.map((p) => `  <url><loc>${baseUrl}${p}</loc></url>`).join('\n')}\n</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('🗺️ Sitemap updated with modified paths.');

/**
 * 🧪 Test Fixture Generator (ES6)
 * Generates a fake parsed-paths.json for local deploy and purge testing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = {
  updatedPaths: [
    "/blog/test-post-1",
    "/blog/test-post-2",
    "/about"
  ],
  deletedPaths: [
    "/blog/deleted-post-1",
    "/blog/deleted-post-2",
    "/privacy"
  ]
};

const outDir = path.resolve(__dirname, '../../scripts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const filePath = path.join(outDir, "parsed-paths.test.json");
fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

console.log(`✅ Test parsed-paths.json written to ${filePath}`);

console.table(result);

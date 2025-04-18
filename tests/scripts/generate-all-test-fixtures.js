/**
 * 🧪 Combined Fixture Generator — DRY version
 * - Calls generate-test-parsed-paths.js
 * - Creates deploy-changelog.test.md
 * - Runs deploy-from-changelog.js in local test mode
 *
 * Optional forward‑flags: --strict  --purge
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Flags you want to pass through to deploy script
const extraFlags = process.argv
  .slice(2)
  .filter(f => ['--strict', '--purge'].includes(f))
  .join(' ');

/* 1️⃣  Run the parsed‑paths generator */
try {
  execSync('node tests/scripts/generate-test-parsed-paths.js', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Failed to generate parsed-paths:', err.message);
  process.exit(1);
}

/* 2️⃣  Create deploy‑changelog.test.md */
const changelogFile = path.resolve(__dirname, '../../deploy-changelog.test.md');
fs.writeFileSync(
  changelogFile,
  '#add-post:x title="X" date="2025-01-01"',
);
console.log('✅ wrote', changelogFile);

/* 3️⃣  Run deploy script in local test mode */
try {
  execSync(
    `node scripts/deploy-from-changelog.js --local --test ${extraFlags}`,
    { stdio: 'inherit' }
  );
} catch (err) {
    console.error('❌ deploy script error:', err.message);
}

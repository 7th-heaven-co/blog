// tests/scripts/generate-test-deploy-from-changelog.js

/**
 * 🧪 CLI Testing Script for deploy-from-changelog.js
 *
 * This script lets you run deploy-from-changelog.js with any combination
 * of CLI flags: --local, --strict, --purge
 *
 * Usage:
 *   node tests/scripts/generate-test-deploy-from-changelog.js [--local] [--strict] [--purge]
 */

import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const flags = args.filter((arg) => ['--local', '--strict', '--purge'].includes(arg)).join(' ');

try {
  console.log(`▶️ Running: deploy-from-changelog.js ${flags}`);
  execSync(`node scripts/deploy-from-changelog.js ${flags}`, { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Error running deploy-from-changelog.js:', err.message);
}

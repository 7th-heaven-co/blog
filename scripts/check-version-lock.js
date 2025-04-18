// ✅ Prevent PRs from modifying the version manually in package.json
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const original = JSON.parse(fs.readFileSync('./package-lock.json', 'utf-8'));

if (pkg.version !== original.version) {
  console.error(
    '❌ Error: Do not manually change package.json version. Semantic-release will handle this.',
  );
  process.exit(1);
} else {
  console.log('✅ Version is locked to package-lock.json. All good.');
}

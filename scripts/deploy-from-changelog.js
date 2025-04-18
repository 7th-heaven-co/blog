/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/* ---------------- CLI flags ---------------- */
const isLocal = process.argv.includes('--local');
const shouldPurge = process.argv.includes('--purge');
const isStrict = process.argv.includes('--strict');
const isTest = process.argv.includes('--test');
const prefixArg = process.argv.find((f) => f.startsWith('--file-prefix='));
const prefix = prefixArg ? prefixArg.split('=')[1] : isTest ? 'test' : '';
const withPrefix = (f, p = prefix) => (p ? f.replace('.', `.${p}.`) : f);

/* ---------------- file names ---------------- */
const changelogFile = withPrefix('deploy-changelog.md');
const archiveFile = withPrefix('deploy-changelog.archive.md');
const parsedPathsFile = withPrefix('scripts/parsed-paths.json');

/* ---------------- parse changelog ---------------- */
const changelog = fs.existsSync(changelogFile) ? fs.readFileSync(changelogFile, 'utf-8') : '';
const lines = changelog.split('\n');

const updatedPaths = [];
const deletedPaths = [];
let hasValidationErrors = false;

for (const line of lines) {
  // postMatch ex: #add-post:my-slug title="My Title" date="2025-04-18"
  const postMatch = line.match(/#add-post:([\w-]+)(.*)/);
  // updatedMatch ex: #update-section:community
  const updatedMatch = line.match(/#update-section:([\w-]+)/);
  // deleteMatch ex: #delete-post:my-old-post
  const deleteMatch = line.match(/#delete-post:([\w-]+)/);

  if (postMatch) {
    const slug = postMatch[1];
    const titleMatch = postMatch[2]?.match(/title="([^"]+)"/);
    const dateMatch = postMatch[2]?.match(/date="([^"]+)"/);

    if (!/^[-\w]+$/.test(slug)) {
      console.warn(`⚠️ bad slug ${slug}`);
      hasValidationErrors = true;
    }
    if (!titleMatch) {
      console.warn(`⚠️ missing title ${slug}`);
      hasValidationErrors = true;
    }
    if (!dateMatch) {
      console.warn(`⚠️ missing date  ${slug}`);
      hasValidationErrors = true;
    }

    updatedPaths.push(`/blog/${slug}`);
  }

  if (updatedMatch) updatedPaths.push(`/${updatedMatch[1]}`);
  if (deleteMatch) deletedPaths.push(`/blog/${deleteMatch[1]}`);
}

/* ---------------- validation & summary ---------------- */
const result = { updatedPaths, deletedPaths };

const allPaths = [...updatedPaths, ...deletedPaths];
const validatePath = (p) => /^\/blog\//.test(p);
const allValidPaths = allPaths.every(validatePath);

if (!allValidPaths) {
  console.warn('⚠️ One or more paths do not start with /blog/. Fix them before continuing.');
  hasValidationErrors = true;
}

console.log('\n📦 Path Summary');
console.table(result);

if (isStrict && hasValidationErrors) {
  console.error('❌ Strict mode: validation errors found. Exiting.');
  process.exit(1);
}

/* ---------------- write parsed-paths.json ---------------- */
if (!fs.existsSync('scripts')) fs.mkdirSync('scripts');
fs.writeFileSync(parsedPathsFile, JSON.stringify(result, null, 2));
console.log(`✅ Wrote ${parsedPathsFile}`);

/* ---------------- detect project‑level changes ---------------- */
const changedFiles = execSync('git diff --name-only HEAD~1 HEAD').toString().split('\n');
const projectTouched = changedFiles.some(
  (file) =>
    file.startsWith('src/') || file.startsWith('public/') || file.startsWith('astro.config'),
);

/* ---------------- skip decision ---------------- */
if (updatedPaths.length === 0 && deletedPaths.length === 0 && !projectTouched) {
  console.log('⚠️ No relevant changes (changelog or code). Skipping build.');
  if (!isLocal && process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'SKIPPED_BUILD=true\n');
  }
  process.exit(0);
}

/* ---------------- optionally create MDX files ---------------- */
const AUTO_CREATE_ENABLED = false;
if (AUTO_CREATE_ENABLED) {
  // assume newPostsMeta is defined elsewhere in the script
  for (const { slug, title, date } of newPostsMeta) {
    const filePath = `src/content/blog/${slug}.mdx`;
    if (!fs.existsSync(filePath)) {
      const content = `---\ntitle: "${title || slug}"\npubDate: ${date || new Date().toISOString()}\ncategory: blog\n---\n\nComing soon...\n`;
      fs.writeFileSync(filePath, content);
      console.log(`📝 Created MDX: ${filePath}`);
    }
  }
}

/* ---------------- optionally delete MDX files ---------------- */
const AUTO_DELETE_ENABLED = false;
if (AUTO_DELETE_ENABLED) {
  for (const fullPath of deletedPaths) {
    const slug = fullPath.split('/').pop();
    const mdxPath = path.join('src/content/blog', `${slug}.mdx`);
    if (fs.existsSync(mdxPath)) {
      fs.unlinkSync(mdxPath);
      console.log(`🗑️  Deleted MDX file: ${mdxPath}`);
    } else {
      console.warn(`⚠️  Skipped: No file found for deletion → ${mdxPath}`);
    }
  }
}

/* ---------------- build & purge ---------------- */
if (isLocal) {
  console.log('🛠 Local test mode: skipping build');
} else {
  console.log('🚀 Building site with changes...');
  execSync('npm run build', { stdio: 'inherit' });
}

if (shouldPurge && allPaths.length > 0) {
  const paths = JSON.stringify(allPaths);
  const purgeUrl = process.env.CLOUDFLARE_PURGE_URL;
  console.log('🌐 Purging paths via:', purgeUrl);
  execSync(
    `curl -X POST "${purgeUrl}" -H "Content-Type: application/json" -d '{ "paths": ${paths} }'`,
    { stdio: 'inherit' },
  );
}

/* ---------------- archive & clear changelog ---------------- */
if (!isLocal) {
  const linesToArchive = lines.filter((line) => line.trim() !== '');
  if (linesToArchive.length > 0) {
    const timestamp = new Date().toISOString();
    const archiveBlock = [`\n\n## ✅ Archived on ${timestamp}`, ...linesToArchive].join('\n');
    fs.appendFileSync(archiveFile, archiveBlock);
    fs.writeFileSync(changelogFile, '');
    console.log(`📁 Archived to ${archiveFile} and cleared ${changelogFile}`);
  } else {
    console.log(`ℹ️ No lines to archive. ${changelogFile} is already empty.`);
  }
}

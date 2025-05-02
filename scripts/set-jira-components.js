#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/set-jira-components.js \
 *        "blog-frontend,blog-ci-cd" \
 *        "feat/HEAVB-451-dark-mode"
 *
 * Env vars required:
 *   JIRA_BASE_URL   – https://<org>.atlassian.net
 *   JIRA_USER_EMAIL   – email or API user
 *   JIRA_API_TOKEN  – API token (from https://id.atlassian.com/manage-profile/security/api-tokens)
 */

import process from 'node:process';
import fetch from 'node-fetch';

const [componentsCsv = '', branchRef = ''] = process.argv.slice(2);
if (!componentsCsv) {
  console.log('ℹ️  No components to send');
  process.exit(0);
}

const { JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN } = process.env; // keep your var names
if (!JIRA_BASE_URL || !JIRA_USER_EMAIL || !JIRA_API_TOKEN) {
  console.error('❌  Missing JIRA_BASE_URL / JIRA_USER_EMAIL / JIRA_API_TOKEN env vars');
  process.exit(1);
}

/* ▶︎ Lint fix: use template literal instead of string concatenation */
const authHeader = `Basic ${Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: authHeader,
};

const issueKeys = Array.from(new Set(branchRef.match(/[A-Z]+-\d+/g) || []));
if (issueKeys.length === 0) {
  console.log('ℹ️  No Jira keys in branch');
  process.exit(0);
}

const newComps = componentsCsv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

async function update(key) {
  const res = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue/${key}?fields=components`, {
    headers,
  });
  if (!res.ok) {
    console.error(`❌  Fetch ${key} failed: ${res.status}`);
    return;
  }

  const current = (await res.json()).fields.components.map((c) => c.name);
  const merged = Array.from(new Set([...current, ...newComps]));

  const body = JSON.stringify({ fields: { components: merged.map((name) => ({ name })) } });
  const put = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue/${key}`, {
    method: 'PUT',
    headers,
    body,
  });

  if (!put.ok) console.error(`❌  Update ${key} failed: ${put.status}`);
  else console.log(`✅  ${key} → ${merged.join(', ')}`);
}

for (const k of issueKeys) await update(k);

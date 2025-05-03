#!/usr/bin/env node
/**
 * Push component names to Jira issues referenced by a branch.
 *
 * Usage:
 *   node scripts/set-jira-components.js '["blog-frontend","blog-ci-cd"]' \
 *        "$BRANCH" "$PR_TITLE" "$PR_BODY"
 *
 *
 * Required env vars: JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN
 */

import process from 'node:process';
import fetch from 'node-fetch';

function die(msg, code = 1) {
  console.error(`ERROR: ${msg}`);
  process.exit(code);
}
function parseComponents(arg) {
  if (!arg) return [];
  try {
    return JSON.parse(arg);
  } catch {
    return arg
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
}
// ⬇️ NEW — search all provided texts
function extractIssueKeys(...texts) {
  const regex = /([A-Z][A-Z0-9]+-\d+)/gi;
  const keys = new Set();
  for (const txt of texts || [])
    for (const m of txt?.matchAll(regex) || []) keys.add(m[1].toUpperCase());
  return [...keys];
}

async function addComponents(issueKey, comps, baseUrl, auth) {
  const url = `${baseUrl}/rest/api/3/issue/${issueKey}`;
  const body = { update: { components: [{ set: comps.map((name) => ({ name })) }] } };
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new Error(
      `Jira responded ${res.status}: ${await res.text().catch(() => res.statusText)}`,
    );
  console.log(`✔️  Updated ${issueKey} with [${comps.join(', ')}]`);
}

(async () => {
  const [compsArg, ...sources] = process.argv.slice(2);
  const comps = parseComponents(compsArg);
  if (!comps.length) die('No components supplied');

  const issueKeys = extractIssueKeys(...sources);
  if (!issueKeys.length) {
    console.log('ℹ️  No Jira issue key in branch title or body — skipping component sync.');
    process.exit(0);
  }

  const { JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN } = process.env;
  if (!JIRA_BASE_URL || !JIRA_USER_EMAIL || !JIRA_API_TOKEN)
    die('Missing env vars: JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN');

  const auth = Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
  for (const key of issueKeys)
    try {
      await addComponents(key, comps, JIRA_BASE_URL.replace(/\/$/, ''), auth);
    } catch (err) {
      console.error(`✖️  Failed to update ${key}: `, err.message);
      process.exitCode = 1;
    }
})();

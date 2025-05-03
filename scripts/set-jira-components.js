#!/usr/bin/env node
/**
 * Push component names to Jira issues referenced by a branch.
 *
 * Usage (CI):
 *   node scripts/set-jira-components.js '["blog-frontend","blog-ci-cd"]' "feature/HEAVB-123-awesome"
 *
 * First arg MAY be:
 *   • JSON array string (preferred) → ["comp-a","comp-b"]
 *   • Legacy comma-separated string → comp-a,comp-b
 *
 * Required env vars: JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN
 */

import process from 'node:process';
import fetch from 'node-fetch';

// ─── helpers ──────────────────────────────────────────────────────────────
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

// Extract JIRA-123 style keys from a branch/ref string
function extractIssueKeys(ref) {
  const regex = /([A-Z][A-Z0-9]+-\d+)/g;
  return [...new Set(Array.from(ref.matchAll(regex), (m) => m[1]))];
}

async function addComponents(issueKey, comps, baseUrl, auth) {
  const url = `${baseUrl}/rest/api/3/issue/${issueKey}`;
  const body = {
    update: {
      components: [{ set: comps.map((name) => ({ name })) }],
    },
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`Jira responded ${res.status}: ${err}`);
  }
  console.log(`✔️  Updated ${issueKey} with [${comps.join(', ')}]`);
}

// ─── main ─────────────────────────────────────────────────────────────────
(async () => {
  const [compsArg, branchRef] = process.argv.slice(2);
  const comps = parseComponents(compsArg);
  if (!comps.length) die('No components supplied');

  const issueKeys = extractIssueKeys(branchRef || '');
  if (!issueKeys.length) die('No issue key found in branch ref');

  const { JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN } = process.env;
  if (!JIRA_BASE_URL || !JIRA_USER_EMAIL || !JIRA_API_TOKEN) {
    die('Missing env vars: JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN');
  }

  const auth = Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

  for (const key of issueKeys) {
    try {
      await addComponents(
        key,
        comps,
        JIRA_BASE_URL.replace(/\/$/, ''), // strip trailing slash
        auth,
      );
    } catch (err) {
      console.error(`✖️  Failed to update ${key}: `, err.message);
      process.exitCode = 1;
    }
  }
})();

/**
 * scripts/report-jira.js
 * Centralised failure-to-Jira reporter with SHA-256 stack-fingerprint de-dupe.
 * Works in both Node 20 (CI) and Cloudflare Workers runtime.
 * -----------------------------------------------------------
 */

import { Buffer } from 'node:buffer';
import process from 'node:process';

// ---------- Runtime-agnostic SHA-256 ----------------------------------------

const subtle = globalThis.crypto?.subtle; // Web Crypto (Workers / modern Node)
const nodeCrypto = !subtle ? await import('node:crypto') : null;

async function sha256(data) {
  if (subtle) {
    const enc = new TextEncoder();
    const hash = await subtle.digest('SHA-256', enc.encode(data));
    return Buffer.from(hash).toString('hex');
  }
  return nodeCrypto.createHash('sha256').update(data).digest('hex');
}

export async function fingerprint(stack) {
  const hash = await sha256(stack);
  return hash.slice(0, 8); // 8-char fingerprint
}

// ---------- Jira REST helpers ----------------------------------------------

const { JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_USER_EMAIL } = process.env;

if (!JIRA_BASE_URL || !JIRA_API_TOKEN || !JIRA_USER_EMAIL) {
  throw new Error(
    'JIRA* env vars missing. Configure JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_USER_EMAIL.',
  );
}

const HEADERS = {
  Authorization: `Basic ${Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
  'Content-Type': 'application/json',
};

async function jiraFetch(method, path, body) {
  const res = await fetch(`${JIRA_BASE_URL}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira API ${method} ${path} failed: ${res.status} – ${text}`);
  }
  return res.json();
}

async function findIssueByFingerprint(fp) {
  const jql = `project = HEAVB AND issuetype = Bug AND summary ~ "– ${fp}" ORDER BY created DESC`;
  const data = await jiraFetch('POST', '/rest/api/3/search', { jql, maxResults: 1, fields: [] });
  return data.issues[0];
}

async function createBug(summary, description, labels) {
  const payload = {
    fields: {
      project: { key: 'HEAVB' },
      issuetype: { name: 'Bug' },
      summary,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: description }],
          },
        ],
      },
      labels,
    },
  };
  return jiraFetch('POST', '/rest/api/3/issue', payload);
}

async function addComment(issueKey, body) {
  await jiraFetch('POST', `/rest/api/3/issue/${issueKey}/comment`, { body });
}

// ---------- Public API ------------------------------------------------------

/**
 * @param {Error|string} err
 * @param {object} opts
 * @param {'ci-failure'|'runtime'} opts.source
 * @param {Record<string, any>} [opts.context]  Extra diagnostics (will be JSON.stringified)
 */
export async function reportJira(err, { source, context } = {}) {
  const stack = typeof err === 'string' ? err : err.stack || String(err);
  const fp = await fingerprint(stack);

  const summary = `[${source}] ${err.name ?? 'Error'} – ${fp}`;
  const labels = [source, `fingerprint-${fp}`];

  // Try to find an existing ticket with this fingerprint
  const existing = await findIssueByFingerprint(fp);

  if (!existing) {
    const description = `**Source:** ${source}
**Fingerprint:** ${fp}

\`\`\`text
${stack}
\`\`\`
${
  context
    ? `<details><summary>context</summary>

\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`

</details>`
    : ''
}`;

    const created = await createBug(summary, description, labels);
    console.log(`🪄  Jira bug created: ${created.key}`);
    return created.key;
  }

  // Otherwise, append a comment
  await addComment(existing.key, {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Failure re-occurred:\\n\\n' },
          { type: 'text', text: stack, marks: [{ type: 'code' }] },
        ],
      },
    ],
  });
  console.log(`🔁  Bug already open (${existing.key}) – added comment`);
  return existing.key;
}

// ---------- CLI entry-point (used by GitHub Actions) ------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  // Minimal arg parsing
  const arg = (name) => {
    const idx = process.argv.indexOf(`--${name}`);
    return idx !== -1 ? process.argv[idx + 1] : undefined;
  };

  const source = arg('source') || 'ci-failure';
  const job = arg('job');
  const runUrl = arg('run-url');

  const log = await (async () => {
    let data = '';
    for await (const chunk of process.stdin) data += chunk;
    return data.trim() || 'No log captured.';
  })();

  await reportJira(new Error('CI failed'), { source, context: { job, runUrl, log } });
}

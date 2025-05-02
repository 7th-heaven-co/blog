/**
 * scripts/report-jira.js
 * Centralised failure-to-Jira reporter with SHA-256 stack-fingerprint de-dupe.
 * Emits GHA outputs: issue_key, fingerprint
 * Works in both Node 20 (CI) and Cloudflare Workers runtime.
 * -----------------------------------------------------------
 */

import { Buffer } from 'node:buffer';
import fs from 'node:fs/promises';
import process from 'node:process';

// ---------- Runtime-agnostic SHA-256 ----------------------------------------

const subtle = globalThis.crypto?.subtle;
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
  return hash.slice(0, 8);
}

// ---------- Jira REST wrappers ---------------------------------------------

const { JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_USER_EMAIL } = process.env;

if (!JIRA_BASE_URL || !JIRA_API_TOKEN || !JIRA_USER_EMAIL) {
  throw new Error('Missing JIRA env vars (JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_USER_EMAIL).');
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
    const txt = await res.text();
    throw new Error(`Jira ${method} ${path} → ${res.status}: ${txt}`);
  }
  return res.json();
}

async function findIssueByFp(fp) {
  const jql = `project = HEAVB AND issuetype = Bug AND summary ~ "– ${fp}" ORDER BY created DESC`;
  const data = await jiraFetch('POST', '/rest/api/3/search', {
    jql,
    maxResults: 1,
    fields: [],
  });
  return data.issues[0];
}

async function createBug(summary, description, labels) {
  return jiraFetch('POST', '/rest/api/3/issue', {
    fields: {
      project: { key: 'HEAVB' },
      issuetype: { name: 'Bug' },
      summary,
      description: {
        type: 'doc',
        version: 1,
        content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }],
      },
      labels,
    },
  });
}

async function addComment(issueKey, body) {
  await jiraFetch('POST', `/rest/api/3/issue/${issueKey}/comment`, { body });
}

// ---------- Public API ------------------------------------------------------

/**
 * Report an error to Jira and return the key.
 * @param {Error|string} err
 * @param {{source:'ci-failure'|'runtime', context?:Record<string,any>}} opts
 * @returns {Promise<string>} Jira issue key
 */
export async function reportJira(err, { source, context } = {}) {
  const stack = typeof err === 'string' ? err : err.stack || String(err);
  const fp = await fingerprint(stack);

  const summary = `[${source}] ${err.name ?? 'Error'} – ${fp}`;
  const labels = [source, `fingerprint-${fp}`];

  const existing = await findIssueByFp(fp);

  if (!existing) {
    const desc = `**Source:** ${source}
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

    const { key } = await createBug(summary, desc, labels);
    console.log(`🪄  Created Jira bug: ${key}`);
    return key;
  }

  await addComment(existing.key, {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Failure re-occurred:\n\n' },
          { type: 'text', text: stack, marks: [{ type: 'code' }] },
        ],
      },
    ],
  });
  console.log(`🔁  Bug already open (${existing.key}) – added comment`);
  return existing.key;
}

// ---------- CLI entry-point -------------------------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = (n) => {
    const i = process.argv.indexOf(`--${n}`);
    return i !== -1 ? process.argv[i + 1] : undefined;
  };

  const source = arg('source') || 'ci-failure';
  const job = arg('job');
  const runUrl = arg('run-url');

  // Capture stdin (e.g., pipeline logs)
  const log = await (async () => {
    let data = '';
    for await (const chunk of process.stdin) data += chunk;
    return data.trim() || 'No log captured.';
  })();

  const key = await reportJira(new Error('Failure reported'), {
    source,
    context: { job, runUrl, log },
  });

  // --- Emit GitHub-Actions outputs ----------------------------------------
  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(
      process.env.GITHUB_OUTPUT,
      `issue_key=${key}\nfingerprint=${await fingerprint(log)}\n`,
    );
  }

  // Also echo key for local usage
  console.log(`::notice::jira-key=${key}`);
}

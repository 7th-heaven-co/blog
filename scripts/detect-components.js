#!/usr/bin/env node
/**
 * Detect which components have changed between two commits.
 *
 *   node scripts/detect-components.js \
 *        --base <sha-or-ref> \
 *        --head <sha-or-ref>
 *
 * Emits two GitHub-Actions outputs:
 *   LOCAL_COMPONENTS       (e.g. "frontend,ci-cd")
 *   NAMESPACED_COMPONENTS  (e.g. "blog-frontend,blog-ci-cd")
 *
 * If run outside Actions, it just prints them to stdout.
 */

import { execSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import minimatch from 'minimatch';

const MAP_PATH = resolve('.config/components-map.json');

function args() {
  const o = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i += 2) if (a[i].startsWith('--')) o[a[i].slice(2)] = a[i + 1];
  return o;
}
function diff(base, head) {
  return execSync(`git diff --name-only ${base}...${head}`, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}
function out(k, v) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
  }
  console.log(`${k}=${v}`);
}

const { base = 'origin/main', head = 'HEAD' } = args();
const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
const ns = map.$namespace?.trim() || '';
const comps = Object.entries(map)
  .filter(([k]) => !k.startsWith('$'))
  .map(([k, g]) => ({ k, g }));

const changed = new Set();
for (const file of diff(base, head))
  for (const { k, g } of comps)
    if (g.some((glob) => minimatch(file, glob))) {
      changed.add(k);
      break;
    }

const localCsv = [...changed].join(',');
const namespacedCsv = ns && localCsv ? [...changed].map((k) => `${ns}-${k}`).join(',') : '';

out('LOCAL_COMPONENTS', localCsv);
out('NAMESPACED_COMPONENTS', namespacedCsv);

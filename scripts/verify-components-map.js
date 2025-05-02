#!/usr/bin/env node
/**
 *  verify-components-map.js
 *
 * 1. Validate `.config/components-map.json`
 *    – valid JSON
 *    – `$namespace` present and non-empty
 *    – at least one component key
 * 2. Regenerate `compass.yml` with namespaced slugs.
 *    (1 map = many Compass components)
 *
 * Exit codes
 *   0  success
 *   1  validation error
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const MAP_PATH = resolve('.config/components-map.json');
const COMPASS_PATH = resolve('compass.yml');

function fail(msg) {
  console.error(`❌  ${msg}`);
  process.exit(1);
}

/* 1️⃣  Load & validate map */
let raw;
try {
  raw = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
} catch (e) {
  fail(`components-map.json invalid JSON – ${e.message}`);
}

const namespace = raw.$namespace?.trim();
if (!namespace) fail('Missing or empty `$namespace` key');

const keys = Object.keys(raw).filter((k) => !k.startsWith('$'));
if (keys.length === 0) fail('No component keys found');

/* 2️⃣  Build Compass YAML */
const repoUrl =
  process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
    : 'https://github.com/7th-heaven-co/REPO';

const compassDoc = {
  components: keys.map((k) => ({
    name: `${namespace}-${k}`,
    type: 'service',
    lifecycle: 'production',
    owner: '7th-heaven/platform',
    links: [{ type: 'REPOSITORY', url: repoUrl }],
    tags: [namespace, k],
  })),
};

/* 3️⃣  Write compass.yml */
writeFileSync(COMPASS_PATH, YAML.stringify(compassDoc, { indent: 2 }));
console.log(`✅  ${keys.length} components verified; compass.yml written`);

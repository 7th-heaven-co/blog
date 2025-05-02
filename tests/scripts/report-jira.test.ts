import { describe, expect, it } from 'vitest';
import { fingerprint } from '../scripts/report-jira.js';

describe('report-jira fingerprint', () => {
  it('returns identical hash for identical stacks', async () => {
    const stack =
      'Error: boom\n    at Object.<anonymous> (/app/index.js:1:1)\n    at Module._compile';
    expect(await fingerprint(stack)).toBe(await fingerprint(stack));
  });

  it('returns different hash for different stacks', async () => {
    const a = 'Error: a\n    at Object.<anonymous> (/app/index.js:1:1)\n    at Module._compile';
    const b = 'Error: b\n    at Object.<anonymous> (/app/index.js:1:1)\n    at Module._compile';
    expect(await fingerprint(a)).not.toBe(await fingerprint(b));
  });
});

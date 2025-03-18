/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', 'build', 'tests/e2e/**', 'tests-examples'], 
  },
});

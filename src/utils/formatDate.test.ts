import { test, expect } from 'vitest';
import { formatDate } from './formatDate';

test('formats valid dates correctly', () => {
  expect(formatDate('2024-03-14T00:00:00Z')).toBe('March 14, 2024');
  expect(formatDate('2023-12-25T12:00:00Z')).toBe('December 25, 2023');
});

test('returns empty string for null or undefined input', () => {
  expect(formatDate(null)).toBe('');
  expect(formatDate(undefined)).toBe('');
});
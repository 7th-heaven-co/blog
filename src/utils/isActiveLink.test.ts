import { test, expect } from 'vitest';
import { isActiveLink } from './isActiveLink';

test('returns true when href matches pathname exactly', () => {
  expect(isActiveLink('/about', '/about')).toBe(true);
});

test('returns true when href matches the first subpath', () => {
  expect(isActiveLink('/blog', '/blog/post-1')).toBe(true);
});

test('returns false when href does not match pathname', () => {
  expect(isActiveLink('/contact', '/about')).toBe(false);
});

test('ignores base URL when checking active links', () => {
  expect(isActiveLink('/about', '/base/about', '/base')).toBe(true);
});

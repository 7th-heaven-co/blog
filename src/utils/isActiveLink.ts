export function isActiveLink(href: string, pathname: string, baseUrl = ''): boolean {
  const cleanPath = pathname.replace(baseUrl, '');
  const subpath = cleanPath.match(/[^\/]+/g);
  return href === cleanPath || href === `/${subpath?.[0] || ''}`;
}

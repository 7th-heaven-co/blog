// src/utils/dateFormats.ts

/**
Examples:
// Absolute
dateFormats.date.long("2025-04-13");              // "April 13, 2025"
dateFormats.date.short("2025-04-13");             // "Apr 13, 2025"
dateFormats.date.yearOnly("2025-04-13");          // "2025"

// Time
dateFormats.time.timeOnly("2025-04-13T17:45:00"); // "1:45 PM"
dateFormats.time.fullTime("2025-04-13T17:45:00"); // "April 13, 2025 1:45 PM"

// Relative
dateFormats.relative.short("2025-04-11T12:00:00"); // "2 days ago"
dateFormats.relative.smart("2025-04-11T12:00:00"); // → "2 days ago"
dateFormats.relative.smart("2024-12-25T12:00:00"); // → "December 25, 2024"
*/

export const dateFormats = {
  core: {
    format,
    formatTime,
  },

  date: {
    long: (date: string | null, locale = 'en-US') => format(date, { month: 'long' }, locale),
    short: (date: string | null, locale = 'en-US') => format(date, { month: 'short' }, locale),

    numeric: (date: string | null, locale = 'en-US') =>
      format(date, { year: 'numeric', month: 'numeric', day: 'numeric' }, locale),

    withWeekday: (date: string | null, locale = 'en-US') =>
      format(date, { weekday: 'long' }, locale),

    yearOnly: (date: string | null, locale = 'en-US') => format(date, { year: 'numeric' }, locale),

    monthYear: (date: string | null, locale = 'en-US') =>
      format(date, { month: 'long', year: 'numeric' }, locale),

    weekdayOnly: (date: string | null, locale = 'en-US') =>
      format(date, { weekday: 'long' }, locale),
  },

  time: {
    timeOnly: (date: string | null, locale = 'en-US') => formatTime(date, {}, locale),

    fullTime: (date: string | null, locale = 'en-US') =>
      `${format(date, {}, locale)} ${formatTime(date, {}, locale)}`,
  },

  relative: {
    short: formatRelative,
    smart: formatSmart,
  },
};

export function getUserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function isValidLocale(locale: string): boolean {
  try {
    new Intl.DateTimeFormat(locale);
    return true;
  } catch {
    return false;
  }
}

/**
 * Utility to format a date string using Intl.DateTimeFormat
 */

function format(
  dateString: string | null,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US',
  timeZone = getUserTimeZone(),
): string {
  if (!dateString) return '';
  const safeLocale = isValidLocale(locale) ? locale : 'en-US';
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone,
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(safeLocale, { ...defaultOptions, ...options });
}

/**
 * Format time only.
 */
function formatTime(
  dateString: string | null,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US',
): string {
  if (!dateString) return '';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  };

  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, { ...defaultOptions, ...options });
}

/**
 * Format relative time like "2 days ago" or "in 3 hours"
 */
function formatRelative(dateString: string | null, locale = 'en-US'): string {
  if (!dateString) return '';

  const now = new Date();
  const then = new Date(dateString);
  const diff = then.getTime() - now.getTime(); // positive if in the future
  const seconds = Math.floor(diff / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const thresholds: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  let value = seconds;
  for (const [amount, unit] of thresholds) {
    if (Math.abs(value) < amount) {
      return rtf.format(Math.round(value * -1), unit);
    }
    value /= amount;
  }

  return '';
}

/**
 * Smart formatter: uses relative if within X threshold, else absolute.
 * Default threshold: 3 days
 */
function formatSmart(dateString: string | null, locale = 'en-US', thresholdInDays = 3): string {
  if (!dateString) return '';

  const now = new Date();
  const then = new Date(dateString);
  const diffMs = Math.abs(now.getTime() - then.getTime());
  const thresholdMs = thresholdInDays * 24 * 60 * 60 * 1000;

  return diffMs <= thresholdMs
    ? formatRelative(dateString, locale)
    : format(dateString, {}, locale);
}

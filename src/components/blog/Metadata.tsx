// src/components/Metadata.tsx
// src/components/Metadata.tsx
import type { FC } from 'react';
import { dateFormats } from '../../utils/dateFormats'; // ← adjust path if needed

interface Props {
  /** Any front‑matter object; may be undefined */
  data?: Record<string, unknown> | null;
}

/** Convert whatever comes from front‑matter into a display string */
function pretty(v: unknown): string {
  // Arrays → comma‑separated list
  if (Array.isArray(v)) return v.join(', ');

  // Native Date object
  if (v instanceof Date) return dateFormats.date.long(v);

  // Parse RFC/ISO date‑ish strings
  if (typeof v === 'string' && !Number.isNaN(Date.parse(v))) {
    return dateFormats.date.long(new Date(v));
  }

  // Fallback
  return String(v);
}

const Metadata: FC<Props> = ({ data }) => {
  if (!data) return null;

  const entries = Object.entries(data).filter(
    ([k, v]) => k !== 'heroImage' && v !== undefined && v !== null,
  );

  return (
    <ul>
      {entries.map(([k, v]) => (
        <li key={k}>
          <div>{k}:</div>
          <div>
            <span>+</span>&nbsp;<span>{pretty(v)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Metadata;

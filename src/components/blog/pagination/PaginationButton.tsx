/**
 * file: src/components/blog/pagination/PaginationButton.tsx
 */
import type React from 'react';

/**
 * PaginationButton renders either a disabled “…” span or a page‑navigation button.
 *
 * Props:
 * - label: number | string             → page number or the string "ellipsis".
 * - active: boolean ?                  → highlights the current page.
 * - onClick: () ⇒ void                 → navigation callback.
 * - disabled: boolean ?                → disable the button.
 */
const PaginationButton: React.FC<{
  label: number | string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, active, onClick, disabled }) => {
  // Render a non‑interactive ellipsis marker
  if (label === 'ellipsis') {
    return <p id="ellipsis">…</p>;
  }

  // Render an interactive page button
  return (
    <button
      type="button" // ← explicit type fixes a11y lint rule
      onClick={onClick}
      disabled={disabled}
      className={active ? 'active' : ''}
    >
      {label}
    </button>
  );
};

export default PaginationButton;

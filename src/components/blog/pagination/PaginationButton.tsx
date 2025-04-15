// src/components/blog/pagination/PaginationButton.tsx

import React from "react";

/**
 * PaginationButton is a simple component that renders either a clickable button or a span element.
 * 
 * Overview:
 * - If the label passed is the string "ellipsis", the component renders a non-clickable span element displaying an ellipsis.
 * - Otherwise, it renders a button that can trigger a click event, with visual cues if the button is active.
 * 
 * Props:
 * - label: The content to display on the button; can be a number (for page numbers) or string.
 * - active: Optional boolean indicating whether the button represents the active page.
 * - onClick: Callback function triggered when the button is clicked.
 * - disabled: Optional boolean to disable the button.
 */
const PaginationButton: React.FC<{
  label: number | string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, active, onClick, disabled }) => {
  // When the label is "ellipsis", render a simple span with the ellipsis symbol.
  if (label === "ellipsis") {
    return <p id="ellipsis">…</p>;
  }
  
  // Otherwise, render a button element using the provided props.
  return (
    <button onClick={onClick} disabled={disabled} className={active ? "active" : ""} >
      {label}
    </button>
  );
};

export default PaginationButton;


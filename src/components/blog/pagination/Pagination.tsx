// src/components/blog/pagination/Pagination.tsx

import React from "react";
import { usePagination } from "../../../hooks/usePagination";
import PaginationButton from "./PaginationButton";

/**
 * The Pagination component displays navigation controls for switching between different pages.
 * It leverages the usePagination hook to determine the set of page numbers (and ellipsis markers)
 * that should be displayed in a batch. The component renders buttons for "First", "Prev", page numbers,
 * "Next", and "Last". Clicking these buttons triggers the provided onPageChange callback to update the current page.
 *
 * Key aspects:
 * - Uses a fixed batch size (here set to 5) to limit the number of pages shown at a time.
 * - Handles edge cases when the current page falls in the last block of pages.
 * - Disables navigation controls (e.g., "First" and "Prev") when on the first page,
 *   and "Next" and "Last" when on the final page.
 *
 * Props:
 * - currentPage: The active page number.
 * - totalPages: The total number of pages available.
 * - onPageChange: A callback function to update the active page.
 */
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const batchSize = 5;
  // usePagination hook computes pagesToDisplay and batch navigation handlers
  const { pagesToDisplay, handleNextBatch, handlePrevBatch, handleFirst, handleLast } =
    usePagination({ currentPage, totalPages, batchSize });

  // Determine when the navigation buttons should be disabled
  const disableFirst = currentPage === 1;
  const disableNext = currentPage === totalPages;

  return (
    <section className="pagination">
      <ul>
        {/* "First" button: jumps to the first page */}
        <li className="pagFirst">
          <PaginationButton
            label="First"
            onClick={() => handleFirst(onPageChange)}
            disabled={disableFirst}
            client:load
          />
        </li>
        {/* "Prev" button: navigates to the previous batch of pages */}
        <li className="prevBatch">
          <PaginationButton
            label="Prev"
            onClick={() => handlePrevBatch(onPageChange)}
            disabled={disableFirst}
            client:load
          />
        </li>
        {/* Render each page number or ellipsis based on the computed pagesToDisplay */}
        <li className="pagNumsGroup">
        {pagesToDisplay.map((page, index) => (
          <span key={index} className="pagNum">
            {typeof page === "number" ? (
              <PaginationButton
                label={page}
                onClick={() => onPageChange(page)}
                active={page === currentPage}
                disabled={page === currentPage}
                client:load
              />
            ) : (
              // Render ellipsis as a disabled button with the ellipsis marker
              <PaginationButton label={page} onClick={() => {}} disabled client:load/>
            )}
          </span>
        ))}
        </li>
        {/* "Next" button: navigates to the next batch of pages */}
        <li className="nextBatch">
          <PaginationButton
            label="Next"
            onClick={() => handleNextBatch(onPageChange)}
            disabled={disableNext}
            client:load
          />
        </li>
        {/* "Last" button: jumps directly to the last page */}
        <li className="pagLast">
          <PaginationButton
            label="Last"
            onClick={() => handleLast(onPageChange)}
            disabled={disableNext}
            client:load
          />
        </li>
      </ul>
    </section>
  );
};

export default Pagination;

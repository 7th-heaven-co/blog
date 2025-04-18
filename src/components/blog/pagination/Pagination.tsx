// src/components/blog/pagination/Pagination.tsx

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
import type React from 'react';
import { usePagination } from '../../../hooks/usePagination';
import PaginationButton from './PaginationButton';

/* ── props ───────────────────────────────────────────────────────────── */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/* ── component ───────────────────────────────────────────────────────── */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const batchSize = 5;

  /* derive visible pages and batch helpers */
  const { pagesToDisplay, handleNextBatch, handlePrevBatch, handleFirst, handleLast } =
    usePagination({ currentPage, totalPages, batchSize });

  /* build {key,value} list so keys are stable */
  let ellipsisId = 0;
  const keyedPages = pagesToDisplay.map((p) =>
    typeof p === 'number'
      ? { key: p.toString(), value: p as number | 'ellipsis' }
      : { key: `ellipsis-${ellipsisId++}`, value: 'ellipsis' as const },
  );

  const disableFirst = currentPage === 1;
  const disableNext = currentPage === totalPages;

  return (
    <section className="pagination">
      <ul>
        {/* FIRST */}
        <li className="pagFirst">
          <PaginationButton
            label="First"
            onClick={() => handleFirst(onPageChange)}
            disabled={disableFirst}
            client:load
          />
        </li>

        {/* PREV */}
        <li className="prevBatch">
          <PaginationButton
            label="Prev"
            onClick={() => handlePrevBatch(onPageChange)}
            disabled={disableFirst}
            client:load
          />
        </li>

        {/* PAGE NUMBERS + ELLIPSIS */}
        <li className="pagNumsGroup">
          {keyedPages.map(({ key, value }) => (
            <span key={key} className="pagNum">
              {value === 'ellipsis' ? (
                <PaginationButton label="ellipsis" onClick={() => {}} disabled client:load />
              ) : (
                <PaginationButton
                  label={value}
                  onClick={() => onPageChange(value)}
                  active={value === currentPage}
                  disabled={value === currentPage}
                  client:load
                />
              )}
            </span>
          ))}
        </li>

        {/* NEXT */}
        <li className="nextBatch">
          <PaginationButton
            label="Next"
            onClick={() => handleNextBatch(onPageChange)}
            disabled={disableNext}
            client:load
          />
        </li>

        {/* LAST */}
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

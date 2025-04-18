// src/hooks/usePagination.ts

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * usePagination is a custom React hook that manages paginated batch logic.
 *
 * It dynamically computes the set of pages to display in a batch-based pagination UI,
 * including handling tail-end navigation and ellipsis-based gaps.
 *
 * Features:
 * - Computes page batches based on the current page, total number of pages, and optional batch size.
 * - If in the last block of pages, it displays trailing pages and optionally includes a prefix ellipsis.
 * - Dynamically shifts batches forward or backward when navigating with "Next" or "Prev".
 * - Automatically syncs batchStart when jumping to an arbitrary page (e.g. clicking page 3).
 *
 * Parameters:
 * - currentPage: number — The currently active page.
 * - totalPages: number — Total number of available pages.
 * - batchSize: number (default: 5) — How many pages to show per visible group.
 *
 * Returns:
 * - pagesToDisplay: (number | "ellipsis")[] — Pages and ellipses to render.
 * - handleNextBatch: () => void — Moves to the next group of pages.
 * - handlePrevBatch: () => void — Moves to the previous group of pages.
 * - handleFirst: () => void — Jumps to the first page and batch.
 * - handleLast: () => void — Jumps to the last page and batch.
 * - batchStart: number — The first page in the current batch window.
 */
export const usePagination = ({
  currentPage,
  totalPages,
  batchSize = 5,
}: { currentPage: number; totalPages: number; batchSize?: number }) => {
  // Compute where the last block starts (dynamic)
  const lastBlockStart = useMemo(
    () => (totalPages >= batchSize ? totalPages - batchSize + 1 : 1),
    [totalPages, batchSize],
  );

  // Determine if current page falls within the last block
  const isLastBlock = useMemo(() => currentPage >= lastBlockStart, [currentPage, lastBlockStart]);

  // Compute initial batch start
  const normalBatchStart = Math.floor((currentPage - 1) / batchSize) * batchSize + 1;
  const [batchStart, setBatchStart] = useState(normalBatchStart);

  // Sync batchStart if the current page moves outside the current batch
  useEffect(() => {
    const expectedStart = Math.floor((currentPage - 1) / batchSize) * batchSize + 1;
    if (batchStart !== expectedStart) {
      setBatchStart(expectedStart);
    }
  }, [currentPage, batchSize, batchStart]);

  const pagesToDisplay = useMemo(() => {
    if (isLastBlock) {
      const pages: number[] = [];
      for (let i = lastBlockStart; i <= totalPages; i++) {
        pages.push(i);
      }
      const prefix = lastBlockStart - batchSize;
      return prefix >= 1 ? [prefix, 'ellipsis', ...pages] : pages;
    }

    const visibleEnd = Math.min(batchStart + batchSize - 1, totalPages);
    const pages: (number | 'ellipsis')[] = [];
    for (let i = batchStart; i <= visibleEnd; i++) {
      pages.push(i);
    }
    if (visibleEnd < totalPages) {
      const target = batchStart + 9 <= totalPages ? batchStart + 9 : totalPages;
      pages.push('ellipsis');
      pages.push(target);
    }
    return pages;
  }, [batchStart, totalPages, batchSize, isLastBlock, lastBlockStart]);

  const handleNextBatch = useCallback(
    (onPageChange: (page: number) => void) => {
      if (isLastBlock) {
        if (currentPage < totalPages) {
          onPageChange(totalPages);
        }
        return;
      }
      let newBatchStart = currentPage > batchStart ? currentPage : batchStart + batchSize;
      if (newBatchStart + batchSize - 1 >= totalPages) {
        newBatchStart = totalPages - newBatchStart + 1 >= 2 ? newBatchStart : totalPages;
      }
      setBatchStart(newBatchStart);
      onPageChange(newBatchStart);
    },
    [isLastBlock, currentPage, batchStart, batchSize, totalPages],
  );

  const handlePrevBatch = useCallback(
    (onPageChange: (page: number) => void) => {
      if (isLastBlock) {
        const prefix = lastBlockStart - batchSize;
        const newBatchStart = Math.max(prefix, 1);
        setBatchStart(newBatchStart);
        onPageChange(newBatchStart);
        return;
      }
      const newBatchStart = Math.max(batchStart - batchSize, 1);
      setBatchStart(newBatchStart);
      onPageChange(newBatchStart);
    },
    [isLastBlock, lastBlockStart, batchStart, batchSize],
  );

  const handleFirst = useCallback((onPageChange: (page: number) => void) => {
    setBatchStart(1);
    onPageChange(1);
  }, []);

  const handleLast = useCallback(
    (onPageChange: (page: number) => void) => {
      setBatchStart(lastBlockStart);
      onPageChange(totalPages);
    },
    [lastBlockStart, totalPages],
  );

  return {
    pagesToDisplay,
    handleNextBatch,
    handlePrevBatch,
    handleFirst,
    handleLast,
    batchStart,
  };
};

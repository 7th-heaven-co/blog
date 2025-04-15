import { useEffect, useState, useRef } from "react";

/**
 * useContainerPostCount dynamically calculates how many list items (posts)
 * can fit in a given container based on the height of the first <li> child.
 *
 * Features:
 * - Uses native ResizeObserver to detect container size changes.
 * - Debounces layout recalculations to prevent excessive renders.
 * - Accounts for layout stability using requestAnimationFrame.
 * - Uses getBoundingClientRect for precise layout measurement.
 *
 * @param buffer   Amount of vertical space to reserve (e.g., headers, padding).
 * @param min      Minimum number of posts per page (fallback safeguard).
 * @param debounce Delay before recalculating after a resize event (ms).
 * @returns        A ref to assign to the container and the computed postsPerPage.
 */
export function useContainerPostCount({
  buffer = 100,
  min = 1,
  debounce = 100,
}: {
  buffer?: number;
  min?: number;
  debounce?: number;
} = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the wrapping container
  const [postsPerPage, setPostsPerPage] = useState(9);     // Default/fallback number of posts per page
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Used to debounce resize events

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    // Core calculation logic to determine how many posts fit
    const calculate = () => {
      // Wait until layout has stabilized
      requestAnimationFrame(() => {
        const firstPost = container.querySelector("li");
        if (!firstPost) return;

        // More accurate than clientHeight (includes subpixel values)
        const postBox = firstPost.getBoundingClientRect();
        const postHeight = postBox.height || 200; // fallback in case height is 0

        // Measure available space in the container
        const containerBox = container.getBoundingClientRect();
        const availableHeight = containerBox.height - buffer;

        // Estimate number of posts that can fit and clamp it to minimum
        const estimatedCount = Math.floor(availableHeight / postHeight);
        const clamped = Math.max(min, estimatedCount);

        // Update only if value changed
        if (clamped !== postsPerPage) {
          setPostsPerPage(clamped);
        }
      });
    };

    // Debounce function to limit calculation frequency
    const debounced = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(calculate, debounce);
    };

    // Create and attach the observer to the container
    const observer = new ResizeObserver(debounced);
    observer.observe(container);

    // Clean up observer and timers
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      observer.disconnect();
    };
  }, [buffer, min, debounce, postsPerPage]);

  // Return the ref for the container and the current postsPerPage value
  return { containerRef, postsPerPage };
}

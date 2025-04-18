// src/utils/paginationUtils.ts

/**
 * Return the slice of posts that belong to the given page.
 *
 * @param posts         – full list of items (generic, any shape)
 * @param currentPage   – 1‑based page index
 * @param postsPerPage  – page size
 */
export function getPaginatedPosts<T>(
  posts: readonly T[],
  currentPage: number,
  postsPerPage: number,
): T[] {
  const startIndex = (currentPage - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
}

/**
 * Compute how many pages are needed for the given collection.
 *
 * @param posts         – full list of items
 * @param postsPerPage  – page size
 */
export function getTotalPages<T>(posts: readonly T[], postsPerPage: number): number {
  return Math.ceil(posts.length / postsPerPage);
}

// ./src/utils/paginationUtils.ts
export const getPaginatedPosts = (
  posts: any[],
  currentPage: number,
  postsPerPage: number
) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
};

export const getTotalPages = (posts: any[], postsPerPage: number): number => {
  return Math.ceil(posts.length / postsPerPage);
};

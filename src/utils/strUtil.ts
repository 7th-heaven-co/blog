export function ftSlug(post) {
  const postId = post.id;
  const parts = postId.split('-');
  // Remove the first element (e.g., "community")
  let newPostIdParts = parts.slice(1);
  // If the first part after removal is "0", remove that too.
  if (newPostIdParts[0] === '0') {
    newPostIdParts = newPostIdParts.slice(1);
  }
  const newPostId = newPostIdParts.join('-');
  return `${post.data.category}/${newPostId}`;
}

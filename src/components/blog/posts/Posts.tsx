// ./src/components/blog/posts/Posts.tsx

import React, { useRef } from "react";
import Post from "./Post";
import { BLOG } from "../../../consts";
import { ftSlug } from "../../../utils/strUtil";
import { useContainerPostCount } from "../../../hooks/useContainerPostCount";

/**
 * Props for the Posts component
 */
interface PostsProps {
  posts: any[];         // Array of blog posts to render on the current page.
  totalPosts: number;   // Total number of posts in the filtered collection (across all pages).
  offset: number;       // Number of posts skipped due to pagination (used for absolute indexing).
  pageLength: number;   // Number of posts in the current page (used to suppress <hr> after last post).
}

/**
 * Posts component is responsible for displaying a list of blog posts.
 *
 * Overview:
 * - Renders a header row with column titles.
 * - Iterates over the provided posts array to render each individual Post component.
 * - Computes a unique URL (slug) for each post using the BLOG constant and ftSlug utility function.
 * - Passes down additional information such as the post index, total number of posts, and offset.
 *
 * Props:
 * - posts: Array of blog posts to display.
 * - totalPosts: Total number of posts (used for context like indexing).
 * - offset: Number of posts skipped due to pagination (to compute the overall post index).
 */
const Posts: React.FC<PostsProps> = ({ posts, totalPosts, offset, pageLength }) => {
  // 🎯 use custom hook to calculate posts per page dynamically
  const { containerRef } = useContainerPostCount();
  return (
    <section className="posts">
      {/* Header row for the posts list */}
      <div>
        <h2>#</h2>
        <h2>Date</h2>
        <h2>Post</h2>
      </div>
      <ul ref={containerRef}>
        {/* Map through the posts array to render individual Post components */}
        {posts.map((post, index) => {
          // Generate a slug for the post using the BLOG base path and ftSlug utility
          const slug = `${BLOG}/${ftSlug(post)}`;
          return (
            <Post
              key={slug}
              post={post}
              index={index}
              totalPosts={totalPosts}
              offset={offset}
              slug={slug}
              pageLength={pageLength}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Posts;

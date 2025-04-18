// ./src/components/blog/posts/Posts.tsx

import type React from 'react';
import { BLOG } from '../../../consts';
import { useContainerPostCount } from '../../../hooks/useContainerPostCount';
import { ftSlug } from '../../../utils/strUtil';
import Post from './Post';

/** Minimal shape the component needs from a blog post */
type BlogEntry = {
  data: { title: string; pubDate: Date | string };
  [key: string]: unknown; // ignore extra fields
};

interface PostsProps {
  posts: readonly BlogEntry[];
  totalPosts: number;
  offset: number;
  pageLength: number;
}

const Posts: React.FC<PostsProps> = ({ posts, totalPosts, offset, pageLength }) => {
  /* Dynamically measure container height for posts‑per‑page calc */
  const { containerRef } = useContainerPostCount();

  return (
    <section className="posts">
      <div>
        <h2>#</h2>
        <h2>Date</h2>
        <h2>Post</h2>
      </div>

      <ul ref={containerRef}>
        {posts.map((post, index) => {
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

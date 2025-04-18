// ./src/components/blog/posts/Post.tsx
import type React from 'react';
import { dateFormats } from '../../../utils/dateFormats';

/** Minimal shape required from a blog entry */
interface BlogEntry {
  data: {
    title: string;
    pubDate: Date | string;
  };
  [key: string]: unknown;
}

interface PostProps {
  post: BlogEntry;
  index: number;
  totalPosts: number;
  offset: number;
  slug: string;
  pageLength: number;
}

const Post: React.FC<PostProps> = ({ post, index, totalPosts, offset, slug, pageLength }) => {
  const date = dateFormats.date.short(post.data.pubDate);

  const absoluteIndex = offset + index;
  const reverseIndex = totalPosts - 1 - absoluteIndex;

  return (
    <li>
      <a href={slug}>
        <h3 className="index">{reverseIndex}</h3>
        <h3 className="date">{date}</h3>
        <h3 className="title">
          <span className="truncate">{post.data.title}</span>
        </h3>
      </a>
      {index < pageLength - 1 && <hr className="faded-dark" />}
    </li>
  );
};

export default Post;

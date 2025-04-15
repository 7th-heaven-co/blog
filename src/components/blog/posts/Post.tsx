// ./src/components/blog/posts/Post.tsx
import React from "react";
import { dateFormats } from "../../../utils/dateFormats";

interface PostProps {
  post: any;           // The blog post object containing metadata such as title and publication date.
  index: number;       // The index of this post within the current paginated slice (starts at 0).
  totalPosts: number;  // Total number of posts in the filtered dataset (used for reverse indexing).
  offset: number;      // Number of posts skipped due to pagination (used to calculate absolute index).
  slug: string;        // Unique URL slug for linking to the individual blog post page.
  pageLength: number;  // Total number of posts in the current paginated slice (used to avoid rendering <hr> after last post).
}

const Post: React.FC<PostProps> = ({ post, index, totalPosts, offset, slug, pageLength }) => {
  const date = dateFormats.date.short(post.data.pubDate);
  // Compute the absolute index relative to the full filtered posts:
  const absoluteIndex = offset + index;
  // Compute the reverse index if needed:
  const reverseIndex = totalPosts - 1 - absoluteIndex;

   return (
    <li>
      <a href={slug}>
        <h3 className="index">{reverseIndex}</h3>
        <h3 className="date">{date}</h3>
        <h3 className="title"><span className="truncate">{post.data.title}</span></h3>
      </a>
      {index < pageLength - 1 && <hr className="faded-dark" />}
    </li>
  );
};

export default Post;

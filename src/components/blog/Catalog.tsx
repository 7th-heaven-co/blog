// src/components/blog/Catalog.tsx

import React, { useState, useEffect, useMemo } from "react";
import Filter from "./filter/Filter";
import Posts from "./posts/Posts";
import Pagination from "./pagination/Pagination";
import { getPaginatedPosts, getTotalPages } from "../../utils/paginationUtils";
import { useContainerPostCount } from "../../hooks/useContainerPostCount";
import { ftSlug } from "../../utils/strUtil";

export default function Catalog({ blogs }: { blogs: any[] }) {
  const [filteredPosts, setFilteredPosts] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCollection, setActiveCollection] = useState("all");

  // 🎯 use custom hook to calculate posts per page dynamically
  const { postsPerPage } = useContainerPostCount();

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPosts, postsPerPage]);

  const filterByCollection = (collection: string) => {
    const filtered = blogs.filter(post => post.data.category === collection);
    setFilteredPosts(filtered);
    setActiveCollection(collection);
  };

  const resetFilter = () => {
    setFilteredPosts(blogs);
    setActiveCollection("all");
  };

  const paginatedPosts = useMemo(() => {
    return getPaginatedPosts(filteredPosts, currentPage, postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const totalPages = useMemo(() => {
    return getTotalPages(filteredPosts, postsPerPage);
  }, [filteredPosts, postsPerPage]);

  const offset = (currentPage - 1) * postsPerPage;

  return (
    <main>
      <section>
        <h2>Blog</h2>
      </section>
      <Filter
        activeCollection={activeCollection}
        onFilter={filterByCollection}
        onReset={resetFilter}
        client:load
      />
      <Posts
        posts={paginatedPosts}
        totalPosts={filteredPosts.length}
        offset={offset}
        pageLength={postsPerPage}
        client:load
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onFirst={() => setCurrentPage(1)}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        onLast={() => setCurrentPage(totalPages)}
        client:load
      />
    </main>
  );
}

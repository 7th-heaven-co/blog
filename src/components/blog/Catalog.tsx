import React, { useState, useMemo, useEffect } from 'react';
import { useContainerPostCount } from '../../hooks/useContainerPostCount';
import { getPaginatedPosts, getTotalPages } from '../../utils/paginationUtils';
import Filter from './filter/Filter';
import Pagination from './pagination/Pagination';
import Posts from './posts/Posts';

/** Minimal shape needed for filtering logic */
type BlogEntry = {
  data: { category: string };
  [key: string]: unknown;
};

export default function Catalog({ blogs }: { blogs: readonly BlogEntry[] }) {
  const [filteredPosts, setFilteredPosts] = useState<readonly BlogEntry[]>(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCollection, setActiveCollection] = useState('all');

  /* dynamic page size (based on container height/width) */
  const { postsPerPage } = useContainerPostCount();

  /* collection filtering */
  const filterByCollection = (collection: string) => {
    setFilteredPosts(blogs.filter((p) => p.data.category === collection));
    setActiveCollection(collection);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilteredPosts(blogs);
    setActiveCollection('all');
    setCurrentPage(1);
  };

  /* paginated slice & page count */
  const paginatedPosts = useMemo(
    () => getPaginatedPosts(filteredPosts, currentPage, postsPerPage),
    [filteredPosts, currentPage, postsPerPage],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredPosts, postsPerPage),
    [filteredPosts, postsPerPage],
  );

  /* reset to first page whenever the calculated postsPerPage changes */
  useEffect(() => {
    setCurrentPage(1);
    /* reference postsPerPage so the linter recognises it is used */
    void postsPerPage;
  }, [postsPerPage]);

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

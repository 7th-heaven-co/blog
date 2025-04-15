// ./src/components/blog/Filter.tsx

import React from "react";
import FilterCollections from "./FilterCollections";

/**
 * Filter component controls filtering blog posts by collection.
 *
 * Props:
 * - activeCollection: The selected collection.
 * - onFilter: Callback for selecting a collection.
 * - onReset: Callback for resetting to "All".
 */
const Filter: React.FC<{
  activeCollection: string | null;
  onFilter: (collection: string) => void;
  onReset: () => void;
}> = ({ activeCollection, onFilter, onReset }) => {
  return (
    <section className="filter">
      <FilterCollections
        activeCollection={activeCollection}
        onFilter={onFilter}
        onReset={onReset}
        client:load
      />
    </section>
  );
};

export default Filter;

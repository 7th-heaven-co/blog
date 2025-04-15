// ./src/components/blog/CollectionsTags.tsx

import React from "react";
import { COLLECTIONS } from "../../../consts";

/**
 * CollectionsTags renders buttons for each individual collection.
 *
 * Props:
 * - activeCollection: The currently selected collection.
 * - onFilter: Callback to apply a filter based on collection.
 */
interface FilterCollectionsTagsProps {
  activeCollection: string | null;
  onFilter: (collection: string) => void;
}

const FilterCollectionsTags: React.FC<FilterCollectionsTagsProps> = ({ activeCollection, onFilter }) => {
  return (
    <>
      {COLLECTIONS.map((collection) => (
        <li key={collection}>
          <button
            id={collection}
            onClick={() => onFilter(collection)}
            className={activeCollection === collection ? "active" : ""}
          >
            {collection}
          </button>
        </li>
      ))}
    </>
  );
};

export default FilterCollectionsTags;

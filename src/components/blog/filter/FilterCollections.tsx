import type React from 'react';
import FilterCollectionsTags from './FilterCollectionsTags';

/**
 * FilterCollections wraps the entire <ul> list structure for filtering,
 * including the "All" reset button and the mapped collection tags.
 *
 * Props:
 * - activeCollection: The current selected filter.
 * - onFilter: Handler to apply filter.
 * - onReset: Handler to reset filter to "All".
 */
interface FilterCollectionsProps {
  activeCollection: string | null;
  onFilter: (collection: string) => void;
  onReset: () => void;
}

const FilterCollections: React.FC<FilterCollectionsProps> = ({
  activeCollection,
  onFilter,
  onReset,
}) => {
  return (
    <ul id="collections">
      {/* "All" button to reset the current filter */}
      <li key="all">
        <button
          type="button"
          onClick={onReset}
          className={activeCollection === 'all' ? 'active' : ''}
        >
          All
        </button>
      </li>

      {/* Dynamically render collection tags */}
      <FilterCollectionsTags activeCollection={activeCollection} onFilter={onFilter} client:load />
    </ul>
  );
};

export default FilterCollections;

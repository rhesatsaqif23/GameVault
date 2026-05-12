import React from 'react';

const SortSelect = () => {
  return (
    <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
      <option value="rating-desc">Rating: High to Low</option>
      <option value="release-desc">Release: Newest First</option>
      <option value="price-asc">Price: Low to High</option>
      <p>SortSelect Placeholder</p>
    </select>
  );
};

export default SortSelect;

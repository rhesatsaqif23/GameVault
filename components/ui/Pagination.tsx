import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
      <span className="px-4 py-2">1</span>
      <button className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50">Next</button>
      <p className="text-sm text-gray-500 ml-4">Pagination Placeholder</p>
    </div>
  );
};

export default Pagination;

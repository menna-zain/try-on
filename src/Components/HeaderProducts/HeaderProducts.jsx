import React from "react";

export default function HeaderProducts({ sort, onSortChange }) {
  return (
    <div className="flex items-center justify-end px-4 mb-4">
      {/* <h2 className="text-xl font-semibold">All Products</h2> */}
      <div className="flex items-center gap-2">
        {/* <label htmlFor="sort" className="text-sm font-medium">
          Sort by:
        </label> */}
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border rounded-md font-body "
        >
          <option value="">Sort By</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
          <option value="-name">Name: Z-A</option>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
        </select>
      </div>
    </div>
  );
}

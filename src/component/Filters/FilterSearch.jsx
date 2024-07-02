import React, { useState } from 'react';

const FilterSearch = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search games..."
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default FilterSearch;

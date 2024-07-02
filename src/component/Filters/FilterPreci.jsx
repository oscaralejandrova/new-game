// GamePriceFilter.js
import React, { useState } from 'react';

const GamePriceFilter = ({ onPriceChange }) => {
  const [price, setPrice] = useState(0);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    onPriceChange({ min_price: 0, max_price: value });
  };

  return (
    <div className="flex flex-col items-center mb-4 w-full">
      <label htmlFor="priceRange" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Price Range: 0 - ${price}
      </label>
      <input
        id="priceRange"
        type="range"
        min="0"
        max="85"
        value={price}
        onChange={handlePriceChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default GamePriceFilter;


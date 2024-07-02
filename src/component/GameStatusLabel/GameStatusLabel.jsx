import React from 'react';

const GameStatusLabel = ({ inCart, purchased }) => {
  if (purchased) {
    return (
      <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
        Purchased
      </span>
    );
  }

  if (inCart) {
    return (
      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
        In Cart
      </span>
    );
  }

  return null;
};

export default GameStatusLabel;


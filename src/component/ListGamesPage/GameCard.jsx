import React, { useState } from 'react';
import { useAddToCartMutation, useGetIdQuery, useGetCartQuery } from '../../store/states/authApi';
import GameDetailsModal from '../Modal/GameDetailsModal';
import GameStatusLabel from '../GameStatusLabel/GameStatusLabel';

const GameCard = ({ games, purchased }) => {
  const [addToCart] = useAddToCartMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const { data: cartData } = useGetCartQuery();

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: games.id });
      console.log('Game added to cart');
    } catch (error) {
      console.error('Failed to add game to cart', error);
    }
  };

  const toggleModal = (id = null) => {
    setSelectedGameId(id);
    setIsModalOpen(!isModalOpen);
  };

  const { data: gameDetails, error, isLoading } = useGetIdQuery({ id: selectedGameId }, { skip: !selectedGameId });

  const inCart = cartData?.results[0]?.cart.some(cartItem => cartItem.game === games.id);

  return (
    <article className="p-4 border rounded-lg shadow-lg">
      <header className="mb-4 relative">
        <img src={games.image} alt={games.name} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="absolute top-2 left-2">
          <GameStatusLabel inCart={inCart} purchased={purchased} />
        </div>
      </header>
      <section className="mb-4">
        <h3 
          className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
          onClick={() => toggleModal(games.id)}
        >
          {games.name}
        </h3>
        <p className="font-semibold mb-2">Categories:</p>
        <ul className="list-disc list-inside mb-2">
          {games.categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <p className="text-lg font-semibold">Price: {games.price}</p>
      </section>
      <footer>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddToCart}
          disabled={purchased || inCart} // Disable the button if the game is already purchased or in the cart
        >
          {purchased ? 'Purchased' : inCart ? 'In Cart' : 'Add to cart'}
        </button>
      </footer>

      <GameDetailsModal 
        gameDetails={gameDetails} 
        isOpen={isModalOpen} 
        onClose={() => toggleModal(null)} 
      />
    </article>
  );
};

export default GameCard;

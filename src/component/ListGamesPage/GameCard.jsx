import React, { useState } from "react";
import { useAddToCartMutation, useGetIdQuery } from '../../store/states/authApi';
import GameDetailsModal from '../Modal/GameDetailsModal';

const GameCard = ({ games }) => {
  const [addToCart] = useAddToCartMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: games.id });
      console.log('Juego agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito', error);
    }
  };

  const toggleModal = (id = null) => {
    setSelectedGameId(id);
    setIsModalOpen(!isModalOpen);
  };

  const { data: gameDetails, error, isLoading } = useGetIdQuery({ id: selectedGameId }, { skip: !selectedGameId });

  return (
    <article className="p-4 border rounded-lg shadow-lg">
      <header className="mb-4">
        <img src={games.image} alt={games.name} className="w-full h-48 object-cover rounded-t-lg" />
      </header>
      <section className="mb-4">
        <h3 
          className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
          onClick={() => toggleModal(games.id)}
        >
          {games.name}
        </h3>
        <p className="font-semibold mb-2">Categorías:</p>
        <ul className="list-disc list-inside mb-2">
          {games.categories.map((category, index) => ( 
            <li key={index}>{category}</li>
          ))}
        </ul>
        <p className="text-lg font-semibold">Precio: {games.price}</p>
      </section>
      <footer>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to cart
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
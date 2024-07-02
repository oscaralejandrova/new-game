import React, { useState } from 'react';
import { useGetCartQuery, useRemoveFromCartMutation, useBuyCartMutation } from '../store/states/authApi';
import { useGetGamesQuery } from '../store/states/authApi';

const CartGames = () => {
  const { data: cart, error: cartError, isLoading: cartLoading } = useGetCartQuery();
  const { data: games, error: gamesError, isLoading: gamesLoading } = useGetGamesQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [buyCart] = useBuyCartMutation();
  const [isBuying, setIsBuying] = useState(false); // Estado para el indicador de carga
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  if (cartLoading || gamesLoading) return <div className="text-center mt-10">Loading...</div>;
  if (cartError || gamesError) return <div className="text-center mt-10 text-red-500">Error loading data</div>;

  const cartGames = cart?.results[0]?.cart.map(cartItem => {
    const game = games?.results.find(game => game.id === cartItem.game);
    if (!game) {
      return null; // O maneja el caso de alguna otra forma
    }
    return {
      cartItemId: cartItem.id,
      id: game.id,
      title: game.name,
      image: game.image
    };
  }).filter(game => game !== null); // Filtra los null

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart({ productId: cartItemId }).unwrap();
    } catch (error) {
      console.error('Failed to remove game from cart: ', error);
    }
  };

  const handleBuyCartClick = async () => {
    setIsBuying(true); // Mostrar el indicador de carga
    try {
      await buyCart();
      setSuccessMessage('Games purchased successfully!');
      console.log(buyCart);
    } catch (error) {
      console.error('Failed to buy cart: ', error);
    } finally {
      setIsBuying(false); // Ocultar el indicador de carga
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Games in Cart</h1>
      <ul className="space-y-4">
        {cartGames.map(game => (
          <li key={game.id} className="bg-white p-4 rounded shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={game.image} alt={game.title} className="w-16 h-16 object-cover rounded" />
              <h2 className="text-xl font-semibold">{game.title}</h2>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(game.cartItemId)} 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
      {cartGames.length > 0 && (
        <div className="text-center mt-4">
          <button 
            onClick={handleBuyCartClick} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            disabled={isBuying} // Deshabilitar el botón mientras está en proceso de compra
          >
            {isBuying ? 'Processing...' : 'Buy Cart'}
          </button>
        </div>
      )}
      {successMessage && (
        <div className="text-center mt-4 text-green-500">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CartGames;

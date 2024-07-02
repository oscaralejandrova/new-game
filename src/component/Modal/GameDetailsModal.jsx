import React from 'react';
import RelatedGamesDetail from './RelatedGamesDetail';

const GameDetailsModal = ({ gameDetails, isOpen, onClose }) => {
  const getShortDescription = (description, maxLength = 150) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  if (!isOpen || !gameDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full max-h-screen">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl">{gameDetails.name}</h2>
          <button 
            className="text-white text-2xl"
            onClick={onClose}
          >&times;</button>
        </header>
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <img src={gameDetails.image} alt={gameDetails.name} className="w-full h-48 object-cover rounded mb-4" />
          <p className="mb-4">{getShortDescription(gameDetails.description)}</p>
          <p className="font-semibold mb-2">Categorías:</p>
          <ul className="list-disc list-inside mb-4">
            {gameDetails.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <p className="text-lg font-semibold">Precio: {gameDetails.price}</p>
          {gameDetails.related_games && gameDetails.related_games.length > 0 && (
            <>
              <p className="font-semibold mb-2">Juegos Relacionados:</p>
              <ul className="list-none mb-4">
                {gameDetails.related_games.map((relatedGameId, index) => (
                  <li key={index}>
                    <RelatedGamesDetail idGame={relatedGameId} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsModal;

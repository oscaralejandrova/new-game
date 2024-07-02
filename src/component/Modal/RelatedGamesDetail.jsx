import React from 'react';
import { useGetIdQuery } from '../../store/states/authApi';

const RelatedGamesDetail = ({ idGame }) => {
  const { data: relatedGame, error, isLoading } = useGetIdQuery({ id: idGame });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading related game details</p>;

  return (
    <div className="flex items-center mb-2">
      <img src={relatedGame.image} alt={relatedGame.name} className="w-12 h-12 object-cover rounded mr-2" />
      <span>{relatedGame.name}</span>
    </div>
  );
};

export default RelatedGamesDetail;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetGamesQuery } from "../store/states/authApi";
import GameCard from "../component/ListGamesPage/GameCard";
import GameSearch from "../component/Filters/FilterSearch";
import GamePriceFilter from "../component/Filters/FilterPreci";
import Pagination from "../component/pagination/Pagination";

const ListGamesPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min_price: 0, max_price: 85 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data: games, error, isLoading } = useGetGamesQuery({ search, ...priceFilter, page: currentPage, page_size: pageSize });

  useEffect(() => {
    
  }, [dispatch, search, priceFilter, currentPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(games.count / pageSize);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <GameSearch onSearch={setSearch} />
        <GamePriceFilter onPriceChange={setPriceFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center">
        {games.results.map((gameInfo) => (
          <GameCard key={gameInfo.id} games={gameInfo} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-8">
        <div>
          <p>© 2024 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default ListGamesPage;
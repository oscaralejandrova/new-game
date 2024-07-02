import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, checkAuth } from '../../store/states/userSlice';

const PrincipalHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, 1000); // Verificar cada segundo

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('timestamp');
    navigate('/Login'); // Redirigir a la página de login
    window.location.reload(); // Recargar la página después de cerrar sesión
  };

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">
          <Link to="/">Games-App</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/Register"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Login"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <Link
                to="/CartsPage"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Carts Page
              </Link>
            </li>
            <li>
              <Link
                to="/RecordPage"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Record Page
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PrincipalHeader;
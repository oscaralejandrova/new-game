import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get('access_token');
  
  return isAuthenticated ? children : <Navigate to="/loginadmin" />;
};

export default ProtectedRoute;

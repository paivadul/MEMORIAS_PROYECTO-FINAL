import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const PublicRoute = ({ children }) => {
<<<<<<< HEAD
  const { state } = useContext(AppContext);

  return !state.isAuthenticated ? children : <Navigate to="/inicio" />;
};
=======
    const token = localStorage.getItem('userToken');
    return token ? <Navigate to="/inicio" /> : children;
}
>>>>>>> 4b1e4e4effa1dc54fa7b86a41c408de5a2350cc1

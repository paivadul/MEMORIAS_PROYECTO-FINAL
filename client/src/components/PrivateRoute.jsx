// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const PrivateRoute = ({ children }) => {
  const { state } = useContext(AppContext);

  return state.isAuthenticated ? children : <Navigate to="/login" />;
};  
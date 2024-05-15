import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const PublicRoute = ({ children }) => {
  const { state } = useContext(AppContext);

  return !state.isAuthenticated ? children : <Navigate to="/inicio" />;
};
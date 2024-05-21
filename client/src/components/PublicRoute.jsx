import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return token ? <Navigate to="/anecdotas" /> : children;
}

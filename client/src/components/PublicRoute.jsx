// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return token ? <Navigate to="/inicio" /> : children;
}

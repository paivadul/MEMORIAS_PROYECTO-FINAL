// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    const isLoginOrRegisterRoute = window.location.pathname === '/login' || window.location.pathname === '/register';
    return (!token || isLoginOrRegisterRoute) ? children : <Navigate to="/inicio" />;
}

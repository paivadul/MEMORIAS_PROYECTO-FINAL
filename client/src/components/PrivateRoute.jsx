import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return token ? children : <Navigate to="/login" />;
}

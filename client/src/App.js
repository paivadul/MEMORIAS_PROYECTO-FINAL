import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/inicio';
import Login from './components/login';
import Register from './components/register';

function App() {
  // Estado para almacenar el token
  const [token, setToken] = useState(null);

  // Verificar si hay un token en el localStorage al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={token ? <Inicio /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

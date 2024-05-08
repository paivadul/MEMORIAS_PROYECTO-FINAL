import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/register';
import Inicio from './pages/inicio';
import Visita from './components/visitas/visita';
import Anecdotas from './components/anecdotas/anecdotas';
import AnecdotaByID from './components/anecdotas/anecdotas';
import Galeria from './components/galeria/galeria';
import { PublicRoute } from './components/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './pages';
// import Login from './pages/';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
        <Route path="/visitas" element={<PrivateRoute><Visita /></PrivateRoute>} />
        <Route path="/anecdotas" element={<PrivateRoute><Anecdotas /></PrivateRoute>} />
        <Route path="/anecdota/:id" element={<PrivateRoute><AnecdotaByID /></PrivateRoute>} />
        <Route path="/galeria" element={<PrivateRoute><Galeria /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;

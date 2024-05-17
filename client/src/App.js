import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AppProvider } from "./context/AppProvider";
import { Navbar } from "./components/Navbar";
import {
  AnecdotaByID,
  Anecdotas,
  Galeria,
  Home,
  Login,
  Register,
  Usuario,
  Visitas,
} from "./pages";
import { CreateAnecdota } from "./components";

export const App = () => {
  const location = useLocation(); // Obtiene la ubicación actual
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <AppProvider>
      <div className="App">
        {/* Renderiza el Navbar solo si la ruta actual no está en hideNavbarRoutes */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/visitas"
            element={
              <PrivateRoute>
                <Visitas />
              </PrivateRoute>
            }
          />
          <Route
            path="/galeria"
            element={
              <PrivateRoute>
                <Galeria />
              </PrivateRoute>
            }
          />
          <Route
            path="/anecdotas"
            element={
              <PrivateRoute>
                <Anecdotas />
              </PrivateRoute>
            }
          />

          <Route
            path="/anecdotas/crear"
            element={
              <PrivateRoute>
                <CreateAnecdota />
              </PrivateRoute>
            }
          />
          <Route
            path="/anecdotas/:id"
            element={
              <PrivateRoute>
                <AnecdotaByID />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuario"
            element={
              <PrivateRoute>
                <Usuario />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AppProvider>
  );
};

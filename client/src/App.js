import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AppProvider } from "./context/AppProvider";
import { Navbar } from "./components/Navbar";
import { Galeria, Inicio, Login, Register, Visitas } from "./pages";

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
                <Inicio />
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
        </Routes>
      </div>
    </AppProvider>
  );
};

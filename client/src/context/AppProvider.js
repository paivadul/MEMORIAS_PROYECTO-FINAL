// src/context/AppProvider.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated:
      localStorage.getItem("isAuthenticated") === "true" || false,
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isAuthenticated", state.isAuthenticated.toString());
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

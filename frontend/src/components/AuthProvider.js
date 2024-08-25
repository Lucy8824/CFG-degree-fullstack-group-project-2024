import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", savedToken);
    return savedToken;
  });

  const login = (userToken) => {
    console.log("Logging in with token:", userToken);
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    console.log("Logging out");
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;
  console.log("Is Authenticated:", isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Authprovider");
  }
  return context;
};

export default AuthProvider;

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (userToken) => {
    setToken(userToken);
  };

  const logout = () => {
    setToken(null);
  };

  const authenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAutehnticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAth must be used within an Authprovider");
  }
  return context;
};

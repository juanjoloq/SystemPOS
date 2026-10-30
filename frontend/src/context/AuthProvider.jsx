import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";

import {
  loginRequest,
  perfilRequest,
} from "../services/auth.service";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarSesion();
  }, []);

  const verificarSesion = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const usuario = await perfilRequest();

      setUser(usuario);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await loginRequest(credentials);

    localStorage.setItem("token", response.token);

    setUser(response.usuario);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
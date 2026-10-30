import axiosClient from "../api/axiosClient";

export const loginRequest = async (credentials) => {
  const { data } = await axiosClient.post("/auth/login", credentials);
  return data;
};

export const perfilRequest = async () => {
  const { data } = await axiosClient.get("/auth/perfil");
  return data.usuario;
};
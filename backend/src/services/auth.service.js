import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { generarJWT } from "../utils/generarJWT.js";
import ApiError from "../utils/ApiError.js";
import { normalizarTexto } from "../utils/normalizarTexto.js";

export const loginService = async ({ usuario, password }) => {

  const usuarioDB = await Usuario.findOne({usuario: normalizarTexto(usuario),});
  
  if (!usuarioDB) {
    throw new ApiError(401, "Credenciales incorrectas.");
  }

  if (!usuarioDB.activo) {
    throw new ApiError(403, "Usuario deshabilitado.");
  }

  const passwordCorrecta = await bcrypt.compare(
    password,
    usuarioDB.password
  );

  if (!passwordCorrecta) {
    throw new ApiError(401, "Credenciales incorrectas.");
  }

  const token = await generarJWT({
    uid: usuarioDB._id,
    rol: usuarioDB.rol,
  });

  return {
    ok: true,
    message: "Autenticación correcta.",
    usuario: usuarioDB,
    token,
  };
};

export const perfilService = async (usuario) => {
  return usuario;
};
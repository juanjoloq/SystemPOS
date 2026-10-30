import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const validarJWT = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({
        ok: false,
        message: "Token no proporcionado",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        ok: false,
        message: "Formato de token inválido",
      });
    }

    const token = authorization.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findById(uid).select("-password");

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido",
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        ok: false,
        message: "Usuario deshabilitado",
      });
    }

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token inválido",
    });
  }
};

export default validarJWT;
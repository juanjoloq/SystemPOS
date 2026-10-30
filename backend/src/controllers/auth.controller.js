import { loginService } from "../services/auth.service.js";
import { perfilService } from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const resultado = await loginService(req.body);

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const perfil = async (req, res, next) => {
  try {
    const usuario = await perfilService(req.usuario);

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    next(error);
  }
};
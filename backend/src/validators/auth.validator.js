import { body } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";

export const validarLogin = [
  body("usuario")
    .trim()
    .notEmpty()
    .withMessage("El usuario es obligatorio"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),

  validarCampos,
];